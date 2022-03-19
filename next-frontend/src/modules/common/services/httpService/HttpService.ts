import { AxiosInstance } from "axios";
import { apiHttpClient } from "./httpClient";

export class HttpService {
  public readonly client: AxiosInstance = apiHttpClient;

  public setToken = (token) => {
    this.client.defaults.headers.authorization = `Bearer ${token}`;
  };

  public removeToken = () => {
    delete this.client.defaults.headers.authorization;
  };
}
