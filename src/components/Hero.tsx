import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Big gradient blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[1000px] h-[800px] opacity-30"
          style={{
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse at center, rgba(129,140,248,0.15) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto w-full px-8 md:px-12 pt-40 pb-24">
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-10"
        >
          <span
            className="inline-flex items-center gap-2.5 text-xs tracking-widest uppercase px-5 py-2.5 rounded-full"
            style={{
              color: '#a1a1aa',
              border: '1px solid #27272a',
              backgroundColor: '#18181b',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#34d399' }} />
            Available for work
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold leading-[1] tracking-[-0.04em] mb-8"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
        >
          <span style={{ color: '#fafafa' }}>I build </span>
          <span style={{ color: '#818cf8' }}>systems</span>
          <br />
          <span style={{ color: '#fafafa' }}>that run without me.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="max-w-xl text-lg leading-relaxed mb-12"
          style={{ color: '#a1a1aa' }}
        >
          Systems designer who builds production AI systems, automation
          infrastructure, and full-stack products. If it can be automated, I've probably already built it.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex gap-4 items-center flex-wrap"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.03]"
            style={{ backgroundColor: '#818cf8', color: '#09090b' }}
          >
            See my work
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.03]"
            style={{ color: '#e4e4e7', border: '1px solid #3f3f46' }}
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Divider line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #27272a, transparent)' }} />
    </section>
  );
}
