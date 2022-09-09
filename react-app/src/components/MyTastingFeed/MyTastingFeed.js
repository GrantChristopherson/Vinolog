import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyTastingsThunk } from '../../store/tasting';
import TastingCard from "../TastingCard/TastingCard";
import Sidebar from "../Sidebar/Sidebar";
import './myTastingFeed.css';




const MyTastingFeed = () => {

  const dispatch = useDispatch();
  // const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state?.session?.user);
  const userTastings = useSelector(state => state?.tastings.userTastings);


  useEffect(() => {
    (async()=>{
      await dispatch(getMyTastingsThunk());

    })();
  }, [dispatch])


  return (
    <div className="myTastingFeedOuterContainer">
      <Sidebar user={user} />
      <div className="myTastingFeedInnerContainer">
        {userTastings?.map((tasting) => {return (
        <div key={tasting.id} className="tastingContainer">
          <TastingCard tasting={tasting}/>
        </div>
        )})}
      </div>
    </div>
  );
};


export default MyTastingFeed;