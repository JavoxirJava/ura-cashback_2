import HttpClient from "../utils/HttpClient";
import {api} from "./api";
import data from "bootstrap/js/src/dom/data";
// import data from "bootstrap/js/src/dom/data";
//*****************************************************************=> User
export const getUsers = () => {
    return HttpClient.doGet(api.users);
}
export const loginSuperAdmin = (data) =>{
    return HttpClient.doPost(api.users + "/superAdmin/login", data)
}
export const getCabinetCompany=(data) =>{
    return HttpClient.doPost(api.users + "/company/login" , data)
}
export const getOneUsers = (data) => {
    return HttpClient.doGet(api.users + "/" + data);
}
export const addCompanyUser = (data) => {
    return HttpClient.doPost(api.users, data);
}
export const addCompanyAdmin = (data) =>{
    return HttpClient.doPost(api.users + "/companyAdmin", data);
}
export const addCompanyKassa= (data) =>{
    return HttpClient.doPost(api.users + "/companyKassa", data);
}
export const editCompanyKassa = (data) => {
    return HttpClient.doPut(api.users + "/companyKassa/" + data.id, data);
}
export const removeUsers = (data) =>{
    return HttpClient.doDelete(api.users + "/" + data);
}
export const activeUser = (data) => {
    return HttpClient.doPut(api.users + "/active/" + data);
}
export const userPage = (data) => {
    return HttpClient.doGet(api.users+ "?page=" + data )
}
export const findByPhoneNumber = (data) => {
    return HttpClient.doGet(api.orderUser + data)
}
//*****************************************************************=> Order
export const getOrders = () => {
    return HttpClient.doGet(api.order + "/list");
}
export const addOrder = (data) => {
    return HttpClient.doPost(api.order, data);
}
export const editOrder = (data) => {
    return HttpClient.doPut(api.order + "/" + data.id, data);
}
export const deleteOrder = (data) => {
    return HttpClient.doDelete(api.order + "/" + data);
}
export const loginOrder = (data) => {
    return HttpClient.doPut(api.order + "/login", data);
}
export const findByUser = (data) => {
    return HttpClient.doGet(api.order + "/" + data);
}
//*****************************************************************=> Company
export const getCompanies = () => {
    return HttpClient.doGet(api.company);
}
export const addCompany = (data) => {
    return HttpClient.doPost(api.company, data);
}
export const editCompany = (data) => {
    return HttpClient.doPut(api.company + "/" + data.id, data);
}
export const activeCompany12 = (data) => {
    return HttpClient.doPut(api.company + "/active/" + data);
}
//*****************************************************************=> Attachment
export const addAttachment = (data) => {
    return HttpClient.doPost(api.attachment, data);
}
//*****************************************************************=> Role

// export const getUserCompanyList = (data) => {
//     return HttpClient.doGet(api.users + "/company/" + data);
// }

