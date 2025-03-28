import './App.css'
import { useState, useEffect, useRef } from 'react'
import ProfileWidget from './components/ProfileWidget/ProfileWidget'
import WelcomeWidget from './components/WelcomeWidget'
import StatsWidget from './components/StatsWidget'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import AnimatedBackground from './components/AnimatedBackground'

function App() {
  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeWidget, setActiveWidget] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  
  // Section refs
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  
  useEffect(() => {
    // Initial loading animation - reduced from 600ms to 300ms
    setTimeout(() => setIsLoaded(true), 300);
    
    // Set up intersection observers for each section
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // When 50% of the section is visible
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.dataset.section);
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, options);
    
    if (heroRef.current) observer.observe(heroRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);
    
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (projectsRef.current) observer.unobserve(projectsRef.current);
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);
  
  // Transition style based on active section - reduced duration from 1000ms to 500ms
  const getSectionStyle = (sectionName) => {
    const isActive = activeSection === sectionName;
    const baseTransition = 'transition-all duration-500';
    const activeStyle = 'opacity-100 scale-100';
    const inactiveStyle = 'opacity-0 scale-95';
    
    return `${baseTransition} ${isActive ? activeStyle : inactiveStyle}`;
  };

  return (
    <div className='w-full min-h-screen bg-slate-950 text-white overflow-y-auto relative'>
      {/* Animated background elements */}
      <AnimatedBackground />
      
      {/* Content */}
      <main className='relative z-10 container mx-auto px-4 py-8'>
        {/* Hero section with widgets - reduced mb-16 to mb-8 */}
        <section 
          data-section="hero"
          ref={heroRef}
          className={`min-h-screen flex items-center justify-center mb-8 ${getSectionStyle('hero')}`}>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Profile Widget */}
            <ProfileWidget 
              activeWidget={activeWidget} 
              setActiveWidget={setActiveWidget} 
            />
            
            {/* Welcome Widget */}
            <WelcomeWidget 
              activeWidget={activeWidget} 
              setActiveWidget={setActiveWidget}
            />
            
            {/* Stats Widget */}
            <StatsWidget isLoaded={isLoaded} />
          </div>
        </section>
        
        {/* Projects Section - reduced py-16 to py-8 */}
        <section 
          data-section="projects"
          ref={projectsRef}
          className={`min-h-screen py-8 ${getSectionStyle('projects')}`} 
          style={{transitionDelay: '150ms'}}>
          <ProjectsSection />
        </section>
        
        {/* Contact Section - reduced py-16 to py-8 */}
        <section 
          data-section="contact"
          ref={contactRef}
          className={`min-h-screen py-8 ${getSectionStyle('contact')}`}
          style={{transitionDelay: '150ms'}}>
          <ContactSection />
        </section>
      </main>
    </div>
  )
}

export default App
