// Import all the necessary dependencies here
import React, { JSX, Suspense, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cookieUtil, localStorageUtil } from '../../utils';
import {
  ACCESS_TOKEN_KEY_NAME,
  REFRESH_TOKEN_KEY_NAME,
  LOCAL_STORAGE_USER_DATA_KEY,
} from '../../constant';
import { PageProtectorProps } from '../../types';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

/**
 * React non-protected page wrapper
 * @param {React.ReactNode} param.children - ReactNode  
 * @returns {JSX.Element}
 */
const NonProtectedPageProtector: React.ComponentType<React.PropsWithChildren<PageProtectorProps>> = ({ children }): JSX.Element => {

  // All the hook goes here
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    const accessToken = cookieUtil.checkCookie(ACCESS_TOKEN_KEY_NAME);
    const refreshToken = cookieUtil.checkCookie(REFRESH_TOKEN_KEY_NAME);
    const userData = localStorageUtil.getItems(LOCAL_STORAGE_USER_DATA_KEY);

    if (accessToken && refreshToken) {
      navigate('/chats');
      return;
    }

    if (userData) {
      localStorageUtil.clear();
    }

  }, [location.pathname, navigate]);

  return <>
    <Suspense fallback={<LoadingComponent />}>
      {children}
    </Suspense>
  </>;
};

export default NonProtectedPageProtector;
