import '../styles/globals.css';
import AdminProtectedRoute from '../components/AdminProtectedRoute';

function MyApp({ Component, pageProps, router }) {
    // Check if the page is an admin page
    const isAdminPage = router.pathname.startsWith('/admin');

    if (isAdminPage) {
        return (
            <AdminProtectedRoute>
                <Component {...pageProps} />
            </AdminProtectedRoute>
        );
    }

    // For non-admin pages, render normally
    return <Component {...pageProps} />;
}

export default MyApp;
