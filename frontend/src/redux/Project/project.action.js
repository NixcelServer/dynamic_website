import { getProjectDetailsAPI, getProjectsAPI } from "./project.api";
import * as types from "./project.action.type";



export const getAdminProjects = () => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getProjectDetailsAPI();
        dispatch({ type: types.GET_ADMIN_PROJECTS, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const getProjects = () => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getProjectsAPI();
        dispatch({ type: types.GET_WEB_PROJECTS, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};