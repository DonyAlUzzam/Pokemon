import { setValue } from "../service/storage/AsyncStorage";

const initial = {
  user: {},
  access_token: {},
  isLoggedIn: false,
};

export default (state = initial, action) => {
  switch (action.type) {
    case "REGISTER_USER_FULFILLED":
      // setValue("token", JSON.stringify(action.payload.data.access_token));
      // console.log(action.payload.data.data);
      return {
        ...state,
        access_token: action.payload.data.access_token,
        user: action.payload.data.user,
        isLoggedIn: true
      };
    case "LOGIN_USER_FULFILLED":
      const { token, type } = action.payload.data.access_token;
      setValue("token", JSON.stringify(type + " " + token));
      console.log(action.payload.data.access_token);
      return {
        ...state,
         // user: action.payload.data.user,
         user: action.payload.data.user,
        // access_token: action.payload.data.access_token,
        access_token: action.payload.data.access_token,
        isLoggedIn: true
      };
    case "CLEAR_USER":
      return {
        user: {},
        access_token: {},
        isLoggedIn: false
      };
    case "GET_USER_FULFILLED":
      return {
        ...state,
        user: action.payload.data.user,
        isLoggedIn: true
      };
    default:
      return state;
  }
};
