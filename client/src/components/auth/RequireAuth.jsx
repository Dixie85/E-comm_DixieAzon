import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    console.log(auth, 'auth from RequireAuth');
    const location = useLocation();

    return (
        auth?.accessToken && allowedRoles.includes(auth.role)
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;