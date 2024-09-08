import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productsReducer from "./slices/productsSlice";

const reducer = combineReducers({
    productsState: productsReducer
});

const store = configureStore({
    reducer,
    middlewares: [thunk],
});

export default store;
