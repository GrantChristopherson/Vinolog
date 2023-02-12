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
  const response = await fetch(`/api/users/${id}/following`, {
    headers: {}
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getMyField(data));
  };
};


export const getFriendedsThunk = (id) => async(dispatch) => {
  const response = await fetch(`/api/users/${id}/followers`, {
    headers: {}
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getFriendeds(data.friendeds));
  };
};


export const createFriendThunk = (id, newfriendId) => async(dispatch) => {
  const response = await fetch(`/api/users/${id}/following/${newfriendId}`, {
    method: 'PUT'
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createFriend(data));
  };
};


export const deleteFriendThunk = (id, deleteId) => async(dispatch) => {
  const response = await fetch(`/api/users/${id}/following/${deleteId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    const data = await response.json();
    console.log('thunk data=====', data)
    dispatch(deleteFriend(data));
  };
};




// ----------------------------------------reducer----------------------------------------------------


const initialState = { friends: [], friendeds: [] };
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_MY_FIELD: {
      newState = {...state, friends:[...action?.friends?.followed], friendeds:[...state?.friendeds]}
      action?.friends?.followed?.forEach((friend) => {
        newState[friend?.id] = friend
      });
      return newState;
    };
    case GET_FRIENDEDS: {
      newState = {...state, friends:[...state?.friends], friendeds:[...action?.friendeds]}
      action?.friendeds?.forEach((friended) => {
        newState[friended?.id] = friended
      });
      return newState;
    };
    case CREATE_FRIEND: {
      newState = {...state, friends:[...action?.friends?.followings], friendeds:[...state?.friendeds]}
      action?.friends?.followings?.forEach((friend) => {
        newState[friend.id] = friend
      });
      return newState;
    };
    case DELETE_FRIEND: {
      console.log('reducer=====', action.friends)
      newState = {...state, friends:[...action?.friends?.followings], friendeds:[...state?.friendeds]}
      action?.friends?.followings?.forEach((friend) => {
        newState[friend.id] = friend
      });
      return newState;
    };
    default: {
      return state;
    };
  };
};