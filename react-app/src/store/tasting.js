import { setError, clearError } from './error.js';


const GET_MY_TASTINGS = 'tastings/GET_MY_TASTINGS';
const GET_ALL_LOVED_TASTINGS = 'tastings/GET_ALL_LOVED_TASTINGS';
const GET_FRIENDS_TASTINGS = 'tastings/GET_FRIENDS_TASTINGS';
const GET_ALL_FRIENDS_TASTINGS = 'tastings/GET_ALL_FRIENDS_TASTINGS';
const CREATE_TASTING = 'tastings/CREATE_TASTING';
const EDIT_TASTING = 'tasting/EDIT_TASTING';
const DELETE_TASTING = 'tasting/DELETE_TASTING';
const GET_CHEERED_TASTINGS = 'cheered/GET_CHEERED_TASTINGS';
const CREATE_CHEERS = 'cheers/CREATE_CHEERS';
const DELETE_CHEERS = 'cheers/DELETE_CHEERS';


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


const getFriendsTastings = (friendTastings) => {
  return {
    type: GET_FRIENDS_TASTINGS,
    friendTastings
  };
};


const getAllFriendsTastings = (friendsTastings) => {
  return {
    type: GET_ALL_FRIENDS_TASTINGS,
    friendsTastings
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
  };
};


const deleteTasting = (tastingId) => {
  return {
    type: DELETE_TASTING,
    tastingId
  };
};


const getAllUsersCheers = (cheeredTastings) => {
  return {
    type: GET_CHEERED_TASTINGS,
    cheeredTastings
  };
};


const createCheers = (cheeringTasting, userId) => {
  return {
    type: CREATE_CHEERS,
    cheeringTasting,
    userId
  };
};


const deleteCheers = (cheeredTasting, userId) => {
  return {
    type: DELETE_CHEERS,
    cheeredTasting,
    userId
  };
};



// --------------------------------------------thunk action creators---------------------------------

export const getMyTastingsThunk = () => async(dispatch) => {
  try {
    const response = await fetch('/api/tastings/', {
      headers: {}
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const tastings = await response.json();
      dispatch(getMyTastings(tastings.tastings));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};


export const getAllLovedTastingsThunk = () => async(dispatch) => {
  try {
    const response = await fetch('/api/tastings/loved', {
      headers: {}
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const tastings = await response.json();
      dispatch(getAllLovedTastings(tastings.tastings));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};


export const getFriendsTastingsThunk = (friendId) => async(dispatch) => {
  try {
    const response = await fetch(`/api/tastings/friends/${friendId}`, {
      headers: {}
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const tastings = await response.json();
      dispatch(getFriendsTastings(tastings.tastings));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};


export const getAllFriendsTastingsThunk = (userIds) => async(dispatch) => {
  try {
    const response = await fetch(`/api/tastings/field?user_ids=${userIds.join(',')}`, {
      headers: {}
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const tastings = await response.json();
      dispatch(getAllFriendsTastings(tastings.tastings));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};


export const createTastingThunk = (tasting) => async(dispatch) => {
  try {
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
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      dispatch(createTasting(data));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};


export const editTastingThunk = (tasting) => async(dispatch) => {
  try {
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
        color: tasting.color,
        label_image: tasting.labelImage,
        other_info: tasting.otherInfo,
        sight: tasting.sight,
        nose: tasting.nose,
        palate: tasting.palate,
        thoughts: tasting.thoughts,
        love: tasting.love,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      dispatch(editTasting(data));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};


export const deleteTastingThunk = (tastingId) => async(dispatch) => {
  try {
    const response = await fetch(`/api/tastings/${tastingId}`, {
      method: 'DELETE',
    })
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      await response.json();
      dispatch(deleteTasting(tastingId));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};


export const getUserCheersThunk = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${id}/cheers`, {
      headers: {}
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const tastings = await response.json();
      dispatch(getAllUsersCheers(tastings.cheers));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};


export const createCheersThunk = (tastingId, userId) => async(dispatch) => {
  try {
    const response = await fetch(`/api/tastings/${tastingId}/cheers`, {
      method: 'PUT',
      headers: {}
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const cheers = await response.json();
      dispatch(createCheers(cheers.cheers, userId));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};


export const deleteCheersThunk = (tastingId, userId) => async(dispatch) => {
  try {
    const response = await fetch(`/api/tastings/${tastingId}/cheers`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const cheers = await response.json();
      dispatch(deleteCheers(cheers.cheers, userId));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};




// ----------------------------------------reducer----------------------------------------------------
      
const initialState = { tastings: {} };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MY_TASTINGS: {
      const myTastings = action.tastings.reduce((acc, tasting) => {
        acc[tasting.id] = tasting;
        return acc;
      }, {});
      
      return {
        ...state,
        tastings: { ...state.tastings, ...myTastings },
      };
    }
    case GET_ALL_LOVED_TASTINGS: {
      const lovedTastings = action.lovedTastings.reduce((acc, tasting) => {
        acc[tasting.id] = tasting;
        return acc;
      }, {});
      
      return {
        ...state,
        tastings: { ...state.tastings, ...lovedTastings },
      };
    }
    case GET_FRIENDS_TASTINGS: {
      const friendTastings = action.friendTastings.reduce((acc, tasting) => {
        acc[tasting.id] = tasting;
        return acc;
      }, {});
      
      return {
        ...state,
        tastings: { ...state.tastings, ...friendTastings },
      };
    }
    case GET_ALL_FRIENDS_TASTINGS: {
      const friendsTastings = action.friendsTastings.reduce((acc, tasting) => {
        acc[tasting.id] = tasting;
        return acc;
      }, {});
      
      return {
        ...state,
        tastings: { ...state.tastings, ...friendsTastings},
      };
    }
    case CREATE_TASTING: {
      const { tasting } = action;
      
      return {
        ...state,
        tastings: {
          ...state.tastings,
          [tasting.id]: tasting,
        },
      };
    }
    case EDIT_TASTING: {
      const { tasting } = action;

      return {
        ...state,
        tastings: {
          ...state.tastings,
          [tasting.id]: tasting,
        },
      };
    }
    case DELETE_TASTING: {
      const { tastingId } = action;
      const { [tastingId]: deletedTasting, ...updatedTastings } = state.tastings;

      return {
        ...state,
        tastings: updatedTastings,
      };
    }
    case CREATE_CHEERS: {
      const { cheeringTasting, userId } = action;
      const tasting = state.tastings[cheeringTasting.id];
      
      if (tasting) {
        const updatedTasting = {
          ...tasting,
          cheers_by: tasting.cheers_by.includes(userId) ? tasting.cheers_by : [...tasting.cheers_by, userId],
        };

        return {
          ...state,
          tastings: {
            ...state.tastings,
            [cheeringTasting.id]: updatedTasting,
          },
        };
      };
      return state;
    }
    case DELETE_CHEERS: {
      const { cheeredTasting, userId } = action;
      const tasting = state.tastings[cheeredTasting.id];
      
      if (tasting) {
        const updatedTasting = {
          ...tasting,
          cheers_by: tasting.cheers_by.filter((cheerUserId) => cheerUserId !== userId),
        };

        return {
          ...state,
          tastings: {
            ...state.tastings,
            [cheeredTasting.id]: updatedTasting,
          },
        };
      };
      return state;
    }
    default: 
      return state;
  }
};
      