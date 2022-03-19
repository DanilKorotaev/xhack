import {
  useCallback, useEffect, useRef, useState,
} from "react";
import axios, { CancelToken } from "axios";
import debounce from "lodash/debounce";

export interface IUseLoaderConfig {
  debounceTime: number
}

export const defaultUseLoaderConfig: IUseLoaderConfig = {
  debounceTime: 500,
};

export const getNewSource = () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { CancelToken } = axios;
  return CancelToken.source();
};

const useLoader = <MODEL>({
  api,
  deps,
  config,
}: {
  api: (token?: CancelToken) => Promise<MODEL>;
  deps: Array<any>;
  config?: IUseLoaderConfig,
}): {
    data: MODEL | null;
    isLoading: boolean;
    isLoadingError: boolean;
  } => {
  const configToUse = config ?? defaultUseLoaderConfig;
  const [data, setData] = useState<MODEL | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const noRenderDataRef = useRef({
    source: getNewSource(),
    isRequestPending: false,
  });

  const refreshToken = () => {
    noRenderDataRef.current.source = getNewSource();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced = useCallback(debounce(async (token?: CancelToken) => {
    try {
      const response = await api(noRenderDataRef.current.source.token);
      setData(response);
      setIsLoading(false);
      setIsLoadingError(false);
    } catch (e) {
      setIsLoadingError(true);
      setIsLoading(false);
    }
  }, configToUse.debounceTime, { leading: true, trailing: true }), []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsLoadingError(false);
      if (noRenderDataRef.current.isRequestPending) {
        noRenderDataRef.current.source.cancel();
        refreshToken();
      }
      noRenderDataRef.current.isRequestPending = true;
      await debounced();
      noRenderDataRef.current.isRequestPending = false;
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    data,
    isLoading,
    isLoadingError,
  };
};

export default useLoader;
