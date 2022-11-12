import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllLovedTastingsThunk } from '../../store/tasting';
import LovedTastingCard from "../LovedTastingCard/LovedTastingCard";
import Navbar from "../Navbar/Navbar";
import Sidebar from '../Sidebar/Sidebar';
import Footer from "../Footer/Footer";
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
      <Navbar />
      <Sidebar />
      <div className="allLovedFeedOuterContainer">
        {lovedWineTastings?.map((tasting) => {return (
        <div key={tasting?.id} className="lovedtastingContainer">
          <LovedTastingCard tasting={tasting}/>
        </div>
        )}).reverse()}
      </div>
      <Footer />
    </>
  );
};


export default AllLovedFeed;