import * as types from "../actionTypes/AppActionTypes";
import {createReducer} from "../../utils/StoreUtils";

// const companyMalumot1 = localStorage.getItem('company malumot')
// const companyMalumot = JSON.parse(companyMalumot1)


const initState = {
    openCompany: false,
    // companyOrder:[],
    //     // companyClient:[],
    //     // companyKassa:[],
    // comMalumot: companyMalumot,
    companyId: '',
    adminPanel: false,
    res:false,
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
    active: true,
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
    [types.GET_USER_LIST](state, payload) {
        state.currentUser = payload.payload
    },
    [types.GET_USER_COMPANY](state,payload){
        state.companyId = payload.payload.id
    },
    [types.REQUEST_SUCCESS](state) {
        state.showModal = false
    },
    [types.GET_COMPANY_LIST](state, payload) {
        state.company = payload.payload
    },
    [types.GET_ORDER_LOGIN](state, payload) {
        state.currentAdmin = payload.payload
    },
    [types.GET_ATTACHMENT_ID](state, payload) {
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
