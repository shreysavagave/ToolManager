import LogoutButton from "../common/Logout";

const SupervisorHeader = () => {
  return (
    <header className="flex justify-between items-center bg-black-700 text-white px-6 py-3 shadow">
      <h1 className="text-xl md:text-2xl font-semibold text-purple-700 tracking-wide">
        🛠️ Tool Manager
      </h1>
      <LogoutButton />
    </header>
  );
};

export default SupervisorHeader;

