import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        loading: false,
    },
    reducers: {
        addCartItemRequest(state, action) {
            return {
                ...state,
                loading: true,
            };
        },
        addCartItemSuccess(state, action) {
            const item = action.payload;
            const isItemExist = state.items.find(
                (i) => i.product == item.product
            );
            if (isItemExist) {
                state = {
                    ...state,
                    loading: false,
                };
            } else {
                state = {
                    items: [...state.items, item],
                    loading: false,
                };
                localStorage.setItem("cartItems", JSON.stringify(state.items));
            }
            return state;
        },
        increaseCartItemQty(state, action) {
            state.items = state.items.map((item) => {
                if (item.prodcut == action.payload) {
                    item.quantity += 1;
                }
                return item;
            });
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        decreaseCartItemQty(state, action) {
            state.items = state.items.map((item) => {
                if (item.prodcut == action.payload) {
                    item.quantity -= 1;
                }
                return item;
            });
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
    },
});

const { actions, reducer } = cartSlice;

export const {
    addCartItemRequest,
    addCartItemSuccess,
    increaseCartItemQty,
    decreaseCartItemQty,
} = actions;

export default reducer;
