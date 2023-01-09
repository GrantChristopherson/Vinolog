import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllLovedTastingsThunk } from '../../store/tasting';
import LovedTastingCard from "../LovedTastingCard";
import Navigation from "../Navigation";
import Sidebar from '../Sidebar';
import Footer from "../Footer";
import './lovedFeed.css';




const AllLovedFeed = () => {

  const dispatch = useDispatch();
  const lovedWineTastings = useSelector(state => state?.tastings.lovedTastings);


  useEffect(() => {
    (async()=>{
      await dispatch(getAllLovedTastingsThunk());
    })();
  }, [dispatch]);


  return (
    <>
      <Navigation />
      <div className="body_wrapper">
        <Sidebar />
        <div className="loved_feed_container">
          {lovedWineTastings?.map((tasting) => {return (
          <div key={tasting?.id} className="loved_tasting_container">
            <LovedTastingCard tasting={tasting}/>
          </div>
          )}).reverse()}
        </div>
      </div>
      <Footer />
    </>
  );
};


export default AllLovedFeed;