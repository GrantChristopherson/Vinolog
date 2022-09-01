
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './navBar.css'



const NavBar = () => {

  const user = useSelector(state => state?.session?.user)

  return (
    <nav className='navContainer'>
      <ul className='ulNav'>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
        <div className='loginSignUp'>
          {!user && <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>}
          {!user && <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>}
        </div>
        {user && <LogoutButton />}
      </ul>
    </nav>
  );
}
        
        
        
        
        
        


export default NavBar;
