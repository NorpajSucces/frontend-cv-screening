import { useSelector, useDispatch } from "react-redux";
import { sortCandidatesByName, sortCandidatesByScore } from "../../store/slices/candidateSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../pages/hr/Candidate.css"

export default function CandidateTable() {
    const { candidates } = useSelector((state) => state.candidate);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [nameOrder, setNameOrder] = useState("asc");
    const [scoreOrder, setScoreOrder] = useState("asc");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const filteredData = candidates
        .filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase())
        );

    const indexOfLast = currentPage * dataPerPage;
    const indexOfFirst = indexOfLast - dataPerPage;
    const currentData = filteredData.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredData.length / dataPerPage);

    return (
        <div className="card table-container">
            <div className="table-actions">
                <h1>Candidate List</h1>
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
                                dispatch(sortCandidatesByName(order));
                            }}
                        >
                            Candidate Name {nameOrder === "asc" ? "▲" : "▼"}
                        </th>

                        <th
                            onClick={() => {
                                const order = scoreOrder === "asc" ? "desc" : "asc";
                                setScoreOrder(order);
                                dispatch(sortCandidatesByScore(order));
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
                    {currentData.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", color: "#94a3b8" }}>
                                No candidates found.
                            </td>
                        </tr>
                    ) : (
                        currentData.map((c, i) => (
                            <tr key={c._id || i}>
                                <td>
                                    <strong>{c.name}</strong>
                                    <br />
                                    <small>{c.email || `${c.name.toLowerCase().replace(/\s/g, '.')}@mail.com`}</small>
                                </td>

                                <td>
                                    <div className="score-bar">
                                        <div style={{ width: `${c.aiScore || 0}%` }}></div>
                                    </div>
                                    <small>{c.aiScore || 0}/100</small>
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
                        ))
                    )}
                </tbody>
            </table>

            {totalPages > 1 && (
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
            )}
        </div>
    );
}