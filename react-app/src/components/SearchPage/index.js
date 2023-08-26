import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import SearchedUser from "../SearchedUser";
import TastingCard from "../TastingCard";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import Footer from '../Footer';
import './searchPage.css';



const SearchPage = () => {

  const { searchWord } = useParams();
  const tastings = useSelector(state => Object.values(state.search.tastings));
  const users = useSelector(state => Object.values(state.search.users))
  
  


  return (
    <>
      <Navigation />
      <div className="sidebar_body_container">
        <Sidebar />
        <div className="search_feed_page">
          <span className="search_title">Search of "{searchWord}"</span>
          <span className="search_title_tastings">Wine results:</span>
          <div className="feed_container">
          {tastings.map((tasting) => {return (
            <div key={tasting.id} className="tasting_card" >
            <TastingCard tasting={tasting} />
            </div>
          )}).reverse()}
          </div>
          <div className="user_results_container">
            <span className="search_title_users">User results:</span>
            {users.map((user) => {return (
              <div key={user.id} className="search_page_user_container" >
                <SearchedUser user={user}/>
              </div>
            )})}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default SearchPage;
