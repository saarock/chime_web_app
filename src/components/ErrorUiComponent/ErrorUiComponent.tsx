import React, { useCallback } from "react";
import { FaExclamationTriangle, FaRedo, FaSignOutAlt } from "react-icons/fa";
import { AuthUtil } from "../../utils";
import Button from "../Button/Button";
import { Variant } from "../../types";
import "../../styles/components/ErrorUiComponent.css";

/**
 * ErrorUiComponent shows a stylish error screen with logout & refresh options.
 *
 * @param {string} message - The error message to display.
 */
const ErrorUiComponent: React.FC<{ message: string }> = ({ message }) => {
  const onLogout = useCallback(() => {
    AuthUtil.clientSideLogout();
  }, []);

  const onRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div
      className="chime-error-wrapper"
      aria-live="assertive"
      role="alert"
    >
      <div className="chime-error-card">
        <div className="chime-padding" />

        <FaExclamationTriangle
          className="chime-error-icon"
          aria-hidden="true"
        />

        <h2 className="chime-error-heading">Oops! Something went wrong</h2>

        <div className="chime-padding-small" />

        <p className="chime-error-message">
          {message || "Unexpected error occurred. Please try refreshing or logout."}
        </p>

        <div className="chime-padding-small" />

        <div className="chime-error-buttons">
          <Button
            onClick={onLogout}
            className="chime-btn chime-btn-logout"
          >
            <FaSignOutAlt className="chime-btn-icon" /> Logout
          </Button>

          <Button
            variant={Variant.danger}
            onClick={onRefresh}
            className="chime-btn chime-btn-refresh"
          >
            <FaRedo className="chime-btn-icon" /> Refresh
          </Button>
        </div>

        <div className="chime-padding" />
      </div>
    </div>
  );
};

export default ErrorUiComponent;
