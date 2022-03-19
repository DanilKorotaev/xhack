import {authConfig, httpClient} from "../httpClient";
import IHackathon from "../../core/hackathons/IHackathon";

export const buildGetHackathonByIdRequestUrl = (id: number) => '/hackathons/get-by-id/' + id;

export type IGetHackathonByIdRequestResponseBodyType = IHackathon;

export const getHackathonByIdRequest = (
    id: number,
) => httpClient.get<IGetHackathonByIdRequestResponseBodyType>(buildGetHackathonByIdRequestUrl(id), authConfig())
    .then((response) => response.data);
