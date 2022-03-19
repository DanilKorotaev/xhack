import IHackathon from "../../core/hackathons/IHackathon";
import {authConfig, httpClient} from "../httpClient";

export const buildUpdateHackathonByIdRequestUrl = (id: number | string) => `hackathons/update-hackathon/${id}`;

export interface IUpdateHackathonByIdRequestBody {
    name?: string,
    description?: string,
    isOnline?: boolean,
    location?: string,
    startDate?: Date,
    endDate?: Date,
    siteUrl?: string,
    avatarUrl?: string,
}

export type IUpdateHackathonByIdRequestResponseBodyType = IHackathon;

export const updateHackathonById = (
    id: string | number,
    body: IUpdateHackathonByIdRequestBody
) => httpClient.post<IUpdateHackathonByIdRequestResponseBodyType>(buildUpdateHackathonByIdRequestUrl(id), body, authConfig())
    .then(response => response.data);