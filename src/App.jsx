import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import LandingPage  from './pages/public/LandingPage';
import JobList      from './pages/public/JobList';
import JobDetail    from './pages/public/JobDetail';
import ApplyForm    from './pages/public/ApplyForm';

// HR Pages
import Login         from './pages/hr/Login';
import Dashboard     from './pages/hr/Dashboard';
import JobPosting    from './pages/hr/JobPosting';
import Candidate     from './pages/hr/Candidate';
import CVSummaryDetail from './pages/hr/CVSummaryDetail';
import Account       from './pages/hr/Account';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/"              element={<LandingPage />} />
      <Route path="/jobs"          element={<JobList />} />
      <Route path="/jobs/:id"      element={<JobDetail />} />
      <Route path="/jobs/:id/apply" element={<ApplyForm />} />

      {/* Auth */}
      <Route path="/hr/login" element={<Login />} />

      {/* HR Protected Routes */}
      <Route path="/hr/dashboard"         element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/hr/job-postings"       element={<ProtectedRoute><JobPosting /></ProtectedRoute>} />
      <Route path="/hr/candidates"        element={<ProtectedRoute><Candidate /></ProtectedRoute>} />
      <Route path="/hr/candidates/:id"    element={<ProtectedRoute><CVSummaryDetail /></ProtectedRoute>} />
      <Route path="/hr/account"           element={<ProtectedRoute><Account /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;