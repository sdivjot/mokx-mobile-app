import axios from "axios";

const apiBaseURL = process.env.API_URL;

export const api = axios.create({
    baseURL: apiBaseURL,
});