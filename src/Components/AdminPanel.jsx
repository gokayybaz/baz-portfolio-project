import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; // Make sure you have this import

const AdminPanel = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [emailDialog, setEmailDialog] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState('');
    const [emailContent, setEmailContent] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [sendingEmail, setSendingEmail] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMessages(data || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
            alert('Mesajlar yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const openEmailDialog = (email) => {
        setSelectedEmail(email);
        setEmailDialog(true);
    };

    const closeEmailDialog = () => {
        setEmailDialog(false);
        setEmailContent('');
        setEmailSubject('');
        setSelectedEmail('');
    };

    const sendEmail = async (e) => {
        e.preventDefault();

        if (!emailContent || !emailSubject) {
            alert('Lütfen konu ve içerik alanlarını doldurun.');
            return;
        }

        try {
            setSendingEmail(true);

            // Create a mailto URL with the email parameters
            const mailtoUrl = `mailto:${encodeURIComponent(selectedEmail)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailContent)}`;

            // Open the default mail client
            window.location.href = mailtoUrl;

            // Close the dialog after a short delay to allow time for the mail client to open
            setTimeout(() => {
                closeEmailDialog();
                setSendingEmail(false);
            }, 1000);

        } catch (error) {
            console.error('Error opening mail client:', error);
            alert(`Mail açılırken bir hata oluştu: ${error.message}`);
            setSendingEmail(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
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

            <main className="container mx-auto px-4 py-8">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className="backdrop-filter backdrop-blur-md bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4">İçerik Yönetimi</h2>
                        <p className="text-gray-300 mb-4">Web sitesi içeriklerini buradan yönetebilirsiniz.</p>
                        <button className="text-blue-400 hover:text-blue-300 transition">İçerikleri Düzenle →</button>
                    </div>

                    <div className="backdrop-filter backdrop-blur-md bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4">Proje Yönetimi</h2>
                        <p className="text-gray-300 mb-4">Portfolyo projelerinizi buradan yönetebilirsiniz.</p>
                        <button className="text-blue-400 hover:text-blue-300 transition">Projeleri Düzenle →</button>
                    </div>

                    <div className="backdrop-filter backdrop-blur-md bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4">Kullanıcı Yönetimi</h2>
                        <p className="text-gray-300 mb-4">Admin kullanıcılarını buradan yönetebilirsiniz.</p>
                        <button className="text-blue-400 hover:text-blue-300 transition">Kullanıcıları Yönet →</button>
                    </div>
                </div> */}

                {/* Contact Messages Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-6">İletişim Mesajları</h2>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-4">Mesajlar yükleniyor...</p>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="text-center py-8 bg-slate-800/50 rounded-xl">
                            <p>Henüz mesaj bulunmamaktadır.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-slate-800/50 rounded-xl overflow-hidden">
                                <thead className="bg-slate-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">İsim</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Mesaj</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tarih</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {messages.map((message) => (
                                        <tr key={message.id} className="hover:bg-slate-700/50">
                                            <td className="px-6 py-4 whitespace-nowrap">{message.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{message.email}</td>
                                            <td className="px-6 py-4">
                                                <div className="max-h-20 overflow-y-auto">
                                                    {message.message}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(message.created_at).toLocaleDateString('tr-TR')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => openEmailDialog(message.email)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition duration-300"
                                                >
                                                    Mail Gönder
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* Email Dialog */}
            {emailDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800 rounded-xl w-full max-w-lg">
                        <div className="p-5 border-b border-slate-700">
                            <h3 className="text-xl font-semibold">Email Gönder</h3>
                            <p className="text-gray-400 mt-1">Alıcı: {selectedEmail}</p>
                        </div>

                        <form onSubmit={sendEmail} className="p-5 space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-2">Konu:</label>
                                <input
                                    type="text"
                                    value={emailSubject}
                                    onChange={(e) => setEmailSubject(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                                    placeholder="Email konusu"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">İçerik:</label>
                                <textarea
                                    value={emailContent}
                                    onChange={(e) => setEmailContent(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-40 resize-none"
                                    placeholder="Email içeriği"
                                    required
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-3 pt-3">
                                <button
                                    type="button"
                                    onClick={closeEmailDialog}
                                    className="px-4 py-2 border border-slate-600 rounded hover:bg-slate-700 transition"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    disabled={sendingEmail}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition disabled:opacity-50"
                                >
                                    {sendingEmail ? 'Gönderiliyor...' : 'Gönder'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
