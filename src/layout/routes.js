import { BrowserRouter, Routes, Route } from "react-router-dom";

import navigations from "src/config/navigations";

function LayoutRoutes(props) {
  const routes = recurr(navigations);
  function recurr(routes, path = "") {
    const nav = [];
    for (const route of routes) {
      nav.push(
        <Route
          key={path + route.path}
          path={path + route.path}
          element={route.element}
        ></Route>
      );
      if (route.subnav) {
        nav.push(...recurr(route.subnav, path + route.path));
      }
    }
    return nav;
  }
  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
}

export default LayoutRoutes;
