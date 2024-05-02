import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api-univesp-mg-stock.vercel.app'
})