import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentThunk, getCommentsThunk } from '../../store/discussion';
import './createCommentForm.css';



const CreateCommentForm = ({ lovedTasting }) => {

  const dispatch = useDispatch();
  const comments = useSelector((state) => (state?.discussion?.comments))
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState([]);
  

  useEffect(()=> {

  },[comments.comment])


  const handleSubmit = async (e) => {
    e.preventDefault()

    let validateErrors = [];
    if (comment.length < 2) validateErrors.push('comment must be longer than 1 character');
    if (comment.length > 400) validateErrors.push('comment cannot be longer than 400 characters');

    if (validateErrors.length > 0) {
      setErrors(validateErrors);
      return;
    }
    const data = {
      comment
    };
    

    await dispatch(createCommentThunk(data, lovedTasting.id))
    await dispatch(getCommentsThunk());
    
   
    setComment("");
    setErrors([]);
  };




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
    </div>
  );
};

export default CreateCommentForm;