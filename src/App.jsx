import './App.css'
import { useState, useEffect, useRef } from 'react'
import ProfileWidget from './components/ProfileWidget'
import WelcomeWidget from './components/WelcomeWidget'
import StatsWidget from './components/StatsWidget'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import AnimatedBackground from './components/AnimatedBackground'
import ScrollDownIndicator from './components/ScrollDownIndicator'

function App() {
  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeWidget, setActiveWidget] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Section refs
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll to section function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Initial loading animation
    setTimeout(() => setIsLoaded(true), 600);

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

  // Transition style based on active section - revert duration from 500ms to 1000ms
  const getSectionStyle = (sectionName) => {
    const isActive = activeSection === sectionName;
    const baseTransition = 'transition-all duration-1000';
    const activeStyle = 'opacity-100 scale-100';
    const inactiveStyle = 'opacity-0 scale-95';

    return `${baseTransition} ${isActive ? activeStyle : inactiveStyle}`;
  };

  return (
    <div className='w-full min-h-screen bg-slate-950 text-white overflow-y-auto relative'>
      {/* Animated background elements */}
      <AnimatedBackground />

      {/* Navigation Buttons - Fixed position */}
      {/* <div className="fixed top-4 right-4 z-50 flex gap-4 transition-all duration-500 transform"
        style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)' }}>
        <button
          onClick={() => scrollToSection(projectsRef)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
          </svg>
          <span>Projelerim</span>
        </button>

        <button
          onClick={() => scrollToSection(contactRef)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span>İletişim</span>
        </button>
      </div> */}

      {/* Content */}
      <main className='relative z-10 container mx-auto px-4 py-8'>
        {/* Hero section with widgets - revert mb-8 to mb-16 */}
        <section
          data-section="hero"
          ref={heroRef}
          className={`min-h-screen flex flex-col items-center justify-center mb-16 ${getSectionStyle('hero')}`}>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Profile Widget */}
            <ProfileWidget
              activeWidget={activeWidget}
              setActiveWidget={setActiveWidget}
              className="mx-auto w-full max-w-sm"
            />

            {/* Welcome Widget */}
            <WelcomeWidget
              activeWidget={activeWidget}
              setActiveWidget={setActiveWidget}
              className="mx-auto w-full max-w-sm"
            />

            {/* Stats Widget */}
            <StatsWidget isLoaded={isLoaded} className="mx-auto w-full max-w-sm" />
          </div>

          {/* Scroll Down Indicator after hero section */}
          <div className={`mt-12 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} mx-auto`} style={{ transitionDelay: '600ms' }}>
            <ScrollDownIndicator targetRef={projectsRef} />
          </div>
        </section>

        {/* Projects Section - revert py-8 to py-16 */}
        <section
          data-section="projects"
          ref={projectsRef}
          className={`min-h-screen py-16 flex flex-col items-center ${getSectionStyle('projects')}`}
          style={{ transitionDelay: '150ms' }}>
          <ProjectsSection />

          {/* Scroll Down Indicator after projects section */}
          <div className="mt-8">
            <ScrollDownIndicator targetRef={contactRef} />
          </div>
        </section>

        {/* Contact Section - revert py-8 to py-16 */}
        <section
          data-section="contact"
          ref={contactRef}
          className={`min-h-screen py-16 ${getSectionStyle('contact')}`}
          style={{ transitionDelay: '150ms' }}>
          <ContactSection />
        </section>
      </main>
    </div>
  )
}

export default App
