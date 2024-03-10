import React, { useContext, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_ERROR,
  CLEAR_ALERT,
  DISPLAY_ALERT,
} from "./action";

const AppContext = React.createContext();

const initialState = {
  user: "",
  showAlert: false,
  alertText: "",
  alertType: "",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT,
    });
    clearAlert();
  };
  const registerUser = async (currentUser) => {
    try {
      const response = await axios.post("/api/v1/register", currentUser);
      const { user } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  const loginUser = async (currentUser) => {
    try {
      //const response = await axios.post("/api/v1/login", currentUser);
      //const {user}=response.data;
      const user = "Hussain";
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user,
        },
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  return (
    <AppContext.Provider
      value={{ ...state, registerUser, loginUser, clearAlert, displayAlert }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
