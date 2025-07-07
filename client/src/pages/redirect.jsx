import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RedirectByRole() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    switch (user.role) {
      case "admin":
        navigate("/dev-eng/Home", { replace: true });
        break;
      case "supervisor":
        navigate("/supervisor/Home", { replace: true });
        break;
      case "operator":
        navigate("/operator/Home", { replace: true });
        break;
      default:
        navigate("/unauth-page", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return null;
}

export default RedirectByRole;
