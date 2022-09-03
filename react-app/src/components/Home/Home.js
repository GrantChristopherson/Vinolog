import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TastingForm from '../TastingForm/TastingForm';
// import TastingCard from '../TastingCard/TastingCard';
import './home.css'



const Home = () => {

  const user = useSelector(state => state?.session?.user)

  const [showTastingForm, setShowTastingForm] = useState(false);
  
  
  return (
    <div className='homeContainer'>
      <div className='userContainer'>
        <div className='userSidebarContainer'>
          {user && <h2>{user.username}</h2>}
          {user && <h3>Bio: {user.bio}</h3>}
          {user && <h3 className='createTastingOnClick' onClick= {async(e) => {
            e.preventDefault()
            setShowTastingForm(!showTastingForm)
          }} >
            Create a new Tasting
            </h3>}
            <div className='myFeedLinkContainer'>
              <NavLink to='/tastings' className={'myTastingsLink'} exact={true} activeClassName='active'>
                My Tastings Notes
              </NavLink>
            </div>
            {user && <h3 className='allLovedTastingCards'>
              Wines others love 
            </h3>}
        </div>
        <TastingForm/>
      </div>
      <div className='usersTastingFeedContainer'>
          {/* feed of user cards here (grid) */}
      </div>
      <div className='lovedTastingFeedContainer'>
        {/* feed of user cards here (grid) */}
      </div>
    </div>
  );
};


export default Home;





