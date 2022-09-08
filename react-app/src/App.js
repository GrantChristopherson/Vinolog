import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
// import User from './components/User';
// import UsersList from './components/UsersList';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MyTastingFeed from './components/MyTastingFeed/MyTastingFeed';
import AllLovedFeed from './components/AllLovedFeed/AllLovedFeed';
import TastingForm from './components/TastingForm/TastingForm';
import NavBar from './components/NavBar/NavBar';
import Splash from './components/Splash/Splash';
import Home from './components/Home/Home';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
         <Splash />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/home' exact={true} >
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/tasting' exact={true} >
          <TastingForm />
        </ProtectedRoute>
        <ProtectedRoute path='/tastings' exact={true} >
          <MyTastingFeed />
        </ProtectedRoute>
        <ProtectedRoute path='/lovedtastings' exact={true} >
          <AllLovedFeed />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
