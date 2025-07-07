import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left Section (Visible on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white px-8">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Tool Manager</h1>
          <p className="text-lg text-white/80">
            Manage tools, monitor lifecycle, and collaborate — all in one place.
          </p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
