import {IGlobalState, ILoadableStatePart} from "../../../AppContext";
import {User} from "../../../models/User";

export const setUser = (state: IGlobalState, updater: (user: ILoadableStatePart<User>) => ILoadableStatePart<User>): IGlobalState => {
  return {
    ...state,
    user: updater(state.user),
  };
};
