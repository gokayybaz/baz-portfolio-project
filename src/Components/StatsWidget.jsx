import React from 'react'

const StatsWidget = ({ isLoaded }) => {
  return (
    <div className={`hidden md:block col-span-3 backdrop-filter backdrop-blur-md bg-slate-900/30 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} delay-300`}>
      <div className="p-4 grid grid-cols-3 gap-4">
        <div className="text-center p-3 rounded-lg bg-slate-900/60">
          <div className="text-blue-300 text-xl font-medium">3+</div>
          <div className="text-xs text-gray-300 mt-1">Yıl Deneyim</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-slate-900/60">
          <div className="text-blue-300 text-xl font-medium">20+</div>
          <div className="text-xs text-gray-300 mt-1">Projeler</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-slate-900/60">
          <div className="text-blue-300 text-xl font-medium">10+</div>
          <div className="text-xs text-gray-300 mt-1">Teknolojiler</div>
        </div>
      </div>
    </div>
  )
}

export default StatsWidget
