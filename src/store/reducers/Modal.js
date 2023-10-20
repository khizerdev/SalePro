const initialState = {
  type: null,
  isOpen: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        type: action.payload.type,
        isOpen: action.payload.isOpen,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        type: null,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default reducer;
