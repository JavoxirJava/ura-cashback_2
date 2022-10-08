import {TOKEN} from "./constants";
import axios from 'axios'
import {config} from "./config";

export default class HttpClient {

    static headers = {'Access-Control-Allow-Origin': '*'};

    static doRequest() {
        const token = localStorage.getItem(TOKEN);
        if (token) {
            HttpClient.headers = {
                ...HttpClient.headers,
                Authorization: token
            };
        }

        return axios.create({
            baseURL: config.BASE_URL,
            headers: {...HttpClient.headers}
        });
    }

    static doGet(url, params = {}) {
        return HttpClient.doRequest().get(url, params)
    }

    static doPost(url, data) {
        return HttpClient.doRequest().post(url, data)
    }

    static doPut(url, data) {
        return HttpClient.doRequest().put(url, data)
    }

    static doPatch(url, data) {
        return HttpClient.doRequest().patch(url, data)
    }

    static doDelete(url, params = {}) {
        return HttpClient.doRequest().delete(url, params)
    }

}