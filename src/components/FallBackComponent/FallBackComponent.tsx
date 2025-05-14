// Import all the necessary dependencies here 
import { Component } from "react";
import { AuthUtil } from "../../utils";
import { CustomErrorFallbackProps } from "../../types";



/**
 * ErrorBoundry fallback custom component to show the error to the user
 */
class FallbackComponent extends Component<CustomErrorFallbackProps> {
    /**
 * Function within the callBackhook [Gives option to the user to refresh the page if any error arrives during the server-request]

 */
    handleRefresh = () => {
        window.location.reload();
    };

    /**
     * Function within the callBackhook [Gives option to the user to logout if any error arrives during the server-request]
     */
    handleLogout = () => {
        AuthUtil.clientSideLogout();
    };

    render() {
        const { error, errorInfo } = this.props;
        console.error(`Error: ${error}`);
        console.error(`ErrorInfo ${errorInfo}`);

        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br p-4">
                <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">⚠️ Oops! Something went wrong.</h1>
                    <p className="text-gray-600 mb-6">
                        {error.message}
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={this.handleRefresh}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                        >
                            🔄 Refresh
                        </button>
                        <button
                            onClick={this.handleLogout}
                            className="px-6 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-900 transition"
                        >
                            🚪 Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FallbackComponent;
