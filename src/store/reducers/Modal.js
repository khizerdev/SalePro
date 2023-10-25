const initialState = {
  type: null,
  isOpen: false,
  data: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        type: action.payload.type,
        isOpen: action.payload.isOpen,
        data: action.payload.data ? action.payload.data : null,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        type: null,
        isOpen: false,
        data: null,
      };
    default:
      return state;
  }
};

export default reducer;
