import { motion } from 'framer-motion';
import { useInView } from './useInView';

interface JourneyItem {
  year: string;
  label: string;
  link?: { text: string; href: string };
}

const journey: JourneyItem[] = [
  { year: '2023', label: 'Full Stack Open + The Odin Project' },
  { year: '2024', label: 'Discovered n8n, built first automation workflows' },
  { year: '2025', label: 'Built ', link: { text: 'LastSend', href: 'https://lastsend.app' } },
  { year: '2025', label: 'Restaurant automation, client portals, workflow infrastructure' },
  { year: '2026', label: 'Swans Hackathon (Top 25), Airia Hackathon, multi-agent workflows' },
  { year: 'Now', label: 'Shipped ClipShip v1.0 and moving deeper into applied AI product work' },
];

export default function About() {
  const [ref, isInView] = useInView(0.1);

  return (
    <section id="about" ref={ref} className="px-8 md:px-12 py-28">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}
        >
          About
        </motion.p>

        <div className="grid md:grid-cols-5 gap-16 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="md:col-span-3"
          >
            <h2
              className="text-3xl md:text-5xl font-bold mb-10 tracking-tight leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fafafa' }}
            >
              Applied AI for the messy middle<span style={{ color: '#818cf8' }}>.</span>
              <br />
              Where tools meet business logic<span style={{ color: '#818cf8' }}>.</span>
            </h2>

            <div className="space-y-6 text-base leading-relaxed" style={{ color: '#a1a1aa' }}>
              <p>
                I am not a traditional software engineer. I am an applied AI product builder:
                I map the system, define the business logic, build n8n workflows directly,
                and drive implementation until the product works.
              </p>
              <p>
                My strongest hands-on skill is n8n. Around that, I design LLM pipelines,
                API integrations, payment flows, media processing jobs, and agentic workflows
                that survive real edge cases.
              </p>
              <p>
                Recent proof: ClipShip v1.0, LastSend on Google Play, VendorIQ's 6-agent
                due-diligence workflow, and CaseDrop's legal intake pipeline. Some are
                AI-native, some are automation-heavy, all are practical shipped systems.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="relative pl-8" style={{ borderLeft: '1px solid #27272a' }}>
              {journey.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                  className="relative mb-8 last:mb-0"
                >
                  <div
                    className="absolute top-1.5 w-3 h-3 rounded-full"
                    style={{
                      left: 'calc(-1rem - 6px)',
                      backgroundColor: item.year === 'Now' ? '#818cf8' : '#27272a',
                      boxShadow: item.year === 'Now' ? '0 0 12px rgba(129,140,248,0.4)' : 'none',
                    }}
                  />
                  <span
                    className="block text-xs font-bold tracking-wider mb-1"
                    style={{ color: item.year === 'Now' ? '#818cf8' : '#71717a', fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.year}
                  </span>
                  <span className="text-sm" style={{ color: '#e4e4e7' }}>
                    {item.label}
                    {item.link && (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200"
                        style={{ color: '#818cf8', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#a5b4fc')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#818cf8')}
                      >
                        {item.link.text}
                      </a>
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
