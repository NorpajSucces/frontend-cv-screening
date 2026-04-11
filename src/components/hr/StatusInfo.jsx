import "./StatusInfo.css";

export default function StatusInfo() {
    const statusList = [
        {
            label: "Pending",
            description: "AI is still processing CV screening scores",
            className: "status-pending",
        },
        {
            label: "Processed",
            description: "AI has completed scoring for HR review",
            className: "status-processed",
        },
        {
            label: "Failed",
            description: "AI failed to screen the CV and will automatically retry",
            className: "status-failed",
        },
        {
            label: "Accepted",
            description: "Applicant has been approved by HR",
            className: "status-accepted",
        },
        {
            label: "Rejected",
            description: "Applicant has been rejected by HR",
            className: "status-rejected",
        },
    ];

    return (
        <div className="status-info card">
            <h3>Status Information</h3>

            <table className="status-table">
                <tbody>
                    {statusList.map((status, index) => (
                        <tr key={index}>
                            <td>
                                <span className={`status-badge ${status.className}`}>
                                    {status.label}
                                </span>
                            </td>
                            <td>{status.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}