import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTastingThunk } from '../../store/tasting';
import Cheers from '../Cheers';
import './tastingCard.css';



const TastingCard = ({tasting}) => {

  
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(false);
  const tastingTransformer = showInfo ? 'tasting_transformer' : '';

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

  const deleteHandler = async() => {
    await dispatch(deleteTastingThunk(tasting?.id));
  };


  return (
    <div className='tasting-card-inner' onClick={() => setShowInfo(!showInfo)}>
      {tasting.labelImage ? <div className="label-image-container">
        <div className="label-image" style={{ backgroundImage: `url(${tasting.labelImage})` }}></div>
      </div>
      : <div className='default-label-container'>
          <div className="default-label-inner">
            <i className='fa-solid fa-wine-glass-empty default-label-image' />
          </div>
        </div>}
      <div className={`tasting_container ${tastingTransformer}`} >
        <div className='wine-main-info'>
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
          <div>
            {tasting?.love && <i className='fa-solid fa-heart loved-wine-icon' />}
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
        {showInfo && <div className="edit-delete-container">
          <NavLink to={`/tasting/${tasting.id}/edit`} exact={true} tasting={{tasting}} activeClassName='active' >
            <button className='edit_my_tasting' >EDIT...</button>
          </NavLink>
          <Cheers tasting={tasting} />
          <div>
            <button className='delete-button'onClick={deleteHandler}>DELETE</button>
          </div>
        </div>}
      </div>
    </div>
  );
};


export default TastingCard;
