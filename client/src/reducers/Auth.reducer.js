import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTH_USER_LOAD,
  GET_REFRESH_TOKEN,
} from "../constants/Type";

const initialState = {
  isAuthenticated: null,
  user: null,
  loading: true,
  token: localStorage.getItem("tuni") ? localStorage.getItem("tuni") : null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_REFRESH_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case AUTH_USER_LOAD:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
      localStorage.removeItem("tuni");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
