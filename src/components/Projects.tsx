import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { ExternalLink, Play, X } from 'lucide-react';

interface Project {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  metrics: string[];
  featured?: boolean;
  link?: string;
  videoId?: string;
  images?: string[];
}

const projects: Project[] = [
  {
    title: 'VendorIQ',
    tagline: '6-agent AI system for vendor due diligence',
    description: 'Upload a vendor contract to Slack, and 6 AI agents analyze it automatically. The orchestrator (Claude Sonnet) coordinates document analysis, vendor research with web search, compliance checking, risk scoring, and action agents. Human approves or rejects, then decisions post to Slack and log to Airtable. Built for the Airia AI Agents Hackathon.',
    tech: ['Airia', 'Claude Sonnet', 'Claude Haiku', 'Slack', 'Airtable'],
    metrics: ['6 AI agents', 'Human-in-the-loop', 'Truly agentic'],
    featured: true,
    images: [
      '/projects/vendoriq/slack-analysis.png',
      '/projects/vendoriq/orchestrator.png',
      '/projects/vendoriq/executions.png',
    ],
  },
  {
    title: 'CaseDrop',
    tagline: 'AI-powered case intake for personal injury law firms',
    description: 'Upload a police report, AI extracts all case data (GPT-4o Vision), human reviews and approves, system creates the case in Clio Manage, generates a retainer agreement, and sends it for signature. Built the working prototype in 72 hours during the Swans Applied AI Hackathon. Placed in the top 25.',
    tech: ['n8n', 'OpenAI GPT-4o', 'Clio API', 'Supabase', 'React'],
    metrics: ['24-node pipeline', 'AI extraction', 'Top 25 - Swans Hackathon'],
    featured: true,
  },
  {
    title: 'LastSend',
    tagline: 'Full production app, concept to Google Play in 6 weeks',
    description: 'Entire backend runs on n8n. 40+ workflows handle payment processing (Google Play Billing, Dodo Payments), media uploads to Cloudflare R2, push notifications via Firebase FCM, check-in verification, deceased account processing, and message delivery triggers. Live on Google Play.',
    tech: ['n8n', 'React', 'Capacitor', 'Supabase', 'Docker', 'Hetzner'],
    metrics: ['40+ workflows', 'Queue mode', 'Live on Google Play'],
    featured: true,
    link: 'https://lastsend.app',
  },
  {
    title: 'Orbit',
    tagline: 'Self-service client portal',
    description: 'Client-facing portal with subscription management, wallet-based billing, Razorpay payments (UPI, card, netbanking), and a full admin panel. Multi-currency support, client invite flow, password reset. Built and deployed in 2 days.',
    tech: ['n8n', 'React', 'Supabase', 'Razorpay', 'Hetzner'],
    metrics: ['Built in 2 days', 'Multi-currency', 'Wallet system'],
  },
  {
    title: 'Turquaz Restaurant',
    tagline: 'Two-way SMS automation for Canadian restaurant',
    description: 'Complete waitlist system: QR code intake, Airtable state machine, Twilio two-way SMS with conversation threading, staff reply interface, and automated reminders.',
    tech: ['n8n', 'Twilio', 'Airtable', 'Google Forms'],
    metrics: ['Two-way SMS', 'State machine', 'Auto reminders'],
  },
];

function VideoModal({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full transition-colors duration-200"
        style={{ color: '#a1a1aa', backgroundColor: 'rgba(39,39,42,0.8)' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fafafa')}
        onMouseLeave={e => (e.currentTarget.style.color = '#a1a1aa')}
      >
        <X size={24} />
      </button>
      <div
        className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Project walkthrough"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [ref, isInView] = useInView(0.1);
  const [showVideo, setShowVideo] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const cardContent = (
    <>
      {/* Title row */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <h3
            className="text-2xl font-bold"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fafafa' }}
          >
            {project.title}
          </h3>
          {project.link && (
            <ExternalLink size={16} style={{ color: '#71717a' }} />
          )}
        </div>
        <p className="text-sm" style={{ color: '#71717a' }}>{project.tagline}</p>
      </div>

      {/* Image gallery */}
      {project.images && project.images.length > 0 && (
        <div className="mb-5">
          <div className="rounded-lg overflow-hidden border cursor-pointer" style={{ borderColor: '#27272a' }}
            onClick={e => { e.preventDefault(); e.stopPropagation(); setActiveImage((activeImage + 1) % project.images!.length); }}
          >
            <img
              src={project.images[activeImage]}
              alt={`${project.title} screenshot ${activeImage + 1}`}
              className="w-full"
              style={{ objectFit: 'contain', backgroundColor: '#09090b' }}
            />
          </div>
          {project.images.length > 1 && (
            <div className="flex items-center gap-2 mt-3">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={e => { e.preventDefault(); e.stopPropagation(); setActiveImage(i); }}
                  className="rounded overflow-hidden border-2 transition-all"
                  style={{
                    borderColor: i === activeImage ? '#818cf8' : '#27272a',
                    opacity: i === activeImage ? 1 : 0.5,
                    width: '60px',
                    height: '36px',
                  }}
                >
                  <img src={img} alt="" className="w-full h-full" style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Description */}
      <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: '#a1a1aa' }}>
        {project.description}
      </p>

      {/* Video button */}
      {project.videoId && (
        <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); setShowVideo(true); }}
          className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg mb-5 transition-all duration-200"
          style={{
            color: '#818cf8',
            backgroundColor: 'rgba(129,140,248,0.1)',
            border: '1px solid rgba(129,140,248,0.25)',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(129,140,248,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(129,140,248,0.1)'; }}
        >
          <Play size={14} fill="#818cf8" />
          Watch walkthrough
        </button>
      )}

      {/* Metrics */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
        {project.metrics.map(m => (
          <span key={m} className="inline-flex items-center gap-1.5 text-xs" style={{ color: '#34d399', fontFamily: "'JetBrains Mono', monospace" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#34d399' }} />
            {m}
          </span>
        ))}
      </div>

      {/* Tech */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map(t => (
          <span
            key={t}
            className="px-3 py-1 text-[10px] tracking-wider uppercase rounded-md"
            style={{ color: '#71717a', backgroundColor: '#09090b', border: '1px solid #27272a', fontFamily: "'JetBrains Mono', monospace" }}
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );

  const featuredStyle = project.featured ? {
    border: '1px solid rgba(129,140,248,0.25)',
  } : {};

  return (
    <>
      {showVideo && project.videoId && (
        <VideoModal videoId={project.videoId} onClose={() => setShowVideo(false)} />
      )}
      {project.link ? (
        <motion.a
          ref={ref}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className={`card p-8 flex flex-col ${project.featured ? 'md:col-span-2 featured-card' : ''}`}
          style={featuredStyle}
        >
          {cardContent}
        </motion.a>
      ) : (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className={`card p-8 flex flex-col ${project.featured ? 'md:col-span-2 featured-card' : ''}`}
          style={featuredStyle}
        >
          {cardContent}
        </motion.div>
      )}
    </>
  );
}

export default function Projects() {
  const [ref, isInView] = useInView(0.05);

  return (
    <section id="projects" ref={ref} className="px-8 md:px-12 py-28">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}
        >
          Selected work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mb-16 tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fafafa' }}
        >
          Things I've built<span style={{ color: '#818cf8' }}>.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
