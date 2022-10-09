// import data from "bootstrap/js/src/dom/data";
import * as api from "../../api/AppApi";
import {
    addAttachment, addUser, deleteUser, editUser,
    getRoles, getUsers,
} from "../../api/AppApi";
import * as types from "../actionTypes/AppActionTypes";
import {toast} from "react-toastify";

export const getUser = () => (dispatch) => {
    dispatch({
        api: getUsers,
        types: [
            types.REQUEST_START,
            types.GET_USER_LIST,
            types.REQUEST_ERROR
        ]
    })
}
export const saveUser = (payload) => (dispatch) => {
    dispatch({
        api: payload.id ? editUser : addUser,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: payload
    }).then(res => {
        if (res.success) {
            dispatch(getUser())
            toast.success("USER saved successfully!");
        } else {
            toast.error("You cannot save User!")
        }
    }).catch(() => {
        toast.error("Error saving User!");
    })
}

export const removeUser = (payload) => (dispatch) => {
    dispatch({
        api: deleteUser,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: payload.id
    }).then(res => {
        dispatch(getUser())
        toast.success(res);
    })
}
export const getRole = () => (dispatch) => {
    dispatch({
        api: getRoles,
        types: [
            types.REQUEST_START,
            types.GET_ROLE_LIST,
            types.REQUEST_ERROR
        ]
    })
}

export const getCompany = () => (dispatch) => {
    dispatch({
        api: api.getCompanies,
        types: [
            types.REQUEST_START,
            types.GET_COMPANY_LIST,
            types.REQUEST_ERROR
        ]
    })
}
export const saveCompany = (payload) => (dispatch) => {
    dispatch({
        api: api.addCompany,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: payload
    }).then(res => {
        if (res.success) {
            dispatch(getCompany())
            toast.success("Company saved successfully!");
        } else {
            toast.error("You cannot save company!")
        }
    }).catch(err => {
        toast.error("Error saving company!");
    })
}

export const editCompanyEnabled = (payload) => (dispatch) => {
    dispatch({
        api: api.editEnabledCompany(payload),
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
    }).then(res => {
        dispatch(getCompany())
        toast.success(res);
    });
}


export const removeCompany = (payload) => (dispatch) => {

    dispatch({
        api: api.deleteCompany,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: payload.id
    }).then(res => {
        dispatch(getCompany())
        toast.success("County deleted successfully!");
    }).catch(err => {
        toast.error("Error delete county!");
    })
}
export const getOrder = () => (dispatch) => {
    dispatch({
        api: api.getOrder(),
        types: [
            types.REQUEST_START,
            types.GET_ORDER_LIST,
            types.REQUEST_ERROR
        ]
    })
}
export const saveOrder = (payload) => (dispatch) => {
    dispatch({
        api: api.addOrder,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: payload
    }).then(res => {
        if (res.success) {
            dispatch(getOrder())
            toast.success("Order saved successfully!");
        } else {
            toast.error("You cannot save company!")
        }
    }).catch(err => {
        toast.error("Error saving company!");
    })
}

export const editOrder = (payload) => (dispatch) => {
    dispatch({
        api: api.editOrder(payload),
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
    }).then(res => {
        dispatch(getOrder())
        toast.success(res);
    });
}


export const delOrder = (payload) => (dispatch) => {

    dispatch({
        api: api.deleteOrder,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: payload.id
    }).then(res => {
        dispatch(getOrder())
        toast.success("County deleted successfully!");
    }).catch(err => {
        toast.error("Error delete order!");
    })
}
export const addAttachmentAction = (payload) => (dispatch) => {
    dispatch({
        api: addAttachment,
        types: [
            types.REQUEST_START,
            // types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: payload
    }).then(res => {
        dispatch({
            type: 'updateState',
            payload: {
                attachmentId: res,
            }
        });
        toast.success("Attachment saved successfully!");
    }).catch(err => {
        toast.error("Error saving attachment!");
    })
}
