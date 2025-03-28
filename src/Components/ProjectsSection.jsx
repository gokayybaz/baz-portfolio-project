import React from 'react'

const ProjectsSection = ({ setShowProjects }) => {
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
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Project 1 */}
          <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg overflow-hidden group hover:border-indigo-500/50 transition-all duration-300">
            <div className="aspect-video w-full bg-slate-700/30 relative overflow-hidden">
              <img 
                src="https://placehold.co/600x400/1e293b/e2e8f0?text=Proje+1" 
                alt="Project 1" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-indigo-300">E-Commerce Platform</h3>
              <p className="text-gray-400 text-sm mt-1">React, Node.js, MongoDB</p>
              <div className="mt-3 flex gap-2">
                <a 
                  href="#" 
                  className="text-xs bg-slate-700/60 hover:bg-indigo-500/30 px-2 py-1 rounded text-gray-300 transition-colors duration-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Demo
                </a>
                <a 
                  href="#" 
                  className="text-xs bg-slate-700/60 hover:bg-indigo-500/30 px-2 py-1 rounded text-gray-300 transition-colors duration-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
          
          {/* Project 2 */}
          <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg overflow-hidden group hover:border-indigo-500/50 transition-all duration-300">
            <div className="aspect-video w-full bg-slate-700/30 relative overflow-hidden">
              <img 
                src="https://placehold.co/600x400/1e293b/e2e8f0?text=Proje+2" 
                alt="Project 2" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-indigo-300">Task Manager App</h3>
              <p className="text-gray-400 text-sm mt-1">Vue.js, Firebase</p>
              <div className="mt-3 flex gap-2">
                <a 
                  href="#" 
                  className="text-xs bg-slate-700/60 hover:bg-indigo-500/30 px-2 py-1 rounded text-gray-300 transition-colors duration-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Demo
                </a>
                <a 
                  href="#" 
                  className="text-xs bg-slate-700/60 hover:bg-indigo-500/30 px-2 py-1 rounded text-gray-300 transition-colors duration-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
          
          {/* Project 3 */}
          <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg overflow-hidden group hover:border-indigo-500/50 transition-all duration-300">
            <div className="aspect-video w-full bg-slate-700/30 relative overflow-hidden">
              <img 
                src="https://placehold.co/600x400/1e293b/e2e8f0?text=Proje+3" 
                alt="Project 3" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-indigo-300">Portfolio Website</h3>
              <p className="text-gray-400 text-sm mt-1">React, Tailwind CSS</p>
              <div className="mt-3 flex gap-2">
                <a 
                  href="#" 
                  className="text-xs bg-slate-700/60 hover:bg-indigo-500/30 px-2 py-1 rounded text-gray-300 transition-colors duration-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Demo
                </a>
                <a 
                  href="#" 
                  className="text-xs bg-slate-700/60 hover:bg-indigo-500/30 px-2 py-1 rounded text-gray-300 transition-colors duration-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectsSection
