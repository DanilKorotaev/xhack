import {apiHttpClient} from "../../common/services/httpService/httpClient";
import {IUser} from "../../../models/User";

export const buildLoginRequestUrl = () => '/auth/login';

export interface ILoginRequestRequestBody {
  email: string;
  password: string;
}

export interface ILoginRequestResponseBody {
  user: IUser;
  token: string;
}

export const loginRequest = (
  body: ILoginRequestRequestBody,
) => apiHttpClient.post<ILoginRequestResponseBody>(buildLoginRequestUrl(), body, {

}).then((response) => response.data);
