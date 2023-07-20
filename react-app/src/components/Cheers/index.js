import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCheersThunk, deleteCheersThunk } from "../../store/cheers";
import './cheers.css';




const Cheers = ({ tasting }) => {


  const dispatch = useDispatch()
  const user = useSelector(state => state?.session?.user)
  const[isCheered, setIsCheered] = useState(tasting?.cheers_by?.includes(user?.id));

  console.log('earlycheers=====', tasting.cheers_by.length)

  useEffect(() => {
    setIsCheered(tasting?.cheers_by?.includes(user?.id));
    
  }, [dispatch, tasting?.cheers_by]);

  useEffect(() => {
    if (tasting && tasting.cheers_by) {
      setIsCheered(tasting.cheers_by.includes(user?.id));
    }
  }, [tasting.cheers_by, user?.id]);


  const cheersHandler = async() =>{
    console.log('earlycheershandler=====', tasting.cheers_by.length)
    if (!isCheered) {
      await dispatch(createCheersThunk(tasting?.id, user?.id));
      console.log('cheersCreatehandler=====', tasting.cheers_by.length)
    } else {
      await dispatch(deleteCheersThunk(tasting?.id, user?.id));
      console.log('cheersDeletehandler=====', tasting.cheers_by.length)
    };
    setIsCheered(prevIsCheered => !prevIsCheered);
  };




  return (
    <div className="cheers_counter_container">
        <button className="cheers_button"  onClick={cheersHandler}>
          {isCheered ? <i className="fa-solid fa-wine-glass cheered_icon"></i> :
          <i className="fa-solid fa-wine-glass-empty uncheered_icon"></i>}
        </button>
        <p className="cheers">{tasting?.cheers_by?.length}</p>
    </div>
  );
};


export default Cheers;