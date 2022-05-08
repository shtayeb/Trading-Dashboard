import axios from "axios";
import {
  startedFetching,
  failedFetching,
  getProductSuccess,
  deleteProductSuccess,
  updateProductSuccess,
  addProductSuccess,
} from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(startedFetching());
  try {
    const res = await axios.get("product");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    console.log(error.message);
    dispatch(failedFetching());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(startedFetching());
  try {
    // const res = await userRequest.delete("product/"+id);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    console.log(error.message);
    dispatch(failedFetching());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(startedFetching());
  try {
    // const res = await userRequest.delete("product/"+id);
    dispatch(
      updateProductSuccess({
        id,
        product,
      })
    );
  } catch (error) {
    console.log(error.message);
    dispatch(failedFetching());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(startedFetching());
  try {
    const res = await axios.post("product/", product);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    console.log(error.message);
    dispatch(failedFetching());
  }
};
