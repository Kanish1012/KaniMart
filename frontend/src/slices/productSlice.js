import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        product: {},
        isReviewSubmitted: false,
        isProductCreated: false,
        isProductDeleted: false,
        isProductUpdated: false,
    },
    reducers: {
        productRequest(state, action) {
            return {
                ...state,
                loading: true,
            };
        },
        productSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
            };
        },
        productFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        createReviewRequest(state, action) {
            return {
                ...state,
                loading: true,
            };
        },
        createReviewSuccess(state, action) {
            return {
                loading: false,
                isReviewSubmitted: true,
            };
        },
        createReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        clearReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false,
            };
        },
        clearError(state, action) {
            return {
                ...state,
                error: null,
            };
        },
        clearProduct(state, action) {
            return {
                ...state,
                product: {},
            };
        },
        newProductRequest(state, action) {
            return {
                ...state,
                loading: true,
            };
        },
        newProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductCreated: true,
            };
        },
        newProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductCreated: false,
            };
        },
        clearProductCreated(state, action) {
            return {
                ...state,
                isProductCreated: false,
            };
        },
        deleteProductRequest(state, action) {
            return {
                ...state,
                loading: true,
            };
        },
        deleteProductSuccess(state, action) {
            return {
                ...state,
                loading: false,

                isProductDeleted: true,
            };
        },
        deleteProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        clearProductDeleted(state, action) {
            return {
                ...state,
                isProductDeleted: false,
            };
        },
        updateProductRequest(state, action) {
            return {
                ...state,
                loading: true,
            };
        },
        updateProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated: true,
            };
        },
        updateProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        clearProductUpdated(state, action) {
            return {
                ...state,
                isProductUpdated: false,
            };
        },
    },
});

const { actions, reducer } = productSlice;

export const {
    productRequest,
    productSuccess,
    productFail,
    createReviewRequest,
    createReviewSuccess,
    createReviewFail,
    clearReviewSubmitted,
    clearError,
    clearProduct,
    newProductFail,
    newProductRequest,
    newProductSuccess,
    clearProductCreated,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    clearProductDeleted,
    updateProductRequest,
    updateProductSuccess,
    updateProductFail,
    clearProductUpdated,
} = actions;

export default reducer;
