import { useState } from 'react';
import EditCommentForm from './EditCommentForm';
import './comment.css';




const Comment = ({ comment, filteredUser, discussionTasting, user }) => {

  const [showEditCommentForm, setShowEditCommentForm] = useState(false);

  return (
    <>
      <div className='comment_container' >
        <h5 className='comment_name'>{filteredUser.username} : </h5><p className='comment_itself'>{comment.comment}</p>
        {comment.user_id === user.id && comment.tasting_id === discussionTasting[0].id ?
        <i className='fa-solid fa-edit edit_comment_button' onClick={() => setShowEditCommentForm(!showEditCommentForm)}/>: null}
      </div>
      {showEditCommentForm && 
      comment.user_id === user.id && 
      <EditCommentForm comment={comment} user={user} discussionTasting={discussionTasting} setShowEditCommentForm={setShowEditCommentForm}/>} 
    </>
  );
};


export default Comment;