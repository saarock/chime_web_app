// Import all the necessary dependencies here;
import { useSelector } from 'react-redux'
import { RootState } from '../types'



/**
 * The useLoading hook return the current loading state
 * @returns {boolean} - isLoading that can be true or false dependes on the user based performance
 */
const useLoading = () => {
    const isLoading = useSelector((state:RootState) => state.auth.isLoading);

    return {isLoading} // return the loading state

}

export default useLoading