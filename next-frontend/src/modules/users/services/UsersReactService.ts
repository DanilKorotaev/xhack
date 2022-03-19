/* eslint-disable react-hooks/rules-of-hooks */
import useLoader from "../../../hooks/useLoader";
import {RealtimeService} from "../../common/services/realtimeService/RealtimeService";
import {IoEventsEnum} from "../../common/services/realtimeService/IoEvents.enum";

export class UsersReactService {
  constructor(
    private realtimeService: RealtimeService,
  ) {
    this.realtimeService = realtimeService;

    realtimeService.subscribeToEvent(IoEventsEnum.TEST, (data) => {
      console.log(data);
    });
  }

  public useProfile() {
    // const loaderResult = useLoader({
    //   api: (token) => this.usersRepository.getProfile(new GetProfileRequest(), token),
    //   deps: [],
    // });
    //
    // return {
    //   isLoading: loaderResult.isLoading,
    //   isLoadingError: loaderResult.isLoadingError,
    //   data: loaderResult.data,
    // };
  }
}
