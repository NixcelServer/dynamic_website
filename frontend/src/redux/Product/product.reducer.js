import * as types from "./product.action.type";

const initalState = {

    isLoading: false,
    isError: true,
    products: [],
    webProducts: [],
    prodSM1:[],
    prodSM2:[],
    prodSM2Content:[],
    // servicesWeb:[],
    
    
    
}

export const productReducer = (state = initalState, { type,payload }) => {

    switch (type) {

      case types.GET_PRODUCTS:
        return { ...state, products: payload };

        case types.GET_WEB_PRODUCTS:
        return { ...state, webProducts: payload };

        case types.PROD_SM_1:
          return { ...state, prodSM2: payload.withSubMenu2, prodSM1: payload.withoutSubMenu2 };  

          case types.PROD_SM_2:
            console.log("in sb2")
            return { ...state, prodSM2Content: payload };  
        
      

    default: {
      return state;
    }
  }
};