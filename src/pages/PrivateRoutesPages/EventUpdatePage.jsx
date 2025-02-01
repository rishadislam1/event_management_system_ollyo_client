import {useParams} from "react-router";
import Loading from "../../Components/Loading.jsx";
import {useEffect, useState} from "react";
import {EventDetails, UpdateEvent} from "../../APIS/Event.jsx";
import Swal from "sweetalert2";

const EventUpdatePage = () => {
    const {id} = useParams();
    const username = localStorage.getItem("username");
    const [loading, setLoading] = useState(false);
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [maxCapacity, setMaxCapacity] = useState(0);

    useEffect(()=>{
        (async ()=>{
            const result = await EventDetails(id);

            if(result.status === "success"){
                setEventName(result?.data?.name);
                setEventDescription(result?.data?.description);
                setMaxCapacity(result?.data?.max_capacity);
            }
        })();
    },[id]);


    // event handler
    const handleEventSubmit = async (e)=>{
        e.preventDefault();

        if (!eventName || !eventDescription || !maxCapacity) {
            alert("Please fill all fields.");
            return;
        }
        else{
            setLoading(true);
            const data={
                eventId: id,
                username: username,
                eventName: eventName,
                eventDescription: eventDescription,
                maxCapacity: maxCapacity
            }
            const res = await UpdateEvent(data);

            if(res.status === "success"){
                Swal.fire({
                    title: 'Congratulations!',
                    text: 'Event Updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            setLoading(false);
            
        }
    }

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Update Event</h2>
            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleEventSubmit}>
                        <div className="mb-3">
                            <label htmlFor="eventName" className="form-label">Event Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="eventName"
                                placeholder="Enter event name"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="eventDescription" className="form-label">Event Description</label>
                            <textarea
                                className="form-control"
                                id="eventDescription"
                                rows="3"
                                placeholder="Enter event description"
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="maxCapacity" className="form-label">Max Capacity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="maxCapacity"
                                placeholder="Enter max capacity"
                                value={maxCapacity}
                                onChange={(e) => setMaxCapacity(e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? <Loading/> : "Update Event"}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventUpdatePage;