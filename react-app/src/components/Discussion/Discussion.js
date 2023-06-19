import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCommentsThunk } from '../../store/discussion';
import Comment from './Comment';
import './discussion.css';



const Discussion = ({ discussionTasting, setShowDiscussion }) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state?.session?.user);
  const comments = useSelector((state) => (state?.discussion?.comments))
  const [users, setUsers] = useState([]);

  const lovedTastingComments = comments.filter((comment) => comment.tasting_id === discussionTasting.id)

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
      {lovedTastingComments?.map((comment) => {  
        return (
          <div key={comment?.id} className="commentcontainer">
            <div key={comment?.id} className="comment">
              {users?.filter(user => user?.id === comment?.user_id)?.map(filteredUser => (
                <Comment key={filteredUser.id} comment={comment} filteredUser={filteredUser} discussionTasting={discussionTasting} user={user} />
              ))}
            </div>     
          </div>
        )
      }).reverse()} 
    </div>
  );
};


export default Discussion;
  
              
          