import React, { JSX } from "react";
import "../../styles/components/SplashScreen.css";
import Logo from "../Logo/Logo";

/**
 * Beautiful Splash screen for Chime
 * @returns {JSX.Element}
 */
const SplashScreen: React.ComponentType = (): JSX.Element => {
  return (
    <div className="chime-splash-screen">
      <div className="chime-splash-logo-container">
        <Logo/>
        <h1 className="chime-splash-text">Powered by <span>Saarock</span></h1>
      </div>
    </div>
  );
};

export default SplashScreen;
