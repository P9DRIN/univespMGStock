import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api-univesp-mgs-tock.vercel.app'
    // baseURL: 'http://localhost:3333'
})