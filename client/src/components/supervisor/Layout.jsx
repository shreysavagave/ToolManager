
import { Outlet } from "react-router-dom";
import SupervisorHeader from "./Header";

const SupervisorLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SupervisorHeader />
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default SupervisorLayout;
