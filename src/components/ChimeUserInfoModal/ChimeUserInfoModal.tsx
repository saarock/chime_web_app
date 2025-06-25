// ChimeUserInfoModal.tsx
// Import all the necessary dependencies here
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { X } from "lucide-react";
import "../../styles/components/ChimeUserInfoModal.css";
import { ChimeUserInfoFormData, ChimeUserInfoModalProps, countries, genders, relationshipStatuses, Variant } from "../../types";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks";
import { useCallback, useEffect } from "react";
import { addImportantDetails } from "../../features/auth/userSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "../../apps/store";
import LoadingComponent from "../LoadingComponent/LoadingComponent";


export default function ChimeUserInfoModal({
  isOpen,
  onClose,
}: ChimeUserInfoModalProps) {
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    reset,
  } = useForm<ChimeUserInfoFormData>({
    defaultValues: {
      age: user?.age?.toString() || "",
      gender: user?.gender || "",
      country: user?.country || "",
      phoneNumber: user?.phoneNumber || "",
      relationshipStatus: user?.relationShipStatus || "",
      userName: user?.userName || "",
    },
  });

  // Resets form values when user info changes (e.g., after refetching user)
  useEffect(() => {
    if (user) {
      reset({
        age: user?.age?.toString() || "",
        gender: user?.gender || "",
        country: user?.country || "",
        phoneNumber: user?.phoneNumber || "",
        relationshipStatus: user?.relationShipStatus || "",
        userName: user?.userName || "",
      });
    }
  }, [user, reset]);

  // Handle form submission: only send changed (dirty) fields to the server
  const handleFormSubmit = useCallback(
    async (data: ChimeUserInfoFormData) => {
      if (!user?._id) {
        toast.error("User ID is missing. Please refresh the page.");
        return;
      }

      // Build an object of only the changed fields
      const updatedFields: Partial<ChimeUserInfoFormData> = {};
      for (const key in dirtyFields) {
        updatedFields[key as keyof ChimeUserInfoFormData] = data[key as keyof ChimeUserInfoFormData];
      }

      // If nothing changed, no need to send a request
      if (Object.keys(updatedFields).length === 0) {
        toast.info("No changes detected.");
        return;
      }

      try {
        await dispatch(
          addImportantDetails({
            ...updatedFields,
            age: updatedFields.age ? Number(updatedFields.age) : undefined,
          })
        ).unwrap();

        toast.success("Profile information updated successfully.");
        reset(data); // Reset form state with new values
        onClose(); // Close the modal
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error));
      }
    },
    [dispatch, user?._id, reset, onClose, dirtyFields]
  );

  if (!isAuthenticated) return <LoadingComponent />;
  if (!isOpen) return null;

  return (
    <div className="chime-modal-overlay">
      <div className="chime-modal-backdrop" onClick={onClose} />
      <div className="chime-modal-container">
        <div className="chime-modal-content">
          <div className="chime-modal-header">
            <h2 className="chime-modal-title">Complete Your Profile</h2>
            <Button onClick={onClose} variant={Variant.danger} type="button">
              <X className="chime-close-icon" />
            </Button>
          </div>

          <div className="chime-modal-body">
            <p className="chime-modal-description">
              Please provide the following information to complete your profile setup.
            </p>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="chime-form">
              {/* Age Field */}
              <div className="chime-form-group">
                <label htmlFor="age" className="chime-form-label">
                  Age
                </label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  {...register("age", {
                    min: { value: 18, message: "You must be at least 18" },
                    max: { value: 100, message: "Too old to register" },
                  })}
                />
                {errors.age && <span className="chime-error-message">{errors.age.message}</span>}
              </div>

              {/* Username Field (Alphanumeric only) */}
              <div className="chime-form-group">
                <label htmlFor="userName" className="chime-form-label">
                  UserName
                </label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="UserName..."
                  {...register("userName", {
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "Username must be alphanumeric",
                    },
                  })}
                />
                {errors.userName && (
                  <span className="chime-error-message">{errors.userName.message}</span>
                )}
              </div>

              {/* Phone Number */}
              <div className="chime-form-group">
                <label htmlFor="phoneNumber" className="chime-form-label">
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber", {
                    minLength: { value: 7, message: "Phone number must be at least 7 digits" },
                    maxLength: { value: 15, message: "Phone number must be under 15 digits" },
                  })}
                />
                {errors.phoneNumber && (
                  <span className="chime-error-message">{errors.phoneNumber.message}</span>
                )}
              </div>

              {/* Country Selection */}
              <div className="chime-form-group">
                <label htmlFor="country" className="chime-form-label">
                  Select Country
                </label>
                <select
                  id="country"
                  {...register("country")}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="">-- Choose a country --</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender Selection */}
              <div className="chime-form-group">
                <label htmlFor="gender" className="chime-form-label">
                  Gender
                </label>
                <select id="gender" className="chime-select" {...register("gender")}>
                  <option value="">Select gender</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
                {errors.gender && <span className="chime-error-message">{errors.gender.message}</span>}
              </div>

              {/* Relationship Status Selection */}
              <div className="chime-form-group">
                <label htmlFor="relationshipStatus" className="chime-form-label">
                  Relationship Status
                </label>
                <select id="relationshipStatus" className="chime-select" {...register("relationshipStatus")}>
                  <option value="">Select your relationship status</option>
                  {relationshipStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
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
                  disabled={isSubmitting || !isDirty}
                  style={{
                    cursor: isDirty ? "pointer" : "not-allowed",
                    opacity: isDirty ? 1 : 0.5,
                  }}
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
