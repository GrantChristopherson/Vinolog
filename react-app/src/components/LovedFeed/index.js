import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllLovedTastingsThunk } from '../../store/tasting';
import LovedTastingCard from "../LovedTastingCard";
// import Navbar from "../navbar/Navbar.js";
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
    <div className="allLovedFeedOuterContainer">
      <Sidebar />
      <div className="allLovedFeedInnerContainer">
        {lovedWineTastings?.map((tasting) => {return (
        <div key={tasting?.id} className="lovedtastingContainer">
          <LovedTastingCard tasting={tasting}/>
        </div>
        )}).reverse()}
      </div>
      <footer>
        <div className='footerLovedWineTastingsContainer'>
          <h4 className='lovedWineTastingsFooterPhrase'>Loved Wine Feed</h4>
        </div>
      </footer>
    </div>
  );
};


export default AllLovedFeed;