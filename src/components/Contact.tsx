import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Turnstile from 'react-turnstile';
import { useInView } from './useInView';
import { Linkedin, Github, Twitter, Send, Check } from 'lucide-react';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

const WEBHOOK_URL = 'https://auto.brandjetmedia.com/webhook/website/form-submission';

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/rohankumarvg', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/RohanSudo', icon: Github },
  { label: 'Twitter', href: 'https://x.com/RohanSudo', icon: Twitter },
];

export default function Contact() {
  const [ref, isInView] = useInView(0.1);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    if (!turnstileToken) {
      setStatus('error');
      return;
    }

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      source: 'rohanbuilds-contact-form',
      'cf-turnstile-response': turnstileToken,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    color: '#e4e4e7',
    borderRadius: '12px',
    outline: 'none',
    fontFamily: "'Inter', system-ui, sans-serif",
  };

  return (
    <section id="contact" ref={ref} className="px-5 sm:px-8 md:px-12 py-16 sm:py-28">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}
        >
          Get in touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fafafa' }}
        >
          Build something practical<span style={{ color: '#818cf8' }}>.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-lg mb-12 text-base"
          style={{ color: '#a1a1aa' }}
        >
          Looking for applied AI automation, n8n workflow architecture, or a
          product builder who can turn messy operations into working systems?
          Send the context.
        </motion.p>

        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="md:col-span-3 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                name="name"
                type="text"
                placeholder="Name"
                required
                minLength={2}
                className="w-full px-4 py-3 text-sm placeholder:text-zinc-600 focus:border-indigo-400/50 transition-colors"
                style={inputStyle}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 text-sm placeholder:text-zinc-600 focus:border-indigo-400/50 transition-colors"
                style={inputStyle}
              />
            </div>
            <input
              name="company"
              type="text"
              placeholder="Company"
              required
              className="w-full px-4 py-3 text-sm placeholder:text-zinc-600 focus:border-indigo-400/50 transition-colors"
              style={inputStyle}
            />
            <textarea
              name="message"
              placeholder="What are you trying to build or automate?"
              required
              minLength={10}
              rows={4}
              className="w-full px-4 py-3 text-sm placeholder:text-zinc-600 focus:border-indigo-400/50 transition-colors resize-none"
              style={inputStyle}
            />
            <Turnstile
              sitekey={TURNSTILE_SITE_KEY}
              theme="dark"
              onVerify={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
            />
            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent' || !turnstileToken}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 disabled:opacity-50"
              style={{
                backgroundColor: status === 'sent' ? '#059669' : '#818cf8',
                color: '#09090b',
              }}
            >
              {status === 'idle' && <><Send size={16} /> Send message</>}
              {status === 'sending' && 'Sending...'}
              {status === 'sent' && <><Check size={16} /> Sent! I'll be in touch.</>}
              {status === 'error' && 'Something went wrong. Try again.'}
            </button>
          </motion.form>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 flex flex-col gap-4 md:pt-2"
          >
            {socials.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.45 + i * 0.06 }}
                className="card flex items-center gap-3 px-5 py-4"
                aria-label={link.label}
              >
                <link.icon size={20} style={{ color: '#71717a' }} />
                <span className="text-sm" style={{ color: '#a1a1aa' }}>{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
