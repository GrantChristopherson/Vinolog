import React, { useEffect, useState} from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { getMyTastingsThunk } from '../../store/tasting';
import './tastingCard.css'



const TastingCard = ({tasting}) => {

  // const dispatch = useDispatch()
  // const user = useSelector(state => state?.session?.user)
  const [showInfo, setShowInfo] = useState(false);


  // I believe this is unneeded
  // useEffect(()=>{
  //   dispatch(getMyTastingsThunk())
  // },[dispatch]);

  return (
    <div className='tastingCardOuterContainer'>
      <div className='tastingContainer' onClick={() => setShowInfo(!showInfo)}>
        <div className='wineInfo'>
          <h2>{tasting?.vintage} {tasting?.producer}</h2>
          <h3>{tasting?.varietal}</h3>
          {showInfo && <h4>{tasting?.region}</h4>}
          {showInfo && <h4>{tasting?.vineyard}</h4>}
          {showInfo && <h4>{tasting?.other_info}</h4>}
          {tasting?.love && <h5>LOVED WINE</h5>}
        </div>
        <div className='tastingNotesContainer'>
          <h3>Tasting Notes</h3>
          {showInfo && <h4>Sight: {tasting?.sight}</h4>}
          {showInfo && <h4>Nose: {tasting?.nose}</h4>}
          {showInfo && <h4>Palate: {tasting?.palate}</h4>}
          {showInfo && <h4>My Thoughts: {tasting?.thoughts}</h4>}
        </div>
          <div>
            
          </div>
      </div>
    </div>
  );
};


export default TastingCard;