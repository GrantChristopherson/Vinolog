import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCommentsThunk } from '../../store/discussion';
import { getAllUsersThunk } from '../../store/session';
import Comment from './Comment';
import './discussion.css';



const Discussion = ({ discussionTasting }) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state?.session?.user);
  const allUsers = useSelector(state => Object.values(state?.session?.users));
  const comments = useSelector(state => Object.values(state?.discussion?.comments))
  const lovedTastingComments = comments.filter((comment) => comment.tasting_id === discussionTasting[0].id)

  useEffect(() => {
    const fetchData = () => {
      dispatch(getCommentsThunk());
      dispatch(getAllUsersThunk());
    };
    fetchData();

  }, [dispatch]);




  return (
    
    <>
      {lovedTastingComments?.map((comment) => {  
        return (
          <div key={comment?.id} >
            {allUsers?.filter(user => user?.id === comment?.user_id)?.map(filteredUser => (
              <Comment key={filteredUser.id} comment={comment} filteredUser={filteredUser} discussionTasting={discussionTasting} user={user} />
            ))}    
          </div>
        )
      })} 
    </>
  );
};


export default Discussion;
  
              
          
