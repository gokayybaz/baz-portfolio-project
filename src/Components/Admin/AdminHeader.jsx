import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const AdminHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <header className="bg-slate-800 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Admin Paneli</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-300">{user?.email}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300"
                    >
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </header>
    )
}

export default AdminHeader