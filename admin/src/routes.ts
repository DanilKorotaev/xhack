import { INavbarItem } from "./components/navbar/Navbar";

export const PAGES_PARAMS = {
  hackId: 'hackId',
  userId: 'userId'
}

export const PAGES = {
  auth: '/auth',
  home: '/home',
  users: '/users',
  userEdit: {
    template: `/users/edit/:${PAGES_PARAMS.userId}`,
    build: (id: number) => `/users/edit/${id}`
  },
  userDetails: {
    template: `/users/:${PAGES_PARAMS.userId}`,
    build: (id: number) => `/users/${id}`
  },
  hackathons: '/hackathons',
  hackDetails: {
    template: `/hackathons/:${PAGES_PARAMS.hackId}`,
    build: (id: number) => `/hackathons/${id}`
  },
  hackCreate: '/hackathons/create',
  hackUpdate: {
    template: `/hackathons/edit/:${PAGES_PARAMS.hackId}`,
    build: (id: number) => `/hackathons/edit/${id}`
  },
  tags: '/tags',
  teams: '/teams',
  dashboard: '/dashboard',
};

export const routes: INavbarItem[] = [
  { title: 'Home', to: PAGES.home, },
  { title: 'Users', to: PAGES.users, },
  { title: 'Hackathons', to: PAGES.hackathons, exact: false },
  { title: 'Tags', to: PAGES.tags },
  { title: 'Teams', to: PAGES.teams, },
  { title: 'Dashboard', to: PAGES.dashboard, },
];
