import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { AuthService } from '../services';
import { LocalStorageUtil } from '../utils';
import { LOCAL_STORAGE_USER_DATA_KEY } from '../constant';
import { login, setError } from '../apps';
import { useDispatch } from 'react-redux';
import { User } from '../types';

const useVerifyTokenAndGetUserData = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<User | null>(null);




    /**
     * This function run when the location changed in the protected pages
     */
    const runOnEveryProtectedPageIfTheLocationChange = useCallback(async () => {

        const data = await AuthService.verifyTokenOnEveryPageAndGetUserData();
        // If there is data then set to the localstorage and redux-state
        if (data) {
            setUserData(data);
        } else {
             // Do some things if there is not data like logout.
            navigate("/login")
        }
    }, [location]);




    // This hook run when the location or path changes and the current page is protected page
    useEffect(() => {
        ; (() => {
            try {
                setLoading(true);
                // when the pages changes and if current page is protected page then run this call back function
                runOnEveryProtectedPageIfTheLocationChange();
            } catch (error) {
                dispatch(setError(error instanceof Error ? error.message : typeof error === 'string' ? error : "UnKnown error"));
            } finally {
                setLoading(false);
            }
        })();

    }, [location]);



    return { loading, userData }
}

export default useVerifyTokenAndGetUserData