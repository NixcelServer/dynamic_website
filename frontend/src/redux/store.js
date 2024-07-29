import {
    legacy_createStore,
    compose,
    combineReducers,
    applyMiddleware,
  } from "redux";
  import { thunk } from 'redux-thunk';
  import { navbarReducer } from "./NavMenu/navmenu.reducer";
import authReducer from "./Auth/auth.reducer";
import { companyReducer } from "./Company/company.reducer";
import { hpSliderReducer } from "./HomePage/homepage.reducer";
import { serviceReducer } from "./Service/service.reducer";
// import { companyReducer } from "./Company/company.reducer";
// import { companyReducer } from "./Company/company.reducer";


  const rootReducer = combineReducers({
    authReducer,
    navbarMenu: navbarReducer,
    companyDetails:companyReducer,
    hpSliderImgs:hpSliderReducer,
    services:serviceReducer,
  });
  
  const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  export const store = legacy_createStore(
    
    rootReducer,
    composer(applyMiddleware(thunk))
  );
  