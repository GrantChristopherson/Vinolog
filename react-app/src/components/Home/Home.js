import React from 'react';
import { NavLink } from 'react-router-dom';
import './home.css'



const Home = () => {
  
  
  return (
    <div className='loginSignupContainer'>
      <div className='loginLinkWrapper'>
        <NavLink to='/login' className={'loginLink'} exact={true} activeClassName='active'>
          Login
        </NavLink>
      </div>
      <div  className='signUpLinkWrapper' >
        <NavLink to='/sign-up' className={'signupLink'} exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </div>
    </div>
  );
};


export default Home;





