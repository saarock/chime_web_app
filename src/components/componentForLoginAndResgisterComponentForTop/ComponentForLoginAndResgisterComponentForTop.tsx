// Import all the dependencies here
import React, { JSX } from "react";
import { ComponentForLoginAndResgisterComponentForTopProps } from "../../types";
import logo from "../../assets/images/logo.png";
import "../../styles/components/ComponentForLoginAndResgisterComponentForTop.css";

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
        <div className="chime-login-register-top-component-logo-container">
          <img
            src={logo}
            alt="logo"
            className="chime-login-register-top-component-logo"
          />
        </div>
        <div className="chime-login-register-top-component-title-wrapper">
          <h1>{title}</h1>
        </div>
        {/* Render the LoginWithGoogleComponent as a component */}
        <LoginWithGoogleComponent />
      </div>
    );
  };

export default ComponentForLoginAndResgisterComponentForTop;



/**
 * For the future
 */

{/* <div className="chime-login-register-top-component-second-title">
        <span>{secondTitle}</span>{" "}
        <span>
          <NavLink to={path} className="chime-link">
            {name}
          </NavLink>
        </span>
      </div> */}



