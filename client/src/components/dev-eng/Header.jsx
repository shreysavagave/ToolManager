import { Link } from "react-router-dom";
import LogoutButton from "../common/Logout";

const DevEngHeader = () => {
  return (
    <header className="flex justify-between items-center bg-gray-800 text-white px-6 py-3 shadow">
      <h1 className="text-xl md:text-2xl font-semibold text-white tracking-wide">
        🛠️ Tool Manager
      </h1>
      <LogoutButton />
    </header>
  );
};

export default DevEngHeader;
