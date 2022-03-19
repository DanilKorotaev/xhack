import ITag from "../../core/tags/ITag";
import {authConfig, httpClient} from "../httpClient";

export const buildGetTagsListRequestUrl = () => '/tags/getTagsList';

export const getTagsList = () =>
    httpClient.get<ITag[]>(buildGetTagsListRequestUrl(), authConfig())
        .then(response => response.data);