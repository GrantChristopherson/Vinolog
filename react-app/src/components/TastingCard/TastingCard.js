import React, { useEffect, useState} from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { getMyTastingsThunk } from '../../store/tasting';
import './tastingCard.css'



const TastingCard = ({tasting}) => {

  // const dispatch = useDispatch()
  // const user = useSelector(state => state?.session?.user)


  // I believe this is unneeded
  // useEffect(()=>{
  //   dispatch(getMyTastingsThunk())
  // },[dispatch]);

  return (
    <div className='tastingCardOuterContainer'>
      <div className='tastingContainer'>
      <h2>Tasting Card</h2>
        <div className='wineInfo'>
          <h3>{tasting?.producer}</h3>
          <h4>{tasting?.vintage}</h4>
          <h4>{tasting?.varietal}</h4>
        </div>
        <div className='tastingNotesContainer'>
          <h3>Tasting Notes</h3>
        </div>
      </div>
    </div>
  );
};


export default TastingCard;