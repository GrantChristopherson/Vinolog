import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFriendThunk, deleteFriendThunk } from '../../store/friends';
import Cheers from '../Cheers';
import './lovedTastingCard.css';

// tasting card feeds styling and components modified to be more dynamic
// modify user seed data, add aws

const LovedTastingCard = ({tasting, showDiscussion, setShowDiscussion, tastingId, setTastingId}) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const friendList = useSelector(state => Object.values(state.fields.friends));
  const friendIdList = friendList.map(user => user.id);
  const isInFriend = friendIdList.includes(tasting.user.id);
  const [showInfo, setShowInfo] = useState(false);
  
  const tastingTransformer = showInfo ? 'tasting_transformer' : '';

  const upperCasedName = (userName) => {
    return userName.toUpperCase();
  };

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

  const discussionToggleLogic = (e) => {
    e.stopPropagation();
    if (showDiscussion) {
  
      if (tastingId === tasting.id) {
        setShowDiscussion(!showDiscussion);
      } else {
        setTastingId(tasting.id);
      };

    } else {
        setShowDiscussion(!showDiscussion);
        setTastingId(tasting.id);
    };
  };
  
  const friendHandler = async(e) => {
    e.stopPropagation();
    dispatch(createFriendThunk(user?.id, tasting?.user?.id))
  };

  const unFriendHandler = async(e) => {
    e.stopPropagation();
    dispatch(deleteFriendThunk(user.id, tasting?.user?.id))
  };




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
      <div className={`tasting_container ${tastingTransformer}`}>
        <div className='wine-main-info loved-main'>
          <h3 className='tasting-card-header'>{tasting?.vintage} {tasting?.producer}</h3>
          <h4 className='tasting-varietal'>{tasting?.varietal}</h4>
          {colorLogic() !== 'fa-regular sparkling' 
            ? <i className={`fa-circle ${colorLogic()}`}></i>
            : (
              <div>
                <i className={`fa-circle ${colorLogic()}`}></i>
                <i className={`fa-circle ${colorLogic()}`}></i>
              </div>
            )
          }
        </div>
        {showInfo && <div className='loved_wine_extra_info'>
          <h4>{tasting?.region}</h4>
          <h4>{tasting?.vineyard}</h4>
          <h4>{tasting?.other_info}</h4>
        </div>}
        {showInfo && <div className='loved_wine_extra_info'>
          <h5>SIGHT  : {tasting?.sight}</h5>
          <h5>NOSE  : {tasting?.nose}</h5>
          <h5>PALATE  : {tasting?.palate}</h5>
          <h5>{upperCasedName(tasting?.user?.username)}'S  THOUGHTS  : {tasting?.thoughts}</h5>
        </div>}
        <div className='user_info_container' >
          <span className='profile_cheers_container'>
            <div className='profile_image_container' >
              {tasting.user.profileImage ? <img className='profile_image' src={tasting.user.profileImage} alt='profile'/>
              : <i className='fa-solid fa-user default-profile-image' />}
              {tasting?.user?.username === user?.username ? <h5 className='my_header'>My Tasting</h5> :
              <h5 className='user_header'>{tasting?.user?.username}'s Tasting</h5>}
            </div>
            <div  className='cheers_wrapper'>
              <Cheers tasting={tasting} />
            </div>
          </span>
          <div className='friending_container'>
            <button className='discussion_toggle' onClick={(e) => {discussionToggleLogic(e)}}>
              {showDiscussion && tastingId === tasting.id ? "Leave the Discussion" : "Join the Discussion"}
            </button>
            <div className='friend_actions'>
              {tasting?.user?.id !== user?.id && isInFriend && 
                <>
                  <i className='current_friend'>Friend in the Field</i>
                  <i className='unfriending_button' onClick={(e) => {unFriendHandler(e)}}>- Remove {tasting?.user?.username}?</i>
                </>
              }
              {tasting?.user?.id !== user?.id && !isInFriend ? 
                <span className='friend_button' onClick={(e) => {friendHandler(e)}}>+ Add {tasting?.user?.username} to your Field</span> 
                : null 
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LovedTastingCard;
      

