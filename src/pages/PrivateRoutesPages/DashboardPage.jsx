import { useEffect, useState } from "react";
import { DeleteEvent, GetEvents, RegisterEvent } from "../../APIS/Event.jsx";
import Swal from "sweetalert2";
import { Link } from "react-router";

const DashboardPage = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("DESC");  // Sort order state
    const [sortBy, setSortBy] = useState("id");  // Sort by field state
    const username = localStorage.getItem('username');

    // Fetch events for the current page with sorting
    useEffect(() => {
        (async () => {
            const result = await GetEvents(currentPage, sortBy, sortOrder);

            if (result) {
                setEvents(result.events);
                setFilteredEvents(result.events);
                setTotalPages(result.total_pages);
            }
        })();
    }, [currentPage, sortBy, sortOrder]);

    // search
    useEffect(() => {
        if (searchQuery) {
            const filtered = events.filter(event =>
                event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.max_capacity.toString().includes(searchQuery)  // Check if max_capacity as a string matches searchQuery
            );
            setFilteredEvents(filtered);
        } else {
            setFilteredEvents(events);
        }
    }, [searchQuery, events]);

    // Change page handler
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Handle event delete
    const handleEventDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await DeleteEvent(id, username);
                if (res.status === "success") {
                    const result = await GetEvents(currentPage, sortBy, sortOrder);
                    if (result) {
                        setEvents(result.events);
                        setFilteredEvents(result.events);
                        setTotalPages(result.total_pages);
                    }
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your event has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    };

    // Event register handler
    const handleEventRegister = (name, id) => {
        Swal.fire({
            title: `Register to event ${name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, register!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = {
                    event_id: id,
                    username: username,
                };
                const res = await RegisterEvent(data);
                if (res.status === "success") {
                    const result = await GetEvents(currentPage, sortBy, sortOrder);
                    if (result) {
                        setEvents(result.events);
                        setFilteredEvents(result.events);
                        setTotalPages(result.total_pages);
                    }
                    Swal.fire({
                        title: res.message,
                        icon: "success"
                    });
                }
            }
        });
    };

    // Handle sort change
    const handleSortChange = (e) => {
        const [field, order] = e.target.value.split("_");
        setSortBy(field);
        setSortOrder(order);
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Event List</h2>
            <div className="card shadow-sm">
                <div className="card-body">
                    {/* Search Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Sort Options */}
                    <div className="mb-4">
                        <select
                            className="form-select"
                            value={`${sortBy}_${sortOrder}`}
                            onChange={handleSortChange}
                        >
                            <option value="id_DESC">Sort by ID (Newest)</option>
                            <option value="id_ASC">Sort by ID (Oldest)</option>
                            <option value="name_ASC">Sort by Name (A-Z)</option>
                            <option value="name_DESC">Sort by Name (Z-A)</option>

                        </select>
                    </div>

                    <div className="table-responsive" style={{ maxHeight: "600px", overflowY: "auto" }}>
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Event Name</th>
                                <th>Description</th>
                                <th>Max Capacity</th>
                                <th>Capacity Left</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredEvents?.map((event, index) => (
                                <tr key={event.id}>
                                    <td>{(currentPage - 1) * 10 + (index + 1)}</td>
                                    <td>{event.name}</td>
                                    <td>{event.description}</td>
                                    <td>{event.max_capacity}</td>
                                    <td>{event.left_capacity}</td>
                                    <td>
                                        <Link to={`/dashboard/eventupdate/${event.id}`}
                                              className="btn btn-warning btn-sm m-2">Edit</Link>
                                        <button className="btn btn-danger btn-sm m-2"
                                                onClick={() => handleEventDelete(event.id)}>Delete
                                        </button>
                                        <button className="btn btn-success btn-sm m-2"
                                                onClick={() => handleEventRegister(event.name, event.id)}>Register
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination UI */}
                    <div className="d-flex justify-content-center mt-3">
                        <nav>
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                                </li>
                                {[...Array(totalPages).keys()].map((num) => (
                                    <li key={num + 1} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(num + 1)}>{num + 1}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
