import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
// import {ORDER,REGISTER_AGENT, ATTACHMENT,URL_ORDER,TOKEN,NEW_USER_FOR_ORDER} from "./constants";
// import {userMe} from "../redux/actions/AuthActions";


const PrivateRoute = ({dispatch, auth, component: Component, ...rest}) => {
    // dispatch(userMe())

    // if (window.location.pathname!=='/client/online' && window.location.pathname!=='/client/inPerson' && window.location.pathname!=='/client/order'){
    //     localStorage.removeItem(ORDER)
    //     localStorage.removeItem(NEW_USER_FOR_ORDER);
    // }
    // if (window.location.pathname!=='/registerAgent'){
    //     localStorage.removeItem(REGISTER_AGENT)
    //     localStorage.removeItem(ATTACHMENT)
    // }

    return (<Route
            {...rest}
            render={(props) =>
                // localStorage.getItem(TOKEN) != null ? (
                //     <Component {...props} />
                // ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {from: props.location}
                        }}
                    />
                // )
            }
        />
    )
}
export default connect(({privateRoute, auth}) => ({privateRoute, auth}))(
    PrivateRoute
);
