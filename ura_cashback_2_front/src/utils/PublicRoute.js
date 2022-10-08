import React from 'react';
import {Route} from 'react-router-dom';
// import {ORDER,NEW_USER_FOR_ORDER,ATTACHMENT, URL_ORDER,REGISTER_AGENT} from "./constants";
import {useDispatch} from "react-redux";

const PublicRoute = ({component: Component, ...rest}) => {
    const dispatch = useDispatch()
    //
    // window.onhashchange = null;
    // if (window.location.pathname!=='/inPerson' && window.location.pathname!=='/online'){
    //     localStorage.removeItem(ORDER)
    //     localStorage.removeItem(NEW_USER_FOR_ORDER);
    // }
    // if (window.location.pathname!=='/registerAgent'){
    //     localStorage.removeItem(REGISTER_AGENT)
    //     localStorage.removeItem(ATTACHMENT)
    //
    // }
    return (<Route
            {...rest}
            render={props =>
                <Component {...props}/>
            }
        />
    )
};
export default PublicRoute;
