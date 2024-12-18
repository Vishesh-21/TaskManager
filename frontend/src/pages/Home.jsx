import Siderbar from "../components/Home/Siderbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-[98vh] gap-4">
      <div className="sidebar border rounded h-full w-[25%] p-4 border-gray-500 flex flex-col justify-between">
        <Siderbar />
      </div>
      <div className="mainsection border rounded w-full p-4 border-gray-500">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
