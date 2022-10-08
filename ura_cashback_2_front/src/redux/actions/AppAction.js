// import data from "bootstrap/js/src/dom/data";
import * as api from "../../api/AppApi";
import {
    addAttachment,
    addCountry,
    addValyuta,
    deleteProductCategories,
    getCountries,
    getProductCategories,
    getProductes,
    getRoles,
    getValyutaies,
    saveProductCategories,
    addProduct,
    getCategories,
    addCategory,
    getUserCompanyList,
    getLevels,
    addLevel,
    getLevelUsers, addLevelUser
} from "../../api/AppApi";
import * as types from "../actionTypes/AppActionTypes";
import {toast} from "react-toastify";

export const getUser = () => (dispatch) => {
    dispatch({
        api: api.getUsers,
        types: [
            types.REQUEST_START,
            types.GET_USER_LIST,
            types.REQUEST_ERROR
        ]
    })
}
export const saveUser = (payload) => (dispatch) => {
    dispatch({
        api: payload.id ? api.editUser : api.addUser,
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
        api: api.deleteUser,
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

export const getOrder = () => (dispatch) => {
    dispatch({
        api: api.getOrders,
        types: [
            types.REQUEST_START,
            types.GET_ORDER_LIST,
            types.REQUEST_ERROR
        ]
    });
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
    }).catch(err => {
        toast.error("Error saving attachment!");
    })
}
