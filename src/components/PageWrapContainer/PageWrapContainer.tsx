// Import all the necessary dependencies here
import React from "react";
import { PageWrapperProps } from "../../types";
import TopToast from "../TopToast/TopToast";

/**
 * Chime outlet wrapper
 * @param {React.ReactNode}
 * @returns {React.ReactNode}
 */
const PageWrapContainer: React.FC<PageWrapperProps> = ({
  children,
}): React.ReactNode => {
  return <main id="main">
    <TopToast/>
  {children}
  </main>;
};

export default PageWrapContainer;
