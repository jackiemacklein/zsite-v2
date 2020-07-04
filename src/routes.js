import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import NotFount from "./pages/404";

const routes = [
  {
    exact: true,
    path: "/",
    component: Page1.Component,
    requestInitialData: Page1.requestInitialData,
    options: {
      Head: Page1.Head,
    },
  },
  {
    path: "/page2",
    component: Page2.Component,
  },
  {
    component: NotFount.Component,
    options: {
      Head: NotFount.Head,
    },
  },
];

export default routes;
