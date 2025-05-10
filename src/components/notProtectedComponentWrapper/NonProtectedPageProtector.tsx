
// Import all the necessary data from 
import React, { useEffect, useMemo } from 'react'
import { PageProtectorProps } from '../../types'
import { useLocation, useNavigate } from 'react-router-dom';
import { cookieUtil } from '../../utils';
import { ACCESS_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from '../../constant';

const NonProtectedPageProtector: React.FC<PageProtectorProps> = ({ children }) => {

  const location = useLocation();
  const navigate = useNavigate();

  

  const accessToken = useMemo(() => cookieUtil.checkCookie(ACCESS_TOKEN_KEY_NAME), [location.pathname]);
  const refreshToken = useMemo(() => cookieUtil.checkCookie(REFRESH_TOKEN_KEY_NAME), [location.pathname]);

  useEffect(() => {
    if (accessToken && refreshToken) {
      navigate("/chats");
    }
  }, [location.pathname]);

  return (
    children
  )
}

export default NonProtectedPageProtector