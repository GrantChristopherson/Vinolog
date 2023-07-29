import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getTastingsSearchThunk } from '../../store/tasting';
import TastingCard from "../TastingCard";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import Footer from '../Footer';
import './searchPage.css';



const SearchPage = () => {

  const dispatch = useDispatch();
  const { searchWord } = useParams();
  const tastings = useSelector(state => Object.values(state.tastings.tastings));
  console.log('tastings search====', tastings)

  useEffect(() => {
    if (!searchWord) return;
    
    (() => dispatch(getTastingsSearchThunk(searchWord)))();
  }, [dispatch, searchWord]);


  return (
    <>
      <Navigation />
      <Sidebar />
      <div className="search_feed_page">
        <span className="search_title">Search Results of "{searchWord}"</span>
        <div className="search_results_container">
          {tastings.map((tasting) => {return (
            <div key={tasting.id} className="search_tasting_container" >
            {tasting.labelImage ? <img className="tasting-image-label" src={tasting.labelImage} alt='wine label'/> 
            : <div className='default-image-container' ><i className='fa-solid fa-wine-glass-empty default-wine-image' /></div>}
            <TastingCard tasting={tasting} />
          </div>
        )}).reverse()}
        </div>
      </div>
      <Footer />
    </>
  );
};


export default SearchPage;