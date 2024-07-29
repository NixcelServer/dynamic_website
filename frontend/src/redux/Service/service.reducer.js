import * as types from "./service.action.type";

const initalState = {

    isLoading: false,
    isError: true,
    services: [],
    servicesSB1:[],
    servicesSB2:[],
    servicesSB2Content:[],
    servicesWeb:[],
    
    
    
}

export const serviceReducer = (state = initalState, { type,payload }) => {

    switch (type) {

      case types.GET_SERVICE:
        return { ...state, services: payload };

        case types.GET_SERVICES:
        return { ...state, servicesWeb: payload };

        case types.GET_SERVICE_SB1_CONTENT:
          console.log("in sb1")
          return { ...state, servicesSB1: payload.withoutSubMenu2, servicesSB2: payload.withSubMenu2 };  

          case types.GET_SERVICE_SB2_CONTENT:
            console.log("in sb2")
            return { ...state, servicesSB2Content: payload };  
      

    default: {
      return state;
    }
  }
};