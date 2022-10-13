import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import appReducer from "./AppReducer";

export const rootReducer=combineReducers({
    router:routerReducer,
    app:appReducer,
})