// Import all the necessary dependencies
import { useEffect, useState } from 'react'
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
     * This hook check that the current user is authenticated or not 
     */
    useEffect(() => {
        if (auth.isAuthenticated) {
            setIsAuthenticated(true);
            setUser(auth.user);
        } else {
            setIsAuthenticated(false);
            setUser(null); // reset user when logged out
        }
    }, [auth.isAuthenticated, auth.user]);

    return { isAuthenticated, user }
}

export default useAuth