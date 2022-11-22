import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import './navigation.css';



const Navigation = () => {

  const user = useSelector(state => state?.session?.user);

  if (!user) {
    return (
      <nav className='nav_logged_out'>
        <ul className='nav_links'>
          <NavLink to='/' exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            <h1 className ='logo_logged_out' style={{textDecoration: 'none'}}>- V  I  N  O  L  O  G -</h1>
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
    )

  } else {
    return (
      null
    )
  };
};



export default Navigation;