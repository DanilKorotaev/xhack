import axios, {AxiosRequestConfig} from 'axios';

export const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const authConfig = (): AxiosRequestConfig => (
    {
        headers:
            {
                Authorization: `Bearer ${localStorage.auth_token}`
            },
        baseURL: localStorage["api_endpoint"],
    }
);