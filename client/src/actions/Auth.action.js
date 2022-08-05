import { toast } from "react-toastify";
import axios from "axios";
import {
  AUTH_USER_LOAD,
  AUTH_USER_LOAD_ERROR,
  GET_REFRESH_TOKEN,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  PASSWORD_CHANGE,
  PASSWORD_RESET_SUCCESS,
  PROFILE_UPDATE,
  PROFILE_UPDATE_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESET_LINK_SEND,
  RESET_LINK_SEND_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import axiosInstance from "../utils/axiosInstance";
import setAuthToken from "../utils/setAuthToken";

// LOGIN ACTION
export const loginAction = (values) => async (dispatch) => {
  try {
    const data = {
      email: values.email,
      password: values.password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const res = await axios.post(
      `${BASE_URL}/api/v1/auth/login`,
      JSON.stringify(data),
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data,
    });
    dispatch(getRefreshToken());
    dispatch(authUserAction());
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

// REGISTER ACTION
export const registerAction = (values) => async (dispatch) => {
  try {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const res = await axios.post(
      `${BASE_URL}/api/v1/auth/signup`,
      JSON.stringify(data),
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.data,
    });

    dispatch(getRefreshToken());
    dispatch(authUserAction());

    return true;
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
    toast.error(error.response.data.message);
    return false;
  }
};

// LOGOUT ACTION
export const logoutAction = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    await axios.post(`${BASE_URL}/api/v1/auth/logout`, {}, config);

    dispatch({
      type: LOGOUT_SUCCESS,
    });
    toast.success("Logout Successfully");
    return true;
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
    });
    toast.error(error.response.data.message);
    return false;
  }
};

// AUTH USER DATA ACTION
export const authUserAction = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const res = await axiosInstance.get(`${BASE_URL}/api/v1/profile`, config);

    dispatch({
      type: AUTH_USER_LOAD,
      payload: res.data.data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: AUTH_USER_LOAD_ERROR,
    });
    return false;
  }
};

// REFRESH TOKEN ACTION
export const getRefreshToken = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const res = await axios.post(`${BASE_URL}/api/v1/auth/token`, {}, config);

    dispatch({
      type: GET_REFRESH_TOKEN,
      payload: res.data.data.accessToken,
    });
    setAuthToken(res.data.data.accessToken);
    localStorage.setItem("tuni", res.data.data.accessToken);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// UPDATE ACTION
export const updateUserAction = (values, id) => async (dispatch) => {
  try {
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const res = await axios.patch(
      `${BASE_URL}/api/user/${id}`,
      JSON.stringify(data),
      config
    );

    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_ERROR,
    });
    toast.error(error.response.data.message);
    return false;
  }
};

// LOGIN ACTION
export const passwordResetAction = (values, token) => async (dispatch) => {
  try {
    const data = {
      password: values.password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    await axios.post(
      `${BASE_URL}/api/user/password/${token}`,
      JSON.stringify(data),
      config
    );

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });

    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

//RESET PASSWORD SEND EMAIL ACTION
export const resetPasswordSendEmail = (values) => async (dispatch) => {
  try {
    const formData = {
      email: values.email,
    };
    const res = await axios.post(
      `${BASE_URL}/api/v1/auth/reset`,
      JSON.stringify(formData),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    toast.success("Reset link sent successfully");

    dispatch({
      type: RESET_LINK_SEND,
    });

    return true;
    //}
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Email not found");
    }

    dispatch({
      type: RESET_LINK_SEND_ERROR,
    });
    //error.response.data.msg.map((msg) => console.log(msg));
    return false;
  }
};

//RESET PASSWORD SEND EMAIL ACTION
export const resetPassword = (values, id) => async (dispatch) => {
  try {
    const formData = {
      password: values.password,
    };
    await axios.post(
      `${BASE_URL}/api/v1/email/reset/${id}`,
      JSON.stringify(formData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast.success("Password changed successfully");

    dispatch({
      type: PASSWORD_CHANGE,
    });

    return true;
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Email not found");
    }

    error.response.data.msg.map((msg) => console.log(msg));
    return false;
  }
};
