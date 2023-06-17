import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTastingThunk } from '../../store/tasting';
import './tastingCard.css';



const TastingCard = ({tasting}) => {

  const dispatch = useDispatch()
  
  const [showInfo, setShowInfo] = useState(false);

  const deleteHandler = async() => {
    await dispatch(deleteTastingThunk(tasting?.id))
  };




  return (
    <div className='tasting-container'>
      <div className='tasting-info-container' onClick={() => setShowInfo(!showInfo)}>
        <div className='wine-info'>
          <h2 className='tasting-card-header'>{tasting?.vintage} {tasting?.producer}</h2>
          <h4 >{tasting?.varietal}</h4>
          {tasting?.love && <i className='fa-solid fa-heart loved-wine-heart' />}
        </div>
        <div className='extra-wine-info'>
          {showInfo && <h4>{tasting?.region}</h4>}
          {showInfo && <h4>{tasting?.vineyard}</h4>}
          {showInfo && <h4>{tasting?.other_info}</h4>}
        </div>
        <div className='tasting-info'>
          {showInfo && <h4>Sight :   {tasting?.sight}</h4>}
          {showInfo && <h4>Nose :   {tasting?.nose}</h4>}
          {showInfo && <h4>Palate :   {tasting?.palate}</h4>}
          {showInfo && <h4>My Thoughts :   {tasting?.thoughts}</h4>}
        </div>
      </div>
      <div className="edit-delete-container">
        <NavLink to='/tasting/edit' exact={true} tasting={{tasting}} activeClassName='active' >
          <button className='edit_tasting' >Edit</button>
        </NavLink>
        <div>
          {showInfo && <button className='delete-button'onClick={deleteHandler}>Delete</button>}
        </div>
      </div>
    </div>
  );
};


export default TastingCard;
