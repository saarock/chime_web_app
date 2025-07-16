// Import all the necessary dependencies here
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../types'
import { hideNavBar, showNavBar, showFooter, hideFooter } from '../features/setting/setting';
import { useCallback } from 'react';

const useSetting = () => {
    const settings = useSelector((state: RootState) => state.setting);
    const dispatch = useDispatch();

    const hideNav = useCallback(() => {
        dispatch(hideNavBar());
    }, []);


    const showNav = useCallback(() => {
        dispatch(showNavBar());
    },[]);

    const showChimeFooter = useCallback(() => {
        dispatch(showFooter());
    }, []);

    const hideChimeFooter = useCallback(() => {
        dispatch(hideFooter());
    }, []);



    return {
        hideNav,
        showNav,
        isShowNavBar: settings.showNavBar,
        showChimeFooter,
        hideChimeFooter,
        isShowFooter: settings.showFooter
    }
}

export default useSetting