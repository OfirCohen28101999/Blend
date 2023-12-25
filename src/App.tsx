import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/signIn/signIn';
import NavBar from './components/sideBar/navBar';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import MyAccount from './components/myAccount/myAccount';
import Feed from './components/feed/feed';
// import Login from './components/Login/Login';


function App() {
  return (
    <div className="App">
       {/* <Router>
      <Navigator />
      <Switch>
        <Route path="/MyAccount" component={MyAccount} />
        <Route path="/Feed" component={Feed} />
        <Route path="/Explore" component={Explore} />
        <Route path="/SignOut" component={SignOut} />
      </Switch>
    </Router> */}

<BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route path="MyAccount" element={<MyAccount />}></Route>
          {/* <Route index element={<Home />} /> */}
        <Route path="Feed" element={<Feed />} >
        </Route>
      </Routes>
    </BrowserRouter>
        <NavBar />
        <SignIn />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >

          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
