import { axiosSecure } from "../hooks/useAxiosInterceptor.jsx";
import Swal from "sweetalert2";

// login
export const Login = async (data) => {
    try {
        const result = await axiosSecure.post("/api/auth/login.php", data);
        return result.data;
    } catch{
        Swal.fire({
            title: 'Error!',
            text: 'Something Went Wrong',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
};


// register
export const Register = async (data) => {
    try {
        const result = await axiosSecure.post("/api/auth/register.php", data);
        return result.data;
    } catch{
        Swal.fire({
            title: 'Error!',
            text: 'Something Went Wrong',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
};

// verify token

export const verifyToken = async (token) => {
    try {
        // Send token to the backend in the request body
        const result = await axiosSecure.post("/api/auth/verifyjwt.php", {
            token: token
        });



        if (result.data.status === "success") {
            // Token is valid
            return true;

        } else {
            // Token is invalid or expired
            await Swal.fire({
                title: 'Error!',
                text: result.data.message || 'Token verification failed.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }
    } catch (error) {
        // Handle any errors that might occur during the request
        await Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error("Error during token verification:", error);
    }
};
