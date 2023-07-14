import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFieldThunk } from '../../store/friends';
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Friend from '../Friend';
import './friendsField.css';




const FriendsField = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const friends = useSelector((state) => Object.values(state.fields.friends))
  const [haveFriends, setHaveFriends] = useState(false);
 
  const friendAmountlogic = (friends) => {
    if (friends.length === 0) {
      return 'Meet other vinophiles in the Loved Wine Feed...  Add them to your Field of Friends!';
    } else if (friends.length === 1) {
      return '1 Friend in your Field';
    } else {
      return `${friends.length} Friends in your Field`
    };
  };


  useEffect(() => {
    dispatch(getMyFieldThunk(user.id)).then(() => setHaveFriends(true));
  }, [dispatch, user.id])


  return (
    <>
      <Navigation />
      <Sidebar />
      <div className='field_list_container'>
        <span className='field_title'>{friendAmountlogic(friends)}</span>
        <div className='field_list'>
          {haveFriends && friends?.map((friend) => {return (
            <div key={friend?.id}>
              <Friend friend={friend} />
            </div>
          )})}
        </div>
      </div>
      <Footer />
    </>
  );
};


export default FriendsField;