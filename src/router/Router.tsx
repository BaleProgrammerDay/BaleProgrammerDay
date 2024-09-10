import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotFound } from "~/pages/NotFound/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import routes from "./Routes";

export function AppRouter() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  function routeToRender(route: any) {
    let componentToRender;

    if (route.Private) {
      componentToRender = isLoggedIn ? <route.component /> : <NotFound />;
    } else {
      componentToRender = <route.component />;
    }

    return componentToRender;
  }

  return (
    <BrowserRouter>
      <Routes>
        {routes(isLoggedIn).map((route, index) => (
          <Route key={index} path={route.path} element={routeToRender(route)} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
