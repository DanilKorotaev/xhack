import {authConfig, httpClient} from "../httpClient";

export const buildCreateTagsRequestUrl = () => '/tags/createTags';

export type createTagsRequestBodyType = {
    names: string[];
}

export interface createTagsResponseBody {

}

export const createTags = (
    body: createTagsRequestBodyType
) => httpClient.post<createTagsResponseBody>(buildCreateTagsRequestUrl(), body, authConfig())
    .then(response => response.data)
