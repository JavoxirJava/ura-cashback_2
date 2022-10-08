import * as authActionTypes from "./actionTypes/AppActionTypes";

const apiMiddleware = ({dispatch}) => (next) => (action) => {
    if (!action.api) {
        return next(action);
    }
    const {api, types: [START, SUCCESS, ERROR], data} = action;

    dispatch({
        type: START
    })

    return api(data)
        .then((response) => {
            if (response && response.data && (response.data.success ||
                response.status === 201 || response.status === 204 || response.status === 200)) {
                dispatch({
                    type: SUCCESS,
                    payload: response.data
                })
                dispatch({
                    type: 'updateState',
                    payload: {
                        loading: false
                    }
                })

                //then uchun add va editlarga...
                return {
                    payload: response.data,
                    data,
                    success: true,
                    statusCode: response.status
                }
            } else if (response.status === 401) {
                dispatch({
                    type: authActionTypes.AUTH_LOGOUT
                })
                dispatch({
                    type: 'updateState',
                    payload: {
                        loading: false
                    }
                })
            } else {
                dispatch({
                    type: ERROR
                })

                dispatch({
                    type: 'updateState',
                    payload: {
                        loading: false
                    }
                })
            }
        }).catch(error => {
            dispatch({
                type: ERROR
            })
            dispatch({
                type: 'updateState',
                payload: {
                    loading: false
                }
            })
            throw error;
        })

}

export default apiMiddleware