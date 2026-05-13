import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Heart, Image as ImageIcon, Filter } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

interface TributeItem {
  id: string | number;
  name: string;
  relation: string;
  text: string;
  date: string;
  hasImage: boolean;
  imageUrl: string;
}

// Sample mock data for tributes
const mockTributes: TributeItem[] = [
  {
    id: 1,
    name: "Sarah Williams",
    relation: "Colleague",
    text: "David was a mentor like no other. He had this quiet way of making you believe in yourself. The office will never feel the same without his calming presence.",
    date: "May 10, 2026",
    hasImage: false,
    imageUrl: ""
  },
  {
    id: 2,
    name: "The Udoumoh Family",
    relation: "Family",
    text: "Our anchor, our compass. You taught us the true meaning of resilience and unconditional love. We will carry your teachings in our hearts forever. Rest in perfect peace.",
    date: "May 11, 2026",
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Michael Chen",
    relation: "Friend",
    text: "I'll miss our Sunday morning debates and your unmistakable laugh. You were a true friend, David. Thank you for everything you did for my family.",
    date: "May 12, 2026",
    hasImage: false,
    imageUrl: ""
  },
  {
    id: 4,
    name: "Grace Udoumoh",
    relation: "Family",
    text: "My darling husband, you were my rock. Fifty years together feels like a passing moment. Until we meet again.",
    date: "May 13, 2026",
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1541098485292-6fb236a28292?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "John Obinna",
    relation: "Church Member",
    text: "A truly generous man. Mr. Udoumoh helped fund the local library roof repairs anonymously, but we all knew it was him. A silent giant.",
    date: "May 13, 2026",
    hasImage: false,
    imageUrl: ""
  },
  {
    id: 6,
    name: "Emily Davies",
    relation: "Colleague",
    text: "I remember my first day at work. David took me under his wing and made sure I wasn't overwhelmed. He was so incredibly kind.",
    date: "May 14, 2026",
    hasImage: false,
    imageUrl: ""
  }
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function Tributes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRelation, setFilterRelation] = useState("All");
  const [tributes, setTributes] = useState<TributeItem[]>(mockTributes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTributes = async () => {
      try {
        const q = query(
          collection(db, 'tributes'),
          where('status', '==', 'approved')
        );
        const snapshot = await getDocs(q);
        
        const fetchedTributes: TributeItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          let dateStr = "Unknown date";
          if (data.createdAt) {
            dateStr = new Date(data.createdAt.seconds * 1000).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
          }
          fetchedTributes.push({
            id: doc.id,
            name: data.name,
            relation: data.relation,
            text: data.message,
            date: dateStr,
            hasImage: data.imageUrls && data.imageUrls.length > 0,
            imageUrl: data.imageUrls && data.imageUrls.length > 0 ? data.imageUrls[0] : ""
          });
        });
        
        // Sort fetched tributes by date (newest first roughly by timestamp if possible, here by date string, we didn't add orderby to avoid index requirement for now)
        setTributes([...fetchedTributes, ...mockTributes]);
      } catch (error) {
        console.error("Error fetching tributes:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTributes();
  }, []);

  const filteredTributes = tributes.filter(tribute => {
    const matchesSearch = tribute.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tribute.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRelation = filterRelation === "All" || tribute.relation === filterRelation;
    return matchesSearch && matchesRelation;
  });

  const relations = ["All", "Family", "Friend", "Colleague", "Church Member", "Other"];

  return (
    <div className="pt-24 pb-32 px-6 md:px-12 flex flex-col items-center flex-1 w-full relative min-h-screen">
      <motion.div 
        {...fadeIn}
        className="text-center w-full max-w-4xl mx-auto mb-16 relative"
      >
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-gradient-rose/20 rounded-full blur-[80px] -z-10" />
        <span className="text-[12px] font-semibold uppercase tracking-[0.96px] text-brand-ink bg-brand-surface-strong px-3 py-1 rounded-full mb-6 inline-block">
          Shared Memories
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-serif leading-[1.05] tracking-tight text-brand-ink mb-6">
          Tributes & Condolences
        </h1>
        <p className="text-lg text-brand-body max-w-2xl mx-auto">
          Read the beautiful words shared by friends, family, and everyone whose lives were touched by David.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-6xl mx-auto mb-12 flex flex-col md:flex-row gap-4 justify-between items-center bg-brand-surface p-4 border border-brand-hairline rounded-[16px] shadow-sm"
      >
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
          <input 
            type="text" 
            placeholder="Search tributes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-canvas-soft border border-brand-hairline-strong rounded-[8px] pl-12 pr-4 py-3 text-brand-ink outline-none focus:border-brand-ink transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-5 h-5 text-brand-muted hidden md:block" />
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {relations.map(relation => (
              <button
                key={relation}
                onClick={() => setFilterRelation(relation)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
                  filterRelation === relation 
                    ? 'bg-brand-ink text-white' 
                    : 'bg-brand-canvas-soft text-brand-ink border border-brand-hairline-strong hover:bg-brand-surface-strong'
                }`}
              >
                {relation}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
      >
        {filteredTributes.length > 0 ? (
          filteredTributes.map((tribute, i) => (
            <div 
              key={tribute.id} 
              className="bg-brand-surface rounded-[16px] overflow-hidden border border-brand-hairline hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all flex flex-col"
            >
              <div className="p-8 flex-1">
                <Heart className="w-5 h-5 text-gradient-rose mb-6" fill="currentColor" opacity={0.5} />
                <p className="text-brand-body leading-relaxed mb-8 flex-1 italic text-[15px]">
                  "{tribute.text}"
                </p>
                <div className="flex items-center justify-between border-t border-brand-hairline pt-6">
                  <div>
                    <h4 className="font-medium text-brand-ink">{tribute.name}</h4>
                    <p className="text-[13px] text-brand-muted">{tribute.relation}</p>
                  </div>
                  <span className="text-[12px] text-brand-muted">{tribute.date}</span>
                </div>
              </div>
              {tribute.hasImage && (
                <div className="w-full h-48 bg-brand-canvas border-t border-brand-hairline relative">
                  <img 
                    src={tribute.imageUrl} 
                    alt={`Shared by ${tribute.name}`} 
                    className="w-full h-full object-cover grayscale-[20%]"
                  />
                  <div className="absolute top-2 right-2 bg-brand-surface/80 backdrop-blur-sm rounded-full p-2">
                    <ImageIcon className="w-4 h-4 text-brand-ink" />
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-brand-muted border border-brand-hairline border-dashed rounded-[16px]">
            No tributes found matching your criteria.
          </div>
        )}
      </motion.div>

      {filteredTributes.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <button className="bg-transparent text-brand-ink border border-brand-hairline-strong rounded-full px-8 py-3 text-[15px] font-medium hover:bg-brand-surface-strong transition-colors">
            Load More Messages
          </button>
        </motion.div>
      )}
    </div>
  );
}
