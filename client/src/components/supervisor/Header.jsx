import { LogOut } from "lucide-react";
import LogoutButton from "../common/Logout";

const SupervisorHeader = () => {
  return (
    <header className="flex justify-between items-center bg-gray-800 text-white px-6 py-3 shadow">
      <h1 className="text-xl md:text-2xl font-semibold text-White tracking-wide">
        🛠️ Tool Manager
      </h1>
      <div className="flex items-center gap-3">
        <LogoutButton />
      </div>
    </header>
  );
};

export default SupervisorHeader;


