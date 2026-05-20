import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Download, ArrowRight, Heart, Image as ImageIcon, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import TributeForm from '../components/TributeForm';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

function FuneralCountdown() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-05-23T10:00:00");
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="grid grid-cols-4 gap-4 py-8 mb-8 border-y border-brand-hairline">
      <div className="flex flex-col items-center">
        <span className="text-3xl lg:text-[40px] font-serif text-brand-ink leading-none">{formatNumber(timeLeft.days)}</span>
        <span className="text-[11px] uppercase tracking-[0.96px] text-brand-muted mt-3 font-semibold">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl lg:text-[40px] font-serif text-brand-ink leading-none">{formatNumber(timeLeft.hours)}</span>
        <span className="text-[11px] uppercase tracking-[0.96px] text-brand-muted mt-3 font-semibold">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl lg:text-[40px] font-serif text-brand-ink leading-none">{formatNumber(timeLeft.minutes)}</span>
        <span className="text-[11px] uppercase tracking-[0.96px] text-brand-muted mt-3 font-semibold">Mins</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl lg:text-[40px] font-serif text-brand-ink leading-none">{formatNumber(timeLeft.seconds)}</span>
        <span className="text-[11px] uppercase tracking-[0.96px] text-brand-muted mt-3 font-semibold">Secs</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-gradient-peach/40 rounded-full blur-[100px] -z-10 mix-blend-multiply" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-gradient-lavender/30 rounded-full blur-[80px] -z-10 mix-blend-multiply" />

      <motion.div {...fadeIn} className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-brand-hairline p-2 mb-8 bg-brand-surface shadow-sm relative overflow-hidden group">
          <img 
            src="src\assets\img\david-potrait.png" 
            alt="Mr. David Udoumoh"
            className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-[64px] font-serif leading-[1.05] tracking-tight text-brand-ink mb-6">
          In Loving Memory of <br />
          <span className="italic relative">
            David Udoumoh
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-gradient-peach opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-brand-muted tracking-[0.15px] mb-8 font-medium">
          October 12, 1950 — March 4, 2026
        </p>

        <p className="text-xl md:text-2xl font-serif text-brand-ink/80 max-w-2xl mb-12">
          "A life beautifully lived deserves to be beautifully remembered."
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/leave-tribute" className="bg-brand-primary text-white rounded-full px-8 py-3 text-[15px] font-medium hover:bg-brand-primary-active transition-colors h-[48px] flex justify-center items-center">
            Leave a Tribute
          </Link>
          <Link to="/biography" className="bg-transparent text-brand-ink border border-brand-hairline-strong rounded-full px-8 py-3 text-[15px] font-medium hover:bg-brand-surface-strong transition-colors h-[48px] flex justify-center items-center">
            Read Biography
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function Announcement() {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-canvas-soft border-y border-brand-hairline">
      <motion.div {...fadeIn} className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[12px] font-semibold uppercase tracking-[0.96px] text-brand-ink bg-brand-surface-strong px-3 py-1 rounded-full mb-6 inline-block">
            Funeral Arrangements
          </span>
          <h2 className="text-3xl md:text-[36px] font-serif tracking-tight text-brand-ink">
            Ceremony Details
          </h2>
        </div>

        <div className="bg-brand-surface rounded-[24px] p-8 md:p-12 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-brand-hairline flex flex-col md:flex-row gap-12 justify-between items-start">
          <div className="flex-1 space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-brand-canvas flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-brand-ink" />
              </div>
              <div>
                <h3 className="text-[18px] font-medium text-brand-ink mb-1">Service of Songs</h3>
                <p className="text-brand-body leading-relaxed">
                  Friday, May 22, 2026<br />
                  5:00 PM Prompt
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-brand-canvas flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-brand-ink" />
              </div>
              <div>
                <h3 className="text-[18px] font-medium text-brand-ink mb-1">Funeral Service</h3>
                <p className="text-brand-body leading-relaxed">
                  Saturday, May 23, 2026 <br />
                  10:00 AM Prompt<br />
                  St. Paul's Cathedral<br />
                  123 Memorial Avenue, City Centre
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 md:border-l border-brand-hairline md:pl-12 flex flex-col justify-center h-full mt-12 md:mt-0">
            <FuneralCountdown />
            <p className="text-brand-body mb-6 leading-relaxed">
              We warmly invite friends, family, and colleagues to join us in celebrating a remarkable life. For those unable to attend in person, a virtual stream will be available.
            </p>
            <button className="flex items-center gap-2 self-start bg-transparent text-brand-ink border border-brand-hairline-strong rounded-full px-6 py-2.5 text-[15px] font-medium hover:bg-brand-surface-strong transition-colors">
              <Download className="w-4 h-4" /> Download Program
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function BiographyPreview() {
  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-sky/20 rounded-full blur-[120px] -z-10 translate-x-1/3" />
      
      <motion.div {...fadeIn} className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <span className="text-[12px] font-semibold uppercase tracking-[0.96px] text-brand-ink bg-brand-surface-strong px-3 py-1 rounded-full">
            His Story
          </span>
          <h2 className="text-3xl md:text-[48px] font-serif tracking-tight text-brand-ink leading-[1.08]">
            A Legacy of Love & <br /> Dedication
          </h2>
          <div className="space-y-4 text-brand-body text-[16px] leading-[1.6]">
            <p>
              David Udoumoh was a man of profound wisdom, unshakeable faith, and boundless generosity. Born in a small, tight-knit community, he rose through life's challenges with a quiet strength that inspired everyone fortunate enough to cross his path.
            </p>
            <p>
              His career spanned over four decades in public service, yet his proudest achievements were always found within the walls of his home. He was a devoted husband, a guiding light for his children, and a cherished friend.
            </p>
          </div>
          <Link to="/biography" className="flex items-center gap-2 text-brand-ink font-medium hover:opacity-70 transition-opacity">
            Read Full Biography <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="flex-1 relative w-full aspect-[4/5] md:aspect-square">
          <div className="w-full h-full bg-brand-surface rounded-[24px] border border-brand-hairline p-4 relative z-10 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <img 
              src="src\assets\img\david-potrait.png" 
              alt="David Udoumoh Memory"
              className="w-full h-full object-cover rounded-[16px] grayscale-[50%]"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-mint/20 rounded-[24px] -z-10 blur-xl" />
        </div>
      </motion.div>
    </section>
  );
}

function TributesPreview() {
  const tributes = [
    {
      name: "Sarah Williams",
      relation: "Colleague",
      text: "David was a mentor like no other. He had this quiet way of making you believe in yourself. The office will never feel the same without his calming presence.",
    },
    {
      name: "The Udoumoh Family",
      relation: "Family",
      text: "Our anchor, our compass. You taught us the true meaning of resilience and unconditional love. Rest in perfect peace.",
    },
    {
      name: "Michael Chen",
      relation: "Friend",
      text: "I'll miss our Sunday morning debates and your unmistakable laugh. You were a true friend, David. Thank you for everything.",
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-brand-canvas border-y border-brand-hairline relative">
      <motion.div {...fadeIn} className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.96px] text-brand-ink bg-brand-surface-strong px-3 py-1 rounded-full mb-6 inline-block">
              Tributes
            </span>
            <h2 className="text-3xl md:text-[36px] font-serif tracking-tight text-brand-ink">
              Messages of Love
            </h2>
          </div>
          <Link to="/tributes" className="flex items-center gap-2 text-brand-ink font-medium hover:opacity-70 transition-opacity">
            View All Tributes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tributes.map((tribute, i) => (
            <div key={i} className="bg-brand-surface rounded-[16px] p-8 border border-brand-hairline hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-shadow flex flex-col h-full">
              <Heart className="w-6 h-6 text-gradient-rose mb-6" fill="currentColor" opacity={0.5} />
              <p className="text-brand-body leading-relaxed mb-8 flex-1 italic">
                "{tribute.text}"
              </p>
              <div>
                <h4 className="font-medium text-brand-ink">{tribute.name}</h4>
                <p className="text-[14px] text-brand-muted">{tribute.relation}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function GalleryPreview() {
  return (
    <section className="py-24 px-6 md:px-12 overflow-hidden bg-brand-canvas-soft">
      <motion.div {...fadeIn} className="max-w-6xl mx-auto text-center mb-16">
        <span className="text-[12px] font-semibold uppercase tracking-[0.96px] text-brand-ink bg-brand-surface-strong px-3 py-1 rounded-full mb-6 inline-block">
          Memories
        </span>
        <h2 className="text-3xl md:text-[36px] font-serif tracking-tight text-brand-ink">
          Captured Moments
        </h2>
      </motion.div>

      <motion.div {...fadeIn} className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
         <div className="col-span-2 row-span-2 rounded-[16px] overflow-hidden group">
            <img src="src\assets\img\david-people.jpg" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="Memory" />
         </div>
         <div className="rounded-[16px] overflow-hidden group aspect-square">
            <img src="src\assets\img\david-people.jpg" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="Memory" />
         </div>
         <div className="rounded-[16px] overflow-hidden group aspect-square">
            <img src="src\assets\img\david-people.jpg" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="Memory" />
         </div>
         <div className="col-span-2 md:col-span-2 rounded-[16px] overflow-hidden group h-48 md:h-auto">
            <img src="src\assets\img\david-people.jpg" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="Memory" />
         </div>
      </motion.div>
      <div className="flex justify-center mt-12">
        <Link to="/gallery" className="flex items-center gap-2 text-brand-ink font-medium hover:opacity-70 transition-opacity">
           Enter the Gallery <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function LightCandleFeature() {
  const [candlesCount, setCandlesCount] = useState(142);
  const [lit, setLit] = useState(false);

  const lightCandle = () => {
    if (!lit) {
      setLit(true);
      setCandlesCount(prev => prev + 1);
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 flex flex-col items-center bg-brand-surface border-y border-brand-hairline relative overflow-hidden">
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-peach/40 rounded-full blur-[100px] pointer-events-none transition-opacity duration-1000 ${lit ? 'opacity-100' : 'opacity-0'}`} 
      />

      <motion.div {...fadeIn} className="max-w-2xl mx-auto text-center relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 bg-brand-canvas rounded-full flex items-center justify-center mb-8 shadow-sm border border-brand-hairline">
           <Flame className={`w-10 h-10 transition-colors duration-1000 ${lit ? 'text-[#f4c5a8]' : 'text-brand-muted'}`} fill={lit ? "currentColor" : "none"} />
        </div>
        
        <h2 className="text-3xl md:text-[40px] font-serif tracking-tight text-brand-ink mb-4">
          Light a Candle
        </h2>
        <p className="text-brand-body text-[16px] leading-[1.6] mb-10 max-w-lg">
          Join others in lighting a virtual candle to honor the memory and legacy of David Udoumoh. Each light represents a life he touched.
        </p>

        <button 
          onClick={lightCandle}
          disabled={lit}
          className={`flex items-center gap-3 rounded-full px-8 py-3 text-[15px] font-medium transition-all duration-500 min-h-[48px] ${
            lit 
              ? 'bg-transparent text-brand-body border border-brand-hairline cursor-default'
              : 'bg-brand-primary text-white hover:bg-brand-primary-active shadow-sm'
          }`}
        >
          {lit ? 'Candle Lit' : 'Light a Candle'}
          {!lit && <Flame className="w-4 h-4" />}
        </button>

        <div className="mt-8 text-[14px] text-brand-muted font-medium flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-[#f4c5a8] opacity-80" /> {candlesCount.toLocaleString()} candles lit
        </div>
      </motion.div>
    </section>
  );
}

function LeaveTribute() {
  return (
    <section className="py-32 px-6 md:px-12 relative bg-brand-canvas">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-rose/10 rounded-full blur-[100px] pointer-events-none" />
      <TributeForm />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Announcement />
      <BiographyPreview />
      <TributesPreview />
      <GalleryPreview />
      <LightCandleFeature />
      <LeaveTribute />
    </>
  );
}
