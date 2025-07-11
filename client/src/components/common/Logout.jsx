import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserAsync } from "../../store/auth-slice";
import { LogOut } from "lucide-react"; // icon

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserAsync()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-all"
      title="Logout"
    >
      <LogOut className="w-5 h-5 text-white" />
    </button>
  );
};

export default LogoutButton;
