import React from 'react'
import AdminHeader from '../../components/Admin/AdminHeader'
import AdminProjectsList from '../../components/Admin/AdminProjectsList'
import AdminContactMessagesList from '../../components/Admin/AdminContactMessagesList'

const AdminPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <AdminHeader />
            <main className="container mx-auto px-4 py-8">
                <AdminProjectsList />
                <AdminContactMessagesList />
            </main>
        </div >
    )
}

export default AdminPage