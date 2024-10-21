import axios from "axios"

export const $axios = axios.create({
  baseURL: process.env.API_URL,
})
