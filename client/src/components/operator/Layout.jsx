import { Outlet } from "react-router-dom";
import OperatorHeader from "./Header";

const OperatorLayout = () => {
  return (
    <div>
      <OperatorHeader />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default OperatorLayout;