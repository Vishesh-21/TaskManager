import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompleteTasks from "./pages/CompleteTasks";
import IncompleteTasks from "./pages/IncompleteTasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { authAction } from "./store/auth";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authAction.login());
    } else if (isLoggedIn === false) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="text-white bg-gray-900 w-full h-screen p-2 relative">
        <Routes>
          {/* these are the nested roots  */}
          <Route exact path="/" element={<Home />}>
            <Route index element={<AllTasks />} />
            <Route path="/importanttasks" element={<ImportantTasks />} />
            <Route path="/incompletetasks" element={<IncompleteTasks />} />
            <Route path="/completedtasks" element={<CompleteTasks />} />
          </Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
