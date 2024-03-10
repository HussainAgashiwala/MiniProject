import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_ERROR,
  CLEAR_ALERT,
  DISPLAY_ALERT,
} from "./action";

const reducer = (state, action) => {
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting...",
      user: action.payload.user,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting...",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: "",
      alertType: "",
    };
  }
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertText: "Please provide all values!",
      alertType: "danger",
    };
  }
};

export default reducer;
