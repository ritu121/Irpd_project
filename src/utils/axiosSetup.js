import axios from "axios";
import {BASE_URL} from "../constant";

// export const BASE_URL = "http://50.17.107.208:3004/v1";

const userToken = localStorage.getItem("token");
const userId =localStorage.getItem("user_id")

console.log('AXIOS TOKEN',userToken)


export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: !!userToken ? { Authorization: `Bearer ${userToken}` } : null,
});
