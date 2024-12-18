import { IoAddCircle } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const NavBar = ({ add, setInputDiv }) => {
  return (
    <div className="sticky top-0 left-0 z-[1]">
      <div className="w-full flex justify-between px-3 items-center relative">
        <h1 className="text-gray-500 text-[1.5rem] font-bold uppercase text-center w-full">
          Task Manager
        </h1>
        {add === "true" && (
          <button onClick={() => setInputDiv("fixed")}>
            <IoAddCircle className="text-4xl text-gray-500 absolute top-0 right-2 hover:text-green-500 duration-150 transition-all hover:scale-[1.3]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
