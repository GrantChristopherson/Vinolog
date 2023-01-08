import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyTastingsThunk } from '../../store/tasting';
import TastingCard from "../TastingCard";
// import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Footer from '../Footer';
import './myTastingFeed.css';

import Navigation from "../Navigation";



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
          <TastingCard tasting={tasting}/>
        </div>
        )}).reverse()}
      </div>
      <Footer />
    </>
  );
};


export default MyTastingFeed;