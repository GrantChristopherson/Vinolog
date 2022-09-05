import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCommentsThunk, deleteCommentThunk } from '../../store/discussion';
import CreateCommentForm from './CreateCommentForm';
import './discussion.css';



const Discussion = ({ lovedTasting }) => {

  const dispatch = useDispatch()
  const comments = useSelector((state) => (state?.discussion?.comments))
  const user = useSelector(state => state?.session?.user);
  const [users, setUsers] = useState([]);

  const lovedTastingComments = comments.filter((comment) => comment.tasting_id === lovedTasting.id)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const data = await response.json();
      console.log('data=============', data)
      setUsers(data.users);
    };
    fetchData();
  }, []);
  
  console.log('comments========================', comments)

  useEffect(() => {
    (async () => {
      await dispatch(getCommentsThunk())

    })();
  }, [dispatch]);
      

  const removeComment = (id) => async (e) => {
    e.preventDefault()
    dispatch(deleteCommentThunk(id))
  };




  return (
  
    <div className='commentsOuterContainer'>
      <div className='commentsInnerContainer'>
        {lovedTastingComments?.map((comment) => {  
          console.log('comment in return=========', comment)
          return (
            <div key={comment.id} className="commentcontainer">
              <div className="comment">
                {users?.filter(user => user?.id === comment?.user_id)?.map(filteredUser => (
                  <div key={filteredUser?.id}>
                    <h6>{filteredUser?.username}: {comment.comment}</h6>
                  </div>
                ))} 
              </div>     
              <div className="editCommentButtonContainer">
              {comment?.user_id === user.id && comment?.tasting_id === lovedTasting.id ?
                <button className="editComment" onClick={removeComment(comment?.id)}><i className="fa-solid fa-pen-to-square notepenIcon" > </i></button>  : null}
              </div>
              
            </div>
          )
        })} 
        <CreateCommentForm lovedTasting={lovedTasting} />
      </div>
    </div>
  );
};


export default Discussion;