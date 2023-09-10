import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { editTastingThunk } from '../../store/tasting';
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import './editTastingForm.css';


// implement aws here

function EditTastingForm() {

  
  const dispatch = useDispatch();
  const history = useHistory();
  const fileInputRef = useRef(null);
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

  const initialState = {
    id: tasting.id,
    producer: tasting?.producer || '',
    region: tasting?.region || '',
    vineyard: tasting?.vineyard || '',
    varietal: tasting?.varietal || '',
    vintage: tasting?.vintage || '',
    color: tasting?.color || '',
    labelImage: tasting?.labelImage || '',
    otherInfo: tasting?.otherInfo || '',
    sight: tasting?.sight || '',
    nose: tasting?.nose || '',
    palate: tasting?.palate || '',
    thoughts: tasting?.thoughts || '',
    love: tasting?.love || ''
  };
  
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateInput = () => {
    let validateErrors = {};

    const file = fileInputRef.current?.files[0];
  
    const fieldValidations = {
      producer: { min: 3, max: 50, required: true },
      region: { min: 3, max: 100, required: true },
      vineyard: { min: 3, max: 50, required: false },
      varietal: { min: 3, max: 100, required: true },
      color: { min: 1, max: 30, required: true },
      labelImage: { required: false },
      otherInfo: { min: 3, max: 200, required: false },
      sight: { min: 3, max: 200, required: true },
      nose: { min: 3, max: 200, required: true },
      palate: { min: 3, max: 200, required: true },
      thoughts: { min: 3, max: 200, required: false },
    };

    if (file) {
      // 1. Validating File Size (For example, limit to 4MB)
      if (file.size > 4 * 1024 * 1024) {
        validateErrors.labelImage = '* The image file is too large (max 2MB)';
      };
    
      // 2. Validating File Type
      const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      if (!acceptedImageTypes.includes(file.type)) {
        validateErrors.labelImage = '* The image file format is not supported';
      };
    };
  
    for (const field in fieldValidations) {
      const value = formData[field];
      const { min, max, required } = fieldValidations[field];
  
      if (required && !value) {
        validateErrors[field] = `* ${field} is required`;
        continue;
      };
      
      if (value) {
        if (value && value.trim().length === 0) {
          validateErrors['spacing'] = '* Spacebar exclusive input is not valid for any field';
          break;
        };
    
        if (value && (value.length < min || value.length > max)) {
          validateErrors[field] = `* ${field} must be between ${min} and ${max} characters`;
        };
      };
    };
  
    setErrors(validateErrors);
    return !Object.keys(validateErrors).length;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    };

    if (isSubmitting) {
      return;
    } else {
      setIsSubmitting(!isSubmitting)
      
      dispatch(editTastingThunk(formData));
      history.push('/tastings');
    };
  };
    
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: checked }));
  };
  
  
  
  
  return (
    <>
      <Navigation />
      <div className='sidebar_body_container'>
        <Sidebar />
        <div className="form_page">
          <form className='create_form' onSubmit={handleSubmit}>
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
              onChange={handleInputChange}
              placeholder='Producer'
              value={formData.producer}
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
              onChange={handleInputChange}
              placeholder='Region'
              value={formData.region}
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
              onChange={handleInputChange}
              placeholder='Vineyard'
              value={formData.vineyard}
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
              onChange={handleInputChange}
              placeholder='Varietal / Type'
              value={formData.varietal}
              ></input> 
            </div>
            <div className='edit_tasting_input_container'>
              {errors?.vintage !== undefined && <div className='error'>
                <div className='errors'>{errors.vintage}</div>
              </div>
              } 
              <select className='selection_info_input' name='vintage' onChange={handleInputChange} value={formData.vintage || ''}>
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
              <select className='selection_info_input' name='color' onChange={handleInputChange} value={formData.color || ''}>
                <option value="" disabled>Select the Style of Wine...</option>
                {options.map(option =>
                  <option key={option.value} value={option.value}>{option.value}</option>
                  )}
              </select>
            </div>
            <div className='edit_tasting_input_container'>
              {errors?.labelImage !== undefined && <div className='error'>
                <div className='errors'>{errors.labelImage}</div>
              </div>
              }
              <input className='file_input'
              type='file'
              name='labelImage'
              onChange={handleInputChange}
              ref={fileInputRef}
              placeholder='Upload a photo of the Wine Label...'
              value={formData.labelImage}
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
              onChange={handleInputChange}
              placeholder='Additional Information...'
              value={formData.otherInfo}
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
              onChange={handleInputChange}
              placeholder='Sight'
              value={formData.sight}
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
              onChange={handleInputChange}
              placeholder='Nose'
              value={formData.nose}
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
              onChange={handleInputChange}
              placeholder='Palate'
              value={formData.palate}
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
              onChange={handleInputChange}
              placeholder='Additional thoughts...'
              value={formData.thoughts}
              ></input> 
            </div>
            <div className='edit_love_container'>
              <label className='edit_love_label'>Love the wine?</label>
              <input className='edit_love_input'
                type="checkbox"
                name='love'
                checked={formData.love}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className='edit_submit_close_container'>
              {!isSubmitting && <button className='update_tasting_button' type='submitEditWine'>Update</button>}
              <NavLink to='/tastings' exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
                <h4 className='close_edit_wine' >Cancel</h4>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};



export default EditTastingForm;