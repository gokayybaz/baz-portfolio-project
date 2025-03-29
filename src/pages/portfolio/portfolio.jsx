import { useState, useRef, useEffect } from "react"
import AnimatedBackground from "../../components/AnimatedBackground"
import ProfileWidget from "../../components/ProfileWidget"
import WelcomeWidget from "../../components/WelcomeWidget"
import StatsWidget from "../../components/StatsWidget"
import ScrollDownIndicator from "../../components/ScrollDownIndicator"
import ProjectsSection from "../../components/ProjectsSection"
import ContactSection from "../../components/ContactSection"

export default function Portfolio() {
    // State management
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeWidget, setActiveWidget] = useState(null)
    const [activeSection, setActiveSection] = useState('hero')
    // -------------------------

    // Scroll to Component Change Color
    const sectionRefs = {
        hero: useRef(null),
        projects: useRef(null),
        contact: useRef(null)
    }

    useEffect(() => {
        const loadTimer = setTimeout(() => setIsLoaded(true), 600)

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        }

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.dataset.section)
                }
            })
        }

        const observer = new IntersectionObserver(handleIntersection, observerOptions)
        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) observer.observe(ref.current)
        })

        return () => {
            clearTimeout(loadTimer)
            observer.disconnect()
        }
    }, [])

    // Get transition style based on active section
    const getSectionStyle = (sectionName) => {
        return `transition-opacity duration-500 ${activeSection === sectionName ? 'opacity-100' : 'opacity-50'}`
    }
    // ----------------------------------------


    return (
        <div className="App">
            <div className="w-full min-h-screen bg-slate-950 text-white overflow-y-auto relative">
                {/* Animated background */}
                <AnimatedBackground />

                {/* Main content */}
                <main className="relative z-10 container mx-auto px-4 py-8">
                    {/* Hero section */}
                    <section
                        data-section="hero"
                        ref={sectionRefs.hero}
                        className={`min-h-screen flex flex-col items-center justify-center mb-16 ${getSectionStyle('hero')}`}
                    >
                        <div
                            className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto 
                  transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                        >
                            <ProfileWidget
                                activeWidget={activeWidget}
                                setActiveWidget={setActiveWidget}
                                className="mx-auto w-full max-w-sm"
                            />
                            <WelcomeWidget
                                activeWidget={activeWidget}
                                setActiveWidget={setActiveWidget}
                                className="mx-auto w-full max-w-sm"
                            />
                            <StatsWidget
                                isLoaded={isLoaded}
                                className="mx-auto w-full max-w-sm"
                            />
                        </div>

                        {/* Scroll indicator */}
                        <div
                            className={`mt-12 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                                } mx-auto`}
                            style={{ transitionDelay: '600ms' }}
                        >
                            <ScrollDownIndicator targetRef={sectionRefs.projects} />
                        </div>
                    </section>

                    {/* Projects section */}
                    <section
                        data-section="projects"
                        ref={sectionRefs.projects}
                        className={`min-h-screen py-16 flex flex-col items-center ${getSectionStyle('projects')}`}
                        style={{ transitionDelay: '150ms' }}
                    >
                        <ProjectsSection />
                        <div className="mt-8">
                            <ScrollDownIndicator targetRef={sectionRefs.contact} />
                        </div>
                    </section>

                    {/* Contact section */}
                    <section
                        data-section="contact"
                        ref={sectionRefs.contact}
                        className={`min-h-screen py-16 ${getSectionStyle('contact')}`}
                        style={{ transitionDelay: '150ms' }}
                    >
                        <ContactSection />
                    </section>
                </main>
            </div>
        </div>
    )
}