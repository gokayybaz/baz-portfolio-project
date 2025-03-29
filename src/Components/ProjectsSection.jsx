import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient' // Assuming you have this file set up

const ProjectsSection = ({ setShowProjects }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('my_projects')
          .select('*')
          .order('id', { ascending: false })

        if (error) {
          throw error
        }

        setProjects(data || [])
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="col-span-3 backdrop-filter backdrop-blur-md bg-slate-900/30 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm transition-all duration-500 animate-fade-in">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Projelerim</h2>
          <button
            onClick={() => setShowProjects(false)}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-400">
              Henüz proje eklenmemiş.
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="bg-slate-800/50 border border-slate-700/30 rounded-lg overflow-hidden group hover:border-indigo-500/50 transition-all duration-300">
                <div className="aspect-video select-none w-full bg-slate-700/30 relative overflow-hidden">
                  <img
                    src={project.image_url || "https://placehold.co/600x400/1e293b/e2e8f0?text=Proje"}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium select-none text-indigo-300">{project.title}</h3>
                  <p className="text-gray-400 select-none text-sm mt-1">{project.technologies}</p>
                  <div className="mt-3 flex gap-2">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        className="text-xs select-none bg-slate-700/60 hover:bg-indigo-500/30 px-2 py-1 rounded text-gray-300 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Canlı Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        className="text-xs select-none bg-slate-700/60 hover:bg-indigo-500/30 px-2 py-1 rounded text-gray-300 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectsSection
