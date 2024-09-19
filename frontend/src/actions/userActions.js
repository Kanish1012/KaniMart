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
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
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

export const loadUser = async (dispatch) => {
    try {
        dispatch(loadUserRequest());
        const { data } = await axios.get("/api/v1/myprofile");
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
    }
};

export const logout = async (dispatch) => {
    try {
        await axios.get("/api/v1/logout");
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFail);
    }
};

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const { data } = await axios.put(`/api/v1/update`, userData, config);
        dispatch(updateProfileSuccess(data));
    } catch (err) {
        dispatch(updateProfileFail(err.response.data.message));
    }
};

export const updatePassword = (formData) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        await axios.put(`/api/v1/password/change`, formData, config);
        dispatch(updatePasswordSuccess());
    } catch (err) {
        dispatch(updatePasswordFail(err.response.data.message));
    }
};
