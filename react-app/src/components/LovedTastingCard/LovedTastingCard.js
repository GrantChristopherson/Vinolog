import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTastingThunk } from '../../store/tasting';
import EditTastingModal from '../EditTastingModal';
import Discussion from '../Discussion/Discussion';
import './lovedTastingCard.css';



const LovedTastingCard = ({lovedTasting}) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state?.session?.user);
  
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [showBio, setShowBio] = useState(false);


  const deleteHandler = async() => {
    await dispatch(deleteTastingThunk(lovedTasting?.id))
  };



  return (
    <div className='lovedTastingCardOuterContainer'>
      <div className='lovedTastingContainer'>
        <div className='userInfoContainer' onClick={() => setShowBio(!showBio)}>
          <h5>{lovedTasting?.user?.username}'s Wine Tasting</h5>
          {showBio && <h6>{lovedTasting?.user?.username}'s Bio: {lovedTasting?.user?.bio}</h6>}
        </div>
        <div className='lovedWineInfo' onClick={() => setShowInfo(!showInfo)}>
          <h2>{lovedTasting?.vintage} {lovedTasting?.producer}</h2>
          <h3>{lovedTasting?.varietal}</h3>
          {showInfo && <h4>{lovedTasting?.region}</h4>}
          {showInfo && <h4>{lovedTasting?.vineyard}</h4>}
          {showInfo && <h4>{lovedTasting?.other_info}</h4>}
        </div>
        <div className='lovedTastingNotesContainer'>
          {!showInfo && <h3>Tasting Notes</h3>}
          {showInfo && <h4>Sight: {lovedTasting?.sight}</h4>}
          {showInfo && <h4>Nose: {lovedTasting?.nose}</h4>}
          {showInfo && <h4>Palate: {lovedTasting?.palate}</h4>}
          {showInfo && <h4>User Thoughts: {lovedTasting?.thoughts}</h4>}
        </div>
        {user.id === lovedTasting?.user?.id && <div className="editContainer">
          <div>
            {showInfo && <button className='deleteIcon'onClick={deleteHandler}>Delete</button>}
          </div>
          <div>
            {!showModal && <EditTastingModal lovedTasting={lovedTasting} setShowModal={setShowModal}/>}
          </div>
        </div>}
      </div>
      <div className='discussionWrapper'>
        <button className='closeDiscussionButton' onClick={() => setShowDiscussion(!showDiscussion)}>Discussion</button>
        {showDiscussion && <div className='discussionOuterContainer'>
          <div className='discussionInnerContainer'>
            <Discussion lovedTasting={lovedTasting} setShowDiscussion={setShowDiscussion}/>
          </div>
        </div>}
      </div>
    </div>
  );
};


export default LovedTastingCard;
      

