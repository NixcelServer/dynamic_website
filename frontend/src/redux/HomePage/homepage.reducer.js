import * as types from "./homepage.action.type";

const initalState = {

    isLoading: false,
    isError: true,
    hpSliderImgs: [],
    allNavMenu:[]
    
    
    
}
 
export const hpSliderReducer = (state = initalState, { type,payload }) => {

    switch (type) {

      case types.GET_HP_SLIDER_IMGS:
        return { ...state, hpSliderImgs: payload };

        
       
        

    default: {
      return state;
    }
  }
};
