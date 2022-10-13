import HttpClient from "../utils/HttpClient";
import {api} from "./api";
// import data from "bootstrap/js/src/dom/data";
//*****************************************************************=> Country
export const getCountries = () => {
    return HttpClient.doGet(api.country);
}
export const addCountry = (data) => {
    return HttpClient.doPost(api.country, data);
}
export const editCountry = (data) => {
    return HttpClient.doPut(api.country + "/" + data.id, data);
}
export const deleteCountry = (data) => {
    return HttpClient.doDelete(api.country + "/" + data);
}
//*****************************************************************=> User
export const getUsers = () => {
    return HttpClient.doGet(api.users);
}
export const getOneUsers = (data) => {
    return HttpClient.doGet(api.users + "/" + data);
}
export const addUser = (data) => {
    return HttpClient.doPost(api.users, data);
}
export const editUser = (data) => {
    return HttpClient.doPut(api.users + "/" + data.id, data);
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
export const getRoles = () => {
    return HttpClient.doGet(api.role);
}
export const getUserCompanyList = (data) => {
    return HttpClient.doGet(api.users + "/company/" + data);
}

