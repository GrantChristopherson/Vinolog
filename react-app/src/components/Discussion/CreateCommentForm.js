import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentThunk, getCommentsThunk } from '../../store/discussion';
import './createCommentForm.css';



const CreateCommentForm = ({ tasting }) => {

  const dispatch = useDispatch();
  const comments = useSelector((state) => (state?.discussion?.comments))
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState([]);
  

  useEffect(()=> {

  },[comments.comment])


  const handleSubmit = async (e) => {
    e.preventDefault()

    let validateErrors = [];
    if (!comment.length) validateErrors.push('empty input is not a valid comment');
    if (comment.length < 2) validateErrors.push('comment must be longer than 1 character');
    if (comment.length > 150) validateErrors.push('comment cannot be longer than 150 characters');
    if (comment.trim().length === 0) validateErrors.push('only spacebar comment is not valid');
    // for (let i = 0; i < comment.length; i++) {
    //   let char = comment[i];
    //   if (char === ' ') {
    //     if (char[i + 1] === ' ') {
    //       if (char[i + 2] === ' ') validateErrors.push('comment cannot have 3 or more consecutive spaces')
    //     };
    //   };
    // };

    if (validateErrors.length > 0) {
      setErrors(validateErrors);
      return;
    }
    const data = {
      comment
    };
    

    await dispatch(createCommentThunk(data, tasting.id))
    await dispatch(getCommentsThunk());
    
   
    setComment("");
    setErrors([]);
  };

  const handleCancel = () => {
    setComment('')
    setErrors([])
  }


  return (
    <div className='commentFormOuterContainer'>
      <form onSubmit={handleSubmit} className='createCommentForm'>
        {errors.map((error, i) => (<div className="errors" key={i}>{error}</div>))}
        <div className='commentContainer'>
          <input className='commentInput'
            type="text"
            name='comment'
            onChange={(e) => setComment(e.target.value)}
            placeholder='Comment...'
            value={comment}
            required
          ></input>
          <button className='commentButton' type="submit" >Submit</button>
        </div>
      </form>
      <button className='cancelCreateButton' onClick={() => handleCancel()}>Clear</button>
    </div>
  );
};

export default CreateCommentForm;