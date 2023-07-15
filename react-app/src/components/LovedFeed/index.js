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
  const lovedWineTastings = useSelector(state => state?.tastings.lovedTastings);
  const user = useSelector((state) => state?.session?.user);

  const [showDiscussion, setShowDiscussion] = useState(false);
  const [tastingId, setTastingId] = useState()
  
  let discussionTasting = lovedWineTastings.filter((tasting) => {
    return tasting.id === tastingId;
  })

  useEffect(() => {
    (async()=>{
      await dispatch(getAllLovedTastingsThunk());
      await dispatch(getMyFieldThunk(user.id));
    })();
  }, [dispatch, user.id]);


  return (
    <>
      <Navigation />
      <Sidebar />
      <div className="loved_feed_page">
        <span className='loved_title'>Loved Wine Tastings</span>
        <div className="loved_feed_container">
          {lovedWineTastings?.map((tasting) => {return (
          <div key={tasting?.id} className="loved_tasting_container">
            {tasting.labelImage ? <img className="loved-tasting-image-label" src={tasting.labelImage} alt='wine label'/>
            : <div className='default-image-container' ><i className='fa-solid fa-wine-glass-empty default-wine-image' /></div>}
            <LovedTastingCard tasting={tasting} showDiscussion={showDiscussion} setShowDiscussion={setShowDiscussion} setTastingId={setTastingId} />
          </div>
          )}).reverse()}
        </div>
        {showDiscussion && <div className='discussion_wrapper'>
          <div className="discussion_container">
            <CreateCommentForm discussionTasting={discussionTasting}/>
            <Discussion discussionTasting={discussionTasting} setShowDiscussion={setShowDiscussion}/>
            </div>
        </div>}
      </div>
      <Footer />
    </>
  );
};


export default AllLovedFeed;
