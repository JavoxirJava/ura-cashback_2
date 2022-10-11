import * as api from "../../api/AppApi";
import {
    activeUser,
    addAttachment, addUser, editUser,
    getUsers, removeUsers,
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
        api: removeUsers,
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
export const isActiveUser = (payload) =>(dispatch)=>{
    dispatch({
        api: activeUser,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data:payload
    }).then(res=>{
        dispatch(getUser())
    })
}


export const getRole = () => (dispatch) => {
    dispatch({
        api: getRole,
        types: [
            types.REQUEST_START,
            types.GET_ROLE_LIST,
            types.REQUEST_ERROR
        ]
    })
}
//company
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
        api: payload.id ? api.editCompany : api.addCompany,
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
    }).catch(() => {
        toast.error("Error saving company!");
    })
}


export const activeCompany = (payload) => (dispatch) => {
    dispatch({
        api: api.activeCompany12(payload),
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: payload.id
    }).then(() => {
        dispatch(getCompany())
        toast.success("Company active successfully!");
    }).catch(() => {
        toast.error("Error active company!");
    })
}
export const getOrder = () => (dispatch) => {
    dispatch({
        api: api.getOrders,
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
    }).catch(() => {
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
    }).then(() => {
        dispatch(getOrder())
        toast.success("County deleted successfully!");
    }).catch(() => {
        toast.error("Error delete order!");
    })
}
//finish
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
        // dispatch(getValyutaies());
    }).catch(() => {
        toast.error("Error saving attachment!");
    })
}
