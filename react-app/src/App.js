import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MyTastingFeed from './components/MyTastingFeed/MyTastingFeed';
import AllLovedFeed from './components/LovedFeed/LovedFeed';
import TastingForm from './components/TastingForm/TastingForm';
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
      <Switch>
        <Route path='/' exact={true}>
         <Splash />
        </Route>
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpPage />
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
