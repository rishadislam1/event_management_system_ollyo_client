import {Link, useNavigate} from "react-router";
import cogoToast from "cogo-toast";
import Swal from "sweetalert2";
import {useState} from "react";
import {Login} from "../APIS/Authentication.jsx";

const LoginPage = () => {
    const [loader, setLoader] = useState(false);
    // navigator
    const navigate = useNavigate();
    // login hander
    const loginHandler = async (e)=>{
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        if (!email) {
            cogoToast.error('Email is required');
        }
        if (!password) {
            cogoToast.error('Password is required');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            cogoToast.error('Please enter a valid email address.');
        }
        else {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            setLoader(true);
            const result = await Login(formData);
            if(result.status === 'error') {
                await Swal.fire({
                    title: 'Error!',
                    text: result.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
            else{
                cogoToast.success(result.message);
                if (result.token) {
                    localStorage.setItem("token", JSON.stringify(result.token));
                    localStorage.setItem("role", JSON.stringify(result.role));
                    localStorage.setItem("username",result.username);
                }
                window.location.href="/dashboard";
                e.target.reset();
            }

            setLoader(false);

        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm" style={{
                width: '400px',
                borderRadius: '15px'
            }}>
                <div className="card-body p-4">
                    <h3 className="text-center mb-4">Login</h3>
                    <form id="loginform" onSubmit={loginHandler}>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter your email"/>

                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"/>
                        </div>

                        <button type="submit" className="btn btn-primary w-100" disabled={loader}>
                            {
                                loader ? <div id="loader" className="text-center text-white mt-3">
                                    <div className="spinner-border text-white" role="status"><span
                                        className="visually-hidden">Loading...</span></div>
                                </div> : "Login"
                            }
                        </button>
                    </form>
                </div>
                <div className="card-footer text-center py-3">
                    <small>{"Don't "}have an account?
                        <Link to={`/register`} className="text-primary text-decoration-none">Sign Up</Link>
                    </small>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;