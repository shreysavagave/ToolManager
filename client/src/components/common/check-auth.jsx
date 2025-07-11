import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  // Not authenticated and trying to access protected route
  if (!isAuthenticated && !path.includes('/login')) {
    return <Navigate to="/login" />;
  }

  // Restrict register page access to only admin
  if (path.includes('/register')) {
    if (!isAuthenticated || user?.role !== 'admin') {
      return <Navigate to="/unauth-page" />;
    }
  }

  // Redirect authenticated users away from login page
  if (isAuthenticated && path.includes('/auth/login')) {
    if (user?.role === 'admin') return <Navigate to="/dev-eng/Home" />;
    if (user?.role === 'supervisor') return <Navigate to="/supervisor/Home" />;
    if (user?.role === 'operator') return <Navigate to="/operator/Home" />;
    return <Navigate to="/shop/home" />;
  }

  // Role-based access restrictions
  if (isAuthenticated) {
    if (user?.role !== 'admin' && path.includes('/dev-eng')) {
      return <Navigate to="/unauth-page" />;
    }
    if (user?.role === 'admin' && path.includes('/shop')) {
      return <Navigate to="/dev-eng/Home" />;
    }
    if (user?.role !== 'supervisor' && path.includes('/supervisor')) {
      return <Navigate to="/unauth-page" />;
    }
    if (user?.role === 'supervisor' && path.includes('/shop')) {
      return <Navigate to="/supervisor/Home" />;
    }
    if (user?.role !== 'operator' && path.includes('/operator')) {
      return <Navigate to="/unauth-page" />;
    }
    if (user?.role === 'operator' && path.includes('/shop')) {
      return <Navigate to="/operator/Home" />;
    }
  }

  return <>{children}</>;
}

export default CheckAuth;
