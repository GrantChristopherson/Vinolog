const GET_COMMENTS = 'discussion/GET_COMMENTS';
const CREATE_COMMENT = 'discussion/CREATE_COMMENT';
const EDIT_COMMENT = 'discussion/EDIT_COMMENT';
const DELETE_COMMENT = 'discussion/DELETE_COMMENT';


// ---------------------------------------------action creators-----------------------------------

const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments
  };
};


const createComment = (comment) => {
  return {
    type: CREATE_COMMENT,
    comment
  };
};


const editComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment
  };
};


const deleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId
  };
};


// --------------------------------------------thunk action creators---------------------------------

export const getCommentsThunk = () => async(dispatch) => {
  const response = await fetch('/api/discussion/comments/all', {
    header: {}
  });
  const comments = await response.json();
  dispatch(getComments(comments.comment))
};


export const createCommentThunk = (discussion, tastingId) => async(dispatch) => {
  const response = await fetch(`/api/discussion/tastings/${tastingId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(discussion)
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(createComment(data));
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


export const editCommentThunk = (discussion, commentId) => async(dispatch) => {
  const response = await fetch(`/api/discussion/comments/edit/${commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      comment: discussion.comment
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editComment(data))
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


export const deleteCommentThunk = (commentId) => async(dispatch) => {
  const response = await fetch(`/api/discussion/comments/delete/${commentId}`, {
    method: 'DELETE',
  })

  if (response.ok) {
    await response.json();
    dispatch(deleteComment(commentId));
    return;
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

const initialState = { comments: {} };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS: {
      const { comments } = action;
      const updatedComments = comments.reduce((acc, comment) => {
        acc[comment.id] = comment;
        return acc;
      }, {});

      return {
        ...state,
        comments: updatedComments,
      };
    };
    case CREATE_COMMENT: {
      const { comment } = action;

      return {
        ...state,
        comments: {
          ...state.comments,
          [comment.id]: comment,
        },
      };
    };
    case EDIT_COMMENT: {
      const { comment } = action;

      return {
        ...state,
        comments: {
          ...state.comments,
          [comment.id]: comment,
        },
      };
    };
    case DELETE_COMMENT: {
      const { commentId } = action;
      const { [commentId]: deletedComment, ...updatedComments } = state.comments;

      return {
        ...state,
        comments: updatedComments,
      };
    };
    default: 
      return state;
  };
};