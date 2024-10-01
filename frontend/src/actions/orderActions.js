import {
    createOrderFail,
    createOrderRequest,
    createOrderSuccess,
    userOrderFail,
    userOrderRequest,
    userOrderSuccess,
} from "../slices/orderSlice";
import axios from "axios";

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest());
        const { data } = await axios.post("/api/v1/order/new", order);
        dispatch(createOrderSuccess(data));
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }
};

export const userOrders = async (dispatch) => {
    try {
        dispatch(userOrderRequest());
        const { data } = await axios.get("/api/v1/myorders");
        dispatch(userOrderSuccess(data));
    } catch (error) {
        dispatch(userOrderFail(error.response.data.message));
    }
};
