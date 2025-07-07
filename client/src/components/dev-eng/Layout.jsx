import { Outlet } from "react-router-dom";
import DevEngHeader from "../dev-eng/Header"

const DevEngLayout = () => {
  return (
    <div>
      <DevEngHeader />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DevEngLayout;