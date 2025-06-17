// Import all the necessary dependencies here
import { Component } from "react";
import { CustomErrorFallbackProps } from "../../types";
import "../../styles/components/FallBackComponent.css";
import Button from "../Button/Button";

/**
 * ErrorBoundry fallback custom component to show the error to the user
 */
class FallBackComponent extends Component<CustomErrorFallbackProps> {
  /**
   * Function within the callBackhook [Provide options to the user to refresh the page if any error arrives during the server-request]
   */
  handleRefresh = () => {
    window.location.reload();
  };


  render() {
    const { error, errorInfo } = this.props;
    console.error(`Error: ${error}`);
    console.error(`ErrorInfo ${errorInfo}`);

    return (
      <div className="chime-error-wrapper flex items-center justify-center h-screen bg-gradient-to-br p-4">
        <div className="chime-error-card bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="chime-error-title text-3xl font-bold text-red-600 mb-4">
            ⚠️ Oops! Something went wrong.
          </h1>
          <p className="chime-error-message text-gray-600 mb-6">{error.message}</p>
          <div className="chime-error-actions flex justify-center gap-4">
            <Button
              onClick={this.handleRefresh}
              className="chime-error-btn px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              🔄 Refresh
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default FallBackComponent;
