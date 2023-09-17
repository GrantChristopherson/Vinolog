import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import './userPage.css';




const UserPage = () => {

  const user = useSelector(state => state?.session?.user);

  
  return (
    <>
      <Navigation />
      <div className="sidebar_body_container">
        <Sidebar />
        <div className="feed_page">
          <div className="user_body">
            <h2 className='user_header'>{`${user.username}'s Profile`}</h2>
            <div className="profile_image_bio_container">
              <div className="profile_image">{user.profileImage}</div>
              <span>{user.bio}</span>
            </div>
            <NavLink to={`/profile/${user.id}/edit`} exact={true} activeClassName='active' style={{textDecoration: 'none'}}>
              <h4 className='edit_user' >Edit</h4>
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default UserPage;