import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentThunk, getCommentsThunk } from '../../store/discussion';
import './createCommentForm.css';



const CreateCommentForm = ({ discussionTasting }) => {

  const dispatch = useDispatch();
  const comments = useSelector((state) => (state?.discussion?.comments));
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState([]);
  
  useEffect(()=> {
  },[comments.comment]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    let validateErrors = [];
    if (comment.length < 2 || comment.length > 50) validateErrors.push('* comment must be between 2 and 50 characters');
    if (comment.trim().length === 0) validateErrors.push('* spacebar exclusive input is not valid as comment');
    if (validateErrors.length > 0) {
      setErrors(validateErrors);
      return;
    };
    
    const data = {
      comment
    };
    
    await dispatch(createCommentThunk(data, discussionTasting[0].id));
    await dispatch(getCommentsThunk());
    
    setComment("");
    setErrors([]);
  };

  const handleCancel = () => {
    setComment('');
    setErrors([]);
  };




  return (
    <>
      <div className='discussion_wine_title'><h4>{discussionTasting[0].vintage} {discussionTasting[0].producer}</h4></div>
      <form onSubmit={handleSubmit}>
        {errors.map((error, i) => (<div className="errors" key={i}>{error}</div>))}
        <input className='comment_input'
          type="text"
          name='comment'
          onChange={(e) => setComment(e.target.value)}
          placeholder='Comment...'
          value={comment}
        ></input>
        <div className='comment_buttons_container'>
          <button className='comment_button' type="submit" >Submit</button>
          <button className='cancel_comment_button' onClick={() => handleCancel()}>Clear</button>
        </div>
      </form>
    </>
  );
};


export default CreateCommentForm;
