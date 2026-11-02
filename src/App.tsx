import { AboutSection } from './components/AboutSection'
import { ContactSection } from './components/ContactSection'
import { ExperienceSection } from './components/ExperienceSection'
import { Footer } from './components/Footer'
import { HeroSection } from './components/HeroSection'
import { Navbar } from './components/Navbar'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import { useActiveSection } from './hooks/useActiveSection'

export default function App() {
  const active = useActiveSection()

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text)', overflowX: 'clip', textWrap: 'pretty' }}>
      <Navbar active={active} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
