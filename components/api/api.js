import axios from 'axios'


export const server = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL + ':' + process.env.NEXT_PUBLIC_SERVER_PORT}`,
});