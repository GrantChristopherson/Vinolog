import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editCommentThunk, deleteCommentThunk, getCommentsThunk } from '../../store/discussion';
import './editCommentForm.css';



const EditCommentForm = ({ comment, user, discussionTasting, setShowEditCommentForm }) => {
  
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(true);
  const [editedComment, setEditedComment] = useState(comment?.comment);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      dispatch(getCommentsThunk());
    }
  },[dispatch, isMounted]);

  

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


  const commentDeleter = (commentId) => (e) => {
    e.preventDefault()
   
    let data = dispatch(deleteCommentThunk(commentId));
    if (data && isMounted) {
      setShowEditCommentForm(false);
    };
  };
    
   

  return (
    <form onSubmit={handleSubmit}>
      {errors.map((error, i) => (<div className="errors" key={i}>{error}</div>))}
      <input className='edited_comment_input'
        type="text"
        name='comment'
        onChange={(e) => setEditedComment(e.target.value)}
        placeholder='Edit of Comment...'
        value={editedComment}
      ></input>
      <div className='edit_delete_button_container'>
        <button className='edited_comment_button' type="submit" >Submit</button>
        {comment?.user_id === user?.id && comment?.tasting_id === discussionTasting[0].id ?
        <button className="delete_comment" onClick={commentDeleter(comment.id)}>Delete</button>  : null}
      </div>
    </form>
  );
};


export default EditCommentForm;





