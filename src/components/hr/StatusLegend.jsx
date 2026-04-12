import "./StatusLegend.css";

const STATUS_ITEMS = [
    {
        label: "Pending",
        description: "AI is still processing CV screening scores",
        type: "pending"
    },
    {
        label: "Processed",
        description: "AI has completed scoring for HR review",
        type: "processed"
    },
    {
        label: "Failed",
        description: "AI failed to screen the CV and will automatically retry",
        type: "failed"
    },
    {
        label: "Accepted",
        description: "Applicant has been approved by HR",
        type: "accepted"
    },
    {
        label: "Rejected",
        description: "Applicant has been rejected by HR",
        type: "rejected"
    }
];

export default function StatusLegend() {
    return (
        <div className="status-legend-card">
            <h3 className="legend-title">Status Information</h3>
            <div className="legend-list">
                {STATUS_ITEMS.map((item, index) => (
                    <div key={index} className="legend-row">
                        <div className={`status-pill pill-${item.type}`}>
                            {item.label}
                        </div>
                        <p className="status-description">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
