import {Link} from "react-router";
import {Register} from "../APIS/Authentication.jsx";
import cogoToast from "cogo-toast";
import Swal from "sweetalert2";
import {useState} from "react";

const RegisterPage = () => {
    const [loader, setLoader] = useState(false);

    // form handler
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!username) {
            cogoToast.error('Username is required');
        }
        if (!email) {
            cogoToast.error('Email is required');
        }
        if (!password) {
            cogoToast.error('Password is required');
        }

        if (username.length < 3 || username.length > 20) {

            cogoToast.error('Username must be between 3 and 20 characters.');
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            cogoToast.error('Username can only contain letters, numbers, and underscores.');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            cogoToast.error('Please enter a valid email address.');
        }
        if (password.length < 8) {
            cogoToast.error('Password must be at least 8 characters long.');
        }
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
            cogoToast.error('Password must contain at least one uppercase letter, one lowercase letter, and one digit.');
        }
        else {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            setLoader(true);
            const result = await Register(formData);
            if(result.status === 'error') {
                await Swal.fire({
                    title: 'Error!',
                    text: result.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
            else{
                await Swal.fire({
                    title: 'Success!',
                    text: result.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                e.target.reset();
            }

            setLoader(false);

        }

    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm" style={{
                width: '450px',
                borderRadius: '15px'
            }}>
                <div className="card-body p-4">
                    <h3 className="text-center mb-4">User Registration</h3>
                    <form onSubmit={handleFormSubmit} id="registrationForm">
                        <div className="form-group mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                required/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required/>
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loader}>
                            {
                                loader ? <div id="loader" className="text-center text-white mt-3">
                                    <div className="spinner-border text-white" role="status"><span
                                        className="visually-hidden">Loading...</span></div>
                                </div> : "Register"
                            }
                        </button>
                    </form>
                    <div id="response" className="mt-3"></div>
                </div>
                <div className="card-footer text-center py-3">
                    <small>Already have an account?
                        <Link to={`/`} className="text-primary text-decoration-none">Login Here</Link>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;