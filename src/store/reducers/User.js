const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
