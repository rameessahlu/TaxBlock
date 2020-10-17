// Action types
const USER_LOGGED_IN = "userLoggedIn";
const USER_LOGGED_OUT = "userLoggedOut";

// Action creators
export const userLoggedIn = (email) => ({
  type: USER_LOGGED_IN,
  payload: {
    email: email,
  },
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
  payload: {
    email: "",
  },
});

// Reducers
export function reducer(state = [], action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        email_address: action.payload.email,
      };
    case USER_LOGGED_OUT:
      return {
        email_address: action.payload.email,
      };
  }
  return state;
}

// Selectors
export const selectAuth = (state) => {
  if ("auth" in state && Object.keys(state.auth).length !== 0)
    return state.auth.email_address;
  else return "";
};
