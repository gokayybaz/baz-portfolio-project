import React, { useState, useEffect } from 'react'

const WelcomeWidget = ({
  activeWidget,
  setActiveWidget,
  toggleProjects,
  toggleContact,
  showProjects,
  showContact
}) => {
  // Animation state for welcome text
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const fullText = "Merhaba, ben Gökay Baz. Junior web developer olarak yeni teknolojiler öğrenmeye ve kendimi geliştirmeye odaklanıyorum.";

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[index]);
        setIndex(index + 1);
      }, 50); // Speed of typing

      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <div
      className={`col-span-2 backdrop-filter backdrop-blur-md bg-slate-900/30 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm transition-transform duration-300 ${activeWidget === 'welcome' ? 'scale-[1.01]' : ''}`}
      onMouseEnter={() => setActiveWidget('welcome')}
      onMouseLeave={() => setActiveWidget(null)}
    >
      <div className="p-7">
        <div className="flex items-center space-x-2 mb-5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
          <h2 className="ml-2 text-sm font-light text-gray-300">terminal@gokaybaz:~</h2>
        </div>

        <h1 className="text-2xl font-semibold mb-6 text-white">
          Hoş Geldiniz!
        </h1>

        <div className="bg-slate-950/70 rounded-lg p-4 font-mono text-sm border border-slate-700/50 mb-6">
          <p className="text-gray-200 min-h-[100px]">
            <span className="text-blue-300">$</span> <span className="text-gray-300">echo</span> "{text}
            <span className="ml-1 inline-block h-4 w-1.5 bg-blue-300 animate-blink"></span>"
          </p>
        </div>

        <div className="mt-5 flex gap-3">
          {/* <button 
            className={`px-4 py-2 ${showProjects ? 'bg-indigo-600' : 'bg-indigo-500'} text-white text-sm font-medium rounded-md hover:bg-indigo-600 transition-colors duration-300 flex items-center gap-2 group`}
            onClick={toggleProjects}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="group-hover:animate-pulse" viewBox="0 0 16 16">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
              <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
            </svg>
            Projelerim
          </button>
          <button 
            className={`px-4 py-2 ${showContact ? 'bg-indigo-500' : 'bg-transparent'} text-${showContact ? 'white' : 'indigo-300'} text-sm font-medium rounded-md hover:bg-indigo-500/20 transition-colors duration-300 flex items-center gap-2 group`}
            onClick={toggleContact}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="group-hover:animate-pulse" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
            İletişim
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default WelcomeWidget
