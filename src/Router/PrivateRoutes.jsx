import useAuth from "../hooks/useAuth.jsx";
import { Navigate, useLocation } from "react-router";
import cogoToast from "cogo-toast";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth(); // Destructure both values
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Display a loading indicator
    }

    if (isAuthenticated) {
        return children;
    } else {
        cogoToast.error("Unauthorized User");
        return <Navigate to="/" state={{ from: location }} replace />;
    }
};

export default PrivateRoute;
