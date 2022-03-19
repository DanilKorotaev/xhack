import {httpClient} from "../httpClient";

export const buildLoginRequestUrl = () => '/auth/login';

export interface ILoginRequestBody {
    email: string,
    password: string
}

export type ILoginRequestResponseBodyType = { token: string };

export const loginRequest = (
    body: ILoginRequestBody,
) => httpClient.post<ILoginRequestResponseBodyType>(buildLoginRequestUrl(), body)
    .then((response) => response.data);