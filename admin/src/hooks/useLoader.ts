import {
  Dispatch, SetStateAction, useCallback, useEffect, useRef, useState,
} from 'react';
import axios, { CancelToken } from 'axios';

export const getNewSource = () => {
  const { CancelToken } = axios;
  return CancelToken.source();
};

const useLoader = <MODEL, ERRORTYPE = null>({
  api,
  parseError,
  deps,
  autostart,
}: {
  api: (token?: CancelToken) => Promise<MODEL>;
  parseError?: (error: any) => ERRORTYPE;
  deps: Array<any>;
  autostart?: boolean;
}): {
  data: MODEL | null;
  setData: Dispatch<SetStateAction<MODEL | null>>;
  isLoading: boolean;
  isLoadingError: boolean;
  reload(): void;
  errorObj: ERRORTYPE | null;
} => {
  const [canDoRequest, setCanDoRequest] = useState(autostart ?? true);
  const [randomReloadDeps, setRandomReloadDeps] = useState<number>(Math.random());
  const [data, setData] = useState<MODEL | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [errorObj, setErrorObj] = useState<ERRORTYPE | null>(null);

  const noRenderDataRef = useRef({
    source: getNewSource(),
    isRequestPending: false,
  });

  const refreshToken = () => {
    noRenderDataRef.current.source = getNewSource();
  };

  useEffect(() => {
    if (!canDoRequest) {
      return;
    }
    (async () => {
      if (noRenderDataRef.current.isRequestPending) {
        noRenderDataRef.current.source.cancel();
        refreshToken();
      }
      try {
        setErrorObj(null);
        setIsLoading(true);
        noRenderDataRef.current.isRequestPending = true;
        const response = await api(noRenderDataRef.current.source.token);
        setData(response);
        setIsLoading(false);
        setIsLoadingError(false);
      } catch (e) {
        setErrorObj(parseError?.(e) ?? null);
        setIsLoadingError(true);
        setIsLoading(false);
      }
      refreshToken();
      noRenderDataRef.current.isRequestPending = false;
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, randomReloadDeps]);

  const reload = useCallback(() => {
    setCanDoRequest(true);
    setRandomReloadDeps(Math.random());
  }, [setRandomReloadDeps]);

  return {
    data,
    setData,
    isLoading,
    isLoadingError,

    reload,
    errorObj,
  };
};

export default useLoader;
