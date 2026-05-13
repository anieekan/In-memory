import { motion } from 'motion/react';
import { Download } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function Biography() {
  return (
    <div className="pt-24 pb-32 px-6 md:px-12 max-w-4xl mx-auto">
      <motion.div {...fadeIn} className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gradient-sky/20 rounded-full blur-[80px] -z-10" />
        <span className="text-[12px] font-semibold uppercase tracking-[0.96px] text-brand-ink bg-brand-surface-strong px-3 py-1 rounded-full mb-6 inline-block">
          The Story of His Life
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-serif leading-[1.05] tracking-tight text-brand-ink mb-6">
          A Legacy of Love & <br /> Dedication
        </h1>
        <p className="text-lg text-brand-muted tracking-[0.15px] font-medium">
          October 12, 1950 — March 4, 2026
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full aspect-video rounded-[24px] bg-brand-surface shadow-sm border border-brand-hairline p-4 mb-16 overflow-hidden relative"
      >
        <img 
          src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1200&auto=format&fit=crop" 
          alt="David Udoumoh Memory"
          className="w-full h-full object-cover rounded-[16px] grayscale-[30%]"
        />
      </motion.div>

      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-none space-y-12"
      >
        <section className="space-y-4">
          <h2 className="font-serif text-3xl text-brand-ink mb-6">Early Life and Education</h2>
          <p className="text-brand-body leading-relaxed text-lg">
            David Udoumoh was born on October 12, 1950, in a small, tight-knit community that instilled in him the values of hard work, respect, and deep-rooted faith. The eldest of five children, he assumed a quiet role of leadership early in life. 
          </p>
          <p className="text-brand-body leading-relaxed text-lg">
            His pursuit of excellence began in his local primary school, where his teachers quickly recognized his bright mind and boundless curiosity. He continued his education with a scholarship, eventually earning a Master's degree in Public Administration, an achievement that made his entire community proud.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-3xl text-brand-ink mb-6">A Life of Public Service</h2>
          <p className="text-brand-body leading-relaxed text-lg">
            For over four decades, David devoted his professional life to public service. He believed deeply in the power of community and policy to improve the lives of everyday people. He started his career as a junior clerk and, through integrity and unwavering dedication, rose to become a Senior Administrator.
          </p>
          <p className="text-brand-body leading-relaxed text-lg">
            Colleagues remember him not for the titles he held, but for his open-door policy. He was a mentor to many, offering a listening ear and wise counsel to anyone who sought it. His calm demeanor during times of crisis earned him the affectionate nickname "The Anchor" among his peers.
          </p>
        </section>

        <section className="bg-brand-canvas-soft border-y border-brand-hairline py-12 px-8 -mx-8 md:-mx-12 my-16 relative overflow-hidden text-center rounded-[24px]">
           <div className="absolute inset-0 bg-gradient-peach/10 -z-10 mix-blend-multiply" />
           <p className="font-serif text-[24px] md:text-[32px] text-brand-ink leading-tight italic max-w-3xl mx-auto">
             "Do not measure a man's life by the wealth he accumulates, but by the hearts he touches and the paths he makes easier for others."
           </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-3xl text-brand-ink mb-6">Family and Faith</h2>
          <p className="text-brand-body leading-relaxed text-lg">
            While his career was a testament to his ambition, his family was the core of his being. He met his beloved wife, Grace, in 1974, and their partnership became a beautiful model of love, patience, and mutual respect. Together, they raised four beautiful children, teaching them the importance of education, kindness, and faith.
          </p>
          <p className="text-brand-body leading-relaxed text-lg">
            David's faith was unshakeable. He served as an Elder in his local church for over twenty years, leading the choir and frequently organizing community outreach programs. His faith was not just spoken; it was lived every single day in his endless generosity.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-3xl text-brand-ink mb-6">Legacy</h2>
          <p className="text-brand-body leading-relaxed text-lg">
            Today, David's legacy lives on in the policies he helped shape, the individuals he mentored, and, most importantly, the family he cherished. He leaves behind his wife Grace, his children—Emmanuel, Sarah, Michael, and Joy—and five grandchildren who will forever remember their grandfather's warm smile and captivating storytelling.
          </p>
          <p className="text-brand-body leading-relaxed text-lg">
            He transitioned to glory on March 4, 2026, surrounded by those who loved him most. Though his physical presence is deeply missed, the light he brought into the world continues to shine brightly in the lives of everyone lucky enough to have known him.
          </p>
        </section>
      </motion.article>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-20 pt-12 border-t border-brand-hairline flex justify-center"
      >
        <button className="flex items-center gap-2 bg-transparent text-brand-ink border border-brand-hairline-strong rounded-full px-8 py-3 text-[15px] font-medium hover:bg-brand-surface-strong transition-colors h-[48px]">
          <Download className="w-4 h-4" /> Download Obituary PDF
        </button>
      </motion.div>
    </div>
  );
}
