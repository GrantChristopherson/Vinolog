import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TastingForm from '../auth/TastingForm';
import './home.css'



const Home = () => {

  const user = useSelector(state => state?.session?.user)

  const [showTastingForm, setShowTastingForm] = useState(false);
  
  
  return (
    <div>
      <div className='createTastingNavContainer'>
        {user && <h3 classname='createTastingOnClick' onclick= {async(e) => {
          e.preventDefault();
          setShowTastingForm(!showTastingForm)
        }} >
          Create a new tasting
          </h3>}
          {/* <h3 className='allMyTastingCards'>
            My Tasting Notes
          </h3> */}
      </div>
      <TastingForm/>
    </div>
  );
};


export default Home;





