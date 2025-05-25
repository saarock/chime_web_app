// Import all the necessary dependencies here
import { Component, ErrorInfo, lazy, Suspense } from "react";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { ErrorBoundaryProps, ErrorBoundaryState } from "../../types";
// laxy imports
const FallbackComponent = lazy(
  () => import("../FallBackComponent/FallBackComponent"),
);

/**
 * Error boudry class to handel the global errors that may be arrives during the re-rendering
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.hasError && this.state.error && this.state.errorInfo) {
      return (
        // Custoum fallback component
        <Suspense fallback={<LoadingComponent />}>
          <FallbackComponent
            error={this.state.error}
            errorInfo={this.state.errorInfo}
          />
        </Suspense>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
