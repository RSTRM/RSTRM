import axios from "axios";
const HOST = "http://localhost:8080";
// import history from "../history";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

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
  props
) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`${HOST}/auth/${method}`, {
      nameFirst,
      nameLast,
      username,
      email,
      password,
    });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
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

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
