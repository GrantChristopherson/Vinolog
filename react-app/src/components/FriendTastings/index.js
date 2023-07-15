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
  const tastings = useSelector((state => state.tastings.friendTastings))
 

  useEffect(() => {
    if (!id) {
      return;
    };
    (async()=>{
      dispatch(getFriendsTastingsThunk(id));
    })();
  }, [dispatch, id]);




  return (
    <>
      <Navigation />
      <Sidebar />
      <div className="friends_feed_page">
        <span className="friends_feed_header">{tastings[0]?.user?.username}'s Wine Tasting Notes</span>
        <div className="friends_tastings_feed">
        {tastings?.map((tasting) => {return (
          <div key={tasting?.id} className="friends_tasting_container">
            {tasting.labelImage ? <img className="tasting-image-label" src={tasting.labelImage} alt='wine label'/> 
            : <div className='default-image-container' ><i className='fa-solid fa-wine-glass-empty default-wine-image' /></div>}
            <FriendsTastingCard key={tasting?.id} tasting={tasting} />
          </div>
        )}).reverse()}
        </div>
      </div>
      <Footer />
    </>
  );
};


export default FriendTastings;