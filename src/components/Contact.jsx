import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, MapPin, ArrowUpRight, Send } from 'lucide-react'
import { GithubMark, LinkedinMark } from './BrandIcons.jsx'
import '../styles/Contact.css'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const sendingRef = useRef(false)

  const submit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (sendingRef.current) return

    const formData = new FormData(form)
    const templateParams = {
      from_name: formData.get('from_name').trim(),
      from_email: formData.get('from_email').trim(),
      subject: formData.get('subject').trim(),
      message: formData.get('message').trim(),
    }

    const fields = ['from_name', 'from_email', 'subject', 'message'].map((name) => form.elements.namedItem(name))
    fields.forEach((field) => field.setCustomValidity(''))
    const emptyField = fields.find((field) => !field.value.trim())
    if (emptyField) emptyField.setCustomValidity('Please complete this field.')
    const emailField = form.elements.namedItem('from_email')
    if (templateParams.from_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(templateParams.from_email)) {
      emailField.setCustomValidity('Enter a valid email address.')
    }
    const messageField = form.elements.namedItem('message')
    if (templateParams.message && templateParams.message.length < 10) {
      messageField.setCustomValidity('Please enter a message with at least 10 characters.')
    }
    if (!form.reportValidity()) return

    if (!serviceId || !templateId || !publicKey) {
      setStatus('config-error')
      return
    }

    sendingRef.current = true
    setStatus('sending')
    try {
      const response = await emailjs.send(serviceId, templateId, templateParams, { publicKey })
      if (response.status !== 200) throw new Error('EmailJS did not confirm delivery.')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      sendingRef.current = false
    }
  }

  return <section className="section contact-section" id="contact">
    <div className="contact-layout">
      <div className="contact-copy">
        <span className="section-kicker">LET’S CONNECT</span>
        <h2>Have a project<br/>in <span>mind?</span></h2>
        <p>I’m open to new opportunities and thoughtful collaborations. Tell me what you’re working on.</p>
        <div className="contact-details">
          <span><MapPin size={16}/> Kozhikode, Kerala, India</span>
          <a href="https://github.com/Gayathripremnath" target="_blank" rel="noreferrer"><GithubMark/> github.com/Gayathripremnath <ArrowUpRight size={13}/></a>
          <a href="https://www.linkedin.com/in/gayathri-premnathpv" target="_blank" rel="noreferrer"><LinkedinMark/> LinkedIn profile <ArrowUpRight size={13}/></a>
        </div>
        <div className="contact-availability"><i/> Open to professional opportunities</div>
      </div>

      <form className="contact-form" onSubmit={submit} onChange={() => status !== 'sending' && setStatus('idle')}>
        <div className="form-heading">
          <div><span className="section-kicker">SEND A MESSAGE</span><h3>Let’s make something meaningful.</h3></div>
          <Mail size={19}/>
        </div>
        <label>Full name<input name="from_name" autoComplete="name" required minLength="2" placeholder="Your name"/></label>
        <label>Email address<input name="from_email" type="email" autoComplete="email" required placeholder="you@example.com"/></label>
        <label>Subject<input name="subject" required minLength="2" placeholder="What’s this about?"/></label>
        <label>Message<textarea name="message" rows="4" required minLength="10" placeholder="Tell me a little about it…"/></label>
        <button className="button primary send-button" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : status === 'success' ? 'Message sent' : 'Send message'} <Send size={14}/>
        </button>
        {status === 'success' && <p className="form-feedback success" role="status">Thanks for reaching out. Your message was sent successfully.</p>}
        {status === 'config-error' && <p className="form-feedback error" role="alert">Email sending isn’t configured yet. Add the EmailJS values to the project’s <code>.env.local</code> file and restart the development server.</p>}
        {status === 'error' && <p className="form-feedback error" role="alert">Your message couldn’t be sent. Please check your connection and try again. If this continues, verify the EmailJS service, template, and dashboard settings.</p>}
      </form>
    </div>
  </section>
}
