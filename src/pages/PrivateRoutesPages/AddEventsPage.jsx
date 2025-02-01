import {AddEvents} from "../../APIS/Event.jsx";
import Swal from "sweetalert2";
import {useState} from "react";
import Loading from "../../Components/Loading.jsx";
import cogoToast from "cogo-toast";


const AddEventsPage = () => {
    const [loading, setLoading] = useState(false);
    // event handler
    const handleEventSubmit = async (e)=>{
        e.preventDefault();
        const eventName = e.target.eventName.value;
        const eventDescription = e.target.eventDescription.value;
        const maxCapacity = e.target.maxCapacity.value;
        if(!eventName){
            cogoToast.error("Please enter an event name");
        }
        else if(!eventDescription){
            cogoToast.error("Please enter an event description");
        }
        else if(!maxCapacity){
            cogoToast.error("Please enter an max capacity");
        }
        else{
            const username = localStorage.getItem("username");
            const formData = new FormData();
            formData.append('eventName', eventName);
            formData.append('eventDescription', eventDescription);
            formData.append('maxCapacity', maxCapacity);
            formData.append('username', username);
            setLoading(true);

            const result = await AddEvents(formData);
            console.log(result);
            if(result.status === "success"){
                await  Swal.fire({
                    title: 'Congratulations!',
                    text: 'Event Created successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                e.target.reset();
            }
        }
        setLoading(false);
    }
    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Add Event</h2>
            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleEventSubmit}>
                        <div className="mb-3">
                            <label htmlFor="eventName" className="form-label">Event Name</label>
                            <input type="text" className="form-control" id="eventName" placeholder="Enter event name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="eventDescription" className="form-label">Event Description</label>
                            <textarea className="form-control" id="eventDescription" rows="3" placeholder="Enter event description"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="maxCapacity" className="form-label">Max Capacity</label>
                            <input type="number" className="form-control" id="maxCapacity" placeholder="Enter max capacity" />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {
                                    loading?<Loading/>:"Add Event"
                                }
                            </button>
                            <button type="reset" className="btn btn-secondary">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEventsPage;
