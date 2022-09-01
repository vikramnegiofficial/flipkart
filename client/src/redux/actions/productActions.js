import * as actionTypes from "../constants/productConstants";
import axios from "axios";

const URL = "http://localhost:8000";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/products`);
    dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: e.message });
  }
};
