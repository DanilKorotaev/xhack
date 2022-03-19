import {authConfig, httpClient} from "../httpClient";
import IHackathon from "../../core/hackathons/IHackathon";

export const buildGetListRequestUrl = () => 'hackathons/get-list';

export interface IGetListRequestRequestBody {
    filter: string;
    take: number;
    page: number;
}

export type IGetListRequestResponseBodyType = IHackathon[];

export const getHackathonsListRequest = (
    body: IGetListRequestRequestBody,
) => httpClient.post<IGetListRequestResponseBodyType>(buildGetListRequestUrl(), body, authConfig())
    .then((response) => response.data);
