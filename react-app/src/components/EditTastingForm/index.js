import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { editTastingThunk } from '../../store/tasting';
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import './editTastingForm.css';




function EditTastingForm() {

  
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const tasting = useSelector(state => state.tasting.tastings[id]);
  

  const getVintage = () => {
    const year = new Date().getFullYear();
    return ['NV', ...Array.from({length: year - 1899}, (_, i) => String(year - i))];
  };
  

  const options = [
    { value: 'Red', label: 'Red' },
    { value: 'White', label: 'White' },
    { value: 'Rose', label: 'Rosé' },
    { value: 'Sparkling', label: 'Sparkling' },
    { value: 'Orange', label: 'Orange' },
    { value: 'Dessert', label: 'Dessert' },
    { value: 'Other', label: 'Other' }
  ];
  
  
  const [errors, setErrors] = useState({});
  const [producer, setProducer] = useState(tasting?.producer || '');
  const [region, setRegion] = useState(tasting?.region || '');
  const [vineyard, setVineyard] = useState(tasting?.vineyard || '');
  const [varietal, setVarietal] = useState(tasting?.varietal || '');
  const [vintage, setVintage] = useState(tasting?.vintage || '');
  const [color, setColor] = useState(tasting?.color || '');
  const [labelImage, setLabelImage] = useState(tasting?.labelImage || '');
  const [otherInfo, setOtherInfo] = useState(tasting?.other_info || '');
  const [sight, setSight] = useState(tasting?.sight || '');
  const [nose, setNose] = useState(tasting?.nose || '');
  const [palate, setPalate] = useState(tasting?.palate || '');
  const [thoughts, setThoughts] = useState(tasting?.thoughts || '');
  const [love, setLove] = useState(tasting?.love || '');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validateErrors = {};
    if (producer.length < 3 || producer.length > 50) {
      validateErrors['producer'] = '* Producer must be between 3 and 50 characters';
    };

    if (region.length < 3 || region.length > 100) {
      validateErrors['region'] = '* Region must be between 3 and 100 characters';
    };

    if (vineyard) {
      if (vineyard.length < 3 || region.length > 50) {
        validateErrors['vineyard'] = '* Vineyard either can be null or between 3 and 50 characters';
      };
    };

    if (varietal.length < 3 || varietal.length > 100) {
      validateErrors['varietal'] = '* Varietal / type must be between 3 and 100 characters';
    };

    // const today = new Date(); 
    // if (vintage !== '' || vintage !== 'NV' && vintage < 1900 || vintage > today.getFullYear()) {
    //   validateErrors['vintage'] = `* Vintage must be between 1900 and this year (${today.getFullYear()}), or NV`;
    // };

    if (color === '') {
      validateErrors['colors'] = '* Color of wine is required, please select an appropriate color';
    };

    if (labelImage !== '' && !/^https?:\/\/.*/.test(labelImage)) {
      validateErrors['labelImage'] = '* Label image must be a valid URL';
    };
    
    if (otherInfo) {
      if (otherInfo.length < 3 || otherInfo.length > 200) {
        validateErrors['otherInfo'] = '* Additional information either can be null or between 3 and 200 characters';
      };
    };
    
    if (sight.length < 3 || sight.length > 200) {
      validateErrors['sight'] = '* Sight must be between 3 and 200 characters';
    };

    if (nose.length < 3 || nose.length > 200) {
      validateErrors['nose'] = '* Nose must be between 3 and 200 characters';
    };

    if (palate.length < 3 || palate.length > 200) {
      validateErrors['palate'] = '* Palate must be between 3 and 200 characters';
    };

    if (thoughts) {
      if (thoughts.length < 3 || thoughts.length > 200) {
        validateErrors['thoughts'] = '* Thoughts either can be null or between 3 and 200 characters';
      };
    };

    if ((producer.length && producer.trim().length === 0) ||
        (region.length && region.trim().length === 0) ||
        (vineyard.length && vineyard.trim().length === 0) ||
        (varietal.length && varietal.trim().length === 0) ||
        (color.length && color.trim().length === 0) ||
        (labelImage.length && labelImage.trim().length === 0) ||
        (otherInfo.length && otherInfo.trim().length === 0) ||
        (sight.length && sight.trim().length === 0) ||
        (nose.length && nose.trim().length === 0) ||
        (palate.length && palate.trim().length === 0) ||
        (thoughts.length && thoughts.trim().length === 0)) {
          validateErrors['spacing'] = '* Spacebar exclusive input is not valid for any field';
        };

    

    setErrors(validateErrors)
    if (Object.keys(validateErrors).length) {
      return;
    }

    const taste = {
      id: tasting.id,
      producer,
      region,
      vineyard,
      varietal,
      vintage,
      color,
      labelImage,
      other_info: otherInfo,
      sight,
      nose,
      palate,
      thoughts,
      love,
    };
    
    dispatch(editTastingThunk(taste));
    history.push('/tastings');
  };
    
   
  const updateProducer = (e) => {
    setProducer(e.target.value);
  };
  
  const updateRegion = (e) => {
    setRegion(e.target.value);
  };
  
  const updateVineyard = (e) => {
    setVineyard(e.target.value);
  };
  
  const updateVarietal = (e) => {
    setVarietal(e.target.value);
  };
  
  const updateVintage = (e) => {
    setVintage(e.target.value);
  };
  
  const updateColor = (e) => {
    setColor(e.target.value);
  };
  
  const updateLabelImage = (e) => {
    setLabelImage(e.target.value);
  };
  
  const updateOtherInfo = (e) => {
    setOtherInfo(e.target.value);
  };
  
  const updateSight = (e) => {
    setSight(e.target.value);
  };
  
  const updateNose = (e) => {
    setNose(e.target.value);
  };
  
  const updatePalate = (e) => {
    setPalate(e.target.value);
  };
  
  const updateThoughts = (e) => {
    setThoughts(e.target.value);
  };
  
  const updateLove = (e) => {
  setLove(e.target.checked);
  };
  
  
  
  
  return (
    <>
      <Navigation />
      <div className='sidebar_body_container'>
        <Sidebar />
        <form className='edit_tasting_form' onSubmit={handleSubmit}>
          <h2 className='update_header'>Update Tasting Notes</h2>
          <div className='edit_tasting_input_container'>
            {errors?.spacing !== undefined && <div className='error'>
              <div className='errors'>{errors.spacing}</div>
            </div>
            }
            {errors?.producer !== undefined && <div className='error'>
              <div className='errors'>{errors.producer}</div>
            </div>
            } 
            <input className='info_input'
            type='text'
            name='producer'
            onChange={updateProducer}
            placeholder='Producer'
            value={producer}
            ></input>
          </div>
          <div className='edit_tasting_input_container'>
            {errors?.region !== undefined && <div className='error'>
              <div className='errors'>{errors.region}</div>
            </div>
            }
            <input className='info_input'
            type='text'
            name='region'
            onChange={updateRegion}
            placeholder='Region'
            value={region}
            ></input>
          </div>
          <div className='edit_tasting_input_container'>
            {errors?.vineyard !== undefined && <div className='error'>
              <div className='errors'>{errors.vineyard}</div>
            </div>
            }
            <input className='info_input'
            type='text'
            name='vineyard'
            onChange={updateVineyard}
            placeholder='Vineyard'
            value={vineyard}
            ></input> 
          </div>
          <div className='edit_tasting_input_container'>
            {errors?.varietal !== undefined && <div className='error'>
              <div className='errors'>{errors.varietal}</div>
            </div>
            }
            <input className='info_input'
            type='text'
            name='varietal'
            onChange={updateVarietal}
            placeholder='Varietal / Type'
            value={varietal}
            ></input> 
          </div>
          <div className='edit_tasting_input_container'>
            {errors?.vintage !== undefined && <div className='error'>
              <div className='errors'>{errors.vintage}</div>
            </div>
            } 
            {/* <input className='selection_info_input'
            type='number'
            name='vintage'
            onChange={updateVintage}
            placeholder='Vintage'
            min='1900'
            max={currentYear}
            value={vintage}
            ></input> */}
            <select className='selection_info_input' onChange={updateVintage} value={vintage || ''}>
              <option value="" disabled>Select a Vintage...</option>
              {getVintage().map(option =>
                <option key={option} value={option}>{option}</option>
                )}
            </select>
          </div>
          <div className='edit_tasting_input_container'>
              {errors?.colors !== undefined && <div className='error'>
                <div className='errors'>{errors.colors}</div>
              </div>
              }
            <select className='selection_info_input' onChange={updateColor} value={color || ''}>
              <option value="" disabled>Select the Style of Wine...</option>
              {options.map(option =>
                <option key={option.value}>{option.value}</option>
                )}
            </select>
          </div>
          <div className='edit_tasting_input_container'>
            {errors?.labelImage !== undefined && <div className='error'>
              <div className='errors'>{errors.labelImage}</div>
            </div>
            }
            <input className='info_input'
            type='text'
            name='labelImage'
            onChange={updateLabelImage}
            placeholder='URL of Wine Label Image'
            value={labelImage}
            ></input> 
          </div>
          <div className='edit_tasting_input_container'>
            {errors?.otherInfo !== undefined && <div className='error'>
              <div className='errors'>{errors.otherInfo}</div>
            </div>
            }
            <input className='info_input'
            type='text'
            name='otherInfo'
            onChange={updateOtherInfo}
            placeholder='Additional Information...'
            value={otherInfo}
            ></input> 
          </div>
          <div className='edit_tasting_input_container'>
            {errors?.sight !== undefined && <div className='error'>
              <div className='errors'>{errors.sight}</div>
            </div>
            }
            <input className='info_input'
            type='text'
            name='sight'
            onChange={updateSight}
            placeholder='Sight'
            value={sight}
            ></input> 
          </div>
          <div className='edit_tasting_input_container'>
            {errors?.nose !== undefined && <div className='error'>
              <div className='errors'>{errors.nose}</div>
            </div>
            }
            <input className='info_input'
            type='text'
            name='nose'
            onChange={updateNose}
            placeholder='Nose'
            value={nose}
            ></input> 
          </div>
          <div className='edit_tasting_input_container'>
            {errors?.palate !== undefined && <div className='error'>
              <div className='errors'>{errors.palate}</div>
            </div>
            }
            <input className='info_input'
            type='text'
            name='palate'
            onChange={updatePalate}
            placeholder='Palate'
            value={palate}
            ></input> 
          </div>
          <div className='edit_tasting_input_container'>
            {errors?.thoughts !== undefined && <div className='error'>
              <div className='errors'>{errors.thoughts}</div>
            </div>
            }
            <input className='info_input'
            type='text'
            name='thoughts'
            onChange={updateThoughts}
            placeholder='Additional thoughts...'
            value={thoughts}
            ></input> 
          </div>
          <div className='edit_love_container'>
            <label className='edit_love_label'>Love the wine?</label>
            <input className='edit_love_input'
              type="checkbox"
              name='love'
              checked={love}
              onChange={updateLove}
            />
          </div>
          <div className='edit_submit_close_container'>
            <button className='update_tasting_button' type='submitEditWine'>Update</button>
            <NavLink to='/tastings' exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
            <h4 className='close_edit_wine' >Cancel</h4>
            </NavLink>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};



export default EditTastingForm;





