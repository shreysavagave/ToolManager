import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserAsync } from "../../store/auth-slice"; // updated thunk action

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserAsync()).unwrap();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;