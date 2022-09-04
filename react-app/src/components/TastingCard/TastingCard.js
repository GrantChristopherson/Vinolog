import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { deleteTastingThunk } from '../../store/tasting';
import EditTastingModal from '../EditTastingModal';
import './tastingCard.css'



const TastingCard = ({tasting}) => {

  const dispatch = useDispatch()
  
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const deleteHandler = async() => {

    await dispatch(deleteTastingThunk(tasting?.id))
  };


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
        <div className="editContainer">
          <div>
            {showInfo && <button className='deleteIcon'onClick={deleteHandler}>Delete</button>}
          </div>
          <div>
            {!showModal && <EditTastingModal tasting={tasting} setShowModal={setShowModal}/>}
          </div>
        </div>
      </div>
    </div>
  );
};


export default TastingCard;
