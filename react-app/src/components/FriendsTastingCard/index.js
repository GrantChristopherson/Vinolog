import React, { useState } from "react";
import Cheers from '../Cheers';
import './friendsTastingCard.css';




const FriendsTastingCard = ({ tasting }) => {

  const [showInfo, setShowInfo] = useState(false);

  const tastingTransformer = showInfo ? 'friend_transformer' : '';
  const userTransformer = showInfo ? 'friend_loved_transformer' : '';

  const colorClassMap = {
    'Red': 'fa-solid red',
    'White': 'fa-solid white',
    'Rose': 'fa-solid rose',
    'Sparkling': 'fa-regular sparkling',
    'Orange': 'fa-solid orange',
    'Dessert': 'fa-solid dessert',
    'Other': 'fa-solid other'
  };
  
  const colorLogic = () => {
    return colorClassMap[tasting.color] || 'fa-solid other';
  };



  
  const friend = tasting.user;
  const upperCaser = (friend => friend.toUpperCase());

  
  // maybe something different?


  return (
    <div className='tasting-card-inner' onClick={() => setShowInfo(!showInfo)}>
      {tasting.labelImage ? <div className="label-image-container">
        <div className="label-image" style={{ backgroundImage: `url(${tasting.labelImage})` }}></div>
      </div>
      : <div className='default-label-container' >
          <div className="default-label-inner">
            <i className='fa-solid fa-wine-glass-empty default-label-image' />
          </div>
        </div>}
      <div className={`tasting_container friends_tasting ${tastingTransformer}`}>
        <div className='wine-main-info friend-main'>
          <h3 className='tasting-card-header'>{tasting?.vintage} {tasting?.producer}</h3>
          <h4 className='tasting-varietal'>{tasting?.varietal}</h4>
          <div className="love_and_color_container">
            {colorLogic() !== 'fa-regular sparkling' 
              ? <i className={`fa-circle ${colorLogic()}`}></i>
              : (
                <div>
                  <i className={`fa-circle ${colorLogic()}`}></i>
                  <i className={`fa-circle ${colorLogic()}`}></i>
                </div>
              )
            }
            {tasting?.love && <i className='fa-solid fa-heart loved-wine-icon' />}
          </div>
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
      <div className={`user_info_container ${userTransformer}`} >
          <span className='profile_cheers_container'>
            <div className='profile_image_container' >
              {tasting.user.profileImage ? <img className='profile_image' src={tasting.user.profileImage} alt='profile'/>
              : <i className='fa-solid fa-user default-profile-image' />}
              <h5 className='user_header'>{tasting?.user?.username}'s Tasting</h5>
            </div>
            <div  className='cheers_wrapper'>
              <Cheers tasting={tasting} />
            </div>
          </span>
        </div>
    </div>
  );
};


export default FriendsTastingCard;