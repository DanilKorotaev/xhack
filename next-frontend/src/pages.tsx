export const pages = {
  index: () => "/",
  dash: () => "/dash",
  searchTeams: () => "/search-teams",
  searchUsers: () => "/search-users",
  auth: () => "/auth",
  hackathon: ({ hackathonId }: { hackathonId: number | string }) => `/hackathons/${hackathonId}`,
  hackathonMembers: ({ hackathonId }: { hackathonId: number | string }) => `/hackathons/${hackathonId}/members`,
};
