import React, { useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminProtectedRoute() {
    const { isAuthenticated, loading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If the user is not authenticated and not loading, redirect to login
        if (!loading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="text-white text-xl">Loading...</div>
        </div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminProtectedRoute;
