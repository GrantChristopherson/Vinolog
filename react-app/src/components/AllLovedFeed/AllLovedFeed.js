import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllLovedTastingsThunk } from '../../store/tasting';
import LovedTastingCard from "../LovedTastingCard/LovedTastingCard";
import Sidebar from '../Sidebar/Sidebar';
import './allLovedFeed.css';




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
      <Sidebar />
      <div className="allLovedFeedOuterContainer">
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
    </>
  );
};


export default AllLovedFeed;