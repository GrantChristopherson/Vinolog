import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createTastingThunk } from '../../store/tasting';
import './tastingForm.css';




const TastingForm = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [errors, setErrors] = useState({});
  const [producer, setProducer] = useState('');
  const [region, setRegion] = useState('');
  const [vineyard, setVineyard] = useState('');
  const [varietal, setVarietal] = useState('');
  const [vintage, setVintage] = useState();
  const [otherInfo, setOtherInfo] = useState('');
  const [sight, setSight] = useState('');
  const [nose, setNose] = useState('');
  const [palate, setPalate] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [love, setLove] = useState(false);

  // if (!user) {
  //   return <Redirect to='/' />;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // let validateErrors = [];
    // const today = new Date();
    // if (vintage < 1900) validateErrors.push('Vintage can not be older than 1900');
    // if (vintage > today.getFullYear()) validateErrors.push('Vintage must be from this year or older')
    // if (typeof vintage != 'number') validateErrors.push('Vintage must be an integer');

    // if (validateErrors.length > 0) {
    //   setErrors(validateErrors);
    //   return;
    // }

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
    }
    const data = await dispatch(createTastingThunk(tasting))

    setProducer('');
    setRegion('');
    setVineyard('');
    setVarietal('');
    setVintage();
    setOtherInfo('');
    setSight('');
    setNose('');
    setPalate('');
    setThoughts('');
    setLove(false);
    setErrors([])
  }


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


  return (
    <div className='createTastingContainer'>
      <h2>New Wine Tasting</h2>
      <form className='createTastingForm' onSubmit={handleSubmit}>
        <div>
          <input className='producerInput'
          type='text'
          name='producer'
          onChange={updateProducer}
          placeholder='Producer'
          value={producer}
          ></input>
          {errors?.producer &&
          <div className='error'>
            {errors?.producer?.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
          } 
        </div>
        <div>
          <input className='regionInput'
          type='text'
          name='region'
          onChange={updateRegion}
          placeholder='Region'
          value={region}
          ></input>
          {errors?.region &&
          <div className='error'>
            {errors?.region?.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
          } 
        </div>
        <div>
          <input className='vineyardInput'
          type='text'
          name='vineyard'
          onChange={updateVineyard}
          placeholder='Vineyard'
          value={vineyard}
          ></input>
          {errors?.vineyard &&
          <div className='error'>
            {errors?.vineyard?.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
          } 
        </div>
        <div>
          <input className='varietalInput'
          type='text'
          name='varietal'
          onChange={updateVarietal}
          placeholder='Varietal / Type'
          value={varietal}
          ></input>
          {errors?.varietal &&
          <div className='error'>
            {errors?.varietal?.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
          } 
        </div>
        <div>
          <input className='vintageInput'
          type='number'
          name='vintage'
          onChange={updateVintage}
          placeholder='Vintage'
          value={vintage}
          ></input>
          {errors?.vintage &&
          <div className='error'>
            {errors?.vintage?.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
          } 
        </div>
        <div>
          <input className='otherInfoInput'
          type='text'
          name='otherInfo'
          onChange={updateOtherInfo}
          placeholder='Additional Information...'
          value={otherInfo}
          ></input>
          {errors?.otherInfo &&
          <div className='error'>
            {errors?.otherInfo?.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
          } 
        </div>
        <div>
          <input className='sightInput'
          type='text'
          name='sight'
          onChange={updateSight}
          placeholder='Sight'
          value={sight}
          ></input>
          {errors?.sight &&
          <div className='error'>
            {errors?.sight?.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
          } 
        </div>
        <div>
          <input className='noseInput'
          type='text'
          name='nose'
          onChange={updateNose}
          placeholder='Nose'
          value={nose}
          ></input>
          {errors?.nose &&
          <div className='error'>
            {errors?.nose?.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
          } 
        </div>
        <div>
          <input className='palateInput'
          type='text'
          name='palate'
          onChange={updatePalate}
          placeholder='Palate'
          value={palate}
          ></input>
          {errors?.palate &&
          <div className='error'>
            {errors?.palate?.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
          } 
        </div>
        <div>
          <input className='thoughtsInput'
          type='text'
          name='thoughts'
          onChange={updateThoughts}
          placeholder='Additional thoughts...'
          value={thoughts}
          ></input>
          {errors?.thoughts &&
          <div className='error'>
            {errors?.thoughts?.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
          } 
        </div>
        <div>
          <label>Love the wine?</label>
          <input
            type="radio"
            value={love}
            name='love'
            checked={love === true}
            onChange={(e) => setLove(true)}
          />
          {/* {errors?.love &&
          <div className='error'>
            {errors?.love?.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
          } */}
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};


export default TastingForm;