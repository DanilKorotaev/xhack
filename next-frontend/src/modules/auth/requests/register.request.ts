import {apiHttpClient} from "../../common/services/httpService/httpClient";

export const buildRegisterRequestUrl = () => '/auth/register';

export interface IRegisterRequestRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterRequestResponseBody {
  id: number;
  name: string;
  email: string
  avatarUrl: string;

}

export const registerRequest = (
  body: IRegisterRequestRequestBody,
) => apiHttpClient.post<IRegisterRequestResponseBody>(buildRegisterRequestUrl(), body, {

}).then((response) => response.data);
