import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginForm from './LoginForm';

const AdminProtectedRoute = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated
        const checkAuth = () => {
            // Check if we're in browser environment before accessing localStorage
            if (typeof window !== 'undefined') {
                // Get the admin token from localStorage
                const adminToken = localStorage.getItem('adminToken');

                if (adminToken) {
                    // If token exists, user is authenticated
                    setIsAuthenticated(true);
                }
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Only render content client-side to avoid hydration issues
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsLoading(false);
        }
    }, []);

    // Show loading while checking authentication
    if (isLoading) {
        return <div>Yükleniyor...</div>;
    }

    // If not authenticated, show login form
    if (!isAuthenticated) {
        return (
            <div className="login-container">
                <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
            </div>
        );
    }

    // If authenticated, show admin page
    return <>{children}</>;
};

export default AdminProtectedRoute;
