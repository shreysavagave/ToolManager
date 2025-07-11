import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-900 text-white">
      {/* Left Section (Visible on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white px-8">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Tool Manager</h1>
          <p className="text-lg text-gray-300">
            Manage tools, monitor lifecycle, all in one place.
          </p>
        </div>
      </div>

      {/* Right Section (Form Pages) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-900">
        <Outlet />
      </div>
    </div>
  );
}
