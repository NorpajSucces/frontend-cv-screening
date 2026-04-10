import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/slices/dashboardSlice";
import {
    PieChart as RePieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import "./PieChart.css"

export default function PieChart() {
    const { categories } = useSelector((state) => state.dashboard);
    const dispatch = useDispatch();

    const data = Object.entries(categories).map(([key, val]) => ({
        name: key,
        value: val,
    }));

    const COLORS = ["#16408D", "#1C52B5", "#2264DD", "#3672E0","#729CE9","#9AB8EF",];

    return (
        <div className="card pie-container">
            <h3>Job Distribution</h3>

            <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                    <RePieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={90}
                            onClick={(data) => dispatch(setCategory(data.name))}
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{
                                background: "#fff",
                                borderRadius: "10px",
                                border: "none",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                            formatter={(value) => `${value}%`}
                        />
                    </RePieChart>
                </ResponsiveContainer>
            </div>


            <div className="pie-legend">
                {data.map((item, i) => (
                    <div
                        key={item.name}
                        className="legend-item"
                        onClick={() => dispatch(setCategory(item.name))}
                    >
                        <span
                            className="color-box"
                            style={{ background: COLORS[i] }}
                        ></span>
                        {item.name} - {item.value}%
                    </div>
                ))}
            </div>
        </div>
    );
}