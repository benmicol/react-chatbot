import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import combineReducers from "./reducers"
//Connect to Redux DevTools
import {composeWithDevTools} from "redux-devtools-extension"
//Setup Initial State
const initialState = {}
//Import Middleware
const middleware = [thunk]
//Setup Store
const store = createStore(combineReducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store