import { useState } from 'react';
import EditCommentForm from './EditCommentForm';
import './comment.css';



const Comment = ({ comment, filteredUser, tasting, user }) => {

  const [showEditCommentForm, setShowEditCommentForm] = useState(false);

  return (
    <div key={filteredUser?.id}>
      <h6>{filteredUser?.username}: {comment?.comment}</h6>
      {comment?.user_id === user?.id && comment?.tasting_id === tasting.id ?
      <button onClick={() => setShowEditCommentForm(!showEditCommentForm)}>Edit</button>: null}
      {showEditCommentForm && 
      comment?.user_id === user?.id && 
      <EditCommentForm comment={comment} user={user} tasting={tasting} setShowEditCommentForm={setShowEditCommentForm}/>} 
    </div>
  );
};


export default Comment;