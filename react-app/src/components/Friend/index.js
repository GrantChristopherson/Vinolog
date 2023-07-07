import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteFriendThunk } from "../../store/friends";
import './friend.css';



const Friend = (friend) => {

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state?.session?.user)
  const friendId = friend.friend.id;
  

  const unFriendHandler = async(e) => {
    e.preventDefault();
    dispatch(deleteFriendThunk(currentUser.id, friendId))
  };


  return (
    <div className="listed_friend_container">
      <NavLink to={`/friends/${friendId}/tastings`} className={'friend_tastings'} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
        {friend.friend.username}
      </NavLink>
      <div className="unfriend_container">
        <button className='unfriend_button' onClick={unFriendHandler}>Remove</button>
      </div>
    </div>
  );
};


export default Friend;