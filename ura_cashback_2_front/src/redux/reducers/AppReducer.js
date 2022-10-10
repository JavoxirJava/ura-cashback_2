import * as types from "../actionTypes/AppActionTypes";
import {createReducer} from "../../utils/StoreUtils";


const initState = {
    user: [],
    activeUser: false,
    orders: [],
    roles: [],
    company: [],
    oneOrder: {},
    imgId: {},
    active: false,
    showModal: false,
    deleteShowModal: false,
    editModal: false,
    attachmentId: '',
    currentCompany: '',
    currentUser: '',
}
const reducers = {
    [types.REQUEST_SUCCESS](state) {
        state.showModal = false
        state.deleteShowModal = false
    },
    [types.GET_ORDER_LIST](state, payload) {
        state.orders = payload.payload
    },
    [types.GET_USER_LIST](state, payload) {
        state.user = payload.payload
    },
    [types.REQUEST_SUCCESS](state) {
        state.showModal = false
    },
    [types.GET_COMPANY_LIST](state, payload) {
        state.company = payload.payload
    },
    [types.GET_ROLE_LIST](state, payload) {
        state.roles = payload.payload._embedded.list
    },

    updateState(state, {payload}) {
        return {
            ...state,
            ...payload,
        };
    },
};

export default createReducer(initState, reducers);
