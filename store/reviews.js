import axios from "axios";
import { _addItemReview } from "./userItems";
const HOST = "https://server-rstrm.herokuapp.com";
// const HOST = "http://localhost:8080";

/**
 * ACTION TYPES ------------------------------------------------
 */
const LOAD_REVIEWS = "LOAD_REVIEWS";
const CREATE_REVIEW = "CREATE_REVIEW";
const UPDATE_REVIEW = "UPDATE_REVIEW";
const DELETE_REVIEW = "DELETE_REVIEW";

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = [];

/**
 * ACTION CREATORS
 */
const _loadReviews = (reviews) => ({ type: LOAD_REVIEWS, reviews });
const _createReview = (review) => ({ type: CREATE_REVIEW, review });
const _updateReview = (review) => ({ type: UPDATE_REVIEW, review });
const _deleteReview = (id) => ({ type: DELETE_REVIEW, id });

/**
 * THUNK CREATORS -------------------------------------------------
 */
// UPDATE WITH OUR API

const loadReviews = (bathroomId, daysWithin) => {
  return async (dispatch) => {
    let response;
    if (daysWithin !== undefined || null) {
      response = (
        await axios.get(
          `${HOST}/api/bathrooms/${bathroomId}/reviews?daysWithin=${daysWithin}`
        )
      ).data;
    } else {
      response = (
        await axios.get(`${HOST}/api/bathrooms/${bathroomId}/reviews`)
      ).data;
    }
    dispatch(_loadReviews(response));
  };
};

const createReview = (review) => {
  return async (dispatch) => {
    const response = (await axios.post(`${HOST}/api/reviews`, review)).data;
    dispatch(_createReview(response));
    dispatch(_addItemReview(response))
  };
};

const updateReview = (review) => {
  return async (dispatch) => {
    const { data: updatedReview } = await axios.put(
      `/api/reviews/${review.id}`,
      review
    );
    dispatch(_updateReview(updatedReview));
  };
};

const deleteReview = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/reviews/${id}`);
    dispatch(_deleteReview(id));
  };
};

/**
 * REDUCER -------------------------------------------------------
 */
const reviews = function (state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWS:
      return action.reviews;

    case CREATE_REVIEW:
      return [...state, action.review];

    case UPDATE_REVIEW:
      return state.map((review) =>
        review.id === action.review.id ? action.review : review
      );

    case DELETE_REVIEW:
      return state.filter((review) => review.id !== action.id);

    default:
      return state;
  }
};

export { reviews, loadReviews, createReview, updateReview, deleteReview };
