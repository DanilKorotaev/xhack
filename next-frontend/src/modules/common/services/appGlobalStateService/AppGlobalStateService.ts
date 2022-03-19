import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../../../AppContext";

export interface IStateSelector<STATE> {
  (state: STATE): any;
}

export interface IGlobalStateSubscriber<STATE> {
  (newState: STATE): void;
}

export interface IStateUpdater<STATE> {
  (state: STATE): STATE;
}

export class AppGlobalStateService<STATE> {
  private subs: Array<IGlobalStateSubscriber<STATE>> = [];

  private state: STATE;

  public constructor(initialState: STATE) {
    this.state = initialState;
  }

  public getState(): STATE {
    return this.state;
  }

  public setState(stateUpdater: IStateUpdater<STATE>) {
    this.state = stateUpdater(this.state);
    this.subs.forEach((sub) => {
      sub(this.state);
    });
  }

  public subscribe = (sub: IGlobalStateSubscriber<STATE>) => {
    this.subs = [...this.subs, sub];
    return () => {
      this.subs = this.subs.filter((s) => s !== sub);
    };
  };
}

export const useAppGlobalStateService = <STATE>(): AppGlobalStateService<STATE> => useAppContext().services.appGlobalStateService as any as AppGlobalStateService<STATE>;

export const useAppGlobalState = <STATE>(stateSelector: IStateSelector<STATE>) => {
  const appGlobalStateService = useAppGlobalStateService<STATE>();
  const [partialState, setPartialState] = useState(stateSelector(appGlobalStateService.getState()));
  const partialStateRef = useRef(partialState);

  useEffect(() => appGlobalStateService.subscribe((newState) => {
    const newPartialState = stateSelector(newState);
    if (newPartialState !== partialStateRef.current) {
      partialStateRef.current = newPartialState;
      setPartialState(newPartialState);
    }
  }), [appGlobalStateService, stateSelector]);

  return partialState;
};
