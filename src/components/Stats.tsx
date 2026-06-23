import { motion } from 'framer-motion';
import { useInView } from './useInView';

const stats = [
  { number: '65+', label: 'Production Workflows', description: 'n8n automations running 24/7', highlight: false },
  { number: '20+', label: 'API Integrations', description: 'payments, media, device APIs, LLMs, ops tools', highlight: false },
  { number: '8', label: 'Products & Systems', description: 'public apps, client builds, confidential ops stacks', highlight: true },
  { number: '3', label: 'Live Deployments', description: 'public products plus private client production', highlight: false },
];

const tools = ['n8n', 'Supabase', 'React', 'Tauri', 'OpenAI', 'Gemini', 'Docker', 'Cloudflare', 'ClickUp', 'Apps Script', 'ESP32', 'Airtable', 'Slack API'];

export default function Stats() {
  const [ref, isInView] = useInView(0.1);

  return (
    <section ref={ref} className="px-8 md:px-12 py-28 glow-bg">
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-xs tracking-[0.2em] uppercase mb-14"
          style={{ color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}
        >
          By the numbers
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card p-6"
            >
              <div
                className="text-4xl md:text-5xl font-bold mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: s.highlight ? '#818cf8' : '#fafafa' }}
              >
                {s.number}
              </div>
              <div className="text-sm font-semibold mb-1" style={{ color: '#e4e4e7' }}>{s.label}</div>
              <div className="text-xs leading-relaxed" style={{ color: '#71717a' }}>{s.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          {tools.map(tool => (
            <span
              key={tool}
              className="px-4 py-2 text-xs tracking-wide rounded-full transition-colors duration-200"
              style={{ color: '#a1a1aa', border: '1px solid #27272a', fontFamily: "'JetBrains Mono', monospace" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#818cf8'; e.currentTarget.style.color = '#e4e4e7'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.color = '#a1a1aa'; }}
            >
              {tool}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
