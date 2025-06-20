// Import necessary dependencies, including React hooks, Redux, utility functions, components, and icons
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Variant, type RootState } from "../../types";
import { X, RefreshCw, EyeOff, AlertTriangle, LogIn } from "lucide-react";
import { clearError } from "../../features/auth/userSlice";
import "../../styles/components/TopToast.css";
import Button from "../Button/Button"

const TopToast = () => {
  // Get the error from Redux store and other auth-related states
  const error = useSelector((state: RootState) => state.auth.error)
  const [visible, setVisible] = useState(false) // Tracks whether the toast is visible
  const [isAnimating, setIsAnimating] = useState(false) // Tracks if the toast is animating
  const dispatch = useDispatch() // Redux dispatcher to clear the error

  // Side effect to handle the visibility and animation of the toast when there's an error
  useEffect(() => {
    if (error) {
      setVisible(true)
      setIsAnimating(true)
    } else {
      setVisible(false)
      setIsAnimating(false)
    }
  }, [error]) // Re-run whenever the error changes

  // Handle clearing the error and resetting the toast animation
  const handleClearError = useCallback(() => {
    setIsAnimating(false) // Stop the animation
    setTimeout(() => {
      dispatch(clearError()) // Dispatch action to clear the error from Redux store
      setVisible(false) // Hide the toast after the animation
    }, 300) // Wait 300ms for the animation to finish
  }, [dispatch]) // Only re-run this when `dispatch` changes

  // Reload the page when the "Refresh" button is clicked
  const handleRefresh = useCallback(() => {
    window.location.reload() // Refresh the page to try to resolve the error
  }, [])



  // Ignore the error and dismiss the toast
  const handleIgnore = useCallback(() => {
    handleClearError() // Simply clear the error when ignoring
  }, [handleClearError])

  // If no error or the toast is not visible, return null and do not render anything
  if (!error || !visible) return null


  return (
    <div className={`chime-toast-overlay ${isAnimating ? "chime-toast-overlay--visible" : ""}`}>
      <div
        className={`chime-toast ${isAnimating ? "chime-toast--visible" : ""}`}
        role="alert" // Ensure screen readers announce this as an alert
        aria-live="assertive" // Set to "assertive" for immediate announcement
        aria-atomic="true" // Ensure the alert is treated as a whole by screen readers
      >

        {/* Close button to dismiss the error toast */}
        <button onClick={handleClearError} className="chime-toast-close" aria-label="Close error notification">
          <X className="chime-toast-close-icon" />
        </button>

        {/* Main content of the error toast */}
        <div className="chime-toast-content">
          <div className="chime-toast-header">
            {/* Icon to represent error (using a warning icon) */}
            <div className="chime-toast-icon-wrapper">
              <AlertTriangle className="chime-toast-error-icon" />
            </div>
            <div className="chime-toast-title-section">
              {/* Title of the error */}
              <h4 className="chime-toast-title">Error Occurred</h4>
              <div className="chime-toast-status">
                Status Code: <span className="chime-toast-status-code">{error.statusCode}</span>
              </div>
            </div>
          </div>

          {/* Body of the toast containing error message and details */}
          <div className="chime-toast-body">
            <p className="chime-toast-message">{error.message}</p>
            {/* Only show error details if present */}
            {error.details && <p className="chime-toast-details">{error.details}</p>}
          </div>
        </div>

        {/* Action buttons for user to take actions (refresh, logout, ignore) */}
        <div className="chime-toast-actions">
          <Button
            onClick={handleRefresh}
            variant={Variant.ternary} // Ternary variant, can be customized to fit design needs
            aria-label="Refresh page"
            title="Refresh Page"
          >
            <RefreshCw className="chime-toast-button-icon" />
            <span>Refresh</span>
          </Button>

          <Button
            onClick={handleIgnore}
            variant={Variant.danger} // Similar to logout, ignoring error is a potentially important action
            aria-label="Ignore error"
            title="Ignore Error"
          >
            <EyeOff className="chime-toast-button-icon" />
            <span>Ignore</span>
          </Button>

          {
            error.statusCode == 401 &&
            <Button
              onClick={() => location.href = '/login'}
              variant={Variant.secondary} // Similar to logout, ignoring error is a potentially important action
              aria-label="Ignore error"
              title="Ignore Error"
            >
              <LogIn className="chime-toast-button-icon" />
              <span>Login</span>
            </Button>
          }
        </div>
      </div>
    </div>
  )
}

export default TopToast
