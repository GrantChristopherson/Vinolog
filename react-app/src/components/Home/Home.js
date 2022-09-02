import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import TastingForm from '../auth/TastingForm';
import './home.css'



const Home = () => {

  const user = useSelector(state => state?.session?.user)

  const [showTastingForm, setShowTastingForm] = useState(false);
  
  
  return (
    <div>
      <div className='createTastingNavContainer'>
        {user && <h2>{user.username}</h2>}
        {user && <h3>Bio: {user.bio}</h3>}
        {user && <h3 className='createTastingOnClick' onClick= {async(e) => {
          e.preventDefault()
          setShowTastingForm(!showTastingForm)
        }} >
          Create a new Tasting
          </h3>}
          {user && <h3 className='allMyTastingCards'>
            My Tastings
          </h3>}
          {user && <h3 className='allMyTastingCards'>
            Wines others love 
          </h3>}
      </div>
      <TastingForm/>
    </div>
  );
};


export default Home;





