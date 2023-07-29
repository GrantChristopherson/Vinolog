import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './searchForm.css';




const SearchForm = () => {

  const history = useHistory();
  const [searchWord, setSearchWord] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    history.push(`/search/${searchWord}`);
  };

  const updateSearch = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <>
      <div className='search_form_container'>
        <form className='search_form' onSubmit={submitHandler}>
          <input className='search_input'
            type="text"
            placeholder="Search..."
            value={searchWord}
            onChange={updateSearch}
          />
          <button className='search_submit_button' type='submit'>
            <i className='fa-solid fa-magnifying-glass fa-rotate-90' />
          </button>
        </form>
      </div>
    </>
  );
};


export default SearchForm;