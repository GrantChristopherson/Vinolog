import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCheersThunk, deleteCheersThunk } from "../../store/cheers";
import './cheers.css';




const Cheers = ({ tasting }) => {


  const dispatch = useDispatch()
  const user = useSelector(state => state?.session?.user)

  const[isCheered, setIsCheered] = useState();


  useEffect(() => {
    setIsCheered(tasting?.cheers_by?.includes(user?.id));
   }, [isCheered]);


  const cheersHandler = async() =>{

    if (!isCheered) {
      await dispatch(createCheersThunk(tasting?.id, user?.id));
      setIsCheered(true)
    } else {
      await dispatch(deleteCheersThunk(tasting?.id, user?.id));
      setIsCheered(false)
    };
  };

  return (
    <div className="cheers_counter_container">
      <div >
          <button className="cheers_button"  onClick={cheersHandler}>
            {isCheered ? <i className="fa-solid fa-heart likedIcon"></i> :
            <i className="fa-regular fa-heart uncheers_button"></i>}
          </button>
      </div>
      <div className="cheers_container">
          <p className="cheers">{tasting?.cheers_by?.length}</p>
      </div>
    </div>
  );
};


export default Cheers;