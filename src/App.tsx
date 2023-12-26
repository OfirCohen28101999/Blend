import { useEffect } from 'react';
import './App.css';
import SignIn from './pages/signIn';
import { Route, Routes } from 'react-router-dom';
import MyAccount from './pages/myAccount';
import Feed from './pages/feed';
import ProtectedRoute from './routing/ProtectedRoute';
import { RoutesEnum } from './routing/routes.enum';
import { initFlowbite } from 'flowbite';
import SignUp from './pages/signUp';

function App() {
  useEffect(() => {
    initFlowbite();
  }, [])
  return (
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index path={RoutesEnum.HOME} Component={Feed} />
          <Route path={RoutesEnum.MYPAGE} Component={MyAccount} />
          <Route path={RoutesEnum.FEED} Component={Feed} />
        </Route>
        <Route path={RoutesEnum.SIGNIN} Component={SignIn} />
        <Route path={RoutesEnum.SIGNUP} Component={SignUp} />
      </Routes>
  );
}

export default App;
