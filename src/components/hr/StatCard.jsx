import { useDispatch } from "react-redux";
import { updateStats } from "../../store/slices/dashboardSlice";
import "./StatCard.css";

export default function StatCard({ title, value }) {
    const dispatch = useDispatch();

    return (
        <div className="stat-card">
            <div className="stat-icon">
                <span className="material-symbols-rounded">analytics</span>
            </div>
            <div className="stat-content">
                <h2>{value}</h2>
                <p>{title}</p>
            </div>
        </div>
    );
}