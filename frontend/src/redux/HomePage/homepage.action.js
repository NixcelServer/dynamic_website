import * as types from "./homepage.action.type";
import { getAllNavMenuAPI, getHPSliderImgsAPI } from "./homepage.api";

export const getHPSliderImgs = () => async(dispatch) => {
    try{
        console.log("in action")
        const res = await getHPSliderImgsAPI();
        dispatch({ type: types.GET_HP_SLIDER_IMGS, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

