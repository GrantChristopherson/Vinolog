import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './splash.css'



const Splash = () => {

  const history = useHistory();
  const user = useSelector(state => state?.session?.user);
  if(user){
      history.push('/home')
  };

  return (
    <div className='splashOuterContainer'>
      <div className='slogan'>
        <h1>Welcome to Vinolog!</h1>
        <h3>Your Personal Wine Journal...</h3>
      </div>
    </div>
  );
};


export default Splash;