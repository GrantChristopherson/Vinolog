import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getTastingsSearchThunk } from '../../store/tasting';
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";
import Footer from '../Footer';



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
        <span className="search_title">Search Results of {searchWord}</span>
        <div className="search_results_container">

        </div>
      </div>
      <Footer />
    </>
  );
};


export default SearchPage;