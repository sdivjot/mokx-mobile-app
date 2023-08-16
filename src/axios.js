import axios from "axios";

const apiBaseURL = process.env.REACT_APP_API_URL;
export const api = axios.create({
    baseURL: apiBaseURL,
});
