import { useDispatch, useSelector } from "react-redux";
import { setSelectedJob, setJobs } from "../../store/slices/dashboardSlice";
import "../../pages/hr/Candidate.css";
import { useEffect } from "react";
import { hrJobService } from "../../services/hrJobService";
import { setCandidates } from "../../store/slices/candidateSlice";
import candidateService from "../../services/candidateService";

export default function ActiveJobs() {
    const dispatch = useDispatch();
    const { activeJobs, selectedJobId } = useSelector(
        (state) => state.dashboard
    );

    // Fetch jobs on mount
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await hrJobService.getJobs();
                const jobs = response.data;
                
                // Keep all jobs (open and closed) visible for HR
                dispatch(setJobs(jobs));

                if (jobs.length > 0 && !selectedJobId) {
                    handleJobClick(jobs[0]._id);
                }
            } catch (err) {
                console.error("Failed to fetch jobs:", err);
            }
        };

        fetchJobs();
    }, [dispatch]);

    const handleJobClick = async (jobId) => {
        dispatch(setSelectedJob(jobId));
        try {
            const data = await candidateService.getByJob(jobId);
            dispatch(setCandidates(data));
        } catch (err) {
            console.error("Failed to fetch candidates for job:", err);
        }
    };

    return (
        <div className="active-jobs card">
            <div className="header">
                <h3>Active Jobs</h3>
                <span>{activeJobs.length} TOTAL</span>
            </div>

            {activeJobs.length === 0 ? (
                <div className="empty-state">No active jobs found.</div>
            ) : (
                activeJobs.map((job) => (
                    <div
                        key={job._id}
                        className={`job-item ${selectedJobId === job._id ? "active" : ""}`}
                        onClick={() => handleJobClick(job._id)}
                    >
                        <div className="job-title-row">
                            <span className="material-symbols-rounded job-icon">work</span>
                            <h4>{job.title}</h4>
                        </div>
                        
                        <div className="job-meta-row">
                            <div className="job-meta-item">
                                <span className="material-symbols-rounded">location_on</span>
                                <span>{job.location || 'Remote'}</span>
                            </div>
                            <div className="job-meta-item">
                                <span className="material-symbols-rounded">schedule</span>
                                <span>{job.employmentType || 'Full-time'}</span>
                            </div>
                        </div>

                        <div className="job-stats-row">
                            <div className="applicant-count-pill">
                                <span className="material-symbols-rounded">group</span>
                                <strong>{job.applicantCount || 0}</strong>
                                <span>Applicants</span>
                            </div>
                            <span className={`job-status ${job.status}`}>
                                {job.status}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}