import { useSelector } from "react-redux";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import "./BarChart.css";

export default function CustomBarChart() {
    const { applicantsData, selectedCategory } = useSelector(
        (state) => state.dashboard
    );

    // 🎯 Filter berdasarkan PieChart
    const filtered = applicantsData.filter(
        (c) =>
            selectedCategory === "All" ||
            c.category === selectedCategory
    );

    // 🎯 Hitung jumlah status
    const statusCount = {
        accepted: 0,
        rejected: 0,
        pending: 0,
    };

    filtered.forEach((c) => {
        if (statusCount[c.status] !== undefined) {
            statusCount[c.status]++;
        }
    });

    // 🎯 Data untuk chart + legend
    const data = [
        { name: "Accepted", value: statusCount.accepted },
        { name: "Rejected", value: statusCount.rejected },
        { name: "Pending", value: statusCount.pending },
    ];

    // 🎨 Warna konsisten
    const colors = {
        Accepted: "#3b82f6",
        Rejected: "#ef4444",
        Pending: "#f59e0b",
    };

    return (
        <div className="card bar-container">
            <h3>Applicants Status ({selectedCategory})</h3>

            {/* CHART */}
            <div style={{ width: "100%", height: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />

                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={colors[entry.name]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* LEGEND + VALUE */}
            <div className="bar-legend">
                {data.map((item, index) => (
                    <div key={index} className="legend-item">
                        <span
                            className="color-box"
                            style={{ background: colors[item.name] }}
                        ></span>

                        <span className="legend-label">
                            {item.name}
                        </span>

                        <span className="legend-value">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}