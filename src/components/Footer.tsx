import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-canvas-deep text-brand-muted py-16 px-6 md:px-12 border-t border-brand-hairline/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div className="text-center md:text-left">
          <div className="font-serif text-xl tracking-tight text-white mb-2">
            David Udoumoh
          </div>
          <p className="text-[14px]">1950 — 2026</p>
        </div>
        <div className="flex gap-8 text-[14px]">
          <Link to="/biography" className="hover:text-white transition-colors">Biography</Link>
          <Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link>
          <Link to="/tributes" className="hover:text-white transition-colors">Tributes</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-[13px] opacity-60">
        Designed with love. 
      </div>
    </footer>
  );
}
