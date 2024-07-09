import {
    legacy_createStore,
    compose,
    combineReducers,
    applyMiddleware,
  } from "redux";
  import { thunk } from 'redux-thunk';
  import { navbarReducer } from "./NavMenu/navmenu.reducer";
import authReducer from "./Auth/auth.reducer";


  const rootReducer = combineReducers({
    authReducer,
    navbarMenu: navbarReducer,
  });
  
  const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  export const store = legacy_createStore(
    
    rootReducer,
    composer(applyMiddleware(thunk))
  );
  