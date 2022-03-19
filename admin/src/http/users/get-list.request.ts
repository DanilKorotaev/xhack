import {authConfig, httpClient} from "../httpClient";
import IUser from "../../core/users/IUser";

const buildUsersGetListRequestUrl = () => '/users/get-list';

export interface IUsersGetListRequestRequestBody {
    filter: string;
    take: number;
    page: number;
}

export type IUsersGetListRequestResponseBodyType = IUser[];

export const usersGetListRequest = (
    body: IUsersGetListRequestRequestBody,
) => httpClient.post<IUsersGetListRequestResponseBodyType>(buildUsersGetListRequestUrl(), body, authConfig())
    .then((response) => response.data);