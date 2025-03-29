import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminDashboard() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check authentication
        const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
        if (!isAuthenticated) {
            router.push('/admin');
            return;
        }

        // Fetch contact submissions
        // In a real app, you would fetch from your API or database
        const fetchContacts = async () => {
            try {
                // Example data - replace with actual API call
                const mockContacts = [
                    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Hi, I would like to discuss a project', date: '2023-10-10' },
                    { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Looking for a web developer', date: '2023-10-11' },
                    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', message: 'Can you help with my website?', date: '2023-10-12' },
                ];

                setContacts(mockContacts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching contacts:', error);
                setLoading(false);
            }
        };

        fetchContacts();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        router.push('/admin');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Admin Dashboard | Portfolio</title>
            </Head>
            <div className="min-h-screen bg-gray-900 text-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Contact Form Submissions</h2>

                        {contacts.length === 0 ? (
                            <p className="text-gray-400">No contact submissions found.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Message
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {contacts.map((contact) => (
                                            <tr key={contact.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    {contact.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {contact.email}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {contact.message.length > 50
                                                        ? `${contact.message.substring(0, 50)}...`
                                                        : contact.message}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {contact.date}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
