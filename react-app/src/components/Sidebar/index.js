import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';


// highlight whichever is on active page

const Sidebar = () => {



  return (
    <div className='user_sidebar'>
      <div className='sidebar_links_container'>
        <NavLink to='/lovedtastings' className={'sidebar_links'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
          Loved Wines
        </NavLink>
        <NavLink to='/tastings' className={'sidebar_links'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
          My Tasting Notes
        </NavLink>
        <NavLink to='/tasting' className={'sidebar_links'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
          Create New Tasting
        </NavLink>
        <NavLink to='/friendsinthefield' className={'sidebar_links'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
          Friends In The Field
        </NavLink>
      </div>
    </div>
  );
};


export default Sidebar;
          
