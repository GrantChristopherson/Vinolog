import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllLovedTastingsThunk } from '../../store/tasting';
import LovedTastingCard from "../LovedTastingCard";
import Navigation from "../Navigation";
import Sidebar from '../Sidebar';
import Footer from "../Footer";
import './lovedFeed.css';

import { getMyFieldThunk } from '../../store/friends';




const AllLovedFeed = () => {

  const dispatch = useDispatch();
  const lovedWineTastings = useSelector(state => state?.tastings.lovedTastings);
  // 
  // const user = useSelector((state) => state?.session?.user);
  // const friendList = useSelector(state => state.fields.friends)
  // console.log('friendList========', friendList)
  // let friendIdList = friendList.map(user => user.id)
  // console.log('friendIdList========', friendIdList)

  // useEffect(() => {
  //   dispatch(getMyFieldThunk(user.id));
  // }, [dispatch, user.id])

  useEffect(() => {
    (async()=>{
      await dispatch(getAllLovedTastingsThunk());
    })();
  }, [dispatch]);


  return (
    <>
      <Navigation />
      <Sidebar />
      <div className="loved_feed_container">
        {lovedWineTastings?.map((tasting) => {return (
        <div key={tasting?.id} className="loved_tasting_container">
          <LovedTastingCard tasting={tasting}/>
        </div>
        )}).reverse()}
      </div>
      <Footer />
    </>
  );
};


export default AllLovedFeed;