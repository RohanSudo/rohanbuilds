export default function Footer() {
  return (
    <footer className="px-8 md:px-12 py-10" style={{ borderTop: '1px solid #27272a' }}>
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <span className="text-xs" style={{ color: '#52525b' }}>&copy; {new Date().getFullYear()} Rohan Kumar</span>
        <span className="text-xs" style={{ color: '#52525b', fontFamily: "'JetBrains Mono', monospace" }}>Systems Designer & Automation Specialist</span>
      </div>
    </footer>
  );
}
