import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';
import './logoutButton.css';




// const LogoutButton = () => {
//   const dispatch = useDispatch()
//   const onLogout = async (e) => {
//     await dispatch(logout());
//   };

//   return <button className='logoutButton' onClick={onLogout}>Logout</button>;
// };

// export default LogoutButton;



const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <NavLink to='/' exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
      <button className ='logoutButton' style={{textDecoration: 'none'}} onClick={onLogout}>Logout</button>
    </NavLink>
  )
};

export default LogoutButton;