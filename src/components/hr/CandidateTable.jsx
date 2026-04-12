import { useSelector, useDispatch } from "react-redux";
import { sortCandidatesByName, sortCandidatesByScore, setCandidates } from "../../store/slices/candidateSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import candidateService from "../../services/candidateService";
import "../../pages/hr/Candidate.css"

export default function CandidateTable() {
    const { candidates } = useSelector((state) => state.candidate);
    const { selectedJobId } = useSelector((state) => state.dashboard);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [nameOrder, setNameOrder] = useState("asc");
    const [scoreOrder, setScoreOrder] = useState("asc");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 10;
    
    // Bulk Select State
    const [selectedIds, setSelectedIds] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, statusFilter]);

    // Reset selection when switching jobs
    useEffect(() => {
        setSelectedIds([]);
    }, [selectedJobId]);

    const filteredData = candidates
        .filter((c) => {
            const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === "all" || c.status === statusFilter || (statusFilter === "accepted" && c.status === "advanced");
            return matchesSearch && matchesStatus;
        });

    const indexOfLast = currentPage * dataPerPage;
    const indexOfFirst = indexOfLast - dataPerPage;
    const currentData = filteredData.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredData.length / dataPerPage);

    // Refresh Candidates Helper
    const refreshCandidates = async () => {
        if (!selectedJobId) return;
        try {
            const data = await candidateService.getByJob(selectedJobId);
            dispatch(setCandidates(data));
        } catch (err) {
            console.error("Failed to refresh candidates:", err);
        }
    };

    // Bulk Delete Action
    const handleBulkDelete = async () => {
        setIsDeleting(true);
        try {
            await candidateService.bulkDelete(selectedIds);
            setSelectedIds([]);
            setShowDeleteModal(false);
            await refreshCandidates();
        } catch (err) {
            console.error("Bulk delete failed:", err);
            alert("Failed to delete candidates.");
        } finally {
            setIsDeleting(false);
        }
    };

    // Retry AI Action
    const handleRetryAI = async (id) => {
        try {
            // Optimistic update status to pending
            const originalCandidates = [...candidates];
            const updated = candidates.map(c => c._id === id ? { ...c, status: 'pending' } : c);
            dispatch(setCandidates(updated));

            await candidateService.retry(id);
            // Polling approach not strictly necessary if standard polling is active,
            // but we can just trigger a manual refresh to be sure.
            setTimeout(() => refreshCandidates(), 2000);
        } catch (err) {
            console.error("Retry failed:", err);
            alert("Failed to restart screening process.");
            refreshCandidates(); // revert optimistic update
        }
    };

    // Selection Handlers
    const handleSelectAll = () => {
        if (selectedIds.length === currentData.length) {
            setSelectedIds([]); // Deselect all
        } else {
            const allIds = currentData.map(c => c._id);
            setSelectedIds(allIds); // Select all
        }
    };

    const handleSelectRow = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const isAllSelected = currentData.length > 0 && selectedIds.length === currentData.length;

    return (
        <div className="card table-container">
            <div className="table-actions">
                {selectedIds.length > 0 ? (
                    <div className="bulk-action-banner">
                        <span className="selected-count">{selectedIds.length} candidate(s) selected</span>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                className="btn-cancel-outline" 
                                onClick={() => setSelectedIds([])}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn-danger-outline" 
                                onClick={() => setShowDeleteModal(true)}
                                disabled={isDeleting}
                            >
                                Delete Selected
                            </button>
                        </div>
                    </div>
                ) : (
                    <h1>Candidate List</h1>
                )}
                
                <div className="filter-group">
                    <select 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="status-filter-select"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processed">Processed</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                        <option value="failed">Failed</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search candidate..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>
            
            <table className="candidate-table">
                <thead>
                    <tr>
                        <th style={{ width: '40px', textAlign: 'center' }}>
                            <input 
                                type="checkbox" 
                                className="custom-checkbox"
                                checked={isAllSelected}
                                onChange={handleSelectAll}
                            />
                        </th>
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
                            <td colSpan="6" style={{ textAlign: "center", color: "#94a3b8" }}>
                                No candidates found.
                            </td>
                        </tr>
                    ) : (
                        currentData.map((c, i) => (
                            <tr key={c._id || i} className={selectedIds.includes(c._id) ? "row-selected" : ""}>
                                <td style={{ textAlign: 'center' }}>
                                    <input 
                                        type="checkbox"
                                        className="custom-checkbox"
                                        checked={selectedIds.includes(c._id)}
                                        onChange={() => handleSelectRow(c._id)}
                                    />
                                </td>
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

                                <td className="status-cell">
                                    <span className={`status-${c.status === "advanced" ? "accepted" : c.status}`}>
                                        {c.status === "advanced" ? "accepted" : c.status}
                                    </span>
                                    {c.status === 'failed' && (
                                        <button 
                                            className="btn-retry" 
                                            title="Retry AI Screening"
                                            onClick={() => handleRetryAI(c._id)}
                                        >
                                            🔄
                                        </button>
                                    )}
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

            {/* Custom Delete Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="delete-modal-content">
                        <div className="modal-icon-warning">
                            <span className="material-symbols-rounded">warning</span>
                        </div>
                        <h3>Delete {selectedIds.length} Candidates?</h3>
                        <p>This action is <strong>permanent</strong> and cannot be undone. All related CV PDF files stored in the cloud will also be <strong>permanently destroyed</strong>.</p>
                        <div className="modal-buttons">
                            <button className="btn-modal-cancel" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
                                Cancel
                            </button>
                            <button className="btn-modal-delete" onClick={handleBulkDelete} disabled={isDeleting}>
                                {isDeleting ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}