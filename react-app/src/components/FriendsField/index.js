import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFieldThunk } from '../../store/friends';
import { getAllFriendsTastingsThunk } from '../../store/tasting';
import FriendsTastingCard from '../FriendsTastingCard';
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Friend from '../Friend';
import './friendsField.css';




const FriendsField = () => {

  const dispatch = useDispatch();
  const [haveFriends, setHaveFriends] = useState(false);
  const user = useSelector((state) => state?.session?.user);
  const friends = useSelector((state) => Object.values(state.fields.friends));
  const ids = useSelector((state) => Object.keys(state.fields.friends))
  const idsInt = ids.map(id => +id);
  const tastings = useSelector((state) => Object.values(state.tastings.tastings));
  const friendsTastings = tastings.filter(tasting => idsInt.includes(tasting.user?.id));
  
  const friendAmountlogic = (friends) => {
    if (friends.length === 0) {
      return 'No one is in your Field...';
    } else if (friends.length === 1) {
      return '1 Friend in your Field';
    } else {
      return `${friends.length} Friends in your Field`;
    };
  };

  useEffect(() => {
    dispatch(getMyFieldThunk(user.id))
    .then(() => {
      setHaveFriends(true);
    });
  }, [dispatch, user.id]);


  const prevIds = useRef();

  useEffect(() => {
      if (prevIds.current !== JSON.stringify(ids)) {
          dispatch(getAllFriendsTastingsThunk(ids));
          prevIds.current = JSON.stringify(ids);
      }
  }, [dispatch, ids]);





  return (
    <>
      <Navigation />
      <div className='sidebar_body_container'>
        <Sidebar />
        <div className="feed_page">
          <span className='feed_title'>Wines in your Field</span>
          <div className="feed_container">
          {friendsTastings?.map((tasting) => {return (
            <div key={tasting?.id} className="tasting-card">
              <FriendsTastingCard tasting={tasting}/>
            </div>
          )}).reverse()}
          </div> 
        </div>
        <div className='friend_list_container'>
          <span className='field_title'>{friendAmountlogic(friends)}</span>
          <div className='field_list'>
            {haveFriends && friends?.map((friend) => {return (
              <div key={friend?.id}>
                <Friend friend={friend} />
              </div>
            )})}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default FriendsField;