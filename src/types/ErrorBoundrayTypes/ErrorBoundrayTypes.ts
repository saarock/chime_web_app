// Import all the necessary dependencies here
import React from "react";



// Error boundary props
export interface ErrorBoundaryProps {
    children?: React.ReactNode;
}

// ErrorBoundy states
export interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}


