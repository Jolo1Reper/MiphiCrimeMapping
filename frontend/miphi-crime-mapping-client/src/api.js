import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL ?? "https://localhost:8080/api/";

const api = axios.create({
  baseURL: baseURL,
});


export { api };