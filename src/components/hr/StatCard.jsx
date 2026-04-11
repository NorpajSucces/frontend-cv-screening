import "./StatCard.css";

export default function StatCard({ title, value, icon, type, subLabel }) {
    return (
        <div className={`stat-card ${type}`}>
            <div className="stat-icon-box">
                <span className="material-symbols-rounded">{icon}</span>
            </div>
            <div className="stat-info">
                <p className="stat-label">{title}</p>
                <div className="stat-value-container">
                    <span className="stat-value">{value}</span>
                    <span className="stat-sublabel">{subLabel}</span>
                </div>
            </div>
        </div>
    );
}