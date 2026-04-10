import Sidebar from "../../components/hr/Sidebar";
import ActiveJobs from "../../components/hr/ActiveJobs";
import CandidateTable from "../../components/hr/CandidateTable";
import "./Candidate.css"

export default function Candidates() {
    return (
        <div className="candidate">
            <Sidebar />
            <main className="main-content">
                <div className="candidate-header">
                    <h1>Candidate Management</h1>
                    <h2>Filter and review all job applications.</h2>
                </div>
                <hr className="divider" />

                <div className="candidate-layout">
                    <ActiveJobs />
                    <CandidateTable />
                </div>

            </main>
        </div>
    );
}
