import { useEffect, useState } from "react";
import Sidebar from "../../components/hr/Sidebar";
import "./CVSummaryDetail.css";
import { useParams } from "react-router-dom";
import candidateService from "../../services/candidateService";

export default function CVSummaryDetail() {
  const {id} = useParams();
  console.log('PARAM ID:', id)
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  
  // const candidate = {
  //   name: "Andi Kurniawan",
  //   role: "Frontend Developer",
  //   email: "andi.kurniawan@email.com",
  //   phone: "08123456789",
  //   score: 85,
  //   skills: [
  //     { label: "Pengalaman", value: 80 },
  //     { label: "Pendidikan", value: 85 },
  //     { label: "Keterampilan", value: 90 },
  //     { label: "Presentasi", value: 85 },
  //   ],
  //   strengths: [
  //     "Portfolio proyek yang beragam dan berkualitas",
  //     "Penguasaan React & TypeScript yang solid",
  //     "Pengalaman di perusahaan startup ternama",
  //   ],
  //   weaknesses: [
  //     "Pengalaman kerja tim besar masih terbatas",
  //     "Belum ada sertifikasi profesional",
  //   ],
  // };

  
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

  // loading state
  if (loading) return <p>Loading...</p>;
  if (!candidate) return <p>Candidate not found</p>;

  return (
    <div className="cv-page">
      <Sidebar />

      <main className="cv-container">
        {/* HEADER */}
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
            <span>Nomor HP</span>
            <p>{candidate.phone}</p>
          </div>
        </div>

        {/* ANALISIS */}
        <div className="cv-analysis card">
          <h3>Analisis CV (AI)</h3>

          <div className="score-box">
            <div className="circle">{candidate.aiScore || 0}</div>
            <div>
              <p>Skor CV Keseluruhan</p>
              <div className="stars">⭐⭐⭐⭐☆</div>
            </div>
          </div>

          {/* <h4>Skor per Kriteria</h4>

          {candidate.skills?.map((s, i) => (
            <div key={i} className="skill">
              <span>{s.label}</span>
              <div className="bar">
                <div style={{ width: `${s.value}%` }}></div>
              </div>
              <span>{s.value}/100</span>
            </div>
          ))} */}

          <div className="summary">
            <h4>Ringkasan</h4>
            <p>
              {candidate.aiSummary || "-"}
            </p>
          </div>

          <div className="strength">
            <h4>Kelebihan</h4>
            <ul>
              {/* {candidate.strengths.map((s, i) => <li key={i}>✅ {s}</li>)} */}
              {candidate.aiStrengths
                ? candidate.aiStrengths.split("\n").map((s, i) => (
                    <li key={i}>✅ {s}</li>
                  ))
                : <li>-</li>}
            </ul>
          </div>

          <div className="weakness">
            <h4>Area Perbaikan</h4>
            <ul>
              {/* {candidate.weaknesses.map((w, i) => <li key={i}>⚠️ {w}</li>)} */}
              {candidate.aiWeaknesses
                ? candidate.aiWeaknesses.split("\n").map((w, i) => (
                    <li key={i}>⚠️ {w}</li>
                  ))
                : <li>-</li>}
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

        {showRejectModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Are you sure?</h2>
              <p>
                This will mark the candidate as Rejected. You can change this status later if needed.
              </p>

              <div className="modal-actions">
                <button
                  className="cancel"
                  onClick={() => setShowRejectModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="confirm reject-btn"
                  onClick={handleReject}
                >
                  Yes, Reject
                </button>
              </div>
            </div>
          </div>
        )}
        {showAcceptModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Accept Candidate?</h2>
              <p>
                This will mark the candidate as Accepted and move them to the next stage.
              </p>

              <div className="modal-actions">
                <button
                  className="cancel"
                  onClick={() => setShowAcceptModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="confirm accept-btn"
                  onClick={handleAccept}
                >
                  Yes, Accept
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

    </div>
  );

}