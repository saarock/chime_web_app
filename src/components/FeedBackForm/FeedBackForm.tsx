import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Star, Send, MessageSquare, ThumbsUp, ThumbsDown, Heart, Zap, Camera, Users, Cross, CrossIcon, X } from "lucide-react"
import "../../styles/components/FeedbackForm.css";
import Button from "../Button/Button"
import { Variant } from "../../types"
import { toast } from "react-toastify"

// Validation schema
const feedbackSchema = z.object({
    rating: z.number().min(1, "Please select a rating").max(5, "Rating must be between 1 and 5"),
    category: z.string().min(1, "Please select a category"),
    feedback: z
        .string()
        .min(10, "Feedback must be at least 10 characters")
        .max(500, "Feedback must be less than 500 characters"),
    email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
    wouldRecommend: z.boolean(),
    callQuality: z.number().min(1).max(5),
    easeOfUse: z.number().min(1).max(5),
    features: z.array(z.string()).optional(),
    improvements: z.string().max(300, "Suggestions must be less than 300 characters").optional(),
    userId: z.string().optional(),
})

export type FeedbackFormData = z.infer<typeof feedbackSchema>


const categories = [
    { value: "video-quality", label: "Video Quality", icon: Camera },
    { value: "connection", label: "Connection Issues", icon: Zap },
    { value: "user-experience", label: "User Experience", icon: Heart },
    { value: "matching", label: "Random Matching", icon: Users },
    { value: "features", label: "App Features", icon: MessageSquare },
    { value: "other", label: "Other", icon: ThumbsUp },
]

const featureOptions = [
    "Random matching algorithm",
    "Video quality",
    "Audio quality",
    "User interface",
    "Connection speed",
    "Safety features",
    "Mobile experience",
    "Desktop experience",
]

interface FeedbackFormProps {
    onSubmit?: (data: FeedbackFormData) => Promise<void>
    variant?: "compact" | "full"
    theme?: "light" | "dark"
    onCancel: () => void

}

export function FeedbackForm({ onSubmit, variant = "full", theme = "dark", onCancel }: FeedbackFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [hoveredCallQuality, setHoveredCallQuality] = useState(0)
    const [hoveredEaseOfUse, setHoveredEaseOfUse] = useState(0)

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        reset,
    } = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            rating: 0,
            category: "",
            feedback: "",
            email: "",
            wouldRecommend: false,
            callQuality: 0,
            easeOfUse: 0,
            features: [],
            improvements: "",
        },
        mode: "onChange",
    })

    const watchedFeedback = watch("feedback")
    const watchedFeatures = watch("features") || []

    const handleFormSubmit = async (data: FeedbackFormData) => {
        try {
            await onSubmit?.(data);
            setIsSubmitting(true)
            setIsSubmitting(false)
            setIsSubmitted(true)
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to submit feedback try again later");
        } finally {
            // Reset form after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false)
                reset();
                onCancel();
            }, 3000)
        }
    }

    const StarRating = ({
        value,
        onChange,
        onHover,
        hoveredValue,
        size = 24,
        label,
    }: {
        value: number
        onChange: (rating: number) => void
        onHover: (rating: number) => void
        hoveredValue: number
        size?: number
        label: string
    }) => (
        <div className="chime-star-rating">
            <label className="chime-star-rating-label">{label}</label>
            <div className="chime-stars-container">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`chime-star ${(hoveredValue || value) >= star ? "chime-star-filled" : ""}`}
                        onClick={() => onChange(star)}
                        onMouseEnter={() => onHover(star)}
                        onMouseLeave={() => onHover(0)}
                    >
                        <Star size={size} />
                    </button>
                ))}
            </div>
            <span className="chime-rating-text">
                {(hoveredValue || value) > 0 && (
                    <>
                        {hoveredValue || value} of 5 stars
                        {(hoveredValue || value) === 5 && " 🎉"}
                        {(hoveredValue || value) === 4 && " 😊"}
                        {(hoveredValue || value) === 3 && " 😐"}
                        {(hoveredValue || value) === 2 && " 😕"}
                        {(hoveredValue || value) === 1 && " 😞"}
                    </>
                )}
            </span>
        </div>
    )

    if (isSubmitted) {
        return (
            <div className={`chime-feedback-form chime-feedback-success ${theme}`}>
                <div className="chime-success-animation">
                    <div className="chime-success-icon">
                        <Heart className="chime-heart-icon" />
                    </div>
                    <h3>Thank you for your feedback!</h3>
                    <p>Your input helps us make Chime-Talk better for everyone.</p>
                    <div className="chime-success-particles">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="chime-success-particle" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`chime-feedback-form ${variant} ${theme}`}>
            <Button
                variant={Variant.danger}
                className="fixed top-4 right-4 z-50"
                onClick={onCancel}

            >
                <X />
            </Button>

            <div className="chime-form-header">
                <div className="chime-form-icon">
                    <MessageSquare size={24} />
                </div>
                <h2>Share Your Experience</h2>
                <p>Help us improve Chime-Talk with your valuable feedback</p>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="chime-form">
                {/* Overall Rating */}
                <div className="chime-form-section">
                    <Controller
                        name="rating"
                        control={control}
                        render={({ field }) => (
                            <StarRating
                                value={field.value}
                                onChange={field.onChange}
                                onHover={setHoveredRating}
                                hoveredValue={hoveredRating}
                                size={32}
                                label="Overall Experience"
                            />
                        )}
                    />
                    {errors.rating && <span className="chime-error">{errors.rating.message}</span>}
                </div>

                {/* Category Selection */}
                <div className="chime-form-section">
                    <label className="chime-form-label">What's your feedback about?</label>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <div className="chime-category-grid">
                                {categories.map((category) => {
                                    const IconComponent = category.icon
                                    return (
                                        <button
                                            key={category.value}
                                            type="button"
                                            className={`chime-category-button ${field.value === category.value ? "selected" : ""}`}
                                            onClick={() => field.onChange(category.value)}
                                        >
                                            <IconComponent size={20} />
                                            <span>{category.label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    />
                    {errors.category && <span className="chime-error">{errors.category.message}</span>}
                </div>

                {variant === "full" && (
                    <>
                        {/* Detailed Ratings */}
                        <div className="chime-form-section">
                            <div className="chime-detailed-ratings">
                                <Controller
                                    name="callQuality"
                                    control={control}
                                    render={({ field }) => (
                                        <StarRating
                                            value={field.value}
                                            onChange={field.onChange}
                                            onHover={setHoveredCallQuality}
                                            hoveredValue={hoveredCallQuality}
                                            size={20}
                                            label="Call Quality"
                                        />
                                    )}
                                />

                                <Controller
                                    name="easeOfUse"
                                    control={control}
                                    render={({ field }) => (
                                        <StarRating
                                            value={field.value}
                                            onChange={field.onChange}
                                            onHover={setHoveredEaseOfUse}
                                            hoveredValue={hoveredEaseOfUse}
                                            size={20}
                                            label="Ease of Use"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {/* Feature Feedback */}
                        <div className="chime-form-section">
                            <label className="chime-form-label">Which features did you like most?</label>
                            <Controller
                                name="features"
                                control={control}
                                render={({ field }) => (
                                    <div className="chime-features-grid">
                                        {featureOptions.map((feature) => (
                                            <button
                                                key={feature}
                                                type="button"
                                                className={`chime-feature-tag ${watchedFeatures.includes(feature) ? "selected" : ""}`}
                                                onClick={() => {
                                                    const currentFeatures = field.value || []
                                                    if (currentFeatures.includes(feature)) {
                                                        field.onChange(currentFeatures.filter((f) => f !== feature))
                                                    } else {
                                                        field.onChange([...currentFeatures, feature])
                                                    }
                                                }}
                                            >
                                                {feature}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            />
                        </div>
                    </>
                )}

                {/* Feedback Text */}
                <div className="chime-form-section">
                    <label className="chime-form-label">
                        Tell us more about your experience
                        <span className="chime-char-count">{watchedFeedback?.length || 0}/500</span>
                    </label>
                    <Controller
                        name="feedback"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                className="chime-textarea"
                                placeholder="Share your thoughts, suggestions, or any issues you encountered..."
                                rows={variant === "compact" ? 3 : 4}
                            />
                        )}
                    />
                    {errors.feedback && <span className="chime-error">{errors.feedback.message}</span>}
                </div>

                {variant === "full" && (
                    <>
                        {/* Improvements */}
                        <div className="chime-form-section">
                            <label className="chime-form-label">What could we improve?</label>
                            <Controller
                                name="improvements"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        className="chime-textarea"
                                        placeholder="Any suggestions for making Chime-Talk better?"
                                        rows={2}
                                    />
                                )}
                            />
                        </div>

                        {/* Email */}
                        <div className="chime-form-section">
                            <label className="chime-form-label">Email (optional)</label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <input {...field} type="email" className="chime-input" placeholder="your@email.com" />
                                )}
                            />
                            {errors.email && <span className="chime-error">{errors.email.message}</span>}
                        </div>

                        {/* Recommendation */}
                        <div className="chime-form-section">
                            <Controller
                                name="wouldRecommend"
                                control={control}
                                render={({ field }) => (
                                    <div className="chime-recommendation">
                                        <label className="chime-form-label">Would you recommend Chime-Talk to friends?</label>
                                        <div className="chime-recommendation-buttons">
                                            <button
                                                type="button"
                                                className={`chime-recommend-button ${field.value === true ? "selected yes" : ""}`}
                                                onClick={() => field.onChange(true)}
                                            >
                                                <ThumbsUp size={20} />
                                                Yes, definitely!
                                            </button>
                                            <button
                                                type="button"
                                                className={`chime-recommend-button ${field.value === false ? "selected no" : ""}`}
                                                onClick={() => field.onChange(false)}
                                            >
                                                <ThumbsDown size={20} />
                                                Not really
                                            </button>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    </>
                )}

                {/* Submit Button */}
                <div className="chime-form-actions">
                    <button
                        type="submit"
                        className={`chime-submit-button ${isSubmitting ? "submitting" : ""} ${!isValid ? "disabled" : ""}`}
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="chime-spinner" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send size={18} />
                                Send Feedback
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

// Quick Rating Component for minimal feedback
export function QuickRating({ onSubmit }: { onSubmit?: (rating: number) => void }) {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleRatingSubmit = (selectedRating: number) => {
        setRating(selectedRating)
        setIsSubmitted(true)
        onSubmit?.(selectedRating)

        setTimeout(() => {
            setIsSubmitted(false)
            setRating(0)
        }, 2000)
    }

    if (isSubmitted) {
        return (
            <div className="chime-quick-rating submitted">
                <Heart className="chime-thank-you-icon" />
                <span>Thanks for rating!</span>
            </div>
        )
    }

    return (
        <div className="chime-quick-rating">
            <span className="chime-quick-rating-label">How was your call?</span>
            <div className="chime-quick-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className={`chime-quick-star ${(hoveredRating || rating) >= star ? "filled" : ""}`}
                        onClick={() => handleRatingSubmit(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                    >
                        <Star size={24} />
                    </button>
                ))}
            </div>
        </div>
    )
}
