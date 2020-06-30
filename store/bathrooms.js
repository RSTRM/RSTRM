import axios from "axios";
const HOST = "https://server-rstrm.herokuapp.com";
// const HOST = "http://localhost:8080";
/**
 * ACTION TYPES ------------------------------------------------
 */
const LOAD_BATHROOMS = "LOAD_BATHROOMS";
const CREATE_BATHROOM = "CREATE_BATHROOM";
const UPDATE_BATHROOM = "UPDATE_BATHROOM";
const DELETE_BATHROOM = "DELETE_BATHROOM";
const ADD_IMAGE = "ADD_IMAGE";

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
const _addImage = image => ({ type: ADD_IMAGE, image });

/**
 * THUNK CREATORS -------------------------------------------------
 */
// UPDATE WITH OUR API

const loadBathrooms = (
  region,
  radius,
  unisexFilter,
  accessibleFilter,
  changingFilter,
  minimumRating
) => {
  const latitude = region.latitude;
  const longitude = region.longitude;

  return async dispatch => {
    let filterText = "";
    if (unisexFilter) filterText += "unisexFilter=on&";
    if (accessibleFilter) filterText += "accessibleFilter=on&";
    if (changingFilter) filterText += "changingFilter=on&";
    if (minimumRating > 1) filterText += `minimumRating=${minimumRating}&`;

    const response = (
      await axios.get(
        `${HOST}/api/bathrooms/${latitude}/${longitude}/${radius}?${filterText.slice(
          0,
          -1
        )}`
      )
    ).data;
    dispatch(_loadBathrooms(response));
  };
};

const createBathroom = bathroom => {
  return async dispatch => {
    const response = (
      await axios.post(`${HOST}/api/bathrooms/${bathroom.refugeId}`, bathroom)
    ).data;
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

const addImage = (bathroomId, url) => {
  return async (dispatch) => {
    c//onsole.log(bathroomId, url, 'in thunk before post')
    const response = (await axios.post(`${HOST}/api/bathrooms/images/${bathroomId}/${url}`)).data;
    //console.log(response, 'addImage response in thunk');
    dispatch(_addImage(response));
  };
};

/**
 * REDUCER -------------------------------------------------------
 */
const bathrooms = function (state = initialState, action) {
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

    case ADD_IMAGE:
      const index = state.findIndex(bathroom => bathroom.id === action.image.bathroomId)
      return [
        ...state.slice(0, index), // everything before bathroom to edit
        {
          ...state[index],
          images: [action.image, ...state[index].images]
        },
        ...state.slice(index + 1), // everything after bathroom to edit
      ]

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
  addImage
};
