import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Projects from './components/Projects.jsx'
import Resume from './components/Resume.jsx'
import Strengths from './components/Strengths.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

export default function App() {
  const [theme, setTheme] = useState('dark')
  return <MotionConfig reducedMotion="user"><div className={`site ${theme}`}><Navbar theme={theme} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} /><main><Hero /><About /><Experience /><Skills /><Education /><Projects /><Resume /><Strengths /><Contact /></main><Footer /></div></MotionConfig>
}
