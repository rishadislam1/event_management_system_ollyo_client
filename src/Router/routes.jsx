import {createBrowserRouter} from "react-router";

import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import MainLayout from "../Layout/MainLayout.jsx";
import DashboardPage from "../pages/PrivateRoutesPages/DashboardPage.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import AddEvents from "../pages/PrivateRoutesPages/AddEventsPage.jsx";
import ReportPage from "../pages/PrivateRoutesPages/AdminRoutePages/ReportPage.jsx";
import EventUpdatePage from "../pages/PrivateRoutesPages/EventUpdatePage.jsx";
import AdminRoute from "./AdminRoute.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes><MainLayout/></PrivateRoutes>,
        children: [
            {
                path: "/dashboard",
                element: <DashboardPage/>
            },
            {
                path: "/dashboard/addevents",
                element: <AddEvents/>
            },
            {
                path: "/dashboard/eventupdate/:id",
                element: <EventUpdatePage/>
            },
            {
                path: "/dashboard/reports",
                element: <AdminRoute><ReportPage/></AdminRoute>
            },

        ]
    }
])