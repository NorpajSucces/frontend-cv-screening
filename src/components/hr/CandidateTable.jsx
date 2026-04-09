import { useSelector, useDispatch } from "react-redux";
import { sortByName, sortByScore } from "../../store/slices/dashboardSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../pages/hr/Candidate.css"

export default function CandidateTable() {
    const { applicantsData, selectedJobId } = useSelector(
        (state) => state.dashboard
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [nameOrder, setNameOrder] = useState("asc");
    const [scoreOrder, setScoreOrder] = useState("asc");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 10;


    const filteredData = applicantsData.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLast = currentPage * dataPerPage;
    const indexOfFirst = indexOfLast - dataPerPage;

    const currentData = filteredData.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredData.length / dataPerPage);

    return (
        <div className="card table-container">
            <div className="table-actions">
                <input
                    type="text"
                    placeholder="Search candidate..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
            </div>
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
                            Candidate Name   {nameOrder === "asc" ? "▲" : "▼"}
                        </th>

                        <th
                            onClick={() => {
                                const order = scoreOrder === "asc" ? "desc" : "asc";
                                setScoreOrder(order);
                                dispatch(sortByScore(order));
                            }}
                        >
                            CV Score {scoreOrder === "asc" ? "▲" : "▼"}
                        </th>

                        <th>Applied Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {currentData.map((c, i) => (
                        <tr key={i}>
                            <td>
                                <strong>{c.name}</strong>
                                <br />
                                <small>{c.name.toLowerCase()}@mail.com</small>
                            </td>

                            <td>
                                <div className="score-bar">
                                    <div style={{ width: `${c.score}%` }}></div>
                                </div>
                                <small>{c.score}/100</small>
                            </td>

                            <td>27/03/2026</td>

                            <td>
                                <span className={`status-${c.status}`}>
                                    {c.status}
                                </span>
                            </td>

                            <td>
                                <button
                                    className="btn"
                                    onClick={() => navigate(`/hr/cv-summary/sum`)}
                                >
                                    View CV Summary
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    {'<'}
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={currentPage === i + 1 ? "active" : ""}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    {'>'}
                </button>
            </div>
        </div>
    );
}