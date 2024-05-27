import { useEffect } from "react";
import "./App.css";
import HomePage from "./views/HomePage";
import LayOut from "./views/LayOut";
import Analytics from "./services/Analytics";

function App() {
  const { getPackageData } = Analytics();
  useEffect(() => {
    getPackageData();
  }, []);
  return (
    <>
      <LayOut />
    </>
  );
}

export default App;
