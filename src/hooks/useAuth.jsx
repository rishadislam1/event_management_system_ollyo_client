import { useEffect, useState } from "react";
import { verifyToken } from "../APIS/Authentication.jsx"; // Or fetch, depending on your preferred method

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const result = await verifyToken(token);
                    setIsAuthenticated(result);
                } catch (error) {
                    console.error("Error verifying token:", error);
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false); // Set loading to false after API call
        })();
    }, []);

    return { isAuthenticated, loading }; // Return both auth state and loading state
}
