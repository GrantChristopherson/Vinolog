import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTastingThunk } from '../../store/tasting';
import EditTastingModal from '../EditTastingForm';
import './tastingCard.css';



const TastingCard = ({tasting}) => {

  const dispatch = useDispatch()
  
  const [showInfo, setShowInfo] = useState(false);
  // const [showModal, setShowModal] = useState(false);


  const deleteHandler = async() => {

    await dispatch(deleteTastingThunk(tasting?.id))
  };


  return (
    <div className='tasting-container'>
      <div className='tasting-info-container' onClick={() => setShowInfo(!showInfo)}>
        <div className='wine-info'>
          <h2>{tasting?.vintage} {tasting?.producer}</h2>
          <h3>{tasting?.varietal}</h3>
          {showInfo && <h4>{tasting?.region}</h4>}
          {showInfo && <h4>{tasting?.vineyard}</h4>}
          {showInfo && <h4>{tasting?.other_info}</h4>}
          {tasting?.love && <h5>LOVED</h5>}
        </div>
        <div className='tasting-info'>
          {showInfo && <h4>Sight: {tasting?.sight}</h4>}
          {showInfo && <h4>Nose: {tasting?.nose}</h4>}
          {showInfo && <h4>Palate: {tasting?.palate}</h4>}
          {showInfo && <h4>My Thoughts: {tasting?.thoughts}</h4>}
        </div>
      </div>
      <div className="edit-delete-container">
        <div>
          {showInfo && <button className='delete-button'onClick={deleteHandler}>Delete</button>}
        </div>
        {/* <div>
          {!showModal && <EditTastingModal tasting={tasting} setShowModal={setShowModal}/>}
        </div> */}
        <NavLink to='/tasting/edit' className={'edit_tasting'} exact={true} tasting={tasting} activeClassName='active' style={{textDecoration: 'none'}}>
          Edit
        </NavLink>
      </div>
    </div>
  );
};


export default TastingCard;
