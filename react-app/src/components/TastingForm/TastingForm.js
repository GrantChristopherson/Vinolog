import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTastingThunk } from '../../store/tasting';
import './tastingForm.css';




const TastingForm = ({ setShowModal }) => {

  const dispatch = useDispatch();

  // const currentYear = new Date().getFullYear()

  const [errors, setErrors] = useState([]);
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

    
    let validateErrors = [];
    const today = new Date();
    if (vintage < 1900) validateErrors.push('Vintage can not be older than 1900');
    if (vintage > today.getFullYear()) validateErrors.push('Vintage must be from this year or older')
   

    if (validateErrors.length > 0) {
      setErrors(validateErrors);
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

    let data =  await dispatch(createTastingThunk(tasting));

    if (data) {
      setErrors(data)
    } else {
      setShowModal(false)
    }
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
    <div className='createTastingContainer'>
      <form className='createTastingForm' onSubmit={handleSubmit}>
      <h2>New Wine Tasting</h2>
        <div className='inputContainer'>
        <div>
          <input className='producerInput'
          type='text'
          name='producer'
          onChange={updateProducer}
          placeholder='Producer'
          value={producer}
          ></input>
          {errors?.producer &&
          <div className='errors'>
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
          <div className='errors'>
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
          <div className='errors'>
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
          <div className='errors'>
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
          <div className='errors'>
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
          <div className='errors'>
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
          <div className='errors'>
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
          <div className='errors'>
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
          <div className='errors'>
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
          <div className='errors'>
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
            onClick={handleClick}
          />
          {errors?.love &&
          <div className='errors'>
            {errors?.love?.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
          }
        </div>
        <div>
          <button  className='submitTasting'>Submit</button>
          <button className="closeNewWine" onClick={()=>setShowModal(false)}>Close</button>
        </div>
        </div>
      </form>
    </div>
  );
};


export default TastingForm;