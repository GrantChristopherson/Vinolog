import React, { useEffect } from "react";
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
  const tastings = useSelector(state => Object.values(state.tastings.tastings));
  const friendsTastings = tastings.filter(tasting => tasting?.user.id === parseInt(id));
  const friendsUsername = friendsTastings[0]?.user.username;
  

  useEffect(() => {
    if (!id) return;
    
    (() => dispatch(getFriendsTastingsThunk(id)))();
  }, [dispatch, id]);




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
              <FriendsTastingCard key={tasting?.id} tasting={tasting} />
            </div>
          )}).reverse()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default FriendTastings;