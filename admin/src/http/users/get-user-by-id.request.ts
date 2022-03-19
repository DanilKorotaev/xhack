import {authConfig, httpClient} from "../httpClient";
import IUser from "../../core/users/IUser";

export const buildGetUserByIdRequestUrl = (id: number) => '/users/' + id;

export type IGetUserByIdRequestResponseBodyType = IUser;

export const getUserByIdRequest = (
    id: number,
) => httpClient.get<IGetUserByIdRequestResponseBodyType>(buildGetUserByIdRequestUrl(id), authConfig())
    .then((response) => response.data);