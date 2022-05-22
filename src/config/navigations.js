import PageHome from "src/page";

import PageAdmin from "src/page/admin";
import PageProjects from "src/page/admin/projects";
import PageProjectsDetail from "src/page/admin/projects/detail";
import PageSignin from "src/page/admin/signin";
import PageSignup from "src/page/admin/signup";
import PageAdminTeam from "src/page/admin/team";
import PageAdminTeamAdd from "src/page/admin/team/add";

const navigations = [
  { path: "/", element: <PageHome /> },
  {
    path: "/admin",
    element: <PageAdmin />,
    subnav: [
      { path: "/signin", element: <PageSignin /> },
      { path: "/signup", element: <PageSignup /> },
      {
        path: "/projects",
        element: <PageProjects />,
        subnav: [{ path: "/:name", element: <PageProjectsDetail /> }],
      },
    ],
  },
  {
    path: "/admin/team",
    element: <PageAdminTeam />,
    subnav: [{ path: "/add", element: <PageAdminTeamAdd /> }],
  },
];

export default navigations;
