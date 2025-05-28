// Import all necessary dependencies
import React, { JSX } from "react";
import { PageProtectorProps } from "../../types";
import reg_logo from "../../assets/images/reg_log.png";
import "../../styles/components/ChimeRegisterLoginPageWrapper.css";

/**
 * ChimeRegisterLoginPageWrapper component
 *
 * This component serves as a layout wrapper for both the Login and Register pages.
 * It includes a static image on one side and renders dynamic children content (login or register form) on the other side.
 *
 * @param {PageProtectorProps} props - The props for the component.
 * @param {React.ComponentType} props.children - The form content (either login or register) to be displayed inside the wrapper.
 *
 * @returns {JSX.Element} A layout wrapper for login/register pages.
 *
 * @note The image on the left side remains static, while only the `children` (form section) changes based on the context.
 */
const ChimeRegisterLoginPageWrapper: React.ComponentType<
  PageProtectorProps
> = ({ children }): JSX.Element => {
  return (
    <div className="chime-entry-page">
      {/* Static image section (common for both login and register pages) */}
      <div className="chime-entry-page-entry-image">
        <img src={reg_logo} alt="Login/Register visual representation" />
      </div>

      {/* Dynamic content (Login or Register form passed as children) */}
      {children}
    </div>
  );
};

export default ChimeRegisterLoginPageWrapper;
