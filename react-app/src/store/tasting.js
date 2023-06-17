const GET_MY_TASTINGS = 'tastings/GET_MY_TASTINGS';
const GET_ALL_LOVED_TASTINGS = 'tastings/GET_ALL_LOVED_TASTINGS';
const CREATE_TASTING = 'tastings/CREATE_TASTING';
const EDIT_TASTING = 'tasting/EDIT_TASTING';
const DELETE_TASTING = 'tasting/DELETE_TASTING';


// ---------------------------------------------action creators-----------------------------------

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


const editTasting = (tasting) => {
  return {
    type: EDIT_TASTING,
    tasting
  }
}


const deleteTasting = (tastingId) => {
  return {
    type: DELETE_TASTING,
    tastingId
  }
}


// --------------------------------------------thunk action creators---------------------------------

export const getMyTastingsThunk = () => async(dispatch) => {
  const response = await fetch('/api/tastings/', {
    headers: {}
  });
  const tastings = await response.json();
  dispatch(getMyTastings(tastings?.tastings));
};


export const getAllLovedTastingsThunk = () => async(dispatch) => {
  const response = await fetch('/api/tastings/loved', {
    headers: {}
  });
  const tastings = await response.json();
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
      color: tasting.color,
      label_image: tasting.labelImage,
      other_info: tasting.otherInfo,
      sight: tasting.sight,
      nose: tasting.nose,
      palate: tasting.palate,
      thoughts: tasting.thoughts,
      love: tasting.love
    }),
  });

  if (response.ok) {
    const data = await response.json();
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


export const editTastingThunk = (tasting) => async(dispatch) => {
  const response = await fetch(`/api/tastings/edit/${tasting.id}`, {
    method: 'PUT',
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
    dispatch(editTasting(data))
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


export const deleteTastingThunk = (tastingId) => async(dispatch) => {
  const response = await fetch(`/api/tastings/${tastingId}`, {
    method: 'DELETE',
  })

  await response.json();
  dispatch(deleteTasting(tastingId));
  return response
};




// ----------------------------------------reducer----------------------------------------------------


const initialState = { userTastings: [], lovedTastings: [] };
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_MY_TASTINGS: {
      newState = {...state, userTastings:[...action?.tastings], lovedTastings:[...state?.lovedTastings]}
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
        newState = {...state, userTastings:[...state?.userTastings, action?.tasting], lovedTastings:[...state?.lovedTastings]}
        newState[action?.tasting.id] = action?.tasting
        return newState;
      } else {
        newState = {...state, userTastings:[...state?.userTastings, action?.tasting], lovedTastings:[...state?.lovedTastings, action?.tasting]}
        newState[action?.tasting.id] = action?.tasting
        return newState;
      };
    };
    case EDIT_TASTING: {
      state?.userTastings?.forEach((tasting, i) => {
        if (tasting?.id === action?.tasting?.id) {
          state?.userTastings.splice(i, 1, action?.tasting)
        };
      });
      state?.lovedTastings?.forEach((tasting, i) => {
        if (tasting?.id === action?.tasting?.id) {
          state?.lovedTastings.splice(i, 1, action?.tasting)
        };
      });
      state[action?.tasting?.id] = action?.tasting
      newState = {...state, userTastings:[...state?.userTastings], lovedTastings:[...state?.lovedTastings]}
      return newState;
    };
    case DELETE_TASTING: {
      delete state?.action?.tastingId
      let newUserTastings = state?.userTastings?.filter((tasting) => tasting?.id !== action?.tastingId)
      let newLovedTastings = state?.lovedTastings?.filter((lovedTasting) => lovedTasting?.id !== action?.tastingId)

      newState = {...state, userTastings:[...newUserTastings], lovedTastings:[...newLovedTastings]}
      return newState
    };
    default: {
      return state;
    };
  };
};
      