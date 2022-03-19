import {AxiosInstance} from "axios";
import {IGlobalState, useAppContext} from "../../../AppContext";
import {HttpService} from "../../common/services/httpService/HttpService";
import {RouterService} from "../../common/services/routerService/RouterService";
import {pages} from "../../../pages";
import {DeviceStorageService} from "../../common/services/deviceStorageService/DeviceStorageService";
import {CookieService} from "../../common/services/cookieService/CookieService";
import {AppGlobalStateService} from "../../common/services/appGlobalStateService/AppGlobalStateService";
import {loginRequest} from "../requests/login.request";
import {setUser} from "../../users/state-updaters/set-user";

export class AuthService {
  static TOKEN_DEVICE_STORAGE_KEY = "access_token";

  private httpClient: AxiosInstance;

  constructor(
    private httpService: HttpService,
    private routerService: RouterService,
    private deviceStorageService: DeviceStorageService,
    private appGlobalStateService: AppGlobalStateService<IGlobalState>,
  ) {
    this.httpClient = httpService.client;
    this.httpService = httpService;
    this.deviceStorageService = deviceStorageService;
    this.appGlobalStateService = appGlobalStateService;
  }

  public login = async (loginData: { email: string, password: string }): Promise<{ error: null | string }> => {
    try {
      this.appGlobalStateService.setState(
        state => setUser(state, (loadableUser) => ({ ...loadableUser, isLoading: true }))
      );
      const loginResponse = await loginRequest(loginData);
      this.appGlobalStateService.setState(
        state => setUser(state, (loadableUser) => ({ ...loadableUser, isLoading: false, ...loginResponse.user }))
      );
      this.httpService.setToken(loginResponse.token);
      await this.deviceStorageService.set(AuthService.TOKEN_DEVICE_STORAGE_KEY, loginResponse.token);
      await this.routerService.router.push(pages.index());
      return {
        error: null,
      }
    } catch (error) {
      await this.deviceStorageService.remove(AuthService.TOKEN_DEVICE_STORAGE_KEY);
      this.httpService.removeToken();
      return {
        error: 'Invalid credentials',
      }
    }
  };

  public onSuccessLogin = async () => {
    // const user = (await this.usersRepository.getProfile(new GetProfileRequest())).responseData;
    // this.appGlobalStateService.setState((state) => ({
    //   ...state,
    //   user: {
    //     isLoadingError: false,
    //     isLoading: false,
    //     data: user,
    //   },
    // }));
    // await this.routerService.router.push(pages.dash());
  };

  public register = async () => {
    // try {
    //   const result = new RegisterResultDto(await this.httpClient.post("/api/auth/register", registerDto));
    //   CookieService.setCookie(AuthService.TOKEN_DEVICE_STORAGE_KEY, (result).response.data.token);
    //   await this.onSuccessLogin();
    //   return result;
    // } catch (error) {
    //   return new RegisterErrorDto(error?.response?.data?.message || "Unknown error");
    // }
  };

  public logout = async () => {
    this.httpService.removeToken();
    CookieService.deleteCookie(AuthService.TOKEN_DEVICE_STORAGE_KEY);
    await this.routerService.router.push(pages.auth());
  };
}

export const useAuthService = () => useAppContext().services.authService;
