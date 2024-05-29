import { useEffect } from "react";
import "./App.css";
import Analytics from "./services/analytics";
import LayOut from "./views/LayOut";

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
