import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getFriendsTastingsThunk } from "../../store/tasting";
import FriendsTastingCard from "../FriendsTastingCard";
import Navigation from "../Navigation";
import Sidebar from '../Sidebar';
import Footer from "../Footer";
import './friendTastings.css';




const FriendTastings = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const tastings = useSelector((state => state.tastings.friendTastings))
  console.log('tastings======', tastings)
  console.log('friendId======', id)

  useEffect(() => {
    if (!id) {
      return;
    }
    
    (async()=>{
      dispatch(getFriendsTastingsThunk(id));
    })();
  }, [dispatch, id])

  return (
    <>
      <Navigation />
      <Sidebar />
        {/* <div className="friends_tastings_feed">{tastings.friendTastings[0].user.username}</div> */}
        <div className="friends_tasting_feed_container">
          {tastings?.map((tasting) => {return (
            <div key={tasting?.id} className="friends_tasting_container">
              <FriendsTastingCard key={tasting?.id} tasting={tasting} />
            </div>
          )}).reverse()}
        </div>
      <Footer />
    </>
  );
};


export default FriendTastings;