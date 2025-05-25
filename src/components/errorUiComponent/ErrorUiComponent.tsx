import React, { useCallback } from "react";
import { FaExclamationTriangle, FaRedo, FaSignOutAlt } from "react-icons/fa";
import { AuthUtil } from "../../utils";
import Button from "../Button/Button";
import { Variant } from "../../types";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-6"
      style={{ animation: "fadeIn 0.35s ease-in-out" }}
      aria-live="assertive"
      role="alert"
    >
      {/* Glassmorphic Card with padding */}
      <div
        className="relative bg-white/30 backdrop-blur-md border border-white/30 rounded-3xl shadow-xl max-w-lg w-full p-10
          flex flex-col items-center text-center"
        style={{ animation: "scaleUp 0.3s ease forwards" }}
      >
        {/* Padding */}
        <div className="w-full h-12 mb-6 rounded-md opacity-30 pointer-events-none select-none">
          {/* This box shows the padding visually */}
        </div>

        {/* Animated warning icon */}
        <FaExclamationTriangle
          className="text-red-500 text-7xl mb-6 animate-pulse"
          aria-hidden="true"
        />

        {/* Main heading */}
        <h2 className="text-3xl font-extrabold text-red-900 mb-3">
          Oops! Something went wrong
        </h2>
        {/* Padding */}
        <div className="w-full h-3 mb-6 rounded-md opacity-30 pointer-events-none select-none">
          {/* This box shows the padding visually */}
        </div>

        {/* Error message */}
        <p className="text-gray-100 text-lg mb-8 select-text">
          {message ||
            "Unexpected error occurred. Please try refreshing or logout."}
        </p>
        {/* Padding */}
        <div className="w-full h-3 mb-6 rounded-md opacity-30 pointer-events-none select-none">
          {/* This box shows the padding visually */}
        </div>

        {/* Button group */}
        <div className="flex gap-6 w-full justify-center flex-wrap">
          <Button
            onClick={onLogout}
            className="flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
              text-white px-6 py-3 rounded-xl text-base font-semibold transition-shadow shadow-red-500/50 hover:shadow-lg"
          >
            <FaSignOutAlt className="mr-3 text-lg" /> Logout
          </Button>

          <Button
            variant={Variant.danger}
            onClick={onRefresh}
            className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600
              text-white px-6 py-3 rounded-xl text-base font-semibold transition-shadow shadow-yellow-400/50 hover:shadow-lg"
          >
            <FaRedo className="mr-3 text-lg" /> Refresh
          </Button>
        </div>
        {/* Padding */}
        <div className="w-full h-12 mb-6 rounded-md opacity-30 pointer-events-none select-none">
          {/* This box shows the padding visually */}
        </div>
      </div>
    </div>
  );
};

export default ErrorUiComponent;
