import {authConfig, httpClient} from "../httpClient";
import IHackathon from "../../core/hackathons/IHackathon";

export const buildCreateHackathonRequestUrl = () => '/hackathons/create-hackathon';

export interface ICreateHackathonRequestRequestBody {
    name: string;
    description: string;
    location: string;
    siteUrl: string;
    avatarUrl: string;
    startDate: Date;
    endDate: Date;
}

export type ICreateHackathonRequestResponseBodyType = IHackathon;

export const createHackathonRequest = (
    body: ICreateHackathonRequestRequestBody,
) => httpClient.post<ICreateHackathonRequestResponseBodyType>(buildCreateHackathonRequestUrl(), body, authConfig())
    .then((response) => response.data);