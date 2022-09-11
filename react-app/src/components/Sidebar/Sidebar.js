import { NavLink } from 'react-router-dom';
import './sidebar.css';





const Sidebar = ({ user }) => {



  return (
    <div className='userSidebarContainer'>
      {user && <h5 className='welcome' >Welcome back, {user.username}!</h5>}
        <div className='createbarWrapper'>
          <NavLink to='/tasting' className={'createbarNav'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            Create New Tasting
          </NavLink>
        </div>
        <div className='myFeedLinkContainer'>
          <NavLink to='/tastings' className={'mytastebarNav'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            My Tasting Notes
          </NavLink>
        </div>
        <div className='allLovedFeedLinkContainer'>
          <NavLink to='/lovedtastings' className={'lovedbarNav'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            The Loved Wine Feed
          </NavLink>
        </div>
        <div className='aboutMeContainer'>
          <h5 className='developer'>Developed by: </h5>
          <h4 className='developerName'>Grant Christopherson</h4>
        </div>
        <div className='mylinksContainer'>
          <a href={"https://github.com/GrantChristopherson"} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github gitHubicon"></i></a>
          <a className = {"userLinkedInLink"} href={"https://www.linkedin.com/in/GrantChristopherson-SF"} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-linkedin-in linkedInIcon"></i>
          </a>
        </div>
    </div>
  );
};


export default Sidebar;
          
