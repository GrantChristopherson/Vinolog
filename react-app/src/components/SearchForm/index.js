import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTastingsSearchThunk } from '../../store/search';
import './searchForm.css';




const SearchForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [searchWord, setSearchWord] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const [searchUsers, setSearchUsers] = useState(false);
  const [searchTastings, setSearchTastings] = useState(false);

  const updateSearch = (e) => {
    setSearchWord(e.target.value)
  };
  
  const toggleSearchUsers = () => {
    setSearchUsers(!searchUsers);
    setSearchTastings(false);
    setSearchOption(!searchUsers ? 'users' : ''); 
  };
  
  const toggleSearchTastings = () => {
    setSearchTastings(!searchTastings);
    setSearchUsers(false);
    setSearchOption(!searchTastings ? 'tastings' : ''); 
  };
  
  const getPlaceholder = () => {
    if (searchUsers) return "Search Usernames...";
    if (searchTastings) return "Search Wines...";
    return "Search Wines and Usernames...";
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (searchWord === '') return

    await dispatch(getTastingsSearchThunk(searchWord, searchOption)).then(() => {
      history.push(`/search/${searchWord}`);
    });
  };
  



  return (
    <form onSubmit={submitHandler}>
      <input className='search_input'
        type="text"
        placeholder={getPlaceholder()}
        value={searchWord}
        onChange={updateSearch}
      />
      <button className='search_submit_button' type='submit'>
        <i className='fa-solid fa-magnifying-glass fa-rotate-90' />
      </button>
      <div className='search_toggle_container'>
        <div className='search_option_container'>
          <label className='search_option_label'>Wine Only
            <input className='user_options_input'
              type="checkbox"
              name='tasting_search_checkbox'
              checked={searchTastings}
              onChange={toggleSearchTastings}
            />
            <span></span></label>
        </div>
        <div className='search_option_container'>
          <label className='search_option_label'>Username Only
            <input className='user_options_input'
              type="checkbox"
              id="checkbox"
              name='user_search_checkbox'
              checked={searchUsers}
              onChange={toggleSearchUsers}
              />
            <span></span></label>
        </div>
      </div>
    </form>
  );
};


export default SearchForm;