import { useEffect } from 'react';
import { Routes, Route, useLocation, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { JobListPage } from './pages/public/JobListPage';
import { JobDetailPage } from './pages/public/JobDetailPage';
import { ApplyForm } from './pages/public/ApplyForm';

// HR Pages
import Login from './pages/hr/Login';
import Dashboard from './pages/hr/Dashboard';
import JobPosting from './pages/hr/JobPosting';
import Candidate from './pages/hr/Candidate';
import CVSummaryDetail from './pages/hr/CVSummaryDetail';
import Account from './pages/hr/Account';

function App() {
  const location = useLocation();

  // 2. Tambahkan logika Scroll To Top di sini
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Efek ini jalan setiap kali URL (pathname) berubah

  // Logika untuk mengecek apakah kita berada di halaman HR atau Login HR
  const isHrPage = location.pathname.startsWith('/hr');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar hanya muncul jika BUKAN halaman HR */}
      {!isHrPage && <Navbar />}

      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs" element={<JobListPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/jobs/:id/apply" element={<ApplyForm />} />

          {/* Auth */}
          <Route path="/hr/login" element={<Login />} />

          {/* HR Protected Routes */}
          <Route path="/hr/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          <Route path="/hr/job-postings" element={<ProtectedRoute><JobPosting /></ProtectedRoute>} />
          <Route path="/hr/job-posting" element={<ProtectedRoute><JobPosting /></ProtectedRoute>} />

          <Route path="/hr/candidates" element={<ProtectedRoute><Candidate /></ProtectedRoute>} />
          <Route path="/hr/candidates/:id" element={<ProtectedRoute><CVSummaryDetail /></ProtectedRoute>} />
          <Route path="/hr/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        </Routes>
      </main>

      {/* Footer hanya muncul jika BUKAN halaman HR */}
      {!isHrPage && <Footer />}
    </div>
  );
}

export default App;