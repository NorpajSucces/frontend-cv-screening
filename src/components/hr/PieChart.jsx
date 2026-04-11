import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/slices/dashboardSlice";
import {
    PieChart as RePieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { fetchBarChart } from "../../store/slices/dashboardThunks";
import "./PieChart.css";

export default function PieChart() {
    const { categories, selectedCategory } = useSelector((state) => state.dashboard);
    const dispatch = useDispatch();

    const data = Object.entries(categories).map(([key, val]) => ({
        name: key,
        value: val.percentage,
        jobId: val.jobId,
        type: val.type,
    }));

    const COLORS = ["#1e293b", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

    const handleClick = (entry) => {
        const payload = entry.payload;
        dispatch(setCategory(payload.name));

        if (payload.type === "others") {
            dispatch(fetchBarChart({ type: "others" }));
        } else if (payload.jobId) {
            dispatch(fetchBarChart({ jobId: payload.jobId }));
        }
    };

    return (
        <div className="pie-container-original">
            <div className="chart-header-simple">
                 <h3>Distribution</h3>
            </div>

            <div className="chart-wrapper-simple">
                <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={80}
                            onClick={handleClick}
                            stroke="#fff"
                            strokeWidth={2}
                        >
                            {data.map((entry, index) => (
                                <Cell 
                                    key={index} 
                                    fill={COLORS[index % COLORS.length]} 
                                    style={{ cursor: 'pointer', outline: 'none' }}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{
                                background: "#fff",
                                borderRadius: "12px",
                                border: "none",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                                fontSize: '13px'
                            }}
                            formatter={(value) => `${value}%`}
                        />
                    </RePieChart>
                </ResponsiveContainer>
            </div>

            <div className="pie-legend-original">
                {data.map((item, i) => (
                    <div
                        key={item.name}
                        className={`legend-pill-simple ${item.name === selectedCategory ? 'active' : ''}`}
                        onClick={() => handleClick({ payload: item })}
                    >
                        <span
                            className="status-dot"
                            style={{ background: COLORS[i % COLORS.length] }}
                        ></span>
                        <div className="legend-info">
                            <span className="label text-truncate">{item.name}</span>
                            <span className="value">{item.value}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}