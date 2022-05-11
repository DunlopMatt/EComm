import axios from "axios"

export const axiosInstance = axios.create({
  baseURL : "https://react-app-ecomm.herokuapp.com/api"
})