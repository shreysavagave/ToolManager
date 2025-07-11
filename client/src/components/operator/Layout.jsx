import { Outlet } from "react-router-dom";
import OperatorHeader from "./Header"; // adjust path if needed

const OperatorLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <OperatorHeader />
      <div className="p-4 max-w-6xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default OperatorLayout;
