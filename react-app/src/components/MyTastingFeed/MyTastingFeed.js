import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyTastingsThunk } from '../../store/tasting';
import TastingCard from "../TastingCard/TastingCard.js";
import Navbar from '../Navbar/Navbar.js';
import Sidebar from "../Sidebar/Sidebar.js";
import Footer from '../Footer/Footer.js';
import './myTastingFeed.css';




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
      <Navbar />
      <Sidebar user={user} />
      <div className="myTastingFeedOuterContainer">
        {userTastings?.map((tasting) => {return (
        <div key={tasting.id} className="tastingFeedInnerContainer">
          <TastingCard tasting={tasting}/>
        </div>
        )}).reverse()}
      </div>
      <Footer />
    </>
  );
};


export default MyTastingFeed;