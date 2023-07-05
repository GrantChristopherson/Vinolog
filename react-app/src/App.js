import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';
import MyTastingFeed from './components/MyTastingFeed';
import LovedFeed from './components/LovedFeed';
import FriendsField from './components/FriendsField';
import FriendTastings from './components/FriendTastings';
import TastingForm from './components/TastingForm';
import EditTastingForm from './components/EditTastingForm';
import Splash from './components/Splash';




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
        <ProtectedRoute path='/tasting' exact={true} >
          <TastingForm />
        </ProtectedRoute>
        <ProtectedRoute path='/tasting/edit' exact={true} >
          <EditTastingForm />
        </ProtectedRoute>
        <ProtectedRoute path='/tastings' exact={true} >
          <MyTastingFeed />
        </ProtectedRoute>
        <ProtectedRoute path='/lovedtastings' exact={true} >
          <LovedFeed />
        </ProtectedRoute>
        <ProtectedRoute path='/friendsinthefield' exact={true} >
          <FriendsField />
        </ProtectedRoute>
        <ProtectedRoute path={`/friends/`} >
          <FriendTastings />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
