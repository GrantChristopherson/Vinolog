import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';


// highlight whichever is on active page


const Sidebar = ({ user }) => {



  return (
    <div className='user-sidebar'>
      <div className='loved-feed-container'>
        <NavLink to='/lovedtastings' className={'loved-feed-nav'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
          Loved Wines
        </NavLink>
      </div>
      <div className='my-tastings-container'>
        <NavLink to='/tastings' className={'my-feed-nav'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
          My Tasting Notes
        </NavLink>
      </div>
      <div className='create-container'>
        <NavLink to='/tasting' className={'create-nav'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
          Create New Tasting
        </NavLink>
      </div>
      <div className='friends-container'>
        <NavLink to='/friendsinthefield' className={'friends-nav'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
          Friends In The Field
        </NavLink>
      </div>
    </div>
  );
};


export default Sidebar;
          
