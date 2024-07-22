import * as types from "./company.action.type";
import { getAboutUsAPI, getCompanyAddressAPI, getCompanyDetailsAPI } from "./company.api";

export const getCmpDetails = () => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getCompanyDetailsAPI();
        dispatch({ type: types.GET_COMPANY_DETAILS, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const getCmpAddress = () => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getCompanyAddressAPI();
        dispatch({ type: types.GET_COMPANY_ADDRESS, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const getAboutUs = () => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getAboutUsAPI();
        dispatch({ type: types.GET_ABOUT_US, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};