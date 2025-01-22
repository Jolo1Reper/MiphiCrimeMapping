import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL ?? "https://localhost:7218";

const api = axios.create({
  baseURL: baseURL,
});


export default api;
export { baseURL }