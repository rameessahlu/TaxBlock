// Action types
const USER_REGISTERED = "userRegisterd";

// Action creators
export const userAdded = (email, password) => ({
  type: USER_REGISTERED,
  payload: {
    email: email,
    password: password,
  },
});

// Reducers
export function reducer(state = [], action) {
  switch (action.type) {
    case USER_REGISTERED:
      return [
        ...state,
        {
          email_address: action.payload.email,
          password: action.payload.password,
        },
      ];
  }
  return state;
}

// Selectors
export const selectUser = (state, email) => {
  return state.entities.users.filter((user) => email === user.email_address);
};
