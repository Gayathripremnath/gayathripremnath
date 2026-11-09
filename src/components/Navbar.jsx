import { useState } from 'react'
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react'
import '../styles/Navbar.css'
const links = [['Home','home'],['About','about'],['Experience','experience'],['Internship','internship'],['Skills','skills'],['Education','education'],['Projects','projects'],['Certifications','certifications'],['Resume','resume'],['Contact','contact']]
export default function Navbar({theme,onTheme}) {
 const [open,setOpen]=useState(false); const [active,setActive]=useState('home')
 const go=(id)=>{setActive(id);setOpen(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}
 return <header className="navbar"><a className="brand" href="#home" onClick={e=>{e.preventDefault();go('home')}}><span className="brand-mark">G</span><span>gayathri<span className="brand-dot">.</span></span></a><button className="mobile-toggle icon-btn" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav className={open?'nav-links open':'nav-links'} aria-label="Main navigation">{links.map(([label,id])=><a key={id} className={active===id?'active':''} href={`#${id}`} onClick={e=>{e.preventDefault();go(id)}}>{label}</a>)}</nav><div className="nav-actions"><button onClick={onTheme} className="icon-btn theme-toggle" aria-label="Toggle color theme">{theme==='dark'?<Sun/>:<Moon/>}</button><a className="nav-cta" href="#contact" onClick={e=>{e.preventDefault();go('contact')}}>Let’s talk <ArrowUpRight size={15}/></a></div></header>
}
