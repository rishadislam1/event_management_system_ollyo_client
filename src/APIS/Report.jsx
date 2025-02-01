import {axiosSecure} from "../hooks/useAxiosInterceptor.jsx";
import Swal from "sweetalert2";

export const GetReport = async (page,username)=>{

    try {
        // Sending GET request with page parameter
        const result = await axiosSecure.post(`/api/attendees/list.php?page=${page}`,{
            username
        });

        return result.data;
    } catch {
        // Handle error by showing an alert
        Swal.fire({
            title: 'Error!',
            text: 'Something Went Wrong',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

export const ExportReport = async (username)=>{

    try {
        // Sending GET request with page parameter
        const result = await axiosSecure.post(`/api/attendees/export_report.php`,{
            username
        });

        return result.data;
    } catch {
        // Handle error by showing an alert
        Swal.fire({
            title: 'Error!',
            text: 'Something Went Wrong',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}
