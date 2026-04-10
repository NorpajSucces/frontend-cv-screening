import { useState } from "react";
import Sidebar from "../../components/hr/Sidebar";
import "./CVSummaryDetail.css";

export default function CVSummaryDetail() {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const candidate = {
    name: "Andi Kurniawan",
    role: "Frontend Developer",
    email: "andi.kurniawan@email.com",
    phone: "08123456789",
    score: 85,
    skills: [
      { label: "Pengalaman", value: 80 },
      { label: "Pendidikan", value: 85 },
      { label: "Keterampilan", value: 90 },
      { label: "Presentasi", value: 85 },
    ],
    strengths: [
      "Portfolio proyek yang beragam dan berkualitas",
      "Penguasaan React & TypeScript yang solid",
      "Pengalaman di perusahaan startup ternama",
    ],
    weaknesses: [
      "Pengalaman kerja tim besar masih terbatas",
      "Belum ada sertifikasi profesional",
    ],
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/cv/andi-kurniawan.pdf"; // sesuaikan
    link.download = "CV-Andi-Kurniawan.pdf";
    link.click();
  };



  return (
    <div className="cv-page">
      <Sidebar />

      <main className="main-content">
        <div className="cv-container">
          {/* HEADER */}
          <div className="cv-head">
            <h1>Candidate Info</h1>
            <h2>Filter and review all job applications.</h2>
          </div>
          <hr className="divider" />

          <div className="cv-header card">
            <div className="avatar">A</div>
            <div>
              <h2>{candidate.name}</h2>
              <p>{candidate.role}</p>
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
              <div className="circle">{candidate.score}</div>
              <div>
                <p>Skor CV Keseluruhan</p>
                <div className="stars">⭐⭐⭐⭐☆</div>
              </div>
            </div>

            <h4>Skor per Kriteria</h4>

            {candidate.skills.map((s, i) => (
              <div key={i} className="skill">
                <span>{s.label}</span>
                <div className="bar">
                  <div style={{ width: `${s.value}%` }}></div>
                </div>
                <span>{s.value}/100</span>
              </div>
            ))}

            <div className="summary">
              <h4>Ringkasan</h4>
              <p>
                Kandidat yang sangat menjanjikan dengan pengalaman kuat di React.js dan ekosistem modern JavaScript.
              </p>
            </div>

            <div className="strength">
              <h4>Kelebihan</h4>
              <ul>
                {candidate.strengths.map((s, i) => <li key={i}>✅ {s}</li>)}
              </ul>
            </div>

            <div className="weakness">
              <h4>Area Perbaikan</h4>
              <ul>
                {candidate.weaknesses.map((w, i) => <li key={i}>⚠️ {w}</li>)}
              </ul>
            </div>
          </div>

          {/* ACTION */}
          <div className="cv-actions card">
            <span>Decision Controls:</span>
            <div>
              <button
                className="cv-download"
                onClick={handleDownload}
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
                    onClick={() => {
                      console.log("Candidate Rejected");
                      setShowRejectModal(false);
                    }}
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
                    onClick={() => {
                      console.log("Candidate Accepted");
                      setShowAcceptModal(false);
                    }}
                  >
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