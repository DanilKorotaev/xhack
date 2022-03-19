import {authConfig, httpClient} from "../httpClient";
import IHackathon from "../../core/hackathons/IHackathon";

export const buildGetHackathonByIdAdminRequestUrl = (id: number) => '/hackathons/get-by-id/admin/' + id;

export type IGetHackathonByIdAdminRequestResponseBodyType = IHackathon;

export const getHackathonByIdAdminRequest = (
  id: number,
) => httpClient.get<IGetHackathonByIdAdminRequestResponseBodyType>(buildGetHackathonByIdAdminRequestUrl(id), authConfig())
  .then((response) => response.data);
