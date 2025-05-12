
import { useCallback, useState } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks';
import { toast } from 'react-toastify';
import { logoutUserFromServer } from '../../features/auth/userSlice';
import { AppDispatch } from '../../apps/store';
import LoadingComponent from '../loadingComponent/LoadingComponent';

const LogoutComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);



    const logoutUser = useCallback(async () => {
        if (!user?._id) {
            toast.error("Pleased reload the app and try again");
            return;
        }

        setLoading(true);
        try {
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