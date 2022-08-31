
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
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <div className='loginSignUp'>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        </div>
        {user && <li className='logout'>
          <LogoutButton />
        </li>}
      </ul>
    </nav>
  );
}


export default NavBar;
