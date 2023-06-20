import { useState } from 'react';
import EditCommentForm from './EditCommentForm';
import './comment.css';




const Comment = ({ comment, filteredUser, discussionTasting, user }) => {

  const [showEditCommentForm, setShowEditCommentForm] = useState(false);

  return (
    <>
      <div className='commentWrapper' >
        <div className='name-and-comment'>
          <h5 className='commentName'>{filteredUser.username} : </h5><h6 className='comment-itself'>{comment.comment}</h6>
        </div>
        {comment.user_id === user.id && comment.tasting_id === discussionTasting[0].id ?
        <i className='fa-solid fa-edit edit-comment-button' onClick={() => setShowEditCommentForm(!showEditCommentForm)}/>: null}
      </div>
      {showEditCommentForm && 
      comment.user_id === user.id && 
      <EditCommentForm comment={comment} user={user} discussionTasting={discussionTasting} setShowEditCommentForm={setShowEditCommentForm}/>} 
    </>
  );
};


export default Comment;