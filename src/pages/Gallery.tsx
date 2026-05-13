import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, ZoomIn } from 'lucide-react';

// Sample media data
const mediaItems = [
  {
    id: 1,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop',
    title: 'Family Gathering, 1995',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2'
  },
  {
    id: 2,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1493150134366-cb94689b6574?q=80&w=1200&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1493150134366-cb94689b6574?q=80&w=600&auto=format&fit=crop',
    title: 'Community Award, 2002',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1'
  },
  {
    id: 3,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1541098485292-6fb236a28292?q=80&w=1200&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1541098485292-6fb236a28292?q=80&w=600&auto=format&fit=crop',
    title: 'Wedding Anniversary, 2014',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1'
  },
  {
    id: 4,
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4', // placeholder video
    thumb: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop',
    title: '70th Birthday Speech, 2020',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1'
  },
  {
    id: 5,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1473280025148-643f9b014ce2?q=80&w=1200&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1473280025148-643f9b014ce2?q=80&w=600&auto=format&fit=crop',
    title: 'Vacation in Paris, 1988',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1'
  },
  {
    id: 6,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    title: 'Quiet Moments, 2025',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1'
  }
];

export default function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState<typeof mediaItems[0] | null>(null);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMedia(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMedia]);

  return (
    <div className="pt-24 pb-32 px-6 md:px-12 flex flex-col items-center flex-1 w-full relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center w-full max-w-4xl mx-auto mb-16 relative"
      >
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-gradient-lavender/20 rounded-full blur-[80px] -z-10" />
        <span className="text-[12px] font-semibold uppercase tracking-[0.96px] text-brand-ink bg-brand-surface-strong px-3 py-1 rounded-full mb-6 inline-block">
          A Life in Pictures
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-serif leading-[1.05] tracking-tight text-brand-ink mb-6">
          Treasured Memories
        </h1>
        <p className="text-lg text-brand-body max-w-2xl mx-auto">
          Explore the beautiful moments that shaped his life, from early childhood to recent celebrations.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
      >
        {mediaItems.map((item) => (
          <div 
            key={item.id}
            className={`group relative rounded-[16px] overflow-hidden cursor-pointer shadow-sm border border-brand-hairline ${item.colSpan} ${item.rowSpan}`}
            onClick={() => setSelectedMedia(item)}
          >
            <img 
              src={item.thumb} 
              alt={item.title} 
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/20 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {item.type === 'video' ? (
                <div className="w-16 h-16 rounded-full bg-brand-surface/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-brand-ink ml-1" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-brand-surface/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <ZoomIn className="w-6 h-6 text-brand-ink" />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-ink/80 via-brand-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="text-white font-medium">{item.title}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-canvas-deep/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedMedia(null)}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMedia(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[85vh] rounded-[24px] overflow-hidden shadow-2xl border border-white/10 bg-brand-surface-dark flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 min-h-0 bg-black flex items-center justify-center">
                {selectedMedia.type === 'video' ? (
                  <video 
                    src={selectedMedia.url} 
                    controls 
                    autoPlay 
                    className="w-full max-h-[70vh] object-contain"
                  />
                ) : (
                  <img 
                    src={selectedMedia.url} 
                    alt={selectedMedia.title} 
                    className="w-full max-h-[70vh] object-contain"
                  />
                )}
              </div>
              
              <div className="p-6 bg-brand-surface-dark-elevated">
                <p className="text-white font-serif text-xl">{selectedMedia.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
