import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

function ApplicantsChart() {
    const data = useSelector((state) => state.dashboard.applicantsData);

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey="week" />
                    <Tooltip />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ApplicantsChart;