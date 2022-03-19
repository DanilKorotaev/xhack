import {authConfig, httpClient} from "../httpClient";
import IUser from "../../core/users/IUser";

export const buildGetUsersProfileRequestUrl = () => '/users/profile';

export type IGetListRequestResponseBodyType = IUser;

export const getUsersProfileRequest = () =>
    httpClient.get<IGetListRequestResponseBodyType>(buildGetUsersProfileRequestUrl(), authConfig())
        .then((response) => response.data)