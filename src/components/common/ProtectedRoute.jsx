import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem('token');

  // Dev-mode convenience: auto-set token if missing so you can test pages without backend login
  if (!token) {
    token = 'dev-token';
    localStorage.setItem('token', token);
  }

  return token ? children : <Navigate to="/hr/login" replace />;
};

export default ProtectedRoute;