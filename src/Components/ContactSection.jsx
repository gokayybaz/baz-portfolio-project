import React from 'react'

const ContactSection = ({ setShowContact }) => {
  return (
    <div className="col-span-3 backdrop-filter backdrop-blur-md bg-slate-900/30 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm transition-all duration-500 animate-fade-in">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">İletişim</h2>
          <button 
            onClick={() => setShowContact(false)}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-300 mb-4">
              Bir projede birlikte çalışmak veya bir soru sormak için formu doldurabilirsiniz.
            </p>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                </svg>
                <span>gokaybaz@example.com</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                </svg>
                <span>+90 555 123 4567</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">İsim</label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-md py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Adınız"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-posta</label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-md py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="E-posta adresiniz"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Mesaj</label>
              <textarea 
                id="message" 
                rows="4" 
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-md py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Mesajınız..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-indigo-500 text-white text-sm font-medium rounded-md py-2 px-4 hover:bg-indigo-600 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
              </svg>
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
