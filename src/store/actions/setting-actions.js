export const TOGGLE_SIDEBAR = () => {
  return {
    type: "TOGGLE_SIDEBAR",
  };
};

export const CHANGE_LANGUAGE = (payload) => {
  return {
    type: "CHANGE_LANGUAGE",
    payload: payload,
  };
};
