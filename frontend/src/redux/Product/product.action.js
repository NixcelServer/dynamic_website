import { getProductDetailsAPI, getProductsAPI, getSM1ProdAPI, getSM2ProdAPI } from "./product.api";
import * as types from "./product.action.type";


export const getProductDetails = () => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getProductsAPI();
        dispatch({ type: types.GET_PRODUCTS, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const getProducts = () => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getProductDetailsAPI();
        dispatch({ type: types.GET_WEB_PRODUCTS, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const getSM1Prods = (encSubMenu1Id) => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getSM1ProdAPI(encSubMenu1Id);
        dispatch({ type: types.PROD_SM_1, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const getSM2Prod = (encSubMenu2Id) => async(dispatch) => {
    try{
        const res = await getSM2ProdAPI(encSubMenu2Id);
        console.log("in action" , res)
        dispatch({ type: types.PROD_SM_2, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};