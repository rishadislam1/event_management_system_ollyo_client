import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ExportReport, GetReport} from "../../../APIS/Report.jsx";
import {BASE_URL} from "../../../hooks/useAxiosInterceptor.jsx";

const ReportPage = () => {
    const [attendees, setAttendees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const username = localStorage.getItem('username');

    // Fetch events (attendees) for the current page
    useEffect(() => {
        (async () => {
            const result = await GetReport(currentPage, username);

            if (result && result.attendees) {
                setAttendees(result.attendees);
                setTotalPages(result.total_pages);
            }
        })();
    }, [currentPage, username]);

    // Change page handler
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Export report handler
    const handleExportReport = () => {
        Swal.fire({
            title: "Exporting Report...",
            text: "Please wait while we prepare the report.",
            icon: "info",
            showConfirmButton: false,
            willOpen: async () => {
                try {
                    const response = await ExportReport(username);

                    if (response.status === "success") {
                        const link = document.createElement('a');
                        link.href = `${BASE_URL}/output/${response.file}`;
                        link.download = response.file;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        // Show success message
                        Swal.fire({
                            title: "Export Successful!",
                            text: "Your report has been exported.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.error("Error exporting report:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "There was an issue exporting the report.",
                        icon: "error"
                    });
                }
            }
        });
    };


    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Event Attendees Report</h2>
            <div className="text-right mb-3">
                <button className="btn btn-success" onClick={handleExportReport}>
                    Export Report
                </button>
            </div>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive" style={{ maxHeight: "600px", overflowY: "auto" }}>
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Event Name</th>
                                <th>Description</th>
                                <th>Username</th>
                                <th>User Email</th>
                                <th>Registered At</th>
                            </tr>
                            </thead>
                            <tbody>
                            {attendees?.map((attendee, index) => (
                                <tr key={attendee.attendee_id}>
                                    <td>{(currentPage - 1) * 10 + (index + 1)}</td>
                                    <td>{attendee.event_name}</td>
                                    <td>{attendee.event_description}</td>
                                    <td>{attendee.user_name}</td>
                                    <td>{attendee.user_email}</td>
                                    <td>{attendee.registered_at}</td>
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

export default ReportPage;
