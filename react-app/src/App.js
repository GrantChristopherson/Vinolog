import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import UserPage from './components/UserPage';
import UserEditPage from './components/UserEditPage';
import ProtectedRoute from './components/ProtectedRoute';
import MyTastingFeed from './components/MyTastingFeed';
import LovedFeed from './components/LovedFeed';
import FriendsField from './components/FriendsField';
import FriendTastings from './components/FriendTastings';
import TastingForm from './components/TastingForm';
import EditTastingForm from './components/EditTastingForm';
import SearchPage from './components/SearchPage';
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
        <ProtectedRoute path='/profile/:id' exact={true} >
          <UserPage />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/:id/edit' exact={true} >
          <UserEditPage />
        </ProtectedRoute>
        <ProtectedRoute path='/tasting' exact={true} >
          <TastingForm />
        </ProtectedRoute>
        <ProtectedRoute path='/tasting/:id/edit' exact={true} >
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
        <ProtectedRoute path='/friends/:id/tastings' exact={true} >
          <FriendTastings />
        </ProtectedRoute>
        <ProtectedRoute path='/search/:searchWord/' exact={true} >
          <SearchPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}


export default App;
