import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

const reducer = combineReducers({});

const store = configureStore({
    reducer,
    middlewares: [thunk],
});

export default store;
