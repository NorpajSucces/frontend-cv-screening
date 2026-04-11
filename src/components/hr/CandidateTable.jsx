import { useSelector, useDispatch } from "react-redux";
import { sortByName, sortByScore } from "../../store/slices/dashboardSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/hr/Candidate.css"

export default function CandidateTable() {
    // const { applicantsData, selectedJobId } = useSelector(
    //     (state) => state.dashboard
    // );

    const { candidates } = useSelector((state) => state.candidate);

    const dispatch = useDispatch();

    const [nameOrder, setNameOrder] = useState("asc");
    const [scoreOrder, setScoreOrder] = useState("asc");

    const navigate = useNavigate();

    // sementara filter 3 data saja per job
    // const filteredData = applicantsData.slice(
    //     (selectedJobId - 1) * 3,
    //     selectedJobId * 3
    // );

    return (
        <div className="card table-container">
            <table className="candidate-table">
                <thead>
                    <tr>
                        <th
                            onClick={() => {
                                const order = nameOrder === "asc" ? "desc" : "asc";
                                setNameOrder(order);
                                dispatch(sortByName(order));
                            }}
                        >
                            Candidate Name
                        </th>

                        <th
                            onClick={() => {
                                const order = scoreOrder === "asc" ? "desc" : "asc";
                                setScoreOrder(order);
                                dispatch(sortByScore(order));
                            }}
                        >
                            CV Score
                        </th>

                        <th>Applied Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {candidates.map((c, i) => (
                        <tr key={i}>
                            <td>
                                <strong>{c.name}</strong>
                                <br />
                                <small>{c.name.toLowerCase()}@mail.com</small>
                            </td>

                            <td>
                                <div className="score-bar">
                                    <div style={{ width: `${c.aiScore}%` }}></div>
                                </div>
                                <small>{c.aiScore}/100</small>
                            </td>

                            <td>{new Date(c.appliedAt).toLocaleDateString('en-GB')}</td>

                            <td>
                                <span className={`status-${c.status === "advanced" ? "accepted" : c.status}`}>
                                    {c.status === "advanced" ? "accepted" : c.status}
                                </span>
                            </td>

                            <td>
                                <button
                                    className="btn"
                                    onClick={() => navigate(`/hr/candidates/${c._id}`)}
                                >
                                    View CV Summary
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}