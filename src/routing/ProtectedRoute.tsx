import { useState, useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { RoutesEnum } from './routes.enum';
import NavBar from '../components/navBar';
import FullScreenLoader from '../components/FullScreenLoader';

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
    return <FullScreenLoader />; 
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