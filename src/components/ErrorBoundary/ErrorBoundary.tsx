import { Component, ErrorInfo, lazy, Suspense } from "react";
import LoadingComponent from "../loadingComponent/LoadingComponent";
import { ErrorBoundaryProps, ErrorBoundaryState } from "../../types";

const FallbackComponent = lazy(() => import("../FallBackComponent/FallBackComponent"));



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
                <Suspense fallback={<LoadingComponent />}>
                    <FallbackComponent error={this.state.error} errorInfo={this.state.errorInfo} />
                </Suspense>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
