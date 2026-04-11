import { useDispatch, useSelector } from "react-redux";
import { setSelectedJob, setJobs } from "../../store/slices/dashboardSlice";
import "../../pages/hr/Candidate.css"
import { useEffect } from "react";
import { hrJobService } from "../../services/hrJobService";
import { setCandidates } from "../../store/slices/candidateSlice";
import candidateService from "../../services/candidateService";

export default function ActiveJobs() {
    const dispatch = useDispatch();
    const { activeJobs, selectedJobId } = useSelector(
        (state) => state.dashboard
    );

    useEffect(() => {
        hrJobService.getJobs()
            .then((data) => {
                // console.log('RAW JOBS:', data);
                const jobs = data.data;
                // filter only open jobs
                const openJobs = jobs.filter(job => job.status === "open");

                dispatch(setJobs(openJobs));
            })
            .catch((err) => console.log(err));
    }, [dispatch]);

    return (
        <div className="active-jobs card">
            <div className="header">
                <h3>Active Jobs</h3>
                <span>{activeJobs.length} TOTAL</span>
            </div>

            {activeJobs.map((job) => (
                <div
                    key={job._id}
                    className={`job-item ${selectedJobId === job._id ? "active" : ""
                        }`}
                    onClick={() => {
                        dispatch(setSelectedJob(job._id));

                        candidateService.getByJob(job._id)
                            .then((data) => {
                                console.log('CANDIDATES API:', data);
                                dispatch(setCandidates(data));
                            })
                            .catch(err => console.error(err))
                    }}
                >
                    <h4>{job.title}</h4>
                    <p>{job.title} Applicants</p>
                </div>
            ))}
        </div>
    );
}