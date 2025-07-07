import { Link } from "react-router-dom";
import LogoutButton from "../common/Logout";

const OperatorHeader = () => {
  return (
    <header className="flex justify-between items-center bg-white text-gray-800 px-6 py-4 shadow-md">
      <h1 className="text-xl md:text-2xl font-semibold text-purple-700 tracking-wide">
        🛠️ Tool Manager
      </h1>
      <LogoutButton />
    </header>
  );
};

export default OperatorHeader;
