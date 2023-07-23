// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const GET_ALL_USERS = 'session/GET_ALL_USERS';


// ---------------------------------------------action creators-----------------------------------

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});


const removeUser = () => ({
  type: REMOVE_USER,
});


const getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users: Array.isArray(users) ? users : [users]
});



// --------------------------------------------thunk action creators---------------------------------

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  };
};


export const signUp = (username, email, profile_image, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      profile_image,
      password,
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
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


export const getAllUsersThunk = () => async(dispatch) => {
  const response = await fetch('/api/users/', {
    headers: {}
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllUsers(data.users))
  };
};




// ----------------------------------------reducer----------------------------------------------------

const initialState = { user: null, users: {} };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case GET_ALL_USERS:
      const users = action.users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});
      return { ...state, users: { ...state.users, ...users } };
    default:
      return state;
  };
};
