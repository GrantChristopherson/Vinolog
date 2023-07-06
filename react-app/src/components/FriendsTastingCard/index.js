import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './friendsTastingCard.css';




const FriendsTastingCard = ({ tasting }) => {




  return (
    <div className="friend_tasting_outer">
      {tasting.producer}
    </div>
  );
};


export default FriendsTastingCard;