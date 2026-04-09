import { useDispatch, useSelector } from "react-redux";
import { setSelectedJob } from "../../store/slices/dashboardSlice";
import "../../pages/hr/Candidate.css"

export default function ActiveJobs() {
    const dispatch = useDispatch();
    const { activeJobs, selectedJobId } = useSelector(
        (state) => state.dashboard
    );

    return (
        <div className="active-jobs card">
            <div className="header">
                <h3>Active Jobs</h3>
                <span>{activeJobs.length} TOTAL</span>
            </div>

            {activeJobs.map((job) => (
                <div
                    key={job.id}
                    className={`job-item ${selectedJobId === job.id ? "active" : ""
                        }`}
                    onClick={() => dispatch(setSelectedJob(job.id))}
                >
                    <h4>{job.title}</h4>
                    <p>{job.applicants} Applicants</p>
                </div>
            ))}
        </div>
    );
}