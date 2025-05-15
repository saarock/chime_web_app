
import React, { JSX } from "react";
import "../../styles/components/SplashScreen.css";

/**
 * Splash screen for chime
 * @returns {JSX.Element}
 */
const SplashScreen: React.ComponentType = (): JSX.Element => {
  return (
    <div className='chime-splash-screen-container'>
      <h1>Powered by saarock</h1>
    </div>
  )
}

export default SplashScreen