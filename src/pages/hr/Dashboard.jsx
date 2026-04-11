import Sidebar from "../../components/hr/Sidebar";
import StatCard from "../../components/hr/StatCard";
import PieChart from "../../components/hr/PieChart";
import CVTable from "../../components/hr/CVTable";
import CustomBarChart from "../../components/hr/BarChart";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css"
import { useEffect } from "react";
import { fetchDashboardStats, fetchPieChart, fetchRecentCandidates } from "../../store/slices/dashboardThunks";

export default function Dashboard() {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.dashboard.stats) || {};

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchPieChart());
    dispatch(fetchRecentCandidates());
  }, [dispatch]);

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
          <StatCard title="Vacancies" value={stats.vacancies ?? 0} field="vacancies" icon="play_for_work" />
          <StatCard title="Applicants" value={stats.applicants ?? 0} field="applicants" icon="analytics" />
          <StatCard title="Accepted" value={stats.accepted ?? 0} field="accepted" icon="add_task" />
          <StatCard title="Rejected" value={stats.rejected ?? 0} field="accepted" icon="add_task" />
          <StatCard title="Pending" value={stats.pending ?? 0} field="pending" icon="schedule" />
        </div>

        <div className="charts-grid">
          <PieChart />
          <CustomBarChart />
        </div>

        <div className="table-section">
          <CVTable />
        </div>
      </main>
    </div>
  );
}