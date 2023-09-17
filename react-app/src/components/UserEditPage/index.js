import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import UserEditForm from "../UserEditForm";
import './userEditPage.css';




const UserEditPage = () => {



  
  return (
    <>
      <Navigation />
      <div className="sidebar_body_container">
        <Sidebar />
        <div className="feed_page">
          <div className="user_body">
            <UserEditForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default UserEditPage;