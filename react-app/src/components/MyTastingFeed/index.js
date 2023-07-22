import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyTastingsThunk } from '../../store/tasting';
import TastingCard from "../TastingCard";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import Footer from '../Footer';
import './myTastingFeed.css';


// tasting card feeds with image aws

const MyTastingFeed = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state?.session?.user);
  const tastings = useSelector(state => Object.values(state.tastings.tastings));

  const userTastings = tastings.filter(tasting => tasting.user.id === user.id)
  
  useEffect(() => {
    (()=> dispatch(getMyTastingsThunk()))();
  }, [dispatch])




  return (
    <>
      <Navigation />
      <Sidebar user={user} />
      <div className="my_feed_page">
        <span className='my_title'>My Tastings</span>
        <div className="my-feed-container">
        {userTastings?.map((tasting) => {return (
          <div key={tasting.id} className="my-tasting-container" >
            {tasting.labelImage ? <img className="tasting-image-label" src={tasting.labelImage} alt='wine label'/> 
            : <div className='default-image-container' ><i className='fa-solid fa-wine-glass-empty default-wine-image' /></div>}
            <TastingCard tasting={tasting} />
          </div>
        )}).reverse()}
        </div>
      </div>
      <Footer />
    </>
  );
};


export default MyTastingFeed;