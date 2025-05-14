// Import all the ncessary dependencies here 
import React, { JSX, useCallback } from "react";
import { FaExclamationTriangle, FaRedo, FaSignOutAlt } from "react-icons/fa";
import { AuthUtil } from "../../utils";


/**
 * 
 * @param {string} param0.messge - Error message 
 * @returns 
 */
const ErrorUiComponent: React.ComponentType<{ message: string }> = ({ message }: { message: string }): JSX.Element => {

    /**
     * Function within the callBackhook [Gives option to the user to logout if any error arrives during the server-request]
     */
    const onLogout = useCallback(() => {
        AuthUtil.clientSideLogout();
    }, []);


    /**
   * Function within the callBackhook [Gives option to the user to refresh the page if any error arrives during the server-request]

   */
    const onRefresh = useCallback(() => {
        window.location.reload();
    }, []);

    return (
        <div className="inset-0 z-50 flex items-center justify-center bg-opacity-70 h-100">
            <div className="bg-white text-red-700 max-w-lg w-full mx-4 rounded-xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
                {/* Icon */}
                <FaExclamationTriangle className="text-6xl text-red-600 mb-4" />

                {/* Message */}
                <h2 className="text-2xl font-bold mb-2 text-center">Oops! Something went wrong</h2>
                <p className="text-lg text-center text-gray-700 mb-6">{message}</p>

                {/* Buttons */}
                <div className="flex space-x-4 w-full justify-center">
                    <button
                        onClick={onLogout}
                        className="flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
                    >
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                    <button
                        onClick={onRefresh}
                        className="flex items-center bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
                    >
                        <FaRedo className="mr-2" /> Refresh
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorUiComponent;
