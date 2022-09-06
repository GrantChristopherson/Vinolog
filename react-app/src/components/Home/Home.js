import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TastingForm from '../TastingForm/TastingForm';
import { Modal } from '../../context/Modal';
import './home.css'



const Home = () => {

  const user = useSelector(state => state?.session?.user)

  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className='homeContainer'>
      <div className='userContainer'>
        <div className='userSidebarContainer'>
          {user && <h2>Welcome back, {user.username}!</h2>}
          {user && <h3>Bio: {user.bio} change to 'update bio' click</h3>}
          {user && <h3 className='createTastingOnClick' onClick= {() => {setShowModal(true)}}>
            Create a new Tasting
          </h3>}
          <div className='myFeedLinkContainer'>
            <NavLink to='/tastings' className={'myTastingsLink'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
              My Tastings Notes
            </NavLink>
          </div>
          <div className='allLovedFeedLinkContainer'>
            <h3> Be Social...</h3>
            <NavLink to='/lovedtastings' className={'lovedTastingsLink'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
              Check out the loved wine feed
            </NavLink>
          </div>
          <div className='aboutMeContainer'>
            <h4 className='developer'>Developed by: </h4>
            <h3 className='developerName'>Grant Christopherson</h3>
            <a href={"https://github.com/GrantChristopherson"} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github gitHubicon"></i></a>
            <a className = {"userLinkedInLink"} href={"https://www.linkedin.com/in/GrantChristopherson-SF"} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin-in linkedInIcon"></i>
            </a>
          </div>
        </div>
        {showModal && (
        <Modal className={"createPostModal"} onClose={() => setShowModal(false)}>
          <TastingForm setShowModal={setShowModal} />
        </Modal>
        )}
      </div>
      <div className='usersTastingFeedContainer'>
          {/* feed of user cards here (grid) */}
      </div>
    </div>
  );
};


export default Home;







