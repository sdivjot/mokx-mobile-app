import axios from "axios";

const apiBaseURL = "http://20.235.118.112:5000";
//http://20.235.118.112:5000/generate

export const api = axios.create({
    baseURL: apiBaseURL,
});