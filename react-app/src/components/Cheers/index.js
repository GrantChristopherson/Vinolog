import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCheersThunk, deleteCheersThunk } from "../../store/tasting";
import './cheers.css';




const Cheers = ({ tasting }) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state?.session?.user);
  const[isCheered, setIsCheered] = useState(tasting?.cheers_by?.includes(user?.id));

  useEffect(() => {
    if (tasting && tasting.cheers_by) {
      setIsCheered(tasting.cheers_by.includes(user?.id));
    }
  }, [tasting, user?.id]);

  const cheersCounterCheck = tasting.cheers_by.length === 0 ? false : true;
  const usersIconCountCheck = user.id === tasting.user.id && tasting.cheers_by.length === 0 ? false : true;
  const cheersButtonClass = user.id === tasting.user.id ? "user_cheers_button" : "cheers_button";
  const cheeredIconClass = user.id === tasting.user.id ? "fa-solid fa-wine-glass user_cheered_icon" : "fa-solid fa-wine-glass cheered_icon";
  const uncheeredIconClass = user.id === tasting.user.id ? "fa-solid fa-wine-glass user_uncheered_icon" : "fa-solid fa-wine-glass-empty uncheered_icon";

  const cheersHandler = (e) =>{
    e.stopPropagation();
    if (user.id === tasting.user.id) return;
    if (!isCheered) {
      dispatch(createCheersThunk(tasting?.id, user?.id));
    } else {
      dispatch(deleteCheersThunk(tasting?.id, user?.id));
    };
    setIsCheered(prevIsCheered => !prevIsCheered);
  };




  return (
    <>
    {usersIconCountCheck && <div className="cheers_container">
      {cheersCounterCheck && <p className="cheers_counter">{tasting?.cheers_by?.length}</p>}
      <button className={cheersButtonClass}  onClick={(e) => {cheersHandler(e)}}>
        {isCheered ? <i className={cheeredIconClass}></i> : <i className={uncheeredIconClass}></i>}
      </button>
    </div>}
    </>
  );
};


export default Cheers;