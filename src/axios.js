import axios from "axios";

const apiBaseURL = 'https://mokxweb.duckdns.org:5000';
//https://20.235.118.112:5000/generate

export const api = axios.create({
    baseURL: apiBaseURL,
});