import React, {createContext, useContext, useMemo} from "react";

import {useRouter} from "next/router";
import {HackathonsReactService} from "./modules/hackathons/services/HackathonsReactService";
import {AuthService} from "./modules/auth/services/AuthService";
import {HttpService} from "./modules/common/services/httpService/HttpService";
import {UsersReactService} from "./modules/users/services/UsersReactService";
import {RouterService} from "./modules/common/services/routerService/RouterService";
import {ThemeService} from "./modules/common/services/themeService/ThemeService";
import {TranslationService} from "./modules/common/services/translationService/TranslationService";
import {AppGlobalStateService} from "./modules/common/services/appGlobalStateService/AppGlobalStateService";
import {DeviceStorageService} from "./modules/common/services/deviceStorageService/DeviceStorageService";
import {IUser} from "./models/User";
import {Hackathon} from "./models/Hackathon";
import {setUser} from "./modules/users/state-updaters/set-user";
import {RealtimeService} from "./modules/common/services/realtimeService/RealtimeService";

export interface ILoadableStatePart<T> {
  isLoading: boolean;
  isLoadingError: boolean;
  data: T | null;
}

export interface IGlobalState {
  user: ILoadableStatePart<IUser>;
  hackathons: ILoadableStatePart<Array<Hackathon>>;
}

export const wrapWithLoadable = <T extends {}>(initialState: T | null, isLoading = false): ILoadableStatePart<T> => ({
  isLoading,
  isLoadingError: false,
  data: initialState,
});

const initialState: IGlobalState = {
  user: wrapWithLoadable(null, true),
  hackathons: wrapWithLoadable(null, true),
};

export interface IAppContextServices {
  hackathonsReactService: HackathonsReactService;
  usersReactService: UsersReactService;
  authService: AuthService;
  appGlobalStateService: AppGlobalStateService<IGlobalState>;
  routerService: RouterService;
  themeService: ThemeService;
  translationService: TranslationService;
  deviceStorageService: DeviceStorageService;
  realtimeService: RealtimeService;
}

export interface IAppContextValue {
  services: IAppContextServices;
}

const AppContext = createContext<IAppContextValue>(null);

export const useAppContext = () => useContext(AppContext);

export interface IAppContextProviderProps {
  serverSideProps?: {
    user?: IUser;
  }
}

export const AppContextProvider: React.FC<IAppContextProviderProps> = ({
  children,
  serverSideProps,
}) => {
  const router = useRouter();
  const appContextValue: IAppContextValue = useMemo(() => {
    const routerService = new RouterService(router);
    const httpService = new HttpService();
    const translationService = new TranslationService();
    const themeService = new ThemeService();
    const deviceStorageService = new DeviceStorageService();

    const appGlobalStateService = new AppGlobalStateService(initialState);

    const hackathonsReactService = new HackathonsReactService();

    const realtimeService = new RealtimeService();
    const usersReactService = new UsersReactService(realtimeService);

    const authService = new AuthService(httpService, routerService, deviceStorageService, appGlobalStateService);

    if (serverSideProps) {
      appGlobalStateService.setState(
        state => setUser(state, (user) => ({ ...user, ...serverSideProps.user }))
      );
    }

    return {
      services: {
        appGlobalStateService,

        hackathonsReactService,
        usersReactService,
        authService,
        routerService,
        translationService,
        themeService,
        deviceStorageService,
        realtimeService,
      },
    };
  }, [router, serverSideProps]);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const FakeAppContextProvider: React.FC<IAppContextProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const fakeAppContextValue: IAppContextValue = useMemo(() => {
    const routerService = new RouterService(router);
    const httpService = new HttpService();
    const translationService = new TranslationService();
    const themeService = new ThemeService();
    const deviceStorageService = new DeviceStorageService();

    const appGlobalStateService = new AppGlobalStateService(initialState);


    const hackathonsReactService = new HackathonsReactService();

    const realtimeService = new RealtimeService();
    const usersReactService = new UsersReactService(realtimeService);

    const authService = new AuthService(httpService, routerService, deviceStorageService, appGlobalStateService);


    return {

      services: {
        appGlobalStateService,

        hackathonsReactService,
        usersReactService,
        authService,
        routerService,
        translationService,
        themeService,
        deviceStorageService,
        realtimeService,
      },
    };
  }, [router]);

  return (
    <AppContext.Provider value={fakeAppContextValue}>
      {children}
    </AppContext.Provider>
  );
};
