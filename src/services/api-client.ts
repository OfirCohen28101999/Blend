import axios, { CanceledError } from "axios";

export { CanceledError }
const apiClient = axios.create({
    // baseURL: 'http://localhost:3000/feed'
    baseURL: 'http://localhost:8000'
});

export default apiClient;