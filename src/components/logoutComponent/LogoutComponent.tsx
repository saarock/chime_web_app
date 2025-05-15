// Import all the ncessary dependencies here
import React, { JSX, useCallback, useState } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks';
import { toast } from 'react-toastify';
import { logoutUserFromServer } from '../../features/auth/userSlice';
import { AppDispatch } from '../../apps/store';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

/**
 * stand-alone Logout component
 * @note this component css in on [/styles/components/ProfileHeader.css file]
 * @returns {JSX.Element}
 */
const LogoutComponent: React.ComponentType = (): JSX.Element => {

    // All the hook goes here
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);



    /**
     * async function to handel the logout from the cliet side
     */
    const logoutUser = useCallback(async () => {
        if (!user?._id) {
            toast.error("Pleased reload the app and try again");
            return;
        }

        setLoading(true);
        try {
            // React-redux async action to logout the user from the server side and client side 
            await dispatch(logoutUserFromServer(user._id)).unwrap();
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : "Something wrong while loggout pleased refresh your page and try again");
        } finally {
            setLoading(false);
        }

    }, [user?._id]);

    return (
        <>
            {
                loading ? <LoadingComponent /> : <li className="chime-profile-header-navs-item chime-logout" onClick={logoutUser}>
                    <span className="chime-profile-header-navs-icon"><FaSignOutAlt /></span>
                    <span className="chime-profile-header-navs-text">Logout</span>
                </li>
            }
        </>
    )
}

export default LogoutComponent