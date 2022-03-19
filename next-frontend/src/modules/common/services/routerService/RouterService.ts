import { NextRouter } from "next/router";
import { useAppContext } from "../../../../AppContext";

export class RouterService {
  constructor(
    public readonly router: NextRouter,
  ) {
    this.router = router;
  }
}

export const useRouterService = () => useAppContext().services.routerService;
