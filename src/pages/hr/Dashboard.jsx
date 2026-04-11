import Sidebar from "../../components/hr/Sidebar";
import StatCard from "../../components/hr/StatCard";
import PieChart from "../../components/hr/PieChart";
import CVTable from "../../components/hr/CVTable";
import CustomBarChart from "../../components/hr/BarChart";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css"
import { useEffect } from "react";
import { fetchDashboardStats, fetchPieChart, fetchRecentCandidates, fetchBarChart } from "../../store/slices/dashboardThunks";

export default function Dashboard() {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.dashboard.stats) || {};
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchPieChart());
    dispatch(fetchRecentCandidates());
    dispatch(fetchBarChart({})); 
  }, [dispatch]);

  const adminName = user?.name || "demohr";

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <div className="dashboard-header-premium">
          <p className="welcome-text">Welcome back,</p>
          <div className="greeting-row">
             <h1 className="admin-name">{adminName}</h1>
             <span className="wave-icon">👋</span>
          </div>
          <p className="sub-greeting">Here's what's happening with your recruitment today.</p>
        </div>

        <section className="overview-section">
          <h3 className="section-title">OVERVIEW METRICS</h3>
          
          <div className="stats-grid">
            <StatCard 
              title="ACTIVE VACANCIES" 
              value={stats.vacancies ?? 0} 
              icon="work" 
              type="vacancies"
              subLabel="Jobs currently open"
            />
            <StatCard 
              title="TOTAL APPLICANTS" 
              value={stats.applicants ?? 0} 
              icon="groups" 
              type="applicants"
              subLabel="Across all positions"
            />
            <StatCard 
              title="CANDIDATES ACCEPTED" 
              value={stats.accepted ?? 0} 
              icon="check_circle" 
              type="accepted"
              subLabel="Advanced stage"
            />
            <StatCard 
              title="CANDIDATES REJECTED" 
              value={stats.rejected ?? 0} 
              icon="cancel" 
              type="rejected"
              subLabel="Did not meet requirements"
            />
            <StatCard 
              title="PENDING REVIEW" 
              value={stats.pending ?? 0} 
              icon="hourglass_empty" 
              type="pending"
              subLabel="Waiting for screening"
            />
          </div>
        </section>

        <div className="charts-grid">
          <PieChart />
          <CustomBarChart />
        </div>

        <div className="table-section-wrapper">
           <div className="table-header-simple">
              <h3>Recently Added Candidates</h3>
              <p>Review the latest job applications</p>
           </div>
           <CVTable />
        </div>
      </main>
    </div>
  );
}