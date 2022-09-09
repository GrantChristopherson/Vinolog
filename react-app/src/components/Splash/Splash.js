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
        <h3 className='personalJesus'>The Personal Wine Journal...</h3>
      </div>
      {/* <div className='splashQuote'>
        <h2>"Wine is a passport to the World."</h2>
        <h5>- Thom Elkjer</h5>
      </div>
      <div className='documentTheJourney'>
        <h3>Document the journey</h3>
      </div> */}
    </div>
  );
};


export default Splash;