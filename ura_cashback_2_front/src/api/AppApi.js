import HttpClient from "../utils/HttpClient";
import {api} from "./api";
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
    return HttpClient.doGet(api.userList);
}
export const addUser = (data) => {
    return HttpClient.doPost(api.users, data);
}
export const editUser = (data) => {
    return HttpClient.doPut(api.users + "/" + data.id, data);
}
export const activeUser = (data) => {
    return HttpClient.doPut(api.users + "/" + data);
}
//*****************************************************************=> Order
export const getOrder = () => {
    return HttpClient.doGet(api.order);
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
export const activeCompany = (data) => {
    return HttpClient.doDelete(api.company + "/active/" + data);
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

