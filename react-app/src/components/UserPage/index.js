import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import './userPage.css';



const UserPage = () => {



  
  return (
    <>
      <Navigation />
      <div className="sidebar_body_container">
        <Sidebar />
        <div className="feed_page">
          <div className="user_body">
            {/* user image, username, one-liner (replacing bio) and edit links of image and one-liner */}
          </div>
        </div>
      </div>
    </>
  );
};