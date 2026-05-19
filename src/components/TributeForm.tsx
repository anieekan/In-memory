import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageIcon, X, CheckCircle2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db, auth, storage } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInAnonymously } from 'firebase/auth';

export default function TributeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    relation: '',
    message: ''
  });
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    // Ensure the user is signed in to submit
    signInAnonymously(auth).catch(err => {
      console.error("Anonymous auth failed", err);
      if (err.code === 'auth/admin-restricted-operation') {
        setErrorText("Setup required: Please enable 'Anonymous' Sign-in method in your Firebase Console (Authentication > Sign-in method) to allow users to submit tributes.");
      }
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...filesArray].slice(0, 3)); // Max 3 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorText('');
    
    try {
      const imageUrls: string[] = [];
      
      // Upload images if any
      for (const file of images) {
        const fileRef = ref(storage, `tributes/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        imageUrls.push(url);
      }

      await addDoc(collection(db, 'tributes'), {
        name: formData.name,
        relation: formData.relation,
        message: formData.message,
        status: 'pending', // Wait for admin approval
        createdAt: serverTimestamp(),
        ...(imageUrls.length > 0 && { imageUrls })
      });
      
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setErrorText("There was an error submitting your tribute. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isSuccess ? (
        <motion.div 
          key="form"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl mx-auto bg-brand-surface rounded-[24px] p-8 md:p-12 border border-brand-hairline shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10"
        >
          <div className="text-center mb-10">
            <span className="text-[12px] font-semibold uppercase tracking-[0.96px] text-brand-ink bg-brand-surface-strong px-3 py-1 rounded-full mb-6 inline-block">
              Share a Memory
            </span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-brand-ink mb-4">
              Leave a Tribute
            </h2>
            <p className="text-brand-body">
              Your stories, condolences, and memories bring great comfort to the family.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-left">
                <label htmlFor="name" className="text-[14px] font-medium text-brand-ink block">Full Name <span className="text-brand-muted">*</span></label>
                <input 
                  id="name"
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Jane Doe"
                  className="w-full bg-brand-canvas-soft border border-brand-hairline-strong rounded-[8px] px-4 py-3 text-brand-ink outline-none focus:border-brand-ink transition-colors"
                  required
                />
              </div>
              <div className="space-y-2 text-left">
                <label htmlFor="relation" className="text-[14px] font-medium text-brand-ink block">Relationship <span className="text-brand-muted">*</span></label>
                <div className="relative">
                  <select 
                    id="relation"
                    name="relation"
                    value={formData.relation}
                    onChange={handleInputChange}
                    className="w-full bg-brand-canvas-soft border border-brand-hairline-strong rounded-[8px] px-4 py-3 text-brand-ink outline-none focus:border-brand-ink transition-colors appearance-none"
                    required
                  >
                    <option value="" disabled>Select relationship</option>
                    <option value="Family">Family</option>
                    <option value="Friend">Friend</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Church Member">Church Member</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor="message" className="text-[14px] font-medium text-brand-ink block">Your Message <span className="text-brand-muted">*</span></label>
              <textarea 
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Share a memory or message of comfort..."
                className="w-full bg-brand-canvas-soft border border-brand-hairline-strong rounded-[8px] px-4 py-3 text-brand-ink outline-none focus:border-brand-ink transition-colors resize-y"
                required
              />
            </div>

            <div className="space-y-4 pt-2 text-left">
              <label className="text-[14px] font-medium text-brand-ink block">Add Photos (Optional)</label>
              
              {images.length > 0 && (
                <div className="flex gap-4 flex-wrap">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded-[8px] overflow-hidden border border-brand-hairline">
                      <img src={URL.createObjectURL(img)} alt={`upload-${idx}`} className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {images.length < 3 && (
                <div>
                  <input 
                    type="file" 
                    id="image-upload" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                  <label 
                    htmlFor="image-upload" 
                    className="inline-flex items-center gap-2 cursor-pointer text-[14px] text-brand-muted hover:text-brand-ink transition-colors border border-brand-hairline border-dashed rounded-[8px] px-4 py-3 bg-brand-canvas-soft w-full justify-center"
                  >
                    <ImageIcon className="w-4 h-4" /> 
                    {images.length > 0 ? 'Add another photo' : 'Upload photos (Max 3)'}
                  </label>
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-brand-hairline">
              {errorText && <p className="text-red-500 mb-4 text-center">{errorText}</p>}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-primary text-white rounded-full px-8 py-4 text-[16px] font-medium hover:bg-brand-primary-active transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Tribute'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl mx-auto bg-brand-surface rounded-[24px] p-8 md:p-16 border border-brand-hairline shadow-sm text-center relative z-10"
        >
          <div className="w-20 h-20 bg-brand-canvas border border-brand-hairline rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-brand-ink" />
          </div>
          <h2 className="text-3xl font-serif tracking-tight text-brand-ink mb-4">
            Thank You
          </h2>
          <p className="text-brand-body text-lg mb-10">
            Your tribute has been submitted successfully. It will bring great comfort to David's family and loved ones.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/tributes" className="w-full sm:w-auto bg-brand-primary text-white rounded-full px-8 py-3 text-[15px] font-medium hover:bg-brand-primary-active transition-colors inline-block">
              Read Other Tributes
            </Link>
            <button 
              onClick={() => {
                setIsSuccess(false);
                setFormData({ name: '', relation: '', message: '' });
                setImages([]);
              }} 
              className="w-full sm:w-auto bg-transparent text-brand-ink border border-brand-hairline-strong rounded-full px-8 py-3 text-[15px] font-medium hover:bg-brand-surface-strong transition-colors"
            >
              Leave Another
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
