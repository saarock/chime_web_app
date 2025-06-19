// Import all the dependencies here
import React, { JSX } from "react";
import { ComponentForLoginAndResgisterComponentForTopProps } from "../../types";
import "../../styles/components/ComponentForLoginAndResgisterComponentForTop.css";
import Logo from "../Logo/Logo";

/**
 * This component sits on top of the login and register form and shows dynamic content.
 *
 * @param title - Dynamic message like "Sign in to your account" or "Sign up to your account"
 * @param secondTitle - Message like "Don't have an account?" or "Already have an account?"
 * @param path - Path to navigate (e.g., "/register" or "/login")
 * @param name - Link text (e.g., "register" or "login")
 * @param LoginWithGoogleComponent - Component to render Google OAuth login/register functionality
 * @returns {JSX.Element}
 */
const ComponentForLoginAndResgisterComponentForTop: React.ComponentType<
  ComponentForLoginAndResgisterComponentForTopProps
> = ({
  title,
  LoginWithGoogleComponent,
}): JSX.Element => {
    return (
      <div className="chime-login-register-top-component">
        <Logo />
        <div className="chime-login-register-top-component-title-wrapper">
          <h1>{title}</h1>
        </div>
        {/* Render the LoginWithGoogleComponent as a component */}
        <LoginWithGoogleComponent />
      </div>
    );
  };

export default ComponentForLoginAndResgisterComponentForTop;
