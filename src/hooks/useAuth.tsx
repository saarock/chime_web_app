// Import all the necessary dependencies

import { useCallback, useEffect, useState } from 'react'
import { RootState, User } from '../types';
import { useSelector } from 'react-redux';


/**
 * This hook helps to find that the current user is authenticated or not
 * @returns isAuthenticated state
 */

const useAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);


    /**
     * This function check that the current user is authenticated or not 
     * @returns Boolean
     */
    const checkTheUserIsLoginOrNot = useCallback(() => {
        // if auth.isAuthenticated is true means user have login and return true if not then return false
        return auth.isAuthenticated;
    }, [auth]);


    useEffect(() => {
        const isUserAuthenticated = checkTheUserIsLoginOrNot();
        if (isUserAuthenticated) {
            setIsAuthenticated(true);
            setUser(auth.user);
        } else {
            console.log("user is not authenticated");
            setIsAuthenticated(false)
        }

    }, [auth]);


    return { isAuthenticated, user }
}

export default useAuth