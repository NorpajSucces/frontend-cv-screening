import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CVTable.css";

export default function CVTable() {
    const { applicantsData } = useSelector((state) => state.dashboard);
    const navigate = useNavigate();

    return (
        <div className="table-container">
            <table className="cv-table">
                <thead>
                    <tr>
                        <th>Candidate Name</th>
                        <th>CV Score</th>
                        <th>Applied Date</th>
                        <th>AI - Status</th>
                    </tr>
                </thead>

                <tbody>
                    {applicantsData.map((c, i) => (
                        <tr key={i}>
                            <td>
                                <strong
                                    className="clickable-name"
                                    onClick={() => navigate("/hr/candidates/sum")}
                                >
                                    {c.name}
                                </strong>
                                <br />
                                <small>{c.name.toLowerCase()}@mail.com</small>
                            </td>
                            <td>{c.score}%</td>
                            <td>27/03/2026</td>
                            <td>
                                <span className={`status-${c.status}`}>
                                    {c.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}