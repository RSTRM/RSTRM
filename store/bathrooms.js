import axios from "axios";
const HOST = "http://localhost:8080";
/**
 * ACTION TYPES ------------------------------------------------
 */
const LOAD_BATHROOMS = "LOAD_BATHROOMS";
const CREATE_BATHROOM = "CREATE_BATHROOM";
const UPDATE_BATHROOM = "UPDATE_BATHROOM";
const DELETE_BATHROOM = "DELETE_BATHROOM";
const LOAD_REVIEWS = "LOAD_REVIEWS";

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
const _loadBathrooms = bathrooms => ({ type: LOAD_BATHROOMS, bathrooms });
const _createBathroom = bathroom => ({ type: CREATE_BATHROOM, bathroom });
const _updateBathroom = bathroom => ({ type: UPDATE_BATHROOM, bathroom });
const _deleteBathroom = id => ({ type: DELETE_BATHROOM, id });
const _loadReviews = reviews => ({ type: LOAD_REVIEWS, reviews });

/**
 * THUNK CREATORS -------------------------------------------------
 */
// UPDATE WITH OUR API

const loadBathrooms = (region, radius) => {
  const latitude = region.latitude;
  const longitude = region.longitude;

  //console.log(latitude,'latitude in thunk', radius, 'radius in thunk');
  return async dispatch => {
    const response = (
      await axios.get(
        `${HOST}/api/bathrooms/${latitude}/${longitude}/${radius}`
      )
    ).data;
    dispatch(_loadBathrooms(response));
  };
};

const loadReviews = (bathroomId, daysWithin) => {
  return async dispatch => {
    // let response;
    // if (daysWithin !== undefined || null) {
    //    response = (
    //     await axios.get(
    //       `${HOST}/api/bathrooms/${bathroomId}/reviews?daysWithin=${daysWithin}`
    //     )
    //   ).data;
    // } 
    // else {
       const response = (
        await axios.get(`${HOST}/api/bathrooms/${bathroomId}/:reviews`)
      ).data;
    
    dispatch(_loadReviews(response));
  };
};

const createBathroom = bathroom => {
  return async dispatch => {
    const response = (await axios.post("/api/bathrooms", bathroom)).data;
    dispatch(_createBathroom(response));
  };
};

const updateBathroom = bathroom => {
  return async dispatch => {
    const { data: updatedBathroom } = await axios.put(
      `/api/bathrooms/${bathroom.id}`,
      bathroom
    );
    dispatch(_updateBathroom(updatedBathroom));
  };
};

const deleteBathroom = id => {
  return async dispatch => {
    await axios.delete(`/api/bathrooms/${id}`);
    dispatch(_deleteBathroom(id));
  };
};

/**
 * REDUCER -------------------------------------------------------
 */
const bathrooms = function(state = initialState, action) {
  switch (action.type) {
    case LOAD_BATHROOMS:
      return action.bathrooms;

    case CREATE_BATHROOM:
      return [...state, action.bathroom];

    case UPDATE_BATHROOM:
      return state.map(bathroom =>
        bathroom.id === action.bathroom.id ? action.bathroom : bathroom
      );

    case DELETE_BATHROOM:
      return state.filter(bathroom => bathroom.id !== action.id);

    case LOAD_REVIEWS:
      return action.reviews;

    default:
      return state;
  }
};

export {
  bathrooms,
  loadBathrooms,
  createBathroom,
  updateBathroom,
  deleteBathroom,
  loadReviews
};
