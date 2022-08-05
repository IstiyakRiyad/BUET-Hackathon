import {
  CREATE_NOTE,
  DELETE_NOTE,
  FIND_NOTE,
  GET_MUSIC,
  GET_NEWS,
  GET_NOTE,
  GET_WEB,
  SEARCH_TEXT,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export const setDisplayText = (searchText) => (dispatch) => {
  dispatch({
    type: SEARCH_TEXT,
    payload: searchText,
  });
};
export const setFind = (searchText) => (dispatch) => {
  dispatch({
    type: FIND_NOTE,
    payload: searchText,
  });
};

export const getMusic = (searchText) => async (dispatch) => {
  console.log("called");
  try {
    const res = await axiosInstance.get(
      `${BASE_URL}/api/v1/spotify/search?query=${searchText}&limit=20`,
      { withCredentials: true }
    );

    dispatch({
      type: GET_MUSIC,
      payload: res.data.data.tracks,
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const getNews = (lat, lng, searchText) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(
      `${BASE_URL}/api/v1/news/search?latitude=${lat}&longitude=${lng}&limit=20&query=${searchText.replace(
        ".",
        ""
      )}`,
      { withCredentials: true }
    );

    dispatch({
      type: GET_NEWS,
      payload: res.data.data.news,
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const getNote = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/api/v1/note`, {
      withCredentials: true,
    });

    dispatch({
      type: GET_NOTE,
      payload: res.data.data.notes,
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const getWeb = (text) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(
      `${BASE_URL}/api/v1/search?search=${text}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: GET_WEB,
      payload: res.data.data,
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const createNote = (message) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(
      `${BASE_URL}/api/v1/note`,
      JSON.stringify({ data: message }),
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    dispatch({
      type: CREATE_NOTE,
      payload: res.data.data.notes,
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`${BASE_URL}/api/v1/note/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: DELETE_NOTE,
      payload: id,
    });
    toast.success("Note deleted successfully");

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};
