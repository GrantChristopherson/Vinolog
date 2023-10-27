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
      </div>
      <Footer />
    </>
  );
};


export default UserPage;