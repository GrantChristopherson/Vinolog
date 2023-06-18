import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllLovedTastingsThunk } from '../../store/tasting';
import { getMyFieldThunk } from '../../store/friends';
import LovedTastingCard from "../LovedTastingCard";
import Navigation from "../Navigation";
import Sidebar from '../Sidebar';
import Footer from "../Footer";
import './lovedFeed.css';




const AllLovedFeed = () => {

  const dispatch = useDispatch();
  const lovedWineTastings = useSelector(state => state?.tastings.lovedTastings);

  const user = useSelector((state) => state?.session?.user);
  const friendList = useSelector(state => state.fields.friends)

  let friendIdList = friendList.map(user => user.id)
 

  useEffect(() => {
    (async()=>{
      await dispatch(getAllLovedTastingsThunk());
      await dispatch(getMyFieldThunk(user.id));
    })();
  }, [dispatch, user.id]);


  return (
    <>
      <Navigation />
      <Sidebar />
      <div className="loved_feed_container">
        {lovedWineTastings?.map((tasting) => {return (
        <div key={tasting?.id} className="loved_tasting_container">
          {tasting.labelImage ? <img className="loved-tasting-image-label" src={tasting.labelImage} alt='wine label'/>
          : <div className='default-image-container' ><i className='fa-solid fa-wine-glass-empty default-wine-image' /></div>}
          <LovedTastingCard tasting={tasting} friendIdList={friendIdList}/>
        </div>
        )}).reverse()}
      </div>
      <Footer />
    </>
  );
};


export default AllLovedFeed;