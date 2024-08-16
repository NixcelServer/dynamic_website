import * as types from "./project.action.type";

const initalState = {

    isLoading: false,
    isError: true,
     adminProducts: [],
     webProjects: [],
    // prodSM1:[],
    // prodSM2:[],
    // prodSM2Content:[],
    // servicesWeb:[],
    
    
    
}

export const projectReducer = (state = initalState, { type,payload }) => {

    switch (type) {

      case types.GET_ADMIN_PROJECTS:
        return { ...state, adminProjects: payload };

        case types.GET_WEB_PROJECTS:
        return { ...state, webProjects: payload };

        // case types.PROD_SM_1:
        //   return { ...state, prodSM2: payload.withSubMenu2, prodSM1: payload.withoutSubMenu2 };  

        //   case types.PROD_SM_2:
        //     console.log("in sb2")
        //     return { ...state, prodSM2Content: payload };  
        
      

    default: {
      return state;
    }
  }
};