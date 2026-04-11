import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/hr/Sidebar";
import "./CVSummaryDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import candidateService from "../../services/candidateService";

export default function CVSummaryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { collapsed } = useSelector((state) => state.sidebar);
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  useEffect(() => {
    candidateService.cvSummary(id)
      .then((data) => {
        setCandidate(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAccept = () => {
    candidateService.accept(id)
      .then(() => {
        alert("Candidate accepted");
        setShowAcceptModal(false);
      })
      .catch(err => console.error(err));
  };

  const handleReject = () => {
    candidateService.reject(id)
      .then(() => {
        alert("Candidate rejected");
        setShowRejectModal(false);
      })
      .catch(err => console.error(err));
  };

  const handleDownloadCV = () => {
    candidateService.downloadCV(id);
  };

  /**
   * Helper: parse bullet points dari AI string.
   * AI biasanya mengembalikan string dengan pemisah "\n" atau "- " atau angka "1. "
   * Fungsi ini membersihkan dan mengembalikan array bersih.
   */
  const parseBulletPoints = (text) => {
    if (!text) return [];
    // Handle both newline-separated (new data) and comma-separated (old data)
    const hasNewlines = text.includes('\n');
    const items = hasNewlines ? text.split('\n') : text.split(/,\s*(?=[A-Z])/);
    return items
      .map(line => line.replace(/^[\d]+[.)]\s*/, '').replace(/^[-•]\s*/, '').trim())
      .filter(line => line.length > 0);
  };

  // Loading & error states
  if (loading) return <p>Loading...</p>;
  if (!candidate) return <p>Candidate not found</p>;

  const score = candidate.aiScore || 0;

  return (
    <div className="cv-page">
      <Sidebar />

      <main className={`main-content ${collapsed ? "sidebar-collapsed" : ""}`}>
        <div className="cv-container">
          {/* BACK BUTTON */}
          <button className="back-btn" onClick={() => navigate('/hr/candidates')}>
            ← Back to Candidates
          </button>

          {/* HEADER */}
          <div className="cv-head">
            <h1>Candidate Info</h1>
            <h2>Detail about candidate.</h2>
          </div>
          <hr className="divider" />

          <div className="cv-header card">
            <div className="avatar">{candidate.name?.charAt(0)}</div>
            <div>
              <h2>{candidate.name}</h2>
              <p>{candidate.jobId?.title || "-"}</p>
            </div>
          </div>

          {/* INFO */}
          <div className="cv-info card">
            <div>
              <span>Email</span>
              <p>{candidate.email}</p>
            </div>
            <div>
              <span>Phone</span>
              <p>{candidate.phone}</p>
            </div>
          </div>

          {/* ANALISIS */}
          <div className="cv-analysis card">
            <h3>CV Analysis (AI)</h3>

            {/* SCORE BAR — replaces hardcoded stars */}
            <div className="score-section">
              <div className="score-header">
                <div className="circle">{score}</div>
                <div className="score-label">
                  <p className="score-title">Overall CV Score</p>
                  <p className="score-subtitle">
                    {score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Average" : "Below Average"}
                  </p>
                </div>
              </div>
              <div className="score-bar-container">
                <div
                  className="score-bar-fill"
                  style={{
                    width: `${score}%`,
                    background: score >= 80 ? '#16a34a' : score >= 60 ? '#2563eb' : score >= 40 ? '#f59e0b' : '#ef4444'
                  }}
                />
              </div>
              <div className="score-scale">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="summary">
              <h4>Summary</h4>
              <p>{candidate.aiSummary || "-"}</p>
            </div>

            {/* STRENGTHS — bullet points */}
            <div className="strength">
              <h4>Strengths</h4>
              <ul>
                {parseBulletPoints(candidate.aiStrengths).length > 0
                  ? parseBulletPoints(candidate.aiStrengths).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))
                  : <li>-</li>
                }
              </ul>
            </div>

            {/* WEAKNESS — bullet points */}
            <div className="weakness">
              <h4>Weakness</h4>
              <ul>
                {parseBulletPoints(candidate.aiWeaknesses).length > 0
                  ? parseBulletPoints(candidate.aiWeaknesses).map((w, i) => (
                      <li key={i}>{w}</li>
                    ))
                  : <li>-</li>
                }
              </ul>
            </div>
          </div>

          {/* ACTION */}
          <div className="cv-actions card">
            <span>Decision Controls:</span>
            <div>
              <button
                className="cv-download"
                onClick={handleDownloadCV}
              >
                CV Download
              </button>
              <button
                className="reject"
                onClick={() => setShowRejectModal(true)}
              >
                Reject
              </button>
              <button
                className="accept"
                onClick={() => setShowAcceptModal(true)}
              >
                Accept
              </button>
            </div>
          </div>

          {/* REJECT MODAL */}
          {showRejectModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Are you sure?</h2>
                <p>
                  This will mark the candidate as Rejected. You can change this status later if needed.
                </p>
                <div className="modal-actions">
                  <button className="cancel" onClick={() => setShowRejectModal(false)}>
                    Cancel
                  </button>
                  <button className="confirm reject-btn" onClick={handleReject}>
                    Yes, Reject
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ACCEPT MODAL */}
          {showAcceptModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Accept Candidate?</h2>
                <p>
                  This will mark the candidate as Accepted and move them to the next stage.
                </p>
                <div className="modal-actions">
                  <button className="cancel" onClick={() => setShowAcceptModal(false)}>
                    Cancel
                  </button>
                  <button className="confirm accept-btn" onClick={handleAccept}>
                    Yes, Accept
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}