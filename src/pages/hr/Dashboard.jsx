import Sidebar from "../../components/hr/Sidebar";
import StatCard from "../../components/hr/StatCard";
import PieChart from "../../components/hr/PieChart";
import CVTable from "../../components/hr/CVTable";
import CustomBarChart from "../../components/hr/BarChart";
import StatusInfo from "../../components/hr/StatusInfo";
import { useSelector } from "react-redux";
import "./Dashboard.css"

export default function Dashboard() {
  const { stats } = useSelector((state) => state.dashboard);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <div className="dashboard-header">
          <h1>HR Admin Portal</h1>
          <h2>Manage your applicants and track job opening</h2>
        </div>
        <hr className="divider" />
        <div className="stats-grid">
          <StatCard title="Vacancies" value={stats.vacancies} field="vacancies" icon="play_for_work" />
          <StatCard title="Applicants" value={stats.applicants} field="applicants" icon="analytics" />
          <StatCard title="Accepted" value={stats.accepted} field="accepted" icon="add_task" />
          <StatCard title="Rejected" value={stats.rejected} field="rejected" icon="close" />
          <StatCard title="Pending" value={stats.pending} field="pending" icon="schedule" />
        </div>

        <div className="charts-grid">
          <PieChart />
          <CustomBarChart />

        </div>

          <StatusInfo/>
        <div className="table-section">
          <CVTable />
        </div>
      </main>
    </div>
  );
}