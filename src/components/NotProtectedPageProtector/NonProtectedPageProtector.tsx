// Import all the necessary dependencies here
import React, { JSX, Suspense } from "react";
import { PageProtectorProps } from "../../types";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

/**
 * React non-protected page wrapper
 * @param {React.ReactNode} param.children - ReactNode
 * @returns {JSX.Element}
 */
const NonProtectedPageProtector: React.ComponentType<
  React.PropsWithChildren<PageProtectorProps>
> = ({ children }): JSX.Element => {
  return (
    <>
      <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
    </>
  );
};

export default NonProtectedPageProtector;
