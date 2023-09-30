import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SearchForm from '../SearchForm';
import './sidebar.css';




const Sidebar = () => {

  const user = useSelector(state => state?.session?.user);



  return (
    <div className='sidebar'>
      <SearchForm />
      <div className='sidebar_links_container'>
        <NavLink to='/lovedtastings' className={'sidebar_links'} exact={true} activeClassName='active_sidebar' style={{textDecoration: 'none'}}>
          Loved Wines
        </NavLink>
        <NavLink to='/tastings' className={'sidebar_links'} exact={true} activeClassName='active_sidebar' style={{textDecoration: 'none'}}>
          My Wine Tastings
        </NavLink>
        <NavLink to='/tasting' className={'sidebar_links'} exact={true} activeClassName='active_sidebar' style={{textDecoration: 'none'}}>
          Create New Tasting
        </NavLink>
        <NavLink to='/friendsinthefield' className={'sidebar_links'} exact={true} activeClassName='active_sidebar' style={{textDecoration: 'none'}}>
          Friends In The Field
        </NavLink>
        <NavLink to={`/profile/${user.id}`} className={'sidebar_links'} exact={true} activeClassName='active_sidebar' style={{textDecoration: 'none'}}>
          My Profile
        </NavLink>
      </div>
    </div>
  );
};


export default Sidebar;
          
