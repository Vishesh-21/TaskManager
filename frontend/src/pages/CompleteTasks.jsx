import { useEffect, useState } from "react";
import Card from "../components/Home/Card";
import NavBar from "../components/Home/NavBar";
import axios from "axios";

const CompleteTasks = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v2/complete-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    fetch();
  });

  return (
    <div>
      <NavBar add={false} />
      <div className="taskDiv w-full h-[88vh]">
        <Card home={"false"} data={Data} />
      </div>
    </div>
  );
};

export default CompleteTasks;
