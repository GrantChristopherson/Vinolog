import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllLovedTastingsThunk } from '../../store/tasting';
import { getMyFieldThunk } from '../../store/friends';
import LovedTastingCard from "../LovedTastingCard";
import CreateCommentForm from '../Discussion/CreateCommentForm';
import Discussion from "../Discussion/Discussion";
import Navigation from "../Navigation";
import Sidebar from '../Sidebar';
import Footer from "../Footer";
import './lovedFeed.css';




const AllLovedFeed = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const allTastings = useSelector(state =>  Object.values(state?.tastings.tastings));
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [tastingId, setTastingId] = useState();
  
  const lovedTastings = allTastings.filter(tasting => tasting.love);
  const discussionTasting = lovedTastings.filter(tasting => tasting.id === tastingId);
  
  useEffect(() => {
    (() => {
      dispatch(getAllLovedTastingsThunk());
      dispatch(getMyFieldThunk(user.id));
    })();
  }, [dispatch, user.id]);

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
          <span className='feed_title'>Vinolog Loved Wines</span>
          <div className="feed_container">
          {lovedTastings?.map((tasting) => {return (
            <div key={tasting?.id} className="tasting-card">
              <LovedTastingCard tasting={tasting} 
                                showDiscussion={showDiscussion} 
                                setShowDiscussion={setShowDiscussion}
                                tastingId={tastingId} 
                                setTastingId={setTastingId} />
            </div>
          )}).reverse()}
          </div>
          {showDiscussion && <div className='discussion_wrapper'>
            <div className='discussion_close_container' onClick={(e) => {discussionCloser(e)}}>
              <i className='fa-solid fa-x fa-rotate-90 discussion_closer'/>
            </div>
            <CreateCommentForm discussionTasting={discussionTasting}/>
            <Discussion discussionTasting={discussionTasting} setShowDiscussion={setShowDiscussion}/>
          </div>}
        </div>
      </div>
      <Footer />
    </>
  );
};


export default AllLovedFeed;
