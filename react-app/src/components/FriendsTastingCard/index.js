import React, { useState } from "react";
import './friendsTastingCard.css';




const FriendsTastingCard = ({ tasting }) => {

  const [showInfo, setShowInfo] = useState(false);

  const friend = tasting.user
  const upperCaser = (friend) => {
    return friend.toUpperCase();
  };

  console.log(friend)

  return (
    <div className="friend_tasting_outer">
      <div className='tasting-info-container' onClick={() => setShowInfo(!showInfo)}>
        <div className='wine-info'>
          <h3 className='tasting-card-header'>{tasting?.vintage} {tasting?.producer}</h3>
          <h4 >{tasting?.varietal}</h4>
          {tasting?.love && <i className='fa-solid fa-heart loved-wine-heart' />}
        </div>
        {showInfo && <div className='extra-wine-info'>
          <h4>{tasting?.region}</h4>
          <h4>{tasting?.vineyard}</h4>
          <h4>{tasting?.other_info}</h4>
        </div>}
        {showInfo && <div className='tasting-info'>
          <h5>SIGHT  :   {tasting?.sight}</h5>
          <h5>NOSE  :   {tasting?.nose}</h5>
          <h5>PALATE  :   {tasting?.palate}</h5>
          <h5>{upperCaser(friend.username)}'S THOUGHTS  :  {tasting?.thoughts}</h5>
        </div>}
      </div>
    </div>
  );
};


export default FriendsTastingCard;