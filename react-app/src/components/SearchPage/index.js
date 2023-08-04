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
  console.log('tastings search====', tastings)
  console.log('users search====', users)


  return (
    <>
      <Navigation />
      <Sidebar />
      <div className="search_feed_page">
        <span className="search_title">Search Results of "{searchWord}"</span>
        <div className="title_types_container">
          <span className="search_title_tastings">Tastings</span>
          <span className="search_title_users">Users</span>
        </div>
        <div className="all_results_container">
          <div className="tasting_results_container">
            {tastings.map((tasting) => {return (
              <div key={tasting.id} className="search_page_tasting_container" >
              {tasting.labelImage ? <img className="tasting-image-label" src={tasting.labelImage} alt='wine label'/> 
              : <div className='default-image-container' ><i className='fa-solid fa-wine-glass-empty default-wine-image' /></div>}
              <TastingCard tasting={tasting} />
              </div>
            )}).reverse()}
          </div>
          <div className="user_results_container">
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
