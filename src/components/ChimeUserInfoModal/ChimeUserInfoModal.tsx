import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { X } from "lucide-react";
import "../../styles/components/ChimeUserInfoModal.css";
import { Variant } from "../../types";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks";
import { useCallback, useState } from "react";
import { addImportantDetails } from "../../features/auth/userSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "../../apps/store";
import ChimeCountry from "../ChimeCountry/ChimeCountry";

interface ChimeUserInfoFormData {
  country: string;
  age: string;
  gender: string;
  phoneNumber: string | null;
  relationshipStatus: string | null;
}

interface ChimeUserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const genders = ["Male", "Female", "Other"];
const relationshipStatuses = ["Single", "In a relationship", "Married", "Prefer not to say"];

export default function ChimeUserInfoModal({
  isOpen,
  onClose,
}: ChimeUserInfoModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChimeUserInfoFormData>();

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const [country, setCountry] = useState<string | null>(null);

  /**
   * Handles profile form submission and dispatches Redux action to save details.
   */
  const handleFormSubmit = useCallback(
    async (data: ChimeUserInfoFormData) => {
      if (!user?._id) {
        toast.error("User ID is missing. Please refresh the page.");
        return;
      }

      if (!country) {
        toast.info("Country is required.");
        return;
      }

      try {
        await dispatch(
          addImportantDetails({
            userId: user._id,
            age: Number(data.age),
            gender: data.gender,
            country: country,
            phoneNumber: data.phoneNumber,
            relationshipStatus: data.relationshipStatus || null,
          })
        ).unwrap();

        toast.success("Profile information saved successfully.");
        reset();
        onClose();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error));
      }
    },
    [dispatch, user?._id, country, onClose, reset]
  );

  if (!isOpen) return null;

  return (
    <div className="chime-modal-overlay">
      <div className="chime-modal-backdrop" onClick={onClose} />
      <div className="chime-modal-container">
        <div className="chime-modal-content">
          {/* Modal Header */}
          <div className="chime-modal-header">
            <h2 className="chime-modal-title">Complete Your Profile</h2>
            <Button onClick={onClose} variant={Variant.danger} type="button">
              <X className="chime-close-icon" />
            </Button>
          </div>

          {/* Modal Body */}
          <div className="chime-modal-body">
            <p className="chime-modal-description">
              Please provide the following information to complete your profile setup.
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="chime-form"
            >
              {/* Age */}
              <div className="chime-form-group">
                <label htmlFor="age" className="chime-form-label">
                  Age <strong className="chime-imp-details">required</strong>
                </label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 13, message: "You must be at least 13" },
                    max: { value: 120, message: "Too old to register" },
                  })}
                />
                {errors.age && (
                  <span className="chime-error-message">
                    {errors.age.message}
                  </span>
                )}
              </div>

              {/* Phone Number */}
              <div className="chime-form-group">
                <label htmlFor="phoneNumber" className="chime-form-label">
                  Phone Number <strong className="chime-imp-details">optional</strong>
                </label>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber", {
                    minLength: {
                      value: 7,
                      message: "Phone number must be at least 7 digits",
                    },
                    maxLength: {
                      value: 15,
                      message: "Phone number must be under 15 digits",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <span className="chime-error-message">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>

              {/* Country */}
              <div className="chime-form-group">
                <ChimeCountry onCountryChange={setCountry} />
              </div>

              {/* Gender */}
              <div className="chime-form-group">
                <label htmlFor="gender" className="chime-form-label">
                  Gender <strong className="chime-imp-details">required</strong>
                </label>
                <select
                  id="gender"
                  className="chime-select"
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option value="">Select gender</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <span className="chime-error-message">
                    {errors.gender.message}
                  </span>
                )}
              </div>

              {/* Relationship Status */}
              <div className="chime-form-group">
                <label htmlFor="relationshipStatus" className="chime-form-label">
                  Relationship Status <strong className="chime-imp-details">optional</strong>
                </label>
                <select
                  id="relationshipStatus"
                  className="chime-select"
                  {...register("relationshipStatus")}
                >
                  <option value="">Select your relationship status</option>
                  {relationshipStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="chime-form-actions">
                <Button
                  type="button"
                  onClick={onClose}
                  variant={Variant.danger}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant={Variant.primary}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Information"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
