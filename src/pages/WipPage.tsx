import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { wipProjects } from '../data/wip-projects';
import Footer from '../components/Footer';

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  validating: { bg: 'rgba(234,179,8,0.15)', text: '#eab308', label: 'Validating' },
  building: { bg: 'rgba(129,140,248,0.15)', text: '#818cf8', label: 'Building' },
  live: { bg: 'rgba(5,150,105,0.15)', text: '#059669', label: 'Live' },
};

export default function WipPage() {
  return (
    <>
      <main className="min-h-screen px-5 sm:px-8 md:px-12 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs mb-8 transition-colors duration-200"
            style={{ color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}
            onMouseEnter={e => (e.currentTarget.style.color = '#a1a1aa')}
            onMouseLeave={e => (e.currentTarget.style.color = '#71717a')}
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}
          >
            Work in progress
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fafafa' }}
          >
            What I'm building<span style={{ color: '#818cf8' }}>.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-lg mb-12 text-base"
            style={{ color: '#a1a1aa' }}
          >
            Ideas I'm validating and products I'm working on. Sign up for early access to anything that interests you.
          </motion.p>

          {wipProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-12 text-center"
            >
              <p className="text-lg mb-2" style={{ color: '#a1a1aa' }}>
                Nothing here yet.
              </p>
              <p className="text-sm" style={{ color: '#52525b' }}>
                New projects are coming soon. Follow me on{' '}
                <a
                  href="https://x.com/RohanSudo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={{ color: '#818cf8' }}
                >
                  Twitter
                </a>{' '}
                to find out first.
              </p>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {wipProjects.map((project, i) => {
                const status = statusColors[project.status];
                return (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <Link to={`/wip/${project.slug}`} className="card block overflow-hidden h-full">
                      {project.image ? (
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div
                          className="aspect-[16/10] flex items-center justify-center"
                          style={{ backgroundColor: '#141416' }}
                        >
                          <span className="text-3xl font-bold" style={{ color: '#27272a', fontFamily: "'Space Grotesk', sans-serif" }}>
                            {project.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: status.bg, color: status.text }}
                          >
                            {status.label}
                          </span>
                        </div>
                        <h3
                          className="text-lg font-semibold mb-2"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fafafa' }}
                        >
                          {project.name}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: '#a1a1aa' }}>
                          {project.tagline}
                        </p>
                        <span
                          className="inline-flex items-center gap-1 text-xs font-medium"
                          style={{ color: '#818cf8' }}
                        >
                          Learn more <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
