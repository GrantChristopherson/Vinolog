import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { editUserThunk } from '../../store/session';
import './userEditForm.css';




const UserEditForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const fileInputRef = useRef(null);
  const user = useSelector(state => state?.session?.user);


  const initialState = {
    id: user.id,
    username: user.username,
    password: user.password,
    profileImage: user?.profileImage || '',
    bio: user?.bio || ''
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateInput = () => {
    let validateErrors = {};

    const file = fileInputRef.current?.files[0];
  
    const fieldValidations = {
      profileImage: { required: false },
      bio: { min: 3, max: 200, required: false },
    };

    if (file) {
      // 1. Validating File Size (For example, limit to 4MB)
      if (file.size > 4 * 1024 * 1024) {
        validateErrors.profileImage = '* The image file is too large (max 4MB)';
      };
    
      // 2. Validating File Type
      const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      if (!acceptedImageTypes.includes(file.type)) {
        validateErrors.profileImage = '* The image file format is not supported';
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
    };

    setIsSubmitting(true);
  
    dispatch(editUserThunk(formData)).then((response) => {
      setIsSubmitting(false);
      history.push(`/profile/${user.id}`);
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Error submitting form:", error)
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };




  return (
    <>
      <form className='user_edit_form' onSubmit={handleSubmit}>
        <h2 className='profile_header'>{`Edit ${user.username}'s Profile`}</h2>
        <div className='edit_profile_image_input_container'>
              {errors?.profileImage !== undefined && <div className='error'>
                <div className='errors'>{errors.profileImage}</div>
              </div>
              }
              <label htmlFor="profileImage">Upload a profile photo...</label>
              <input className='file_input'
              type='file'
              name='profileImage'
              onChange={handleInputChange}
              ref={fileInputRef}
              value={formData.profileImage}
              ></input> 
            </div>
            <div className='edit_bio_input_container'>
              {errors?.bio !== undefined && <div className='error'>
                <div className='errors'>{errors.bio}</div>
              </div>
              }
              <input className='info_input'
              type='text'
              name='bio'
              onChange={handleInputChange}
              placeholder='Add your Bio "one liner"...'
              value={formData.bio}
              ></input> 
            </div>
            <div className='edit_submit_container'>
              {!isSubmitting && <button className='update_user_button' type='submitEditUser'>Update</button>}
              <NavLink to={`/profile/${user.id}`} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
                <h4 className='edit_user' >Cancel</h4>
              </NavLink>
            </div>
      </form>
    </>
  );

};


export default UserEditForm;