import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { RoutesEnum } from './routes.enum';
import NavBar from '../components/navBar';

const ProtectedRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const location = useLocation();

  useEffect(() => {

   const googleToken = localStorage.getItem('googleToken');
    const token = localStorage.getItem('token');
    if(token || googleToken){
      setIsLoggedIn(true);
    }
      setCheckingStatus(false);
  }, []);

  if (checkingStatus) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return isLoggedIn ? (
    <>
      <NavBar/>
        <Outlet/>
    </>
  ) : (
    <Navigate to={RoutesEnum.SIGNIN} replace state={{ from: location }} />
  );
};

export default ProtectedRoute;