// Import all the necessary dependencies
import React, { JSX } from "react";
import logo from "../../assets/images/logo.png";
import "../../styles/components/Logo.css";

/**
 * Chime Logo Component
 *
 * This component displays the Chime brand logo,
 * typically used in authentication screens or headers.
 *
 * @returns {JSX.Element} Logo component
 */
const Logo: React.FC = (): JSX.Element => {
  return (
    <div className="chime-login-register-top-component-logo-container">
      <img
        src={logo}
        alt="Chime Logo"
        className="chime-login-register-top-component-logo"
      />
    </div>
  );
};

export default Logo;
