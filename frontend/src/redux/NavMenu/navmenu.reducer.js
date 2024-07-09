import * as types from "./navmenu.action.type"

const initalState = {

    isLoading: false,
    isError: true,
    navmenu: [],
    submenu1:[],
    submenu2:[],
    
}
 
export const navbarReducer = (state = initalState, { type,payload }) => {

    switch (type) {

      case types.GET_NAVMENU:
        return { ...state, navmenu: payload };

        case types.GET_SUBMENU_1:
          return { ...state, submenu1: payload };  

          case types.GET_SUBMENU_2:
            return { ...state, submenu2: payload };  
        

    default: {
      return state;
    }
  }
};
