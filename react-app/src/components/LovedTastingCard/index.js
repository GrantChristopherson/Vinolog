import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTastingThunk } from '../../store/tasting';
import { createFriendThunk } from '../../store/friends';
import Discussion from '../Discussion/Discussion';
import CreateCommentForm from '../Discussion/CreateCommentForm';
import './lovedTastingCard.css';



const LovedTastingCard = ({tasting}) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [isFriend, setIsFriend] = useState(false)


  const friendHandler = async(e) => {
    e.preventDefault();
    dispatch(createFriendThunk(user?.id, tasting?.user?.id))
  };

  const deleteHandler = async() => {
    dispatch(deleteTastingThunk(tasting?.id))
  };



  return (
    <div className='loved_tasting_card'>
      <div className='loved_tasting_info'>
        <div className='user_info_container' onClick={() => setShowBio(!showBio)}>
          {tasting?.user?.username === user?.username ? <h5 className='my_header'>My tasting</h5> :
          <h5 className='user_header'>{tasting?.user?.username}'s tasting</h5>}
          {showBio && <h6 className='bio_subtitle'>{tasting?.user?.bio}</h6>}
          {tasting?.user?.id !== user?.id  && !isFriend ? <h6 className='friend_button' onClick={friendHandler}>Add Friend</h6> : <></> }
          {isFriend && tasting?.user?.id !== user?.id ? <h6 className='current_friend'>current friend</h6> : <></>}
        </div>
        <div className='loved_info_container' onClick={() => setShowInfo(!showInfo)}>
          <div className='loved_wine_info'>
            <h2>{tasting?.vintage} {tasting?.producer}</h2>
            <h3>{tasting?.varietal}</h3>
          </div>
          <div className='loved_wine_extra_info'>
            {showInfo && <h4>{tasting?.region}</h4>}
            {showInfo && <h4>{tasting?.vineyard}</h4>}
            {showInfo && <h4>{tasting?.other_info}</h4>}
          </div>
          <div className='loved_tasting_notes_container'>
            {showInfo && <h4>Sight: {tasting?.sight}</h4>}
            {showInfo && <h4>Nose: {tasting?.nose}</h4>}
            {showInfo && <h4>Palate: {tasting?.palate}</h4>}
            {showInfo && <h4>{tasting?.user?.username}'s  Thoughts: {tasting?.thoughts}</h4>}
          </div>
        </div>
      </div> 
      <div className='loved_user_input_container'>
        <div className='discussion_wrapper'>
          <button className='discussion_toggle' onClick={() => setShowDiscussion(!showDiscussion)}>Discussion</button> 
          {showDiscussion &&<CreateCommentForm tasting={tasting}/>}
            {showDiscussion && <div className='discussion_outer_container'>
              <div className='discussion_inner_container'>
                <Discussion tasting={tasting} setShowDiscussion={setShowDiscussion}/>
              </div>
            </div>}
        </div>
        {user.id === tasting?.user?.id && <div className="edit_container">
          {showInfo && <button className='delete-button'onClick={deleteHandler}>Delete</button>}
          <NavLink to='/tasting/edit' className={'edit_tasting'} exact={true} tasting={{tasting}} activeClassName='active' style={{textDecoration: 'none'}}>
            Edit
          </NavLink>
        </div>}
      </div>
    </div>
  );
};


export default LovedTastingCard;
      

