import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFieldThunk } from '../../store/friends';
import { getAllFriendsTastingsThunk } from '../../store/tasting';
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
  const tastings = useSelector((state) => Object.values(state.tastings));
 
  console.log('tastings', tastings)
  console.log('friendsTastings=====', friendsTastings)

 
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
      dispatch(getAllFriendsTastingsThunk(ids));
      setHaveFriends(true);
    });
  }, [dispatch, user.id, ids]);




  return (
    <>
      <Navigation />
      <div className='sidebar_body_container'>
        <Sidebar />
        <div className="feed_page">
          <span className='feed_title'>Wines in your Field</span>
          <div className="feed_container">
          {/* {lovedTastings?.map((tasting) => {return (
            <div key={tasting?.id} className="tasting-card">
              <LovedTastingCard tasting={tasting} 
                                showDiscussion={showDiscussion} 
                                setShowDiscussion={setShowDiscussion}
                                tastingId={tastingId} 
                                setTastingId={setTastingId} />
            </div>
          )}).reverse()} */}
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