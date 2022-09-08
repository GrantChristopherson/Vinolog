import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTastingThunk } from '../../store/tasting';
import EditTastingModal from '../EditTastingModal';
import Discussion from '../Discussion/Discussion';
import './lovedTastingCard.css';



const LovedTastingCard = ({tasting}) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state?.session?.user);
  
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [showBio, setShowBio] = useState(false);


  const deleteHandler = async() => {
    await dispatch(deleteTastingThunk(tasting?.id))
  };



  return (
    <div className='lovedTastingCardOuterContainer'>
      <div className='lovedTastingContainer'>
        <div className='userInfoContainer' onClick={() => setShowBio(!showBio)}>
          <h5>{tasting?.user?.username}'s Wine Tasting</h5>
          {showBio && <h6>{tasting?.user?.username}'s Bio: {tasting?.user?.bio}</h6>}
        </div>
        <div className='lovedWineInfo' onClick={() => setShowInfo(!showInfo)}>
          <h2>{tasting?.vintage} {tasting?.producer}</h2>
          <h3>{tasting?.varietal}</h3>
          {showInfo && <h4>{tasting?.region}</h4>}
          {showInfo && <h4>{tasting?.vineyard}</h4>}
          {showInfo && <h4>{tasting?.other_info}</h4>}
        </div>
        <div className='lovedTastingNotesContainer'>
          {!showInfo && <h3>Tasting Notes</h3>}
          {showInfo && <h4>Sight: {tasting?.sight}</h4>}
          {showInfo && <h4>Nose: {tasting?.nose}</h4>}
          {showInfo && <h4>Palate: {tasting?.palate}</h4>}
          {showInfo && <h4>User Thoughts: {tasting?.thoughts}</h4>}
        </div>
        {user.id === tasting?.user?.id && <div className="editContainer">
          <div>
            {showInfo && <button className='deleteIcon'onClick={deleteHandler}>Delete</button>}
          </div>
          <div>
            {!showModal && <EditTastingModal tasting={tasting} setShowModal={setShowModal}/>}
          </div>
        </div>}
      </div>
      <div className='discussionWrapper'>
        <button className='closeDiscussionButton' onClick={() => setShowDiscussion(!showDiscussion)}>Discussion</button>
        {showDiscussion && <div className='discussionOuterContainer'>
          <div className='discussionInnerContainer'>
            <Discussion tasting={tasting} setShowDiscussion={setShowDiscussion}/>
          </div>
        </div>}
      </div>
    </div>
  );
};


export default LovedTastingCard;
      

