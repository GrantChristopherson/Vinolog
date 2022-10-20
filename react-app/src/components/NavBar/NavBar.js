
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './navBar.css'



const NavBar = () => {

  const user = useSelector(state => state?.session?.user)


  if (!user) {

    return (
      <nav className='navLoggedOutContainer'>
        <ul className='ulNav'>
          <NavLink to='/' exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            <h1 className ='vinolog' style={{textDecoration: 'none'}}>- V  I  N  O  L  O  G -</h1>
          </NavLink>
          <div className='loginSignUp'>
            <NavLink to='/login' exact={true} activeClassName='active'>
              <button className='loginButton'>Login</button>
            </NavLink>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
            <button className='signupButton'>Sign Up</button>
            </NavLink>
          </div>
        </ul>
      </nav>
    );

  } else {

    return (
      <nav className='navLoggedInContainer'>
        <ul className='ulNav'>
          <NavLink to='/home' exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            <h2 className ='vinolog' style={{textDecoration: 'none'}}>V  I  N  O  L  O  G</h2>
          </NavLink>
          <LogoutButton />
        </ul>
      </nav>
    );
  };
};

    
        
export default NavBar;

