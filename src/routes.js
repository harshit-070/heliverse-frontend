export const routes = {
  user: {
    path: "/",
    redirect: () => "/",
  },

  team: {
    path: "/team",
    redirect: () => "/team",
  },

  editTeam: {
    path: "/team/:id",
    redirect: (id) => `/team/${id}`,
  },
};
