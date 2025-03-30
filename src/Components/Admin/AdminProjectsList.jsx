import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient';

const AdminProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [projectDialog, setProjectDialog] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [loading, setLoading] = useState(true);
    const [projectDescription, setProjectDescription] = useState('');
    const [projectImageUrl, setProjectImageUrl] = useState('');
    const [projectGithubUrl, setProjectGithubUrl] = useState('');
    const [projectLiveUrl, setProjectLiveUrl] = useState('');
    const [projectTechnologies, setProjectTechnologies] = useState('');
    const [addingProject, setAddingProject] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, [])

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

    return (
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
        </div>
    )
}

export default AdminProjectsList