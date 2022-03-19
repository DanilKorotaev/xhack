import {authConfig, httpClient} from "../httpClient";
import IUser from "../../core/users/IUser";

export const buildUsersUpdateProfileRequestUrl = () => '/users/profile';

export interface IUsersUpdateProfileRequestRequestBody {
    id: number,
    name: string,
    avatarUrl?: string,
    networks: string[],
    isAvailableForSearching: boolean,
    specialization: string,
    email: string,
    description: string
}

export type IUsersUpdateProfileRequestResponseBodyType = IUser;

export const usersUpdateProfileRequest = (
    body: IUsersUpdateProfileRequestRequestBody,
) => httpClient.patch<IUsersUpdateProfileRequestResponseBodyType>(buildUsersUpdateProfileRequestUrl(), body, authConfig())
    .then((response) => response.data);