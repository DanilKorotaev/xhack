import {authConfig, httpClient} from "../httpClient";

export const buildUploadSingleRequestUrl = () => '/file-upload/single';

export type AppMimeType =
    | 'image/png'
    | 'image/jpeg';

export interface IUploadSingleRequestBody {
    // fieldname: string;
    // originalname: string;
    // encoding: string;
    // mimetype: AppMimeType;
    // size: number;
    // buffer: Buffer | string;
}

export interface IUploadSingleRequestResponseBody {
    image_url: string,
    message: string,
}

export const uploadSingle = (body: IUploadSingleRequestBody) =>
    httpClient.post<IUploadSingleRequestResponseBody>(buildUploadSingleRequestUrl(), body, authConfig())
        .then((response) => response.data)