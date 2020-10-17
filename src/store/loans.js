// Action types
const ADD_NEW_LOAN = "addNewLoan";

// Action creators
export const loanAdded = (
  name,
  address,
  email,
  startData,
  expDate,
  mobile,
  emi,
  userId
) => ({
  type: ADD_NEW_LOAN,
  payload: {
    name: name,
    address: address,
    email: email,
    startData: startData,
    expDate: expDate,
    mobile: mobile,
    emi: emi,
    userId: userId,
  },
});

// Reducers
export function reducer(state = [], action) {
  switch (action.type) {
    case ADD_NEW_LOAN:
      return [
        ...state,
        {
          name: action.payload.name,
          address: action.payload.address,
          email: action.payload.email,
          startData: action.payload.startData,
          expDate: action.payload.expDate,
          mobile: action.payload.mobile,
          emi: action.payload.emi,
          userId: action.payload.userId,
        },
      ];
  }
  return state;
}

// Selectors
export const selectLoans = (state, userId) => {
  return state.entities.loans.filter((loan) => userId === loan.userId);
};
