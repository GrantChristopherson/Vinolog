import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { createTastingThunk } from '../../store/tasting';
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import './tastingForm.css';





const TastingForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState({});
  const [producer, setProducer] = useState('');
  const [region, setRegion] = useState('');
  const [vineyard, setVineyard] = useState('');
  const [varietal, setVarietal] = useState('');
  const [vintage, setVintage] = useState(new Date().getFullYear());
  const [otherInfo, setOtherInfo] = useState('');
  const [sight, setSight] = useState('');
  const [nose, setNose] = useState('');
  const [palate, setPalate] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [love, setLove] = useState(false);


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

    const today = new Date(); 
    if (vintage < 1900 || vintage > today.getFullYear()) {
      validateErrors['vintage'] = `* Vintage required and must be younger than 1900 but not past this year (${today.getFullYear()})`
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
    
    const tasting = {
      producer,
      region,
      vineyard,
      varietal,
      vintage,
      otherInfo,
      sight,
      nose,
      palate,
      thoughts,
      love
    };

    let data = dispatch(createTastingThunk(tasting));
    if (data) {
      history.push('/tastings')
    };
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

  const handleClick = (e) => {
    if (love === false) {
      setLove(true)
    } else {
      setLove(false)
    }
  }


  return (
    <>
      <Navigation />
      <div className='tasting_body'>
        <Sidebar />
        <div className='create_tasting_container'>
          <form className='create_form' onSubmit={handleSubmit}>
            <div className='tasting_input_container'>
            <h2 className='tasting_header'>Tasting Notes</h2>
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
                {errors?.vintage !== undefined && <div className='error'>
                  <div className='errors'>{errors.vintage}</div>
                </div>
                }
                <input className='info_input'
                type='number'
                name='vintage'
                onChange={updateVintage}
                placeholder='Vintage'
                value={vintage}
                ></input> 
              </div>
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div className='love_container'>
                <label className='love_label'>Love the wine?</label>
                <input className='love_input'
                  type="checkbox"
                  value={love}
                  name='love'
                  checked={love === true}
                  onChange={handleClick}
                />
              </div>
              <div className='submit_cancel_container'>
                <button  className='submit_tasting'>Submit</button>
                <NavLink to='/home' className={'my_home'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
                  Cancel
                </NavLink> 
              </div>
            </div>
          </form>
        </div>
      </div>
    <Footer />
  </>
  );
};


export default TastingForm;