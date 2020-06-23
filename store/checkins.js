import axios from "axios";
const HOST = "http://localhost:8080";
/**
 * ACTION TYPES ------------------------------------------------
 */
const LOAD_CHECKINS = "LOAD_CHECKINS";
const CREATE_CHECKIN = "CREATE_CHECKIN";
const UPDATE_CHECKIN = "UPDATE_CHECKIN";
const DELETE_CHECKIN = "DELETE_CHECKIN";

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
const _loadCheckins = (checkins) => ({ type: LOAD_CHECKINS, checkins });
const _createCheckin = (checkin) => ({ type: CREATE_CHECKIN, checkin });
const _updateCheckin = (checkin) => ({ type: UPDATE_CHECKIN, checkin });
const _deleteCheckin = (id) => ({ type: DELETE_CHECKIN, id });

/**
 * THUNK CREATORS -------------------------------------------------
 */
// UPDATE WITH OUR API

const loadCheckins = () => {
  return async (dispatch) => {
    const response = (await axios.get("/api/checkins")).data;
    dispatch(_loadCheckins(response));
  };
};

const createCheckin = (checkin) => {
  return async (dispatch) => {
    const response = (await axios.post(`${HOST}/api/checkins`, checkin)).data;
    dispatch(_createCheckin(response));
  };
};

const updateCheckin = (checkin) => {
  return async (dispatch) => {
    const { data: updatedCheckin } = await axios.put(
      `/api/checkins/${checkin.id}`,
      checkin
    );
    dispatch(_updateCheckin(updatedCheckin));
  };
};

const deleteCheckin = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/checkins/${id}`);
    dispatch(_deleteCheckin(id));
  };
};

/**
 * REDUCER -------------------------------------------------------
 */
const checkins = function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CHECKINS:
      return action.checkins;

    case CREATE_CHECKIN:
      return [...state, action.checkin];

    case UPDATE_CHECKIN:
      return state.map((checkin) =>
        checkin.id === action.checkin.id ? action.checkin : checkin
      );

    case DELETE_CHECKIN:
      return state.filter((checkin) => checkin.id !== action.id);

    default:
      return state;
  }
};

export { checkins, loadCheckins, createCheckin, updateCheckin, deleteCheckin };
