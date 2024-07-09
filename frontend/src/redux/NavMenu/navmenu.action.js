import * as types from "./navmenu.action.type"
import { getNavmenuAPI, getSubMenu1API, getSubMenu2API } from "./navmenu.api";


export const getNavmenu = () => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getNavmenuAPI();
        dispatch({ type: types.GET_NAVMENU, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const getSubMenu1 = (encNavMenuId) => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getSubMenu1API(encNavMenuId);
        dispatch({ type: types.GET_SUBMENU_1, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};


export const getSubMenu2 = (encSubMenu1Id) => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getSubMenu2API(encSubMenu1Id);
        dispatch({ type: types.GET_SUBMENU_2, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};