import { setError, clearError } from './error.js';


const GET_MY_FIELD = 'field/GET_MY_FIELD';
const GET_FRIENDEDS = 'field/GET_FRIENDEDS';
const CREATE_FRIEND = 'friends/CREATE_FRIEND';
const DELETE_FRIEND = 'friends/DELETE_FRIEND';


// ---------------------------------------------action creators-----------------------------------

const getMyField = (friends) => {
  return {
    type: GET_MY_FIELD,
    friends
  };
};


const getFriendeds = (friendeds) => {
  return {
    type: GET_FRIENDEDS,
    friendeds
  };
};


const createFriend = (friends) => {
  return {
    type: CREATE_FRIEND,
    friends
  };
};


const deleteFriend = (friends) => {
  return {
    type: DELETE_FRIEND,
    friends
  };
};


// --------------------------------------------thunk action creators---------------------------------

export const getMyFieldThunk = (id) => async(dispatch) => {
  try {
    const response = await fetch(`/api/users/${id}/following`, {
      headers: {}
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      dispatch(getMyField(data));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};


export const getFriendedsThunk = (id) => async(dispatch) => {
  try {
    const response = await fetch(`/api/users/${id}/followers`, {
      headers: {}
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      dispatch(getFriendeds(data.friendeds));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};


export const createFriendThunk = (id, newfriendId) => async(dispatch) => {
  try {
    const response = await fetch(`/api/users/${id}/following/${newfriendId}`, {
      method: 'PUT'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      dispatch(createFriend(data));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};


export const deleteFriendThunk = (id, deleteId) => async(dispatch) => {
  try {
    const response = await fetch(`/api/users/${id}/following/${deleteId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      dispatch(deleteFriend(data));
      dispatch(clearError());
    };
  } catch (error) {
    dispatch(setError(error.message));
  };
};




// ----------------------------------------reducer----------------------------------------------------

const initialState = { friends: {}, friendeds: {} };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MY_FIELD: {
      const { friends } = action;
      const updatedFriends = friends.followed.reduce((acc, friend) => {
        acc[friend.id] = friend;
        return acc;
      }, {});

      return {
        ...state,
        friends: updatedFriends,
      };
    }
    case GET_FRIENDEDS: {
      const { friendeds } = action;
      const updatedFriendeds = friendeds.reduce((acc, friended) => {
        acc[friended.id] = friended;
        return acc;
      }, {});

      return {
        ...state,
        friendeds: updatedFriendeds,
      };
    }
    case CREATE_FRIEND: {
      const { friends } = action;
      const updatedFriends = friends.followings.reduce((acc, friend) => {
        acc[friend.id] = friend;
        return acc;
      }, {});

      return {
        ...state,
        friends: updatedFriends,
      };
    }
    case DELETE_FRIEND: {
      const { friends } = action;
      const updatedFriends = friends.followings.reduce((acc, friend) => {
        acc[friend.id] = friend;
        return acc;
      }, {});

      return {
        ...state,
        friends: updatedFriends,
      };
    }
    default: 
      return state;
  }
};