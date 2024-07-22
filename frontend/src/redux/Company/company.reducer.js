import * as types from "./company.action.type";

const initalState = {

    isLoading: false,
    isError: true,
    company: [],
    socialInfo:[],
    cmpAddress:[],
    aboutUs:[],
    
    
}
 
export const companyReducer = (state = initalState, { type,payload }) => {

    switch (type) {

      case types.GET_COMPANY_DETAILS:
        return { ...state, company: payload.company,socialInfo: payload.socialInfo };

        case types.GET_COMPANY_ADDRESS:
          return { ...state, cmpAddress: payload };
       
          case types.GET_ABOUT_US:
            return { ...state, aboutUs: payload };

    default: {
      return state;
    }
  }
};
