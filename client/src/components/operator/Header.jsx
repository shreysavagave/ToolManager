import { Link } from "react-router-dom";
import LogoutButton from "../common/Logout";

const OperatorHeader = () => {
  return (
    <header className="flex justify-between items-center text-white bg-gray-800 px-6 py-4 shadow-md">
      <h1 className="text-xl md:text-2xl font-semibold text-white-700 tracking-wide">
        🛠️ Tool Manager
      </h1>
      <LogoutButton />
    </header>
  );
};

export default OperatorHeader;
