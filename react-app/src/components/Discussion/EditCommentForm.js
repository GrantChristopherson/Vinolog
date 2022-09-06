import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCommentThunk, deleteCommentThunk } from '../../store/discussion';
import './editCommentForm.css';



const EditCommentForm = ({ comment, user, lovedTasting }) => {
  console.log('comment======', comment?.comment)
  const dispatch = useDispatch();
  const [editedComment, setEditedComment] = useState(comment?.comment);
  const [errors, setErrors] = useState([]);
  console.log('editedComment======', editedComment)

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
      id: comment.id,
      comment: comment
    };
    console.log('data===============', data)
    dispatch(editCommentThunk(data, comment?.id))
    
    setEditedComment("");
    setErrors([]);
  };


  const deleteComment = (commentId) => async (e) => {
    e.preventDefault()
    dispatch(deleteCommentThunk(commentId))

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
            value={comment}
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





