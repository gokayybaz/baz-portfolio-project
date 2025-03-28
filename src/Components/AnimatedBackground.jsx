import React from 'react'

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-5 animate-float-slow top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-5 animate-float-delay bottom-10 right-10"></div>
      <div className="grid grid-cols-12 grid-rows-12 h-screen w-screen">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute h-px w-px bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3,
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.4)',
              animation: `pulse ${(Math.random() * 4) + 3}s ease-in-out infinite`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default AnimatedBackground
