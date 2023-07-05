import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "../Navigation";
import Sidebar from '../Sidebar';
import Footer from "../Footer";
import './friendTastings.css';




const FriendTastings = ({ friendId }) => {

  console.log('friendId======', friendId)
  

  return (
    <>
      <Navigation />
      <Sidebar />
        {/* <div className="friends_tastings_feed">{friend.friend.username}</div> */}
      <Footer />
    </>
  );
};


export default FriendTastings;