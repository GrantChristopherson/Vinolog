import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyTastingsThunk } from '../../store/tasting';
import TastingCard from "../TastingCard/TastingCard";
import Sidebar from "../Sidebar/Sidebar";
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
      <Sidebar user={user} />
      <div className="myTastingFeedOuterContainer">
        {userTastings?.map((tasting) => {return (
        <div key={tasting.id} className="tastingFeedInnerContainer">
          <TastingCard tasting={tasting}/>
        </div>
        )}).reverse()}
      </div>
      <footer>
        <div className='footerMyWineTastingsContainer'>
          <h4 className='myWineTastingsFooterPhrase'>My Wine Tastings</h4>
        </div>
      </footer>
    </>
  );
};


export default MyTastingFeed;