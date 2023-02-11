
const GET_CHEERED_TASTINGS = 'cheered/GET_CHEERED_TASTINGS';
const CREATE_CHEERS = 'cheers/CREATE_CHEERS';
const DELETE_CHEERS = 'cheers/DELETE_CHEERS';


//----------------------action creator-------------------------------------------

const getAllUsersCheers = (cheeredTastings) => {
  return {
    type: GET_CHEERED_TASTINGS,
    cheeredTastings
  }
}


const createCheers = (cheeringTasting, userId) => {
  return {
    type: CREATE_CHEERS,
    cheeringTasting,
    userId
  }
}


const deleteCheers = (cheeredTasting, userId) => {
  return {
    type: DELETE_CHEERS,
    cheeredTasting,
    userId
  }
}


//----------------------thunk action creator---------------------------------------

export const getUserCheersThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/cheers`, {
    headers: {}
  });

  const tastings = await response.json()
  dispatch(getAllUsersCheers(tastings.cheers))
};


export const createCheersThunk = (tastingId, userId) => async(dispatch) => {
  const response = await fetch(`/api/tastings/${tastingId}/cheers`, {
    method: 'PUT',
    headers: {}
  });

  const cheers = await response.json()
  dispatch(createCheers(cheers.cheers, userId))
};


export const deleteCheersThunk = (tastingId, userId) => async(dispatch) => {
  const response = await fetch(`/api/tastings/${tastingId}/cheers`, {
    method: 'DELETE',
  });

  const cheers = await response.json()
  dispatch(deleteCheers(cheers.cheers, userId))
};




//----------------------------reducer----------------------------------------------

const initialState = { tastingCheers: [] }
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_CHEERED_TASTINGS: {
      newState = {...state, tastingCheers: [...action?.tastingCheers]}
      return newState
    };
    case CREATE_CHEERS: {
      state?.tastings?.forEach((tasting => {
        if (tasting?.id === action?.tastingCheers?.id) {
          let myIndex = tasting?.cheers_by?.indexOf(action?.userId);
          if (myIndex === -1) {
            tasting?.cheers_by?.push(action?.userId)
          };
        };
      }));
      newState = {...state, tastingCheers: [...state?.tastingCheers, action?.cheeredTasting]}
      return newState
    };
    case DELETE_CHEERS: {
      state?.tastings?.forEach((tasting => {
        if (tasting?.id  === action?.cheeredTasting?.id) {
          let myIndex = tasting?.cheers_by?.indexOf(action?.userId);
          if (myIndex !== -1) {
            tasting?.cheers_by?.splice(myIndex, 1);
          };
        };
      }));
      let sortedCheeredTastings = state?.tastingCheers?.filter((tasting) => tasting?.id !== action?.cheeredTasting)
      newState = {...state, tastingCheers: [...sortedCheeredTastings]}
      return newState
    }
    default:
      return state;
  };
};