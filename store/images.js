import axios from "axios";
const HOST = "https://server-rstrm.herokuapp.com";

/**
 * ACTION TYPES ------------------------------------------------
 */
const LOAD_IMAGES = "LOAD_IMAGES";
const CREATE_IMAGE = "CREATE_IMAGE";
const DELETE_IMAGE = "DELETE_IMAGE";

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
const _loadImages = (images) => ({ type: LOAD_IMAGES, images });
const _createImage = (image) => ({ type: CREATE_IMAGE, image });
const _deleteImage = (id) => ({ type: DELETE_IMAGE, id });

/**
 * THUNK CREATORS -------------------------------------------------
 */
// UPDATE WITH OUR API

const loadImages = (refugeId) => {
  return async (dispatch) => {
    const response = (await axios.post(`${HOST}/api/images/${refugeId}`)).data;
    dispatch(_loadImages(response));
  };
};

const createImage = (refugeId, url) => {
  return async (dispatch) => {
    const response = (await axios.post(`${HOST}/api/images/${refugeId}/${url}`)).data;
    console.log(response, 'createImage response in thunk');
    dispatch(_createImage(response));
  };
};

const deleteImage = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/images/${id}`);
    dispatch(_deleteImage(id));
  };
};

/**
 * REDUCER -------------------------------------------------------
 */
const images = function (state = initialState, action) {
  switch (action.type) {
    case LOAD_IMAGES:
      return action.images;

    case CREATE_IMAGE:
      return [...state, action.image];

    case DELETE_IMAGE:
      return state.filter((image) => image.id !== action.id);

    default:
      return state;
  }
};

export { images, loadImages, createImage, deleteImage };
