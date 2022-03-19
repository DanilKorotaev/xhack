import {authConfig, httpClient} from "../httpClient";


export const buildAddTagForHackathonRequestUrl = () => '/tags/addTagForHackathon';

export type addTagForHackathonRequestBodyType = {
    tagId: number,
    hackathonId: number,
}

export interface addTagForHackathonResponseBody {

}

export const addTagForHackathon = (
    body: addTagForHackathonRequestBodyType
) => httpClient.post<addTagForHackathonResponseBody>(buildAddTagForHackathonRequestUrl(), body, authConfig())
    .then(response => response.data);