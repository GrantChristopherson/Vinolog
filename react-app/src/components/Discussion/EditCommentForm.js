import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editCommentThunk, deleteCommentThunk, getCommentsThunk } from '../../store/discussion';
import './editCommentForm.css';



const EditCommentForm = ({ comment, user, discussionTasting, setShowEditCommentForm }) => {
  
  const dispatch = useDispatch();
  const [editedComment, setEditedComment] = useState(comment?.comment);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    (async () => {
    dispatch(getCommentsThunk())

    })();
  },[dispatch]);
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    let validateErrors = [];
    if (editedComment.length < 2 || editedComment.length > 50) validateErrors.push('* comment must be between 2 and 50 characters');
    if (editedComment.trim().length === 0) validateErrors.push('* spacebar exclusive input is not valid as comment');

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


  const commentDeleter = (commentId) => async (e) => {
    e.preventDefault()
   
    let data = await dispatch(deleteCommentThunk(commentId));
    if (data) {
      setShowEditCommentForm(false);
    };
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
            placeholder='Edit of Comment...'
            value={editedComment}
          ></input>
          <div className='editDeleteButtonWrapper'>
            <button className='editedCommentButton' type="submit" >Submit</button>
            {comment?.user_id === user?.id && comment?.tasting_id === discussionTasting[0].id ?
            <button className="deleteComment" onClick={commentDeleter(comment.id)}>Delete</button>  : null}
          </div>
        </div>
      </form>
    </div>
  );
};


export default EditCommentForm;





