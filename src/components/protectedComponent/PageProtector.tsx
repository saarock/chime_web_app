// Import all the ncessary dependencies
import React, { useCallback, useEffect, useMemo } from "react"
import { PageProtectorProps, User } from "../../types"
import { useVerifyTokenAndGetUserData } from "../../hooks"
import { LocalStorageUtil } from "../../utils";
import { useDispatch } from "react-redux";
import { login } from "../../apps";
import { LOCAL_STORAGE_USER_DATA_KEY } from "../../constant";


/**
 * This component is the parent component for all the pages protected pages 
 * @param param0 React node
 * @returns ReactNode as children
 */
const PageProtector: React.FC<PageProtectorProps> = ({ children }) => {

    const { loading, userData } = useVerifyTokenAndGetUserData();
    const localStorageUtil = useMemo(() => new LocalStorageUtil<User>(), []);
    const dispatch = useDispatch();


    // login and cache the data function defined
    const loginAndCacheTheData = useCallback(() => {
        if (userData) {
            localStorageUtil.setItems(LOCAL_STORAGE_USER_DATA_KEY, userData);
            dispatch(login(userData));
            console.log("Protected page working....");
        } else {
            // logout or do some thigns
        }
    }, [userData]);



    useEffect(() => {
        // Login and cache the data function call
        loginAndCacheTheData();
    }, [userData]);


    if (loading) return <div>Loading....</div>


    return (
        children
    )
}

export default PageProtector