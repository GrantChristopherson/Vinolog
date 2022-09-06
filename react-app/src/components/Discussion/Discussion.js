import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCommentsThunk } from '../../store/discussion';
import CreateCommentForm from './CreateCommentForm';
import EditCommentForm from './EditCommentForm';
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
                    {comment?.user_id === user?.id && comment?.tasting_id === lovedTasting.id ?
                    <h6 onClick={() => setShowEditCommentForm(!showEditCommentForm)}>Edit</h6>: null}
                    {showEditCommentForm && comment?.user_id === user?.id && <EditCommentForm comment={comment} user={user} lovedTasting={lovedTasting} />} 
                  </div>
                ))}
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
              
          