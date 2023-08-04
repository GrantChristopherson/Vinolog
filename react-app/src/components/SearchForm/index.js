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
    if (searchUsers) return "Search Users...";
    if (searchTastings) return "Search Wine Tastings...";
    return "Search Users and Tastings...";
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (searchWord === '') return

    await dispatch(getTastingsSearchThunk(searchWord, searchOption)).then(() => {
      history.push(`/search/${searchWord}`);
    });
  };
  



  return (
    <form className='search_form' onSubmit={submitHandler}>
      <div className='search_toggle_container'>
        <div className='search_option_container'>
          <label className='search_option_label'>Wine Only</label>
          <input className='tasting_option_input'
            type="checkbox"
            name='tasting_search_checkbox'
            checked={searchTastings}
            onChange={toggleSearchTastings}
          />
        </div>
        <div className='search_option_container'>
          <label className='search_option_label'>Username Only</label>
          <input className='user_option_input'
            type="checkbox"
            name='user_search_checkbox'
            checked={searchUsers}
            onChange={toggleSearchUsers}
          />
        </div>
      </div>
      <input className='search_input'
        type="text"
        placeholder={getPlaceholder()}
        value={searchWord}
        onChange={updateSearch}
      />
      <button className='search_submit_button' type='submit'>
        <i className='fa-solid fa-magnifying-glass fa-rotate-90' />
      </button>
    </form>
  );
};


export default SearchForm;