import { useState } from 'react';
import EditCommentForm from './EditCommentForm';
import './comment.css';




const Comment = ({ comment, filteredUser, discussionTasting, user }) => {

  const [showEditCommentForm, setShowEditCommentForm] = useState(false);

  return (
    <div className='commentWrapper' key={filteredUser?.id}>
      {comment?.user_id === user?.id && comment?.tasting_id === discussionTasting[0].id ?
      <button className='editCommentButton' onClick={() => setShowEditCommentForm(!showEditCommentForm)}>Edit</button>: null}
      {showEditCommentForm && 
      comment?.user_id === user?.id && 
      <EditCommentForm comment={comment} user={user} discussionTasting={discussionTasting} setShowEditCommentForm={setShowEditCommentForm}/>} 
      <h5 className='commentName'>{filteredUser?.username}</h5><h6>: {comment?.comment}</h6>
    </div>
  );
};


export default Comment;