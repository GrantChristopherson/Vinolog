import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCommentsThunk, deleteCommentThunk } from '../../store/discussion';
import CreateCommentForm from './CreateCommentForm';
import './discussion.css';



const Discussion = ({ lovedTasting, setShowDiscussion }) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state?.session?.user);
  const comments = useSelector((state) => (state?.discussion?.comments))
  const [showEditCommentForm, setShowEditCommentForm] = useState(false);
  const [users, setUsers] = useState([]);

  const lovedTastingComments = comments.filter((comment) => comment.tasting_id === lovedTasting.id)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const data = await response.json();
      setUsers(data.users);
    };
    fetchData();
  }, []);
  

  useEffect(() => {
    (async () => {
      await dispatch(getCommentsThunk())
    })();
  }, [dispatch]);

      

  const deleteComment = (commentId) => async (e) => {
    e.preventDefault()
    dispatch(deleteCommentThunk(commentId))
  };




  return (
  
    <div className='commentsOuterContainer'>
      <div className='commentsInnerContainer'>
        {lovedTastingComments?.map((comment) => {  
          return (
            <div key={comment?.id} className="commentcontainer">
              <div className="comment">
                {users?.filter(user => user?.id === comment?.user_id)?.map(filteredUser => (
                  <div key={filteredUser?.id}>
                    <h6>{filteredUser?.username}: {comment?.comment}</h6>
                  </div>
                ))} 
              </div>     
              <div className="editCommentButtonContainer">
              {comment?.user_id === user?.id ?
                <button className="deleteComment" onClick={deleteComment(comment.id)}>Delete</button>  : null}
              </div>
            </div>
          )
        })} 
        <CreateCommentForm lovedTasting={lovedTasting} setShowDiscussion={setShowDiscussion}/>
      </div>
    </div>
  );
};


export default Discussion;
              
          