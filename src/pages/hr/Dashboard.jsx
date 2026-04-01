import Sidebar from "../../components/hr/Sidebar";

import Cards from "../../components/hr/Cards";
import ApplicantsChart from "../../components/hr/ApplicantsChart";
import PieChartBox from "../../components/hr/PieChartBox";
import Table from "../../components/hr/Table";

function Dashboard() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div>
                <Cards />
                <ApplicantsChart />
                <PieChartBox />
                <Table />
            </div>
        </div>
    );
}

export default Dashboard;