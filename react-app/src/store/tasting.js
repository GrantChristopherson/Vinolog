const GET_MY_TASTINGS = 'tastings/GET_MY_TASTINGS';
const GET_ALL_LOVED_TASTINGS = 'tastings/GET_ALL_LOVED_TASTINGS';
const CREATE_TASTING = 'tastings/CREATE_TASTING';


// ---------------------------------------------action creator-----------------------------------

const getMyTastings = (tastings) => {
  return {
    type: GET_MY_TASTINGS,
    tastings
  };
};


const getAllLovedTastings = (lovedTastings) => {
  return {
    type: GET_ALL_LOVED_TASTINGS,
    lovedTastings
  };
};


const createTasting = (tasting) => {
  return {
    type: CREATE_TASTING,
    tasting
  };
};




// --------------------------------------------thunk action creator---------------------------------

export const getMyTastingsThunk = () => async(dispatch) => {
  const response = await fetch('/api/tastings/', {
    headers: {}
  });
  const tastings = await response.json();
  console.log('myTastings--------------', tastings)
  dispatch(getMyTastings(tastings?.tastings));
};


export const getAllLovedTastingsThunk = () => async(dispatch) => {
  const response = await fetch('/api/tastings/loved', {
    headers: {}
  });
  const tastings = await response.json();
  console.log('allLovedTastings-------------', tastings)
  dispatch(getAllLovedTastings(tastings?.tastings));
};


export const createTastingThunk = (tasting) => async(dispatch) => {
  const response = await fetch('/api/tastings/user/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      producer: tasting.producer,
      region: tasting.region,
      vineyard: tasting.vineyard,
      varietal: tasting.varietal,
      vintage: tasting.vintage,
      other_info: tasting.other_info,
      sight: tasting.sight,
      nose: tasting.nose,
      palate: tasting.palate,
      thoughts: tasting.thoughts,
      love: tasting.love
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("fetchedData------------------", data)
    dispatch(createTasting(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    };
  } else {
    return ['An error occurred. Please try again.']
  };
};




// ----------------------------------------reducer----------------------------------------------------


const initialState = { userTastings: [], lovedTastings: []};
export default function tastingReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case GET_MY_TASTINGS: {
      newState = {...state, userTastings:[...action?.userTastings], lovedTastings:[...state?.lovedTastings]}
      action?.userTastings?.forEach((tasting) => {
        newState[tasting?.id] = tasting
      });
      return newState;
    };
    case GET_ALL_LOVED_TASTINGS: {
      newState = {...state, userTastings:[...state?.userTastings], lovedTastings:[...action?.lovedTastings]}
      action?.lovedTastings?.forEach((lovedTasting) => {
        newState[lovedTasting?.id] = lovedTasting
      });
      return newState;
    };
    case CREATE_TASTING: {
      if (action?.tasting.love === false) {
        newState = {...state, userTastings:[...state?.userTastings, action?.tasting], lovedTasting:[...state?.lovedTastings]}
        newState[action?.tasting.id] = action?.tasting
        return newState;
      } else {
        newState = {...state, userTastings:[...state?.userTastings, action?.tasting], lovedTasting:[...state?.lovedTastings, action?.tasting]}
        newState[action?.tasting.id] = action?.tasting
        return newState;
      };
    };
    default: {
      return state;
    };
  };
};
      