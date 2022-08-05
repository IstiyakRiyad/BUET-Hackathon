import { SET_DASHBOARD } from "../constants/Type";

export const setDashboard = (type) => (dispatch) => {
  dispatch({
    type: SET_DASHBOARD,
    payload: type,
  });
};
