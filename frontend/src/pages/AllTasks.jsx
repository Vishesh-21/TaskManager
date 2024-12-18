import Card from "../components/Home/Card";
import InputData from "../components/Home/InputData";
import NavBar from "../components/Home/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";

const Alltasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");

  const [Data, setData] = useState();

  const [Updated, setUpdated] = useState({ id: "", title: "", desc: "" });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v2/alltasks",
        { headers }
      );
      setData(response.data.data);
    };
    fetch();
  });

  return (
    <>
      <div>
        <NavBar add={"true"} setInputDiv={setInputDiv} />
        <div className="taskDiv w-full h-[88vh]">
          {Data && (
            <Card
              home={"true"}
              setInputDiv={setInputDiv}
              data={Data.tasks}
              setUpdated={setUpdated}
            />
          )}
        </div>
      </div>
      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        Updated={Updated}
        setUpdated={setUpdated}
      />
    </>
  );
};

export default Alltasks;
