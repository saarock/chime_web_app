"use client"

import { useForm } from "react-hook-form"
import Button from "../Button/Button";
import Input from "../Input/Input";
import { X } from "lucide-react"
import "../../styles/components/ChimeUserInfoModal.css";


interface ChimeUserInfoFormData {
    country: string
    age: string
    gender: string
}

interface ChimeUserInfoModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: ChimeUserInfoFormData) => void
}

const genders = ["Male", "Female", "Non-binary"]

export default function ChimeUserInfoModal({ isOpen, onClose, onSubmit }: ChimeUserInfoModalProps) {

    /**
     * React form hook
     */
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ChimeUserInfoFormData>();
    

    const handleFormSubmit = async (data: ChimeUserInfoFormData) => {
        try {
            console.log(data);
            
            await onSubmit(data)
            reset()
            onClose()
        } catch (error) {
            console.error("Error submitting form:", error)
        }
    }

    if (!isOpen) return null

    return (
        <div className="chime-modal-overlay">
            <div className="chime-modal-backdrop" onClick={onClose} />
            <div className="chime-modal-container">
                <div className="chime-modal-content">
                    <div className="chime-modal-header">
                        <h2 className="chime-modal-title">Complete Your Profile</h2>
                        <button onClick={onClose} className="chime-modal-close-btn" type="button">
                            <X className="chime-close-icon" />
                        </button>
                    </div>

                    <div className="chime-modal-body">
                        <p className="chime-modal-description">
                            Please provide the following information to complete your profile setup.
                        </p>

                        <form onSubmit={handleSubmit(handleFormSubmit)} className="chime-form">
    
                            <div className="chime-form-group">
                                <label htmlFor="age" className="chime-form-label">
                                    Age *
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
                                <label htmlFor="gender" className="chime-form-label">
                                    Gender *
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
                                <Button type="button" onClick={onClose} className="chime-btn-secondary" disabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="chime-btn-primary" disabled={isSubmitting} onClick={() => {}}>
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
