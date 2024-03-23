import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchForm from '../SearchForm';
import './sidebar.css';


// modernize sidebar for better user experience, reduction of sidebar when not hovering

const Sidebar = () => {

  


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
      </div>
    </div>
  );
};


export default Sidebar;
          
