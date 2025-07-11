import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import LogoutButton from "../common/Logout";

const DevEngHeader = () => {
  return (
    <header className="flex justify-between items-center bg-gray-800 text-white px-6 py-4 shadow-md border-b border-gray-700">
      <h1 className="text-xl md:text-2xl font-semibold tracking-wide">
        🛠️ Tool Manager
      </h1>
      <div className="flex items-center gap-3">
        <Link
          to="/register"
          className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition duration-200"
          title="Register User"
        >
          <UserPlus className="w-5 h-5 text-white" />
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
};

export default DevEngHeader;
