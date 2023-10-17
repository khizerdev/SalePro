import axios from "axios";

export const LOGIN = () => {
  return async (dispatch) => {
    const result = await axios.get("https://fakestoreapi.com/users");
    console.log(result.data.at(0));
    dispatch({
      type: "LOGIN",
      payload: result.data.at(0),
    });
  };
};

export const LOGOUT = () => {
  return {
    type: "LOGOUT",
  };
};
