import axios from "axios";

const apiBaseURL = 'https://mokxweb.duckdns.org:5000';

export const api = axios.create({
    baseURL: apiBaseURL,
});
