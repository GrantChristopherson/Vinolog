export const ERROR_ACTION = 'error/ERROR_ACTION';
export const CLEAR_ERROR = 'error/CLEAR_ERROR';


// ---------------------------------------------action creators-----------------------------------

export const setError = (errorMessage) => ({
  type: ERROR_ACTION,
  payload: errorMessage
});


export const clearError = () => ({
  type: CLEAR_ERROR
});



// -----------------------------------------------reducer------------------------------------------

export default function reducer (state = null, action) {
  switch (action.type) {
      case ERROR_ACTION:
          return action.payload;
      case CLEAR_ERROR:
          return null;
      default:
          return state;
  }
};
