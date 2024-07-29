import * as types from "./service.action.type";
import { getServiceDetailsAPI, getServicesAPI, getServiceSb1API, getServiceSb2API } from "./service.api";

export const getServiceDetails = () => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getServiceDetailsAPI();
        dispatch({ type: types.GET_SERVICE, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const getServices = () => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getServicesAPI();
        dispatch({ type: types.GET_SERVICES, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const getServiceSb1 = (encSubMenu1Id) => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getServiceSb1API(encSubMenu1Id);
        dispatch({ type: types.GET_SERVICE_SB1_CONTENT, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const getServiceSb2 = (encSubMenu2Id) => async(dispatch) => {
    try{
        const res = await getServiceSb2API(encSubMenu2Id);
        console.log("in action" , res)
        dispatch({ type: types.GET_SERVICE_SB2_CONTENT, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};