import {
    loginFail,
    loginRequest,
    loginSuccess,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
} from "../slices/authSlice";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const { data } = await axios.post(`/api/v1/login`, { email, password });
        dispatch(loginSuccess(data));
    } catch (err) {
        dispatch(loginFail(err.response.data.message));
    }
};

export const clearAuthError = (dispatch) => {
    dispatch(clearError());
};

export const register = (userData) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const { data } = await axios.post(`/api/v1/register`, userData, config);
        dispatch(registerSuccess(data));
    } catch (err) {
        dispatch(registerFail(err.response.data.message));
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest());
        const { data } = await axios.get("/api/v1/myprofile");
        dispatch(loadUserSuccess(data));
    } catch (err) {
        dispatch(loadUserFail(err.response.data.message));
    }
};
