
// Import all the necessary dependencies here
import type React from "react"
import { useEffect, type JSX } from "react"
import "../../styles/components/SplashScreen.css";
import Logo from "../Logo/Logo"

/**
 * Beautiful Splash screen for Chime
 * @returns {JSX.Element}
 */
const SplashScreen: React.ComponentType = (): JSX.Element => {

  // Hide the scroll bar while showing the splash screen
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // Hide scroll

    return () => {
      document.body.style.overflow = originalOverflow; // Restore scroll on unmount
    };
  }, []);
  return (
    <div className="chime-splash-screen">
      <div className="chime-splash-container">
        <div className="chime-splash-logo-wrapper">
          <Logo />
        </div>
        <div className="chime-splash-content">
          <h1 className="chime-splash-title">Chime talk</h1>
          <p className="chime-splash-subtitle">
            Powered by <span className="chime-splash-brand">Saarock</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
