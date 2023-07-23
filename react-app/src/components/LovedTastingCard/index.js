import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFriendThunk } from '../../store/friends';
import Cheers from '../Cheers';
import './lovedTastingCard.css';

// tasting card feeds styling and components modified to be more dynamic, tiled and with images
// modify user seed data to include images and ability to add images url, aws later

const LovedTastingCard = ({tasting, showDiscussion, setShowDiscussion, setTastingId}) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const friendList = useSelector(state => Object.values(state.fields.friends));
  const [showInfo, setShowInfo] = useState(false);
  
  let friendIdList = friendList.map(user => user.id);
  let isInFriend = friendIdList.includes(tasting.user.id);
  
  const upperCasedName = (userName) => {
    return userName.toUpperCase();
  };
  

  const friendHandler = async(e) => {
    e.preventDefault();
    dispatch(createFriendThunk(user?.id, tasting?.user?.id))
  };


  // const unFriendHandler = async(e) => {
  //   e.preventDefault();
  //   dispatch(deleteFriendThunk(user.id, tasting?.user?.id))
  // };



  return (
    <>
      <div className='loved_tasting_card'>
        <div className='loved_tasting_info' onClick={() => setShowInfo(!showInfo)}>
          <div className='user_info_container' >
            <div className='profile_cheers_container'>
              <div className='profile_image_container' >
                {tasting.user.profileImage ? <img className='profile_image' src={tasting.user.profileImage} alt='profile'/>
                : <i className='fa-solid fa-user default-profile-image' />}
                {tasting?.user?.username === user?.username ? <h5 className='my_header'>My Tasting</h5> :
                <h5 className='user_header'>{tasting?.user?.username}'s Tasting</h5>}
              </div>
            </div>
            <div className='friending_container'>
              {tasting?.user?.id !== user?.id  && !isInFriend ? <h6 className='friend_button' onClick={friendHandler}>+</h6> : <></> }
              {isInFriend && tasting?.user?.id !== user?.id ? <h6 className='current_friend'>Friend In Your Field</h6> : <></>}
              <Cheers tasting={tasting} />
            </div>
          </div>
          <div className='loved_info_container'>
            <div className='loved_wine_info'>
              <h3 className='loved_tasting_header'>{tasting?.vintage} {tasting?.producer}</h3>
              <h4>{tasting?.varietal}</h4>
            </div>
            {showInfo && <div className='loved_wine_extra_info'>
              <h4>{tasting?.region}</h4>
              <h4>{tasting?.vineyard}</h4>
              <h4>{tasting?.other_info}</h4>
            </div>}
            {showInfo && <div className='loved_tasting_notes_container'>
              <h5>SIGHT  : {tasting?.sight}</h5>
              <h5>NOSE  : {tasting?.nose}</h5>
              <h5>PALATE  : {tasting?.palate}</h5>
              <h5>{upperCasedName(tasting?.user?.username)}'S  THOUGHTS  : {tasting?.thoughts}</h5>
            </div>}
          </div>
        </div> 
      </div>
      <div className='loved_user_input_container'>
        <button className='discussion_toggle' onClick={() => {
          setShowDiscussion(!showDiscussion)
          setTastingId(tasting.id)
          }}>Discussion</button> 
      </div>
    </>
  );
};


export default LovedTastingCard;
      

