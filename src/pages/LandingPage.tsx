import { useState, FormEvent } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Check, Zap } from 'lucide-react';
import { wipProjects } from '../data/wip-projects';

const WEBHOOK_URL = 'https://auto.brandjetmedia.com/webhook/wip/signup';

export default function LandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = wipProjects.find(p => p.slug === slug);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [email, setEmail] = useState('');

  if (!project) {
    return <Navigate to="/wip" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          project: project.slug,
          submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          source: 'rohanbuilds-wip',
        }),
      });
      setStatus('sent');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  const statusLabel = {
    validating: 'Validating idea',
    building: 'Currently building',
    live: 'Live now',
  }[project.status];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal top bar */}
      <div className="px-5 sm:px-8 md:px-12 pt-6">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/wip"
            className="inline-flex items-center gap-1.5 text-xs transition-colors duration-200"
            style={{ color: '#52525b', fontFamily: "'JetBrains Mono', monospace" }}
            onMouseEnter={e => (e.currentTarget.style.color = '#71717a')}
            onMouseLeave={e => (e.currentTarget.style.color = '#52525b')}
          >
            <ArrowLeft size={14} />
            rohanbuilds.com
          </Link>
        </div>
      </div>

      {/* Landing content */}
      <main className="flex-1 flex items-center px-5 sm:px-8 md:px-12 py-16">
        <div className="max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block text-xs px-3 py-1 rounded-full mb-6"
              style={{
                backgroundColor: 'rgba(129,140,248,0.15)',
                color: '#818cf8',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {statusLabel}
            </span>

            {project.image && (
              <div className="mb-8 rounded-xl overflow-hidden" style={{ border: '1px solid #27272a' }}>
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full"
                />
              </div>
            )}

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fafafa' }}
            >
              {project.headline}
            </h1>

            <p className="text-lg mb-10" style={{ color: '#a1a1aa' }}>
              {project.subheadline}
            </p>

            {/* Bullets */}
            <ul className="space-y-3 mb-10">
              {project.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <Zap size={16} className="mt-0.5 shrink-0" style={{ color: '#818cf8' }} />
                  <span className="text-sm" style={{ color: '#d4d4d8' }}>{bullet}</span>
                </motion.li>
              ))}
            </ul>

            {/* Email signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {status === 'sent' ? (
                <div
                  className="flex items-center gap-3 p-5 rounded-xl"
                  style={{ backgroundColor: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.3)' }}
                >
                  <Check size={20} style={{ color: '#059669' }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#fafafa' }}>You're on the list!</p>
                    <p className="text-xs mt-0.5" style={{ color: '#71717a' }}>I'll email you when this is ready.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    className="flex-1 px-4 py-3.5 text-sm rounded-xl placeholder:text-zinc-600 focus:border-indigo-400/50 transition-colors"
                    style={{
                      backgroundColor: '#18181b',
                      border: '1px solid #27272a',
                      color: '#e4e4e7',
                      outline: 'none',
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 disabled:opacity-50 shrink-0"
                    style={{ backgroundColor: '#818cf8', color: '#09090b' }}
                  >
                    {status === 'sending' ? (
                      'Joining...'
                    ) : (
                      <>
                        <Send size={14} />
                        Get early access
                      </>
                    )}
                  </button>
                </form>
              )}

              {status === 'error' && (
                <p className="text-xs mt-3" style={{ color: '#ef4444' }}>
                  Something went wrong. Try again or DM me{' '}
                  <a
                    href="https://x.com/RohanSudo"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#818cf8' }}
                  >
                    @RohanSudo
                  </a>
                </p>
              )}

              {project.waitlistCount != null && project.waitlistCount > 0 && (
                <p className="text-xs mt-4" style={{ color: '#52525b' }}>
                  {project.waitlistCount} {project.waitlistCount === 1 ? 'person' : 'people'} on the waitlist
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Minimal footer */}
      <div className="px-5 sm:px-8 md:px-12 pb-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs" style={{ color: '#3f3f46' }}>
            Built by{' '}
            <Link to="/" style={{ color: '#52525b' }} className="hover:underline">
              Rohan Kumar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
