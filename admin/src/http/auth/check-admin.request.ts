import {authConfig, httpClient} from "../httpClient";

const buildCheckAdminRequestUrl = () => '/auth/login/check-admin'

export interface ICheckAdminRequestResponseBodyType {
    success: boolean;
    statusCode?: number;
}

export const checkAdminRequest = () =>
    httpClient.get<ICheckAdminRequestResponseBodyType>(buildCheckAdminRequestUrl(), authConfig())
        .then((response) => response.data)
        .catch((reject) => {
            return {
                success: false,
                statusCode: reject.response.status
            };
        });
