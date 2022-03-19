import { IGlobalState } from "../../AppContext";
import { Hackathon } from "../../models/Hackathon";
import { getArrayWithUpdatedElementsByCondition } from "../common/services/appGlobalStateService/appGlobalState.helpers";

export const updateHackathonById = (state: IGlobalState, hackathonId: number, updater: (hackathon: Hackathon) => Hackathon) => {
  const newHackathons = getArrayWithUpdatedElementsByCondition((state.hackathons.data ?? []), (h) => h.id === hackathonId, updater);
  if (state.hackathons.data === newHackathons) {
    return state;
  }
  return {
    ...state,
    hackathons: {
      ...state.hackathons,
      data: newHackathons,
    },
  };
};
