import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFieldThunk } from '../../store/friends';
import { getAllFriendsTastingsThunk } from '../../store/tasting';
import FriendsTastingCard from '../FriendsTastingCard';
import CreateCommentForm from '../Discussion/CreateCommentForm';
import Discussion from "../Discussion/Discussion";
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Friend from '../Friend';
import './friendsField.css';




const FriendsField = () => {

  const dispatch = useDispatch();
  const prevIds = useRef();
  const [haveFriends, setHaveFriends] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [tastingId, setTastingId] = useState()
  const user = useSelector((state) => state?.session?.user);
  const friends = useSelector((state) => Object.values(state.field.friends));
  const ids = useSelector((state) => Object.keys(state.field.friends))
  const idsInt = ids.map(id => +id);
  const tastings = useSelector((state) => Object.values(state.tasting.tastings));
  const friendsTastings = tastings.filter(tasting => idsInt.includes(tasting.user?.id));
  const discussionTasting = friendsTastings.filter(tasting => tasting.id === tastingId);
  
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

  useEffect(() => {
      if (prevIds.current !== JSON.stringify(ids)) {
          dispatch(getAllFriendsTastingsThunk(ids));
          prevIds.current = JSON.stringify(ids);
      }
  }, [dispatch, ids]);

  const discussionCloser = (e) => {
    if (!showDiscussion) {
      return
    } else {
      setShowDiscussion(!showDiscussion);
    };  
  };




  return (
    <>
      <Navigation />
      <div className='sidebar_body_container'>
        <Sidebar />
        <div className="feed_page">
          <span className='feed_title'>Wines in your Field</span>
          <div className="feed_container">
          {friendsTastings?.map((tasting) => {return (
            <div key={tasting?.id} className="tasting_card">
              <FriendsTastingCard tasting={tasting}
                                  showDiscussion={showDiscussion} 
                                  setShowDiscussion={setShowDiscussion}
                                  tastingId={tastingId} 
                                  setTastingId={setTastingId} />
            </div>
          )}).reverse()}
          </div> 
        </div>
        {showDiscussion && <div className='discussion_wrapper'>
            <div className='discussion_close_container' onClick={(e) => {discussionCloser(e)}}>
              <i className='fa-solid fa-x fa-rotate-90 discussion_closer'/>
            </div>
            <CreateCommentForm discussionTasting={discussionTasting}/>
            <Discussion discussionTasting={discussionTasting} setShowDiscussion={setShowDiscussion}/>
        </div>}
        {!showDiscussion && <div className='friend_list_container'>
          <span className='field_title'>{friendAmountlogic(friends)}</span>
          <div className='field_list'>
            {haveFriends && friends?.map((friend) => {return (
              <div key={friend?.id}>
                <Friend friend={friend} />
              </div>
            )})}
          </div>
        </div>}
      </div>
      <Footer />
    </>
  );
};


export default FriendsField;
