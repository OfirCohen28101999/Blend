import React from 'react';
import { useCookies } from 'react-cookie';
import { userApi } from './services/api/userApi';
import FullScreenLoader from './components/FullScreenLoader';

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const [cookies] = useCookies(['logged_in']);

  const { isLoading } = userApi.endpoints.getMe.useQuery(null, {
    skip: !cookies.logged_in, //????????????????????
  });

  console.log('From middleware: ', cookies.logged_in);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
