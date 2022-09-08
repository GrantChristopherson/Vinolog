import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllLovedTastingsThunk } from '../../store/tasting';
import LovedTastingCard from "../LovedTastingCard/LovedTastingCard";
import './allLovedFeed.css';




const AllLovedFeed = () => {

  const dispatch = useDispatch();
  // const user = useSelector(state => state?.session?.user);
  const lovedWineTastings = useSelector(state => state?.tastings.lovedTastings);


  useEffect(() => {
    (async()=>{
      await dispatch(getAllLovedTastingsThunk());
    })();
  }, [dispatch]);



  return (
    <div className="allLovedFeedOuterContainer">
      <div className="allLovedFeedInnerContainer">
        {lovedWineTastings?.map((tasting) => {return (
        <div key={tasting?.id} className="lovedtastingContainer">
          <LovedTastingCard tasting={tasting}/>
        </div>
        )})}
      </div>
    </div>
  );
};


export default AllLovedFeed;