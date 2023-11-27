import axios from "axios";

export const SET_USERS = () => {
  return async (dispatch) => {
    try {
      const result = await axios.get("https://fakestoreapi.com/users");
      dispatch({
        type: "SET_USERS",
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: "SET_USERS",
        payload: [],
      });
    }
  };
};
