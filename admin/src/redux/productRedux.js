import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //get all
    startedFetching: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    failedFetching: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },

    //get
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    //delete
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    //updata all
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    //add
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
  },
});

export const {
  startedFetching,
  failedFetching,

  getProductSuccess,

  deleteProductSuccess,

  updateProductSuccess,

  addProductSuccess,
} = productSlice.actions;
export default productSlice.reducer;
