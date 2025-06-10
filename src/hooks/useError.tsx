// Import all the necessary dependencies here

import { useSelector } from "react-redux"
import { RootState } from "../types"


/**
 * 
 * @returns {string, boolean} - error that can occur in the auth level and if there is error set the isError true otherwise set false
 */
const useError = () => {
    const error = useSelector((state: RootState) => state.auth.error);

    return {error, isError: error? true : false}
}

export default useError