import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyTastingsThunk } from '../../store/tasting';
import TastingCard from "../TastingCard";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import Footer from '../Footer';
import './myTastingFeed.css';


// tasting card feeds styling and components modified to be more dynamic, tiled and with images
// modify user seed data to include images and ability to add images url, aws later

const MyTastingFeed = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state?.session?.user);
  const userTastings = useSelector(state => state?.tastings.userTastings);


  useEffect(() => {
    (async()=>{
      await dispatch(getMyTastingsThunk());
    })();
  }, [dispatch])


  return (
    <>
      <Navigation />
      <Sidebar user={user} />
      <div className="my-feed-container">
        {userTastings?.map((tasting) => {return (
        <div key={tasting.id} className="my-tasting-container">
          <img className="tasting-image-label" src={tasting.labelImage}/>
          <TastingCard tasting={tasting}/>
        </div>
        )}).reverse()}
      </div>
      <Footer />
    </>
  );
};


export default MyTastingFeed;