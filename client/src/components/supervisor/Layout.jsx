
import { Outlet } from "react-router-dom";
import SupervisorHeader from "./Header";

const SupervisorLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <SupervisorHeader />
      <main className="flex-1 p-4 bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default SupervisorLayout;
