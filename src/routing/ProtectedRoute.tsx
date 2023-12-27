import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { RoutesEnum } from './routes.enum';
import NavBar from '../components/navBar';

const ProtectedRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const location = useLocation();

  useEffect(() => {
  //   // const auth = getAuth();
  //   // const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(true);
      setCheckingStatus(false);
  //   });

  //   return () => unsubscribe();
  }, []);

  if (checkingStatus) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return isLoggedIn ? (
    <>
      <NavBar />
        <Outlet/>
    </>
  ) : (
    <Navigate to={RoutesEnum.SIGNIN} replace state={{ from: location }} />
  );
};

export default ProtectedRoute;