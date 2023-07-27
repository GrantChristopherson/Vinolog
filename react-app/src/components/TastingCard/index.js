import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTastingThunk } from '../../store/tasting';
import Cheers from '../Cheers';
import './tastingCard.css';



const TastingCard = ({tasting}) => {

  const dispatch = useDispatch()
  const [showInfo, setShowInfo] = useState(false);

  const tastingTransformer = showInfo ? 'tasting_transformer' : '';

  const deleteHandler = async() => {
    await dispatch(deleteTastingThunk(tasting?.id))
  };




  return (
    <div className={`tasting_container ${tastingTransformer}`} >
      <div className='tasting-info-container' onClick={() => setShowInfo(!showInfo)}>
        <div className='wine-info'>
          <h3 className='tasting-card-header'>{tasting?.vintage} {tasting?.producer}</h3>
          <h4 >{tasting?.varietal}</h4>
          <div className="love_and_cheers_container">
            {tasting?.love && <i className='fa-solid fa-heart loved-wine-heart' />}
            <Cheers tasting={tasting} />
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
          <h5>MY THOUGHTS  :  {tasting?.thoughts}</h5>
        </div>}
      </div>
      {showInfo && <div className="edit-delete-container">
        <NavLink to={`/tasting/${tasting.id}/edit`} exact={true} tasting={{tasting}} activeClassName='active' >
          <button className='edit_my_tasting' >EDIT...</button>
        </NavLink>
        <div>
          <button className='delete-button'onClick={deleteHandler}>DELETE</button>
        </div>
      </div>}
    </div>
  );
};


export default TastingCard;
