import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCommentThunk, deleteCommentThunk, getCommentsThunk } from '../../store/discussion';
import './editCommentForm.css';



const EditCommentForm = ({ comment, user, lovedTasting, setShowEditCommentForm }) => {
  
  const dispatch = useDispatch();
  const [editedComment, setEditedComment] = useState(comment?.comment);
  const [errors, setErrors] = useState([]);
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    let validateErrors = [];
    if (comment.length < 2) validateErrors.push('comment must be longer than 1 character');
    if (comment.length > 150) validateErrors.push('comment cannot be longer than 150 characters');
    // if emptys space comment validations

    if (validateErrors.length > 0) {
      setErrors(validateErrors);
      return;
    };

    const data = {
      id: comment.id,
      comment: editedComment
    };
    
    dispatch(editCommentThunk(data, comment?.id));
    
    setEditedComment("");
    setErrors([]);
    setShowEditCommentForm(false);

  };


  const deleteComment = (commentId) => async (e) => {
    e.preventDefault()

    await dispatch(deleteCommentThunk(commentId));
    await dispatch(getCommentsThunk());
    setShowEditCommentForm(false);
  };
    
   

  return (
    <div className='editCommentFormOuterContainer'>
      <form onSubmit={handleSubmit} className='editCommentForm'>
        {errors.map((error, i) => (<div className="errors" key={i}>{error}</div>))}
        <div className='editCommentContainer'>
          <input className='editedCommentInput'
            type="text"
            name='comment'
            onChange={(e) => setEditedComment(e.target.value)}
            placeholder='Comment...'
            value={editedComment}
            required
          ></input>
          <div className='editDeleteButtonWrapper'>
            <button className='editedCommentButton' type="submit" >Submit</button>
            {comment?.user_id === user?.id && comment?.tasting_id === lovedTasting.id ?
            <button className="deleteComment" onClick={deleteComment(comment.id)}>Delete</button>  : null}
          </div>
        </div>
      </form>
    </div>
  );
};


export default EditCommentForm;





