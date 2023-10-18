import axios from "axios";

export const SET_USERS = () => {
  return async (dispatch) => {
    const result = await axios.get("https://fakestoreapi.com/users");
    dispatch({
      type: "SET_USERS",
      payload: result.data,
    });
  };
};
