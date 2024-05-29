import NavBar from "@/components/custom/nav-bar/NavBar";
import HomePage from "./HomePage";

export default function LayOut() {
  return (
    <div className="flex">
      <NavBar />
      <div className="mt-4 w-full">
        <HomePage />
      </div>
    </div>
  );
}
