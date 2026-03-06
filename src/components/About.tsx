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
  { year: '2025', label: 'Orbit client portal + Suzuki dealership automation' },
  { year: '2026', label: 'Swans AI Hackathon: built CaseDrop (legal tech) in 72 hours' },
  { year: 'Now', label: '100+ production workflows, building for businesses' },
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
              Not a developer<span style={{ color: '#818cf8' }}>.</span>
              <br />
              A builder<span style={{ color: '#818cf8' }}>.</span>
            </h2>

            <div className="space-y-6 text-base leading-relaxed" style={{ color: '#a1a1aa' }}>
              <p>
                I don't write code line by line. I architect systems, design business logic,
                and build workflows that replace manual processes. My tool of choice is n8n,
                where I've built 100+ production automations.
              </p>
              <p>
                I think about the end user first, not the tech stack.
                I manage complex projects under pressure and deliver on deadline.
              </p>
              <p>
                When I build something, it runs in production. Real payments, real users,
                real data. PayPal, Google Play, Razorpay, Twilio, Gemini - not tutorials,
                but apps people actually use.
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
