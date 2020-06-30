import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { bathrooms } from "./bathrooms";
import { checkins } from "./checkins";
import { images } from "./images";
import { reviews } from "./reviews";
import user from "./user";
import { userItems } from "./userItems"

const reducer = combineReducers({
  bathrooms,
  checkins,
  images,
  reviews,
  user,
  userItems
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(reducer, middleware);

// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({ collapsed: false }))
// )
//const store = createStore(reducer, middleware)

export default store;
