import { useForm } from "react-hook-form"
import Button from "../Button/Button";
import Input from "../Input/Input";
import { X } from "lucide-react"
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
}


interface ChimeUserInfoModalProps {
    isOpen: boolean
    onClose: () => void
}

const genders = ["Male", "Female",]

export default function ChimeUserInfoModal({ isOpen, onClose }: ChimeUserInfoModalProps) {

    /**
     * React form hook
     */
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
     * Handles submission of important user details (age, gender, country).
     * Uses IP-based country fetch and dispatches Redux action.
     */
    const handleSubmitAndAddImpDetails = useCallback(async (data: any) => {
        if (!user || !user?._id) {
            throw new Error("User id is required pleased refresh your page.");
        }

        if (!country) {
            toast.info("Country is requried!");
            return;
        }

        try {
            await dispatch(addImportantDetails({
                age: data.age,
                country: country,
                gender: data.gender,
                userId: user._id,
                phoneNumber: data.phoneNumber,
            })).unwrap();
            toast.success("Details added successfully.");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : String(error));
        } finally {
            reset();
            onClose();
        }
    }, [user?._id, country]);

    if (!isOpen) return null

    return (
        <div className={`chime-modal-overlay`}>
            <div className="chime-modal-backdrop" onClick={onClose} />
            <div className="chime-modal-container">
                <div className="chime-modal-content">
                    <div className="chime-modal-header">
                        <h2 className="chime-modal-title">Complete Your Profile</h2>
                        <Button onClick={onClose} variant={Variant.danger}  type="button">
                            <X className="chime-close-icon" />
                        </Button>
                    </div>

                    <div className="chime-modal-body">
                        <p className="chime-modal-description">
                            Please provide the following information to complete your profile setup.
                        </p>

                        <form onSubmit={handleSubmit(handleSubmitAndAddImpDetails)} className="chime-form">

                            <div className="chime-form-group">
                                <label htmlFor="age" className="chime-form-label">
                                    Age <strong className="chime-imp-details">required</strong>
                                </label>
                                <Input
                                    id="age"
                                    type="number"
                                    min="13"
                                    max="120"
                                    placeholder="Enter your age"
                                    className="chime-input"

                                    {...register("age", {
                                        required: "Age is required",
                                        min: { value: 13, message: "Age must be at least 13" },
                                        max: { value: 120, message: "Age must be less than 120" },
                                    })}
                                />
                                {errors.age && <span className="chime-error-message">{errors.age.message}</span>}
                            </div>

                            <div className="chime-form-group">
                                <label htmlFor="age" className="chime-form-label">
                                    PhoneNumber <strong className="chime-imp-details">optional</strong>
                                </label>
                                <Input
                                    id="age"
                                    type="text"
                                    min="13"
                                    max="120"
                                    placeholder="Enter your age"
                                    className="chime-input"

                                    {...register("phoneNumber", {
                                        required: "Age is required",
                                        min: { value: 13, message: "Age must be at least 13" },
                                        max: { value: 120, message: "Age must be less than 120" },
                                    })}
                                />
                                {errors.age && <span className="chime-error-message">{errors.age.message}</span>}
                            </div>

                            <div className="chime-form-group">
                                <ChimeCountry onCountryChange={(value) => setCountry(value)} />
                            </div>

                            <div className="chime-form-group">
                                <label htmlFor="gender" className="chime-form-label">
                                    Gender <strong className="chime-imp-details">required</strong>
                                </label>
                                <select
                                    id="gender"
                                    className="chime-select"
                                    {...register("gender", { required: "Gender is required" })}
                                >
                                    <option value="">Select your gender</option>
                                    {genders.map((gender) => (
                                        <option key={gender} value={gender}>
                                            {gender}
                                        </option>
                                    ))}
                                </select>
                                {errors.gender && <span className="chime-error-message">{errors.gender.message}</span>}
                            </div>

                            
                            <div className="chime-form-group">
                                <label htmlFor="gender" className="chime-form-label">
                                    Relationship Status <strong className="chime-imp-details">optional</strong>
                                </label>
                                <select
                                    id="gender"
                                    className="chime-select"
                                    {...register("gender", { required: "Gender is required" })}
                                >
                                    <option value="">Select your gender</option>
                                    {genders.map((gender) => (
                                        <option key={gender} value={gender}>
                                            {gender}
                                        </option>
                                    ))}
                                </select>
                                {errors.gender && <span className="chime-error-message">{errors.gender.message}</span>}
                            </div>

                            <div className="chime-form-actions">
                                <Button type="button" onClick={onClose} variant={Variant.danger} disabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button type="submit"  variant={Variant.primary} disabled={isSubmitting} onClick={() => { }}>
                                    {isSubmitting ? "Saving..." : "Save Information"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
