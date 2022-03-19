import isEqual from "lodash/isEqual";
import { IGlobalState } from "../../AppContext";
import { User } from "../../models/User";

export const putCurrentUser = (state: IGlobalState, userUpdater: (user: User) => User): IGlobalState => {
  const newUser = userUpdater(state.user.data);
  if (isEqual(state.user.data, newUser)) {
    return state;
  }
  return {
    ...state,
    user: {
      ...state.user,
      data: newUser,
    },
  };
};

export const patchCurrentUser = (state: IGlobalState, userPatch: Partial<User>): IGlobalState => {
  const newUser = { ...(state.user.data ?? {}), ...userPatch };
  if (isEqual(state.user.data, newUser)) {
    return state;
  }
  return {
    ...state,
    user: {
      ...state.user,
      data: newUser as User,
    },
  };
};
