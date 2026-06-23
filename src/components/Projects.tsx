import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { ExternalLink, FileText, MailCheck, MessageSquareText, Play, Repeat2, Send, Workflow, X } from 'lucide-react';

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
  badge?: string;
  visual?: 'wide' | 'phone' | 'clickup';
  proofPoints?: string[];
  privacyNote?: string;
  problem?: string;
  solution?: string;
}

const projects: Project[] = [
  {
    title: 'ClipShip',
    tagline: 'Local AI video repurposing app for creators',
    description: 'Windows desktop app that turns long talking-head videos into AI-selected vertical clips for Reels, Shorts, and TikTok. The pipeline runs locally: transcription, clip selection, face-aware reframing, captions, rendering, licensing, payments, updater, and download tracking.',
    tech: ['Tauri', 'React', 'Rust', 'ffmpeg', 'Cloudflare', 'Dodo Payments'],
    metrics: ['Public v1.0', 'Local processing', 'No cloud upload'],
    featured: true,
    link: 'https://clipship.co',
    images: ['/projects/clipship/process-complete.png'],
    badge: 'Flagship',
  },
  {
    title: 'LastSend',
    tagline: 'Full production app, concept to Google Play in 6 weeks',
    description: 'Entire backend runs on n8n. 40+ workflows handle payment processing, media uploads to Cloudflare R2, push notifications, trusted contact verification, deceased account processing, and delivery triggers. Live on Google Play with first paying customer in May 2026.',
    tech: ['n8n', 'React', 'Capacitor', 'Supabase', 'Docker', 'Hetzner'],
    metrics: ['40+ workflows', 'First paying user', 'Live on Google Play'],
    featured: true,
    link: 'https://lastsend.app',
    images: [
      '/projects/lastsend/android-1.png',
      '/projects/lastsend/android-2.png',
      '/projects/lastsend/android-3.png',
    ],
    badge: 'Flagship',
    visual: 'phone',
  },
  {
    title: 'Slow Dials',
    tagline: 'E-paper guest device and host console for a timed lounge experience',
    description: 'Active Phase 0 client build. The goal is to prove the guest-device experience and host workflow before a wider rollout.',
    problem: 'Hosts need to manage timed guest sessions without constantly checking clocks, chasing devices, or explaining extension rules manually.',
    solution: 'A guest-facing e-paper device plus a host console that shows time left, staff calls, extension decisions, device return state, and screen-copy tests in one loop.',
    tech: ['React', 'Node', 'ESP32', 'E-paper', 'Docker', 'Cloudflare'],
    metrics: ['Paid Phase 0', 'Hardware proof in progress', 'Host dashboard'],
    featured: true,
    images: [
      '/projects/slowdials/device-experience.png',
      '/projects/slowdials/host-console.png',
      '/projects/slowdials/epaper-ready.png',
    ],
    badge: 'Active Phase 0',
    proofPoints: [
      'Host starts a session, assigns a device, and sees what needs attention.',
      'Guest device shows time left, staff-call, extension, and return instructions.',
      'Owner tools let us test screen copy, logo placement, and attention lights before rollout.',
      'Client test and install guides make real hardware validation less dependent on live calls.',
    ],
  },
  {
    title: 'ClickUp Automation Stack',
    tagline: 'ClickUp-first automations for project updates, client updates, and recurring work',
    description: 'Private company work, described generically. The point was not to replace ClickUp, but to make ClickUp the operating layer for the team.',
    problem: 'Project context was scattered across tasks, comments, docs, emails, vendor follow-ups, and contract prep, so PMs had to manually assemble updates and next steps.',
    solution: 'A ClickUp-centered automation layer that turns task activity into PM-ready updates, reviewable client drafts, vendor messages, contract drafts, recurring queues, and accounting status sync.',
    tech: ['ClickUp', 'n8n', 'Google Docs', 'Gmail', 'Apps Script', 'LLM APIs'],
    metrics: ['ClickUp-first system', 'Review before send', 'Operator guides'],
    featured: true,
    badge: 'Private client work',
    visual: 'clickup',
    proofPoints: [
      'Daily project-update pages from ClickUp task activity and comments.',
      'Weekly client-update drafts with internal review before anything goes out.',
      'Vendor/RFP message routing from structured ClickUp task data.',
      'Contract-prep flows that turn task fields into document and signature drafts.',
      'Recurring service work queues with intake, duplicate protection, and accounting sync.',
    ],
    privacyNote: 'Client, company, vendor, workflow, and task details are intentionally generalized.',
  },
  {
    title: 'VendorIQ',
    tagline: '6-agent AI system for vendor due diligence',
    description: 'Upload a vendor contract to Slack, and 6 AI agents analyze it automatically. The orchestrator coordinates document analysis, vendor research, compliance checking, risk scoring, and action agents. Human approves or rejects, then decisions post to Slack and log to Airtable.',
    tech: ['Airia', 'LLM orchestration', 'Slack', 'Airtable'],
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
    description: 'Upload a police report, AI extracts all case data, human reviews and approves, the system creates the case in Clio Manage, generates a retainer agreement, and sends it for signature. Built the working prototype in 72 hours during the Swans Applied AI Hackathon.',
    tech: ['n8n', 'OpenAI GPT-4o', 'Clio API', 'Supabase', 'React'],
    metrics: ['24-node pipeline', 'AI extraction', 'Built in 72 hours'],
    featured: true,
    badge: 'Top 25 - Swans Hackathon',
  },
  {
    title: 'Hire Rohan Bot',
    tagline: 'RAG chatbot that answers questions about my work',
    description: 'Recruiters and clients can interview the bot about my background, projects, and capabilities. n8n workflows handle chat, conversation history, chunk management, cleanup, and retrieval through Supabase pgvector.',
    tech: ['n8n', 'Supabase pgvector', 'Gemini', 'RAG'],
    metrics: ['Live chatbot', 'Vector search', '5 workflows'],
    link: 'https://hire.rohanbuilds.com',
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
        aria-label="Close project walkthrough"
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

function ClickUpAutomationVisual() {
  const automations = [
    { icon: MessageSquareText, name: 'Daily project updates', status: 'PM summary', accent: '#818cf8' },
    { icon: MailCheck, name: 'Weekly client drafts', status: 'Review gated', accent: '#34d399' },
    { icon: Send, name: 'Vendor/RFP routing', status: 'Ready to send', accent: '#f59e0b' },
    { icon: FileText, name: 'Contract prep', status: 'Doc draft', accent: '#a78bfa' },
    { icon: Repeat2, name: 'Recurring service work', status: 'Queue generated', accent: '#22d3ee' },
    { icon: Workflow, name: 'Accounting sync', status: 'Status updated', accent: '#34d399' },
  ];

  return (
    <div className="mb-5 overflow-hidden rounded-lg border" style={{ borderColor: '#27272a', background: '#111114' }}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3" style={{ borderColor: '#27272a', backgroundColor: '#18181b' }}>
        <span className="text-[10px] uppercase" style={{ color: '#a1a1aa', fontFamily: "'JetBrains Mono', monospace" }}>
          Generic ClickUp automation board
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]" style={{ color: '#c4b5fd', backgroundColor: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.28)', fontFamily: "'JetBrains Mono', monospace" }}>
          ClickUp + n8n
        </span>
      </div>
      <div className="grid gap-0 sm:grid-cols-[180px_1fr]">
        <div className="border-b p-4 sm:border-b-0 sm:border-r" style={{ borderColor: '#27272a', backgroundColor: '#0f0f13' }}>
          {['Project work', 'Client updates', 'Vendor ops', 'Contracts', 'Recurring services'].map((item, i) => (
            <div
              key={item}
              className="mb-2 last:mb-0 rounded-md px-3 py-2 text-[11px]"
              style={{
                color: i === 1 ? '#fafafa' : '#a1a1aa',
                backgroundColor: i === 1 ? 'rgba(129,140,248,0.16)' : 'transparent',
                border: i === 1 ? '1px solid rgba(129,140,248,0.28)' : '1px solid transparent',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="p-4">
          <div className="mb-3 grid gap-2 text-[10px] uppercase sm:grid-cols-[minmax(0,1fr)_132px]" style={{ color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>
            <span>Automation</span>
            <span>Status</span>
          </div>
          <div className="space-y-2">
            {automations.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="grid gap-2 rounded-md border px-3 py-2.5 sm:grid-cols-[minmax(0,1fr)_132px] sm:items-center" style={{ borderColor: '#27272a', backgroundColor: '#18181b' }}>
                  <div className="flex min-w-0 items-center gap-2">
                    <Icon size={14} style={{ color: item.accent }} />
                    <span className="truncate text-xs font-semibold" style={{ color: '#fafafa' }}>{item.name}</span>
                  </div>
                  <span className="truncate rounded-full px-2 py-1 text-[10px]" style={{ color: '#d4d4d8', backgroundColor: '#09090b', border: '1px solid #27272a', fontFamily: "'JetBrains Mono', monospace" }}>
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-md border px-3 py-2 text-[11px] leading-relaxed" style={{ color: '#a1a1aa', borderColor: 'rgba(129,140,248,0.22)', backgroundColor: 'rgba(129,140,248,0.07)' }}>
            Built around ClickUp as the source of truth. Output routes to docs, email drafts, task queues, and operator handoff.
          </div>
        </div>
      </div>
    </div>
  );
}

function ProblemSolution({ problem, solution }: { problem: string; solution: string }) {
  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-2">
      {[
        ['Problem', problem],
        ['Solution', solution],
      ].map(([label, text]) => (
        <div key={label} className="rounded-md border p-3" style={{ borderColor: '#27272a', backgroundColor: '#0f0f13' }}>
          <div className="mb-1 text-[10px] uppercase" style={{ color: label === 'Problem' ? '#fca5a5' : '#34d399', fontFamily: "'JetBrains Mono', monospace" }}>
            {label}
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#d4d4d8' }}>{text}</p>
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [ref, isInView] = useInView(0.1);
  const [showVideo, setShowVideo] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const isPhoneVisual = project.visual === 'phone';
  const isClickUpVisual = project.visual === 'clickup';

  const cardContent = (
    <>
      {/* Title row */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h3
            className="text-2xl font-bold text-balance"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fafafa' }}
          >
            {project.title}
          </h3>
          {project.link && (
            <ExternalLink size={16} style={{ color: '#71717a' }} />
          )}
          {project.badge && (
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full"
              style={{
                color: '#c4b5fd',
                backgroundColor: 'rgba(129,140,248,0.12)',
                border: '1px solid rgba(129,140,248,0.35)',
                boxShadow: '0 0 18px rgba(129,140,248,0.12)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {project.badge}
            </span>
          )}
        </div>
        <p className="text-sm" style={{ color: '#71717a' }}>{project.tagline}</p>
      </div>

      {isClickUpVisual && <ClickUpAutomationVisual />}

      {/* Image gallery */}
      {!isClickUpVisual && project.images && project.images.length > 0 && (
        <div className="mb-5">
          <div
            className={`rounded-lg overflow-hidden border cursor-pointer flex items-center justify-center ${isPhoneVisual ? 'h-[420px] sm:h-[460px]' : 'aspect-video'}`}
            style={{
              borderColor: '#27272a',
              background: isPhoneVisual
                ? 'linear-gradient(135deg, #09090b 0%, #18181b 55%, #0f172a 100%)'
                : 'radial-gradient(circle at center, rgba(129,140,248,0.12), rgba(9,9,11,0.98) 62%)',
            }}
            onClick={e => { e.preventDefault(); e.stopPropagation(); setActiveImage((activeImage + 1) % project.images!.length); }}
          >
            {isPhoneVisual ? (
              <div className="flex h-full w-full items-center justify-center gap-3 sm:gap-5 p-4 sm:p-6">
                {project.images.slice(0, 3).map((img, i) => (
                  <img
                    key={img}
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="h-full w-auto max-w-[31%] rounded-md border"
                    style={{
                      objectFit: 'contain',
                      borderColor: i === activeImage ? 'rgba(129,140,248,0.6)' : 'rgba(63,63,70,0.7)',
                    }}
                    onClick={e => { e.preventDefault(); e.stopPropagation(); setActiveImage(i); }}
                  />
                ))}
              </div>
            ) : (
              <img
                src={project.images[activeImage]}
                alt={`${project.title} screenshot ${activeImage + 1}`}
                className="w-full h-full"
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>
          {project.images.length > 1 && !isPhoneVisual && (
            <div className="flex items-center gap-2 mt-3">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={e => { e.preventDefault(); e.stopPropagation(); setActiveImage(i); }}
                  aria-label={`Show ${project.title} screenshot ${i + 1}`}
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

      {project.problem && project.solution && (
        <ProblemSolution problem={project.problem} solution={project.solution} />
      )}

      {project.proofPoints && (
        <ul className="mb-6 space-y-2">
          {project.proofPoints.map(point => (
            <li key={point} className="flex gap-2 text-sm leading-relaxed" style={{ color: '#d4d4d8' }}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: '#818cf8' }} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {project.privacyNote && (
        <div className="mb-6 rounded-md border px-3 py-2 text-xs leading-relaxed" style={{ color: '#a1a1aa', borderColor: 'rgba(129,140,248,0.28)', backgroundColor: 'rgba(129,140,248,0.07)' }}>
          {project.privacyNote}
        </div>
      )}

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
          className={`card p-6 sm:p-8 flex flex-col ${project.featured ? 'md:col-span-2 featured-card' : ''}`}
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
          className={`card p-6 sm:p-8 flex flex-col ${project.featured ? 'md:col-span-2 featured-card' : ''}`}
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
          className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fafafa' }}
        >
          Products and systems I've shipped<span style={{ color: '#818cf8' }}>.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.16 }}
          className="max-w-2xl text-sm leading-relaxed mb-10"
          style={{ color: '#a1a1aa' }}
        >
          Public products, paid client builds, and confidential automation work. Anything private is intentionally anonymized.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
