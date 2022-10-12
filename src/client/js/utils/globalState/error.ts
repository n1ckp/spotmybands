export const name = "error";

export const actions = {
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR"
};

export const getInitialState = () => {
  return {};
};

export function reducer(state = getInitialState(), { type, payload }) {
  let updatedState = Object.assign({}, state);

  if (type === actions.SET_ERROR) {
    updatedState = { message: payload.message };
  } else if (type === actions.CLEAR_ERROR) {
    updatedState = {}
  }

  return updatedState;
}

// Action creators
export const actionSetError = (dispatch, { message }) => {
  dispatch({
    type: actions.SET_ERROR,
    payload: { message },
  });
};

export const actionClearError = (dispatch) => {
  dispatch({
    type: actions.CLEAR_ERROR,
    payload: {},
  });
};
