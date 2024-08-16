import { createBrowserRouter } from "react-router-dom";
import LayOut from "./views/LayOut";
import HomeView from "./views/home-view/HomeView";
import ManagementView from "./views/management-view/ManagementView";
import ConfigView from "./views/config-view/ConfigView";
import SchedulerView from "./views/scheduler-view/SchedulerView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      { path: "/scheduler", element: <SchedulerView /> },
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
        path: "/config",
        element: <ConfigView defaultOpen={true} disableTrigger={true} />,
      },
    ],
  },
]);
