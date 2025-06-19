// Import all the necesary dependencies
import React, { JSX } from "react";

/**
 * Loader to show on async
 * @returns {JSX.Element}
 */
const LoadingComponent: React.ComponentType = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center h-full m-96">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingComponent;
