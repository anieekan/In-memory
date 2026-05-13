import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { CheckCircle2, XCircle, Trash2, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface Tribute {
  id: string;
  name: string;
  relation: string;
  message: string;
  status: string;
  createdAt: any;
  dateStr: string;
}

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email === 'edets.aniekan@gmail.com') {
        setIsAdmin(true);
        fetchTributes();
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchTributes = async () => {
    try {
      // In a strict rule environment, an admin can list /tributes
      const q = query(
        collection(db, 'tributes'),
      );
      const snapshot = await getDocs(q);
      const fetched: Tribute[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        let dateStr = "Unknown date";
        if (data.createdAt) {
          dateStr = new Date(data.createdAt.seconds * 1000).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });
        }
        fetched.push({
          id: docSnap.id,
          name: data.name,
          relation: data.relation,
          message: data.message,
          status: data.status,
          createdAt: data.createdAt,
          dateStr
        });
      });
      // Sort in memory to avoid needing a composite index temporarily, or use orderBy if index exists
      fetched.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setTributes(fetched);
    } catch (error) {
      console.error("Error fetching tributes:", error);
      alert("Error fetching tributes. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'tributes', id), { status: newStatus });
      setTributes(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteTribute = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tribute?")) return;
    try {
      await deleteDoc(doc(db, 'tributes', id));
      setTributes(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error deleting tribute", error);
    }
  };

  if (!isAdmin && !loading) {
    return (
      <div className="pt-32 pb-32 flex flex-col items-center justify-center flex-1">
        <h1 className="text-3xl font-serif text-brand-ink mb-6">Admin Dashboard</h1>
        {user ? (
          <div className="text-center">
            <p className="text-red-600 mb-4">You are logged in as {user.email}, but you are not authorized to view this page.</p>
            <button onClick={() => signOut(auth)} className="bg-brand-canvas-soft border px-6 py-2 rounded-full">Sign Out</button>
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className="bg-brand-ink text-white px-8 py-3 rounded-full hover:bg-brand-ink/90 transition-colors"
          >
            Log In with Google
          </button>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-32 pb-32 flex items-center justify-center flex-1">
        <div className="w-8 h-8 border-4 border-brand-ink border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const pending = tributes.filter(t => t.status === 'pending');
  const approved = tributes.filter(t => t.status === 'approved');

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 w-full max-w-7xl mx-auto flex-1">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-serif text-brand-ink">Admin Dashboard</h1>
        <button 
          onClick={() => signOut(auth)}
          className="flex items-center gap-2 text-brand-muted hover:text-brand-ink"
        >
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-serif text-brand-ink mb-6 flex items-center gap-3">
            Pending Approval 
            <span className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full">{pending.length}</span>
          </h2>
          {pending.length === 0 ? (
            <p className="text-brand-muted">No pending tributes.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pending.map(tribute => (
                <TributeAdminCard 
                  key={tribute.id} 
                  tribute={tribute} 
                  onApprove={() => updateStatus(tribute.id, 'approved')}
                  onReject={() => deleteTribute(tribute.id)} 
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-serif text-brand-ink mb-6 flex items-center gap-3">
            Approved Tributes 
            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">{approved.length}</span>
          </h2>
          {approved.length === 0 ? (
            <p className="text-brand-muted">No approved tributes yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approved.map(tribute => (
                <TributeAdminCard 
                  key={tribute.id} 
                  tribute={tribute} 
                  onApprove={() => {}} // already approved
                  onReject={() => updateStatus(tribute.id, 'pending')}
                  isApproved
                  onDelete={() => deleteTribute(tribute.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function TributeAdminCard({ tribute, onApprove, onReject, isApproved = false, onDelete }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-brand-surface border border-brand-hairline rounded-[16px] p-6 flex flex-col shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-brand-ink">{tribute.name}</h3>
          <p className="text-sm text-brand-muted">{tribute.relation}</p>
        </div>
        <span className="text-xs text-brand-muted">{tribute.dateStr}</span>
      </div>
      <p className="text-brand-body text-sm mb-6 flex-1 italic">"{tribute.message}"</p>
      
      <div className="flex justify-end gap-2 border-t border-brand-hairline pt-4">
        {!isApproved ? (
          <>
            <button 
              onClick={onReject}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-[8px] transition-colors"
            >
              Delete
            </button>
            <button 
              onClick={onApprove}
              className="px-4 py-2 text-sm bg-brand-ink text-white rounded-[8px] transition-colors hover:bg-brand-ink/90"
            >
              Approve
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={onDelete}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-[8px] transition-colors"
            >
              Delete
            </button>
            <button 
              onClick={onReject}
              className="px-4 py-2 text-sm text-brand-ink bg-brand-surface-strong hover:bg-brand-hairline rounded-[8px] transition-colors"
            >
              Move to Pending
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
