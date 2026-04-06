import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { auth, db, collection, query, orderBy, onSnapshot, signInWithGoogle, logout, onAuthStateChanged, User } from "../firebase";
import { LogOut, Mail, User as UserIcon, Phone, Clock, ShieldCheck, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  message: string;
  createdAt: any;
}

export const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [error, setError] = useState<string | null>(null);

  const ADMIN_EMAIL = "sabinaahnaf1@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        // Fetch contacts if admin
        const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
        const unsubContacts = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as ContactSubmission[];
          setContacts(data);
        }, (err) => {
          console.error("Firestore error:", err);
          setError("Failed to load contacts. Check permissions.");
        });
        return () => unsubContacts();
      }
    });

    return () => unsubscribe();
  }, []);

  const formatBDTime = (timestamp: any) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Dhaka',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-dark">
        <div className="w-12 h-12 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-dark p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-10 rounded-[2.5rem] max-w-md w-full text-center"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 text-sm"
          >
            <ArrowLeft size={14} />
            Back to Website
          </Link>
          <div className="w-20 h-20 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock size={40} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Admin Portal</h1>
          <p className="text-white/40 mb-8">This area is restricted. Please sign in with your authorized email.</p>
          <button
            onClick={signInWithGoogle}
            className="w-full py-4 bg-brand-blue text-white rounded-2xl font-bold flex items-center justify-center gap-3 glow-blue hover:bg-brand-blue/90 transition-all cursor-pointer"
          >
            <ShieldCheck size={20} />
            Sign in with Google
          </button>
        </motion.div>
      </div>
    );
  }

  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-dark p-6">
        <div className="glass p-10 rounded-[2.5rem] max-w-md w-full text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 text-sm"
          >
            <ArrowLeft size={14} />
            Back to Website
          </Link>
          <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-white/40 mb-8">
            Your email ({user.email}) is not authorized to access this dashboard.
          </p>
          <button
            onClick={logout}
            className="w-full py-4 bg-white/5 text-white rounded-2xl font-bold hover:bg-white/10 transition-all cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4 text-sm"
            >
              <ArrowLeft size={14} />
              Back to Website
            </Link>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-white/40">Welcome back, Ahnaf. You have {contacts.length} submissions.</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-white cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </header>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl mb-8">
            {error}
          </div>
        )}

        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass p-8 rounded-3xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 text-white/10 group-hover:text-brand-blue/20 transition-colors">
                  <Mail size={80} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center">
                        <UserIcon size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{contact.name}</h3>
                        <p className="text-white/40 text-sm">{contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-xs font-medium text-white/40">
                      <Clock size={14} />
                      {formatBDTime(contact.createdAt)} (BD Time)
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-white/60">
                        <Phone size={16} className="text-brand-green" />
                        <span>{contact.countryCode} {contact.phone}</span>
                      </div>
                      <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                        <p className="text-sm text-white/80 leading-relaxed italic">
                          "{contact.message || "No message provided."}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {contacts.length === 0 && (
            <div className="text-center py-20 glass rounded-[3rem]">
              <p className="text-white/20 text-xl">No submissions yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
