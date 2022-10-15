import {createBrowserHistory} from "history";
import {routerMiddleware} from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./reducers/rootReducer";
import apiMiddleware from "./ApiMiddleware";
import 'primeicons/primeicons.css';


const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunkMiddleware, apiMiddleware, routeMiddleware].filter(Boolean)

let store;
store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    )

);
export default store;
