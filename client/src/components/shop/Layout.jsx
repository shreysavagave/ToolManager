
import ShopHeader from "./Header";
import { Outlet } from "react-router-dom";

function ShopLayout(){

  return(
    <div className="flex flex-col overflow-hidden bg-white">
      <ShopHeader/>
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default ShopLayout;