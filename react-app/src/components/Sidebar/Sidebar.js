import { NavLink } from 'react-router-dom';
import './sidebar.css';





const Sidebar = ({ user, setShowModal }) => {



  return (
    <div className='outerContainer'>
      <div className='userSidebarContainer'>
        {user && <h2>Welcome back, {user.username}!</h2>}
        {/* {user && <h3 className='createTastingOnClick' onClick= {() => {setShowModal(true)}}>
          Create a new Tasting
        </h3>} */}
        <NavLink to='/tasting' className={'createTasting'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            Create New Tasting
          </NavLink>
        <div className='myFeedLinkContainer'>
          <NavLink to='/tastings' className={'myTastingsLink'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            My Tastings Notes
          </NavLink>
        </div>
        <div className='allLovedFeedLinkContainer'>
          <NavLink to='/lovedtastings' className={'lovedTastingsLink'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            Discuss in the loved wine feed
          </NavLink>
        </div>
        <div className='aboutMeContainerWrapper'>
          <div className='aboutMeContainer'>
            <h5 className='developer'>Developed by: </h5>
            <h4 className='developerName'>Grant Christopherson</h4>
            <a href={"https://github.com/GrantChristopherson"} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github gitHubicon"></i></a>
            <a className = {"userLinkedInLink"} href={"https://www.linkedin.com/in/GrantChristopherson-SF"} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin-in linkedInIcon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Sidebar;