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
    const { barData, selectedCategory } = useSelector(
        (state) => state.dashboard
    );

    const data = [
        { name: "Accepted", value: barData.accepted ?? 0 },
        { name: "Rejected", value: barData.rejected ?? 0 },
        { name: "Pending", value: barData.pending ?? 0 },
    ];

    const colors = {
        Accepted: "#3b82f6",
        Rejected: "#ef4444",
        Pending: "#f59e0b",
    };

    return (
        <div className="bar-container-original">
            <div className="chart-header-simple">
                 <h3>Candidate Status</h3>
                 <span className="category-tag">{selectedCategory}</span>
            </div>

            <div className="chart-wrapper-simple">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 12 }}
                        />
                        <YAxis 
                            allowDecimals={false} 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 12 }} 
                        />
                        <Tooltip 
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        />

                        <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
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

            <div className="bar-legend-original">
                {data.map((item, index) => (
                    <div key={index} className="legend-item-pill">
                        <span
                            className="status-dot"
                            style={{ background: colors[item.name] }}
                        ></span>
                        <span className="label">{item.name}</span>
                        <span className="value">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}