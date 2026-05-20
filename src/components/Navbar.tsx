import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Biography', path: '/biography' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Tributes', path: '/tributes' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed top-0 left-0 right-0 h-16 flex items-center justify-center px-6 md:px-12 z-50 bg-brand-canvas/80 backdrop-blur-md border-b border-brand-hairline"
      >
        <div className="w-full max-w-7xl flex items-center justify-between md:grid md:grid-cols-3">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/david-avatar.jpg" 
              alt="David Udoumoh" 
              className="w-10 h-10 rounded-full object-cover border border-brand-hairline shadow-sm"
              onError={(e) => {
                // Fallback placeholder if image is not yet uploaded
                (e.target as HTMLImageElement).src = "src/assets/img/david-potrait.png";
              }}
            />
            <span className="font-serif text-lg tracking-tight text-brand-ink">
              David Udoumoh
            </span>
          </Link>
          
          <div className="hidden md:flex items-center justify-center gap-8 text-[15px] font-medium text-brand-body">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`transition-colors ${location.pathname === link.path ? 'text-brand-ink border-b-2 border-brand-ink py-1' : 'hover:text-brand-ink'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex justify-end">
            <Link to="/leave-tribute" className="bg-brand-primary text-white rounded-full px-5 py-2 text-[15px] font-medium hover:bg-brand-primary-active transition-colors flex items-center justify-center">
              Leave a Tribute
            </Link>
          </div>

          <button 
            className="md:hidden text-brand-ink p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-brand-canvas border-b border-brand-hairline md:hidden flex flex-col p-6 h-[calc(100vh-64px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-6 text-[18px] font-medium text-brand-ink mt-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className={`border-b border-brand-hairline pb-4 ${location.pathname === link.path ? 'text-brand-ink' : 'text-brand-body'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link to="/leave-tribute" onClick={() => setIsOpen(false)} className="mt-8 bg-brand-primary text-white rounded-full px-5 py-4 text-[16px] font-medium hover:bg-brand-primary-active transition-colors w-full flex items-center justify-center">
              Leave a Tribute
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
