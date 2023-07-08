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
          <h5>MY THOUGHTS  :  {tasting?.thoughts}</h5>
        </div>}
      </div>
      {showInfo && <div className="edit-delete-container">
        <NavLink to='/tasting/edit' exact={true} tasting={{tasting}} activeClassName='active' >
          <button className='edit_tasting' >Edit</button>
        </NavLink>
        <div>
          <button className='delete-button'onClick={deleteHandler}>Delete</button>
        </div>
      </div>}
    </div>
  );
};


export default TastingCard;
