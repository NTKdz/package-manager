import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes";
import Analytics from "./services/analytics";

function App() {
  const { getPackageData } = Analytics();
  useEffect(() => {
    getPackageData();
  }, []);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
