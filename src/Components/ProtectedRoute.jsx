import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Auth yükleniyorsa bir loading component göster
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-xl">Yükleniyor...</div>
            </div>
        );
    }

    // Authentication kontrolü ve state ile redirect yapma
    return isAuthenticated ?
        <Outlet /> :
        <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
