"use client"

import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../types"
import { X, RefreshCw, LogOut, EyeOff } from "lucide-react"
import { clearError } from "../../features/auth/userSlice"
import "../../styles/components/TopToast.css";
import { AuthUtil } from "../../utils"

const TopToast = () => {
  const error = useSelector((state: RootState) => state.auth.error)
  const [visible, setVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      setVisible(true)
      setIsAnimating(true)
    } else {
      setVisible(false)
      setIsAnimating(false)
    }
  }, [error])

  const handleClearError = useCallback(() => {
    setIsAnimating(false)
    setTimeout(() => {
      dispatch(clearError())
      setVisible(false)
    }, 300)
  }, [dispatch])

  const handleRefresh = useCallback(() => {
    window.location.reload()
  }, [])

  const handleLogout = useCallback(() => {
    // Add your logout logic here
    setTimeout(() => {
      AuthUtil.clientSideLogout();
    }, 300)
  }, [handleClearError])

  const handleIgnore = useCallback(() => {
    handleClearError()
  }, [handleClearError])

  if (!error || !visible) return null

  return (
    <div className={`chime-toast-overlay ${isAnimating ? "chime-toast-overlay--visible" : ""}`}>
      <div
        className={`chime-toast ${isAnimating ? "chime-toast--visible" : ""}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="chime-toast-content">
          <div className="chime-toast-icon-wrapper">
            <div className="chime-toast-error-icon">!</div>
          </div>
          <div className="chime-toast-text">
            <h4 className="chime-toast-title">Error Occurred</h4>
            <p className="chime-toast-message">{error.message}</p>
            <p className="chime-toast-message"> {error.code}</p>
            <p className="chime-toast-message">{error.details}</p>
          </div>
        </div>

        <div className="chime-toast-actions">
          <button
            onClick={handleRefresh}
            className="chime-toast-button chime-toast-button--refresh"
            aria-label="Refresh page"
            title="Refresh Page"
          >
            <RefreshCw className="chime-toast-button-icon" />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleLogout}
            className="chime-toast-button chime-toast-button--logout"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="chime-toast-button-icon" />
            <span>Logout</span>
          </button>

          <button
            onClick={handleIgnore}
            className="chime-toast-button chime-toast-button--ignore"
            aria-label="Ignore error"
            title="Ignore Error"
          >
            <EyeOff className="chime-toast-button-icon" />
            <span>Ignore</span>
          </button>
        </div>

        <button onClick={handleClearError} className="chime-toast-close" aria-label="Close error notification">
          <X className="chime-toast-close-icon" />
        </button>
      </div>
    </div>
  )
}

export default TopToast
