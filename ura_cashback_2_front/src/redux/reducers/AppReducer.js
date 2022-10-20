import * as types from "../actionTypes/AppActionTypes";
import {createReducer} from "../../utils/StoreUtils";
import {GET_ATTACHMENT_ID} from "../actionTypes/AppActionTypes";


const initState = {
    adminPanel: false,
    user: [],
    search: '',
    page: "1",
    size:"5",
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
    currentAdmin: '',
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
        state.user = payload.payload.object
    },
    [types.GET_ONE_USER_LIST](state, payload) {
        state.currentUser = payload.payload
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
    [types.GET_ORDER_LOGIN](state, payload) {
        state.currentAdmin = payload.payload
    },
    [types.GET_ATTACHMENT_ID](state, payload) {
        console.log(payload.payload);
        state.attachmentId = payload.payload
    },

    updateState(state, {payload}) {
        return {
            ...state,
            ...payload,
        };
    },
};

export default createReducer(initState, reducers);
