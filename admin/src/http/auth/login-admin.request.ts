import {httpClient} from "../httpClient";

export const buildLoginAdminRequestUrl = () => '/auth/login/login-admin';

export interface ILoginAdminRequestBody {
    key: string
}

export type ILoginAdminRequestResponseBodyType = { token: string };

export const loginAdminRequest = (
    body: ILoginAdminRequestBody,
) => httpClient.post<ILoginAdminRequestResponseBodyType>(buildLoginAdminRequestUrl(), body)
    .then((response) => response.data);
