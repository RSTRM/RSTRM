import axios from "axios";
const HOST = "https://server-rstrm.herokuapp.com";

/**
 * ACTION TYPES ------------------------------------------------
 */
const LOAD_ITEMS_ALL = "LOAD_ITEMS_ALL";

/**
 * INITIAL STATE --------------------------------------------------
 */
const initialState = {
    badges: [],
    checkins: [],
    reviews: []
};

/**
 * ACTION CREATORS
 */
const _loadItemsAll = (userItems) => ({ type: LOAD_ITEMS_ALL, userItems });

/**
 * THUNK CREATORS -------------------------------------------------
 */
// UPDATE WITH OUR API

const loadItemsAll = (userId) => {
    console.log('in thunk')
    return async (dispatch) => {
        const response = (
            await axios.get(
                `${HOST}/api/users/${userId}/all`
            )
        ).data
        return dispatch(_loadItemsAll(response));
    };
};

/**
 * REDUCER -------------------------------------------------------
 */
const userItems = function (state = initialState, action) {
    switch (action.type) {
        case LOAD_ITEMS_ALL:
            return action.userItems;

        default:
            return state;
    }
};

export { userItems, loadItemsAll };
