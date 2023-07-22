const GET_MY_TASTINGS = 'tastings/GET_My_TASTINGS';
const GET_ALL_LOVED_TASTINGS = 'tastings/GET_ALL_LOVED_TASTINGS';
const GET_FRIENDS_TASTINGS = 'tastings/GET_FRIENDS_TASTINGS';
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


const getFriendsTastings = (friendsTastings) => {
  return {
    type: GET_FRIENDS_TASTINGS,
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
  }
}


const deleteTasting = (tastingId) => {
  return {
    type: DELETE_TASTING,
    tastingId
  }
}


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


export const getFriendsTastingsThunk = (friendId) => async(dispatch) => {
  const response = await fetch(`/api/tastings/friends/${friendId}`, {
    headers: {}
  });
  const tastings = await response.json();
  dispatch(getFriendsTastings(tastings.tastings));
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
  console.log('thunk====', cheers)
  dispatch(createCheers(cheers.cheers, userId))
};


export const deleteCheersThunk = (tastingId, userId) => async(dispatch) => {
  const response = await fetch(`/api/tastings/${tastingId}/cheers`, {
    method: 'DELETE',
  });

  const cheers = await response.json()
  dispatch(deleteCheers(cheers.cheers, userId))
};





// ----------------------------------------reducer----------------------------------------------------


// const initialState = { userTastings: [], lovedTastings: [], friendTastings: [], tastingCheers: [] };
// export default function reducer(state = initialState, action) {
//   let newState;
//   switch (action.type) {
//     case GET_MY_TASTINGS: {
//       newState = {...state, userTastings:[...action?.tastings], lovedTastings:[], friendTastings:[]}
//       action?.userTastings?.forEach((tasting) => {
//         newState[tasting?.id] = tasting
//       });
//       return newState;
//     };
//     case GET_ALL_LOVED_TASTINGS: {
//       newState = {...state, userTastings:[], lovedTastings:[...action?.lovedTastings], friendTastings:[]}
//       action?.lovedTastings?.forEach((lovedTasting) => {
//         newState[lovedTasting?.id] = lovedTasting
//       });
//       return newState;
//     };
//     case GET_FRIENDS_TASTINGS: {
//       newState = {...state, userTastings:[], lovedTastings:[], friendTastings:[...action?.friendsTastings]}
//       action?.friendsTastings?.forEach((friendTasting) => {
//         newState[friendTasting?.id] = friendTasting
//       });
//       return newState;
//     };
//     case CREATE_TASTING: {
//       if (action?.tasting.love === false) {
//         newState = {...state, userTastings:[...state?.userTastings, action?.tasting], lovedTastings:[...state?.lovedTastings]}
//         newState[action?.tasting.id] = action?.tasting
//         return newState;
//       } else {
//         newState = {...state, userTastings:[...state?.userTastings, action?.tasting], lovedTastings:[...state?.lovedTastings, action?.tasting]}
//         newState[action?.tasting.id] = action?.tasting
//         return newState;
//       };
//     };
//     case EDIT_TASTING: {
//       state?.userTastings?.forEach((tasting, i) => {
//         if (tasting?.id === action?.tasting?.id) {
//           state?.userTastings.splice(i, 1, action?.tasting)
//         };
//       });
//       state?.lovedTastings?.forEach((tasting, i) => {
//         if (tasting?.id === action?.tasting?.id) {
//           state?.lovedTastings.splice(i, 1, action?.tasting)
//         };
//       });
//       state[action?.tasting?.id] = action?.tasting
//       newState = {...state, userTastings:[...state?.userTastings], lovedTastings:[...state?.lovedTastings]}
//       return newState;
//     };
//     case DELETE_TASTING: {
//       delete state?.action?.tastingId
//       let newUserTastings = state?.userTastings?.filter((tasting) => tasting?.id !== action?.tastingId)
//       let newLovedTastings = state?.lovedTastings?.filter((lovedTasting) => lovedTasting?.id !== action?.tastingId)

//       newState = {...state, userTastings:[...newUserTastings], lovedTastings:[...newLovedTastings]}
//       return newState
//     };
//     case GET_CHEERED_TASTINGS: {
//       return {
//         ...state,
//         tastingCheers: [...action.tastingCheers],
//       };
//     };
//     case CREATE_CHEERS: {
//       const { cheeringTasting, userId } = action;
//       console.log('action', action)
//       const updatedTastings = state.lovedTastings?.map((tasting) => {
      
//         if (tasting.user.id === userId) {
//           if (!tasting.cheers_by.includes(userId)) {
//             return {
//               ...tasting,
//               cheers_by: [...tasting.cheers_by, userId],
//             };
//           }
//         }
//         console.log('reducer tasting', tasting)
//         return tasting;
//       });
//       console.log('updatedTastings', updatedTastings)
//       return {
//         ...state,
//         userTastings: updatedTastings,
//       };
//     }
//     case DELETE_CHEERS: {
//       const updatedUserTastings = state.userTastings.map((tasting) => {
//         if (tasting.id === action.cheeredTasting.id) {
//           const cheersIndex = tasting.cheers_by.indexOf(action.userId);
//           if (cheersIndex !== -1) {
//             tasting.cheers_by.splice(cheersIndex, 1);
//           }
//         }
//         return tasting;
//       });

//       const updatedTastingCheers = state.tastingCheers.filter(
//         (tasting) => tasting.id !== action.cheeredTasting.id
//       );

//       return {
//         ...state,
//         userTastings: updatedUserTastings,
//         tastingCheers: updatedTastingCheers,
//       };
//     }
//     default: {
//       return state;
//     };
//   };
// };
      
const initialState = { tastings: {} };
export default function reducer(state = initialState, action) {
  let newState;
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
    };
    case GET_ALL_LOVED_TASTINGS: {
      const lovedTastings = action.lovedTastings.reduce((acc, tasting) => {
        acc[tasting.id] = tasting;
        return acc;
      }, {});
      
      return {
        ...state,
        tastings: { ...state.tastings, ...lovedTastings },
      };
    };
    case GET_FRIENDS_TASTINGS: {
      const friendsTastings = action.friendsTastings.reduce((acc, tasting) => {
        acc[tasting.id] = tasting;
        return acc;
      }, {});
      
      return {
        ...state,
        tastings: { ...state.tastings, ...friendsTastings },
      };
    };
    case CREATE_TASTING: {
      const { tasting } = action;
      
      return {
        ...state,
        tastings: {
          ...state.tastings,
          [tasting.id]: tasting,
        },
      };
    };
    case EDIT_TASTING: {
      const { tasting } = action;

      return {
        ...state,
        tastings: {
          ...state.tastings,
          [tasting.id]: tasting,
        },
      };
    };
    case DELETE_TASTING: {
      const { tastingId } = action;
      const { [tastingId]: deletedTasting, ...updatedTastings } = state.tastings;

      return {
        ...state,
        tastings: updatedTastings,
      };
    };
    case GET_CHEERED_TASTINGS: {
      return {
        ...state,
        tastingCheers: [...action.tastingCheers],
      };
    };
    case CREATE_CHEERS: {
      const { cheeringTasting, userId } = action;
      console.log('action', action)
      const updatedTastings = state.lovedTastings?.map((tasting) => {
      
        if (tasting.user.id === userId) {
          if (!tasting.cheers_by.includes(userId)) {
            return {
              ...tasting,
              cheers_by: [...tasting.cheers_by, userId],
            };
          }
        }
        console.log('reducer tasting', tasting)
        return tasting;
      });
      console.log('updatedTastings', updatedTastings)
      return {
        ...state,
        userTastings: updatedTastings,
      };
    }
    case DELETE_CHEERS: {
      const updatedUserTastings = state.userTastings.map((tasting) => {
        if (tasting.id === action.cheeredTasting.id) {
          const cheersIndex = tasting.cheers_by.indexOf(action.userId);
          if (cheersIndex !== -1) {
            tasting.cheers_by.splice(cheersIndex, 1);
          }
        }
        return tasting;
      });

      const updatedTastingCheers = state.tastingCheers.filter(
        (tasting) => tasting.id !== action.cheeredTasting.id
      );

      return {
        ...state,
        userTastings: updatedUserTastings,
        tastingCheers: updatedTastingCheers,
      };
    }
    default: {
      return state;
    };
  };
};
      