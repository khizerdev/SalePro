export const OPEN_MODAL = (payload) => {
  return {
    type: "OPEN_MODAL",
    payload: payload,
  };
};

export const CLOSE_MODAL = () => {
  return {
    type: "CLOSE_MODAL",
  };
};
