import axios from "axios";
import { loadItemsAll } from "./userItems";
// const HOST = "https://server-rstrm.herokuapp.com";
const HOST = "http://localhost:8080";

// import history from "../history";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const UPDATE_USER = "UPDATE_USER";
const UPDATE_USER_ITEMS = "UPDATE_USER_ITEMS"

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const _updateUser = (user) => ({ type: UPDATE_USER, user });
export const _updateUserItems = (item, table) => ({ type: UPDATE_USER_ITEMS, item, table });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/auth/me`);
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (
  nameFirst,
  nameLast,
  username,
  email,
  password,
  method,
  props,
  googleId = null
) => async (dispatch) => {
  let res;
  try {
    if (googleId) {
      res = await axios.post(`${HOST}/auth/${method}`, {
        nameFirst,
        nameLast,
        username,
        email,
        googleId,
      });
    } else {
      res = await axios.post(`${HOST}/auth/${method}`, {
        nameFirst,
        nameLast,
        username,
        email,
        password,
      });
    }
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    loadItemsAll(res.data.id)
    props.navigation.navigate("Home");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post(`${HOST}/auth/logout`);
    dispatch(removeUser());
    // history.push("/login");
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = (userId, action, propToUpdate) => async (
  dispatch
) => {
  const _updatedUser = (
    await axios.put(`${HOST}/api/users/${userId}/${action}`, { propToUpdate })
  ).data;
  dispatch(_updateUser(_updatedUser));
};

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_USER:
      return action.user;
    case UPDATE_USER_ITEMS:
      return { ...state, [action.table]: [action.item, ...state[action.table]] }
    default:
      return state;
  }
}
