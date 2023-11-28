import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMyTastingsThunk } from '../../store/tasting';
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import './userPage.css';


// connect to api queries for appropriate stats, user's cheers count and other users cheersing your tastings

const UserPage = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state?.session?.user);
  const tastings = useSelector(state => Object.values(state.tasting.tastings));
  const userTastings = tastings.filter(tasting => tasting.user.id === user?.id);
  const lovedTastings = tastings.filter(tasting => tasting.love === true && tasting.user.id === user?.id);
  const friends = useSelector((state) => Object.values(state.field.friends));

  
  const tastingTotal = () => {
    return userTastings.length;
  };

  const loved = () => {
    return lovedTastings.length;
  };

  const friendCount = (friends) => {
    return friends.length; 
  };


  useEffect(() => {
    (()=> dispatch(getMyTastingsThunk()))();
  }, [dispatch])

  

  
  return (
    <>
      <Navigation />
      <div className="sidebar_body_container">
        <Sidebar />
        <div className="user_page">
          <div className="user_body">
            <h2 className='profile_header'>{`${user.username}'s Profile`}</h2>
            <div className="profile_image_bio_container">
              <div className="user_profile_image_container">
                {user.profileImage ? <img className='user_profile_image' src={user.profileImage} alt='profile'/>
                : <i className='fa-solid fa-user default-profile-image' />}
              </div>
              <span className="profile_bio">{user.bio}</span>
            </div>
            <div className="edit_user_container">
              <NavLink to={`/profile/${user.id}/edit`} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
                <h4 className='edit_user' >Edit</h4>
              </NavLink>
            </div>
          </div>
        </div>
        <div className='stat_list_container'>
          <span className='field_title'>Your Stats</span>
          <div className='stats_list'>
            <div className="field_list_item">
              <h5>Total Tastings : </h5><h6>{tastingTotal()}</h6>
            </div>
            <div className="field_list_item">
              <h5>Loved Tastings : </h5><h6>{loved()}</h6>
            </div>
            <div className="field_list_item">
              <h5>Friends In Your Field : </h5><h6>{friendCount(friends)}</h6>
            </div>
            {/* <div className="field_list_item">
              <h5>Tastings You've Cheered : </h5><h6>{}</h6>
            </div>
            <div className="field_list_item">
              <h5>User's Cheered Your Tastings : </h5><h6>{}</h6>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default UserPage;