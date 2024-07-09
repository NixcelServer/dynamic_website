import * as types from "./auth.type";


export const Log = () => async (dispatch) => {
    try {
     //  const res = await loginAPI(payload);
      // console.log(res);
      dispatch({ type: types.LOGIN });
    } catch (err) {
      console.log(err);
     // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
  };

  export const Logout = () => async (dispatch) => {
    try {
     //  const res = await loginAPI(payload);
      // console.log(res);
      dispatch({ type: types.LOGOUT });
    } catch (err) {
      console.log(err);
     // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
  };