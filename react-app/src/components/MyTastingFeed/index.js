import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyTastingsThunk } from '../../store/tasting';
import TastingCard from "../TastingCard";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import Footer from '../Footer';
import './myTastingFeed.css';




const MyTastingFeed = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state?.session?.user);
  const tastings = useSelector(state => Object.values(state.tasting.tastings));
  const userTastings = tastings.filter(tasting => tasting.user.id === user?.id);
  
  useEffect(() => {
    (()=> dispatch(getMyTastingsThunk()))();
  }, [dispatch])




  return (
    <>
      <Navigation />
      <div className="sidebar_body_container">
        <Sidebar user={user} />
        <div className="feed_page">
          <span className='feed_title'>My Wine Tastings</span>
          <div className="feed_container">
          {userTastings?.map((tasting) => {return (
            <div key={tasting.id} className="tasting_card">
              <TastingCard tasting={tasting} />
            </div>
          )}).reverse()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default MyTastingFeed;
