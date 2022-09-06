
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import vinologLogo from '../../assets/VinoLog.svg';
import './navBar.css'



const NavBar = () => {

  const user = useSelector(state => state?.session?.user)

  return (
    <nav className='navContainer'>
      <ul className='ulNav'>
        <NavLink to='/' exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
          <h2 className ='vinolog' style={{textDecoration: 'none'}}>V I N O L O G</h2>
        </NavLink>
        <div className='loginSignUp'>
          {!user && <NavLink to='/login' exact={true} activeClassName='active'>
            <button className='loginButton'>Login</button>;
          </NavLink>}
          {!user && <NavLink to='/sign-up' exact={true} activeClassName='active'>
          <button className='signupButton'>Sign Up</button>;
          </NavLink>}
        </div>
        {user && <LogoutButton />}
      </ul>
    </nav>
  );
}
        
        
        
        
        
        


export default NavBar;
