import { NavLink } from 'react-router-dom';
import './sidebar.css';





const Sidebar = ({ user }) => {



  return (
    <div className='userSidebarContainer'>
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
        <div className='nameAndLinksContainer'>
          <h4 className='developerName'>Grant Christopherson</h4>
          <a className = {"userLinkedInLink"} href={"https://www.linkedin.com/in/GrantChristopherson-SF"} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-linkedin-in linkedInIcon"></i></a>
          <a className = {"userGithubLink"} href={"https://github.com/GrantChristopherson"} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github gitHubicon"></i></a>
        </div>
      </div>
    </div>
  );
};


export default Sidebar;
          
