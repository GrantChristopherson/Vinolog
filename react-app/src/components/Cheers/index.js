import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCheersThunk, deleteCheersThunk } from "../../store/tasting";
import './cheers.css';




const Cheers = ({ tasting }) => {


  const dispatch = useDispatch()
  const user = useSelector(state => state?.session?.user)
  const[isCheered, setIsCheered] = useState(tasting?.cheers_by?.includes(user?.id));

  console.log('Initial isCheered:', isCheered);
  console.log('tasting.cheers_by:', tasting?.cheers_by);
  console.log('user?.id:', user?.id);

  useEffect(() => {
    if (tasting && tasting.cheers_by) {
      setIsCheered(tasting.cheers_by.includes(user?.id));
    }
  }, [tasting, user?.id]);


  const cheersHandler = async(e) =>{
    e.preventDefault();
    if (!isCheered) {
      await dispatch(createCheersThunk(tasting?.id, user?.id));
    } else {
      await dispatch(deleteCheersThunk(tasting?.id, user?.id));
    };
    setIsCheered(prevIsCheered => !prevIsCheered);
  };




  return (
    <div className="cheers_container">
      <p className="cheers_counter">{tasting?.cheers_by?.length}</p>
      <button className="cheers_button"  onClick={cheersHandler}>
        {isCheered ? <i className="fa-solid fa-wine-glass cheered_icon"></i> :
        <i className="fa-solid fa-wine-glass-empty uncheered_icon"></i>}
      </button>
    </div>
  );
};


export default Cheers;