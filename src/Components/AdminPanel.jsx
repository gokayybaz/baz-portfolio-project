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
    const [projects, setProjects] = useState([]);
    const [projectDialog, setProjectDialog] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectImageUrl, setProjectImageUrl] = useState('');
    const [projectGithubUrl, setProjectGithubUrl] = useState('');
    const [projectLiveUrl, setProjectLiveUrl] = useState('');
    const [projectTechnologies, setProjectTechnologies] = useState('');
    const [addingProject, setAddingProject] = useState(false);

    useEffect(() => {
        fetchMessages();
        fetchProjects();
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

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('my_projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
            alert('Projeler yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();

        if (!projectName || !projectImageUrl) {
            alert('Lütfen gerekli alanları doldurun.');
            return;
        }

        try {
            setAddingProject(true);



            const newProject = {
                title: projectName,
                description: projectDescription,
                image_url: projectImageUrl,
                github_url: projectGithubUrl,
                demo_url: projectLiveUrl,
                technologies: projectTechnologies
            };

            const { error } = await supabase
                .from('my_projects')
                .insert([newProject]);

            if (error) throw error;

            alert('Proje başarıyla eklendi!');
            fetchProjects();
            closeProjectDialog();
        } catch (error) {
            console.error('Error adding project:', error);
            alert(`Proje eklenirken bir hata oluştu: ${error.message}`);
        } finally {
            setAddingProject(false);
        }
    };

    const openProjectDialog = () => {
        setProjectDialog(true);
    };

    const closeProjectDialog = () => {
        setProjectDialog(false);
        setProjectName('');
        setProjectDescription('');
        setProjectImageUrl('');
        setProjectGithubUrl('');
        setProjectLiveUrl('');
        setProjectTechnologies('');
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

            const mailtoUrl = `mailto:${encodeURIComponent(selectedEmail)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailContent)}`;

            window.location.href = mailtoUrl;

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
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Proje Yönetimi</h2>
                        <button
                            onClick={openProjectDialog}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-300"
                        >
                            Yeni Proje Ekle
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-4">Projeler yükleniyor...</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-8 bg-slate-800/50 rounded-xl">
                            <p>Henüz proje bulunmamaktadır.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-slate-800/50 rounded-xl overflow-hidden">
                                <thead className="bg-slate-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Proje Adı</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Açıklama</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Teknolojiler</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {projects.map((project) => (
                                        <tr key={project.id} className="hover:bg-slate-700/50">
                                            <td className="px-6 py-4 whitespace-nowrap">{project.title}</td>
                                            <td className="px-6 py-4">
                                                <div className="max-h-20 overflow-y-auto">
                                                    {project.description && project.description.length > 100
                                                        ? `${project.description.substring(0, 100)}...`
                                                        : project.description || 'No description available'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">

                                                    {
                                                        project.technologies

                                                    }

                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition duration-300 mr-2"
                                                >
                                                    GitHub
                                                </a>
                                                {project.live_url && (
                                                    <a
                                                        href={project.live_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition duration-300"
                                                    >
                                                        Live
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

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

            {projectDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800 rounded-xl w-full max-w-2xl">
                        <div className="p-5 border-b border-slate-700">
                            <h3 className="text-xl font-semibold">Yeni Proje Ekle</h3>
                        </div>

                        <form onSubmit={handleAddProject} className="p-5 space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-2">Proje Adı: <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                                    placeholder="Proje adı"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Açıklama:</label>
                                <textarea
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white h-32 resize-none"
                                    placeholder="Proje açıklaması"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Görsel URL: <span className="text-red-500">*</span></label>
                                <input
                                    type="url"
                                    value={projectImageUrl}
                                    onChange={(e) => setProjectImageUrl(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                                    placeholder="https://example.com/image.jpg"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">GitHub URL:</label>
                                <input
                                    type="url"
                                    value={projectGithubUrl}
                                    onChange={(e) => setProjectGithubUrl(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                                    placeholder="https://github.com/username/repo"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Live URL:</label>
                                <input
                                    type="url"
                                    value={projectLiveUrl}
                                    onChange={(e) => setProjectLiveUrl(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                                    placeholder="https://myproject.com"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Teknolojiler (virgülle ayırın):</label>
                                <input
                                    type="text"
                                    value={projectTechnologies}
                                    onChange={(e) => setProjectTechnologies(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white"
                                    placeholder="React, Node.js, MongoDB"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-3">
                                <button
                                    type="button"
                                    onClick={closeProjectDialog}
                                    className="px-4 py-2 border border-slate-600 rounded hover:bg-slate-700 transition"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    disabled={addingProject}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white transition disabled:opacity-50"
                                >
                                    {addingProject ? 'Ekleniyor...' : 'Ekle'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            )}
        </div >
    );
};

export default AdminPanel;
