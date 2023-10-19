const initialState = {
  projects: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
