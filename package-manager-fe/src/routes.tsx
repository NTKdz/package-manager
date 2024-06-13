import { createBrowserRouter } from "react-router-dom";
import LayOut from "./views/LayOut";
import SignIn from "./views/auth-view/SignIn";
import HomeView from "./views/home-view/HomeView";
import ManagementView from "./views/management-view/ManagementView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: "/order",
        element: <HomeView />,
      },
      {
        path: "/user",
        element: <HomeView />,
      },
      {
        path: "/manage/:route",
        element: <ManagementView />,
      },
      {
        path: "/SignIn",
        element: <SignIn />,
      },
      {
        path: "/SignUp",
        element: <SignIn />,
      },
    ],
  },
]);
