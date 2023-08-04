const GET_SEARCH = 'search/GET_SEARCH';


// ---------------------------------------------action creators-----------------------------------

const getSearch = (results, option) => {
  return {
    type: GET_SEARCH,
    results,
    option
  };
};


// --------------------------------------------thunk action creators---------------------------------

export const getTastingsSearchThunk = (searchWord, option) => async(dispatch) => {
  const response = await fetch(`/api/tastings/search?search_word=${searchWord}&option=${option}`, {
    headers: {}
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    const results = await response.json();
    dispatch(getSearch(results, option));
    
    return Promise.resolve(results);
  };
};




// ----------------------------------------reducer----------------------------------------------------

const initialState = { tastings: {}, users: {} };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH: {
      let newState = { ...state };
      console.log('reducer action results tastings=====', action.results.tastings)
      newState.tastings = action.results.tastings.reduce((acc, tasting) => {
        acc[tasting.id] = tasting;
        return acc;
      }, {});
      console.log('reducer action results users=====', action.results.users)
      newState.users = action.results.users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});

      return newState;
    };
    default: 
    return state;
  };
};