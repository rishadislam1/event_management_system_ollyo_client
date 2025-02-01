
import Swal from 'sweetalert2';
import {axiosSecure} from "../hooks/useAxiosInterceptor.jsx";

export const GetEvents = async (page = 1, sortBy = 'name', sortOrder = 'ASC') => {
    try {
        // Sending GET request with page, sortBy, and sortOrder parameters
        const result = await axiosSecure.get(`/api/events/eventList.php`, {
            params: {
                page: page,
                sortBy: sortBy,
                sortOrder: sortOrder
            }
        });

        return result.data;
    } catch (error) {
        // Handle error by showing an alert
        Swal.fire({
            title: 'Error!',
            text: 'Something Went Wrong',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error(error);
    }
};



export const AddEvents = async (data)=>{
    try{

        const result = await axiosSecure.post('/api/events/eventCreate.php',data);
        return result.data;
    }catch(error) {

        Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

//delete event

export const DeleteEvent = async (id,username) => {
    try {

        const result = await axiosSecure.delete(`/api/events/eventDelete.php`, {
            data: { eventId: id, username:username }
        });

        return result.data;
    } catch (error) {
        await Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false; // Event deletion failed
    }
}

// event details
export const EventDetails = async (id) => {
    try {
        // Send GET request with eventId as a query parameter
        const result = await axiosSecure.get(`/api/events/eventDetails.php?eventId=${id}`);

        return result.data;
    } catch (error) {

        await Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false;
    }
}


//update event

export const UpdateEvent = async (data) => {
    try {

        const result = await axiosSecure.delete(`/api/events/eventUpdate.php`, {
            data
        });

        return result.data;
    } catch (error) {
        await Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false; // Event deletion failed
    }
}

//register event
export const RegisterEvent = async (data) => {
    try {

        const result = await axiosSecure.post(`/api/events/eventRegister.php`, data);

        return result.data;
    } catch (error) {
        await Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message || error.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false; // Event deletion failed
    }
}