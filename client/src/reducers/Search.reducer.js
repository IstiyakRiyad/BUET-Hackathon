import {
  CREATE_NOTE,
  DELETE_NOTE,
  FIND_NOTE,
  GET_MUSIC,
  GET_NEWS,
  GET_NOTE,
  GET_WEB,
  SEARCH_TEXT,
  SET_DASHBOARD,
} from "../constants/Type";

const initialValues = {
  text: "Start voice command...",
  news: null,
  music: null,
  type: "notes",
  note: null,
  find: null,
  web: null,
};
const searchReducer = (state = initialValues, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_WEB:
      return {
        ...state,
        web: payload,
      };
    case CREATE_NOTE:
    case GET_NOTE:
      return {
        ...state,
        note: payload,
        find: payload,
      };
    case DELETE_NOTE:
      return {
        ...state,
        note: state.note.filter((note) => note._id !== payload),
        find: state.find.filter((note) => note._id !== payload),
      };

    case FIND_NOTE:
      console.log(
        state.note.filter(
          (note) =>
            note.data.includes(payload) || payload === " " || payload === ""
        )
      );
      return {
        ...state,
        find: state.note.filter(
          (note) =>
            note.data.includes(payload) || payload === " " || payload === ""
        ),
      };
    case SET_DASHBOARD:
      return {
        ...state,
        type: payload,
      };
    case SEARCH_TEXT:
      return {
        ...state,
        text: payload,
      };
    case GET_MUSIC:
      return {
        ...state,
        music: payload,
        type: "music",
      };
    case GET_NEWS:
      return {
        ...state,
        news: payload,
        type: "news",
      };
    default:
      return state;
  }
};

export default searchReducer;
