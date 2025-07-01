// Import all the necessary dependencies here
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../types'
import { hideNavBar, showNavBar } from '../features/setting/setting';

const useSetting = () => {
    const settings = useSelector((state: RootState) => state.setting);
    const dispatch = useDispatch();

    const hideNav = () => {
        dispatch(hideNavBar());
    }

    const showNav = () => {
        dispatch(showNavBar());
    }

    return {
        hideNav,
        showNav,
        isShowNavBar: settings.showNavBar
    }
}

export default useSetting