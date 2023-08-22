import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getFriendsTastingsThunk } from "../../store/tasting";
import FriendsTastingCard from "../FriendsTastingCard";
import CreateCommentForm from '../Discussion/CreateCommentForm';
import Discussion from "../Discussion/Discussion";
import Navigation from "../Navigation";
import Sidebar from '../Sidebar';
import Footer from "../Footer";
import './friendTastings.css';




const FriendTastings = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [tastingId, setTastingId] = useState()
  const tastings = useSelector(state => Object.values(state.tasting.tastings));
  const friendsTastings = tastings.filter(tasting => tasting?.user.id === parseInt(id));
  const discussionTasting = friendsTastings.filter(tasting => tasting.id === tastingId);
  const friendsUsername = friendsTastings[0]?.user.username;
  

  useEffect(() => {
    if (!id) return;
    
    (() => dispatch(getFriendsTastingsThunk(id)))();
  }, [dispatch, id]);

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
      <div className="sidebar_body_container">
        <Sidebar />
        <div className="feed_page">
          <span className="feed_title">{friendsUsername}'s Wine Tastings</span>
          <div className="feed_container">
          {friendsTastings?.map((tasting) => {return (
            <div key={tasting?.id} className="tasting-card">
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
      </div>
      <Footer />
    </>
  );
};


export default FriendTastings;