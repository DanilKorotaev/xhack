import {authConfig, httpClient} from "../httpClient";
import IUser from "../../core/users/IUser";

export const buildUpdateProfileByIdRequestUrl = (id: number) => '/users/update-profile/' + id;

export interface IUpdateProfileByIdRequestRequestBody {
    name: string,
    avatarUrl?: string,
    networks: string[],
    isAvailableForSearching: boolean,
    specialization: string,
    email: string,
    description: string
}

export type IUpdateProfileByIdResponseBodyType = IUser;

export const updateProfileById = (
    id: number,
    body: IUpdateProfileByIdRequestRequestBody,
) => httpClient.patch<IUpdateProfileByIdResponseBodyType>(buildUpdateProfileByIdRequestUrl(id), body, authConfig())
    .then((response) => response.data);