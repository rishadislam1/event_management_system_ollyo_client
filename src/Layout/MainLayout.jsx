import { useState } from "react";
import {Link, Outlet, useLocation, useNavigate} from "react-router";
import {FaBars, FaHome, FaUser} from "react-icons/fa";
import {FaPlus} from "react-icons/fa6";
import {BiSolidReport} from "react-icons/bi";

const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const role = JSON.parse(localStorage.getItem("role"));
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = async ()=>{

        localStorage.clear();
        navigate("/");
    }
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className={`bg-dark text-white p-3 ${isOpen ? "d-block" : "d-none d-md-block"}`}
                 style={{ width: "250px", maxHeight: "calc(100vh - 0px)" }}>
                <h4 className="text-center">Event Management System</h4>
                <ul className="list-unstyled">
                    <li className="p-2">

                        <Link
                            to="/dashboard"
                            className={`${location?.pathname === '/dashboard' ? "bg-white text-black rounded p-2 " : "text-white"} `}
                        >
                            <FaHome className="me-2"/>Dashboard
                        </Link>


                    </li>
                    <li className="p-2">

                        <Link
                            to="/dashboard/addevents"
                            className={`${location?.pathname === '/dashboard/addevents' ? "bg-white text-black rounded p-2 w-100" : "text-white"} `}
                        >
                            <FaPlus className="me-2"/>Add&nbsp;Events
                        </Link>


                    </li>
                    {
                        role === "admin" && <li className="p-2">
                            <Link
                                to="/dashboard/reports"
                                className={`${location?.pathname === '/dashboard/reports' ? "bg-white text-black rounded p-2 w-100" : "text-white"} `}
                            >
                                <BiSolidReport className="me-2"/>Reports
                            </Link>

                        </li>
                    }

                    <li className="p-2">
                        <button className={`btn text-white`} onClick={handleLogout}><FaUser className="me-2"/> Logout
                        </button>
                    </li>

                </ul>
            </div>

            {/* Content Area */}
            <div className="flex-grow-1 p-3" style={{minHeight: "100vh"}}>
                {/* Toggle Button */}
                <button className="btn btn-dark d-md-none" onClick={toggleSidebar}>
                    <FaBars/>
                </button>
                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;