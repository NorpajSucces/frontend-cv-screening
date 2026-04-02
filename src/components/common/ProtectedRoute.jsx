import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      try {
        // Panggil API untuk memverifikasi token (opsional)
        // const res = await api.verifyToken(token);
        // setIsAuthenticated(res.valid);
        setIsAuthenticated(true); // jika tidak pakai verifikasi backend
      } catch (error) {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/hr/login" replace />;
};

export default ProtectedRoute;