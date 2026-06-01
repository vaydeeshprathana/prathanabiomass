import { useState, useEffect } from 'react';
import {
  LogIn, LogOut, Eye, MessageSquare, CheckCircle, Clock, AlertCircle,
  RefreshCw, ChevronDown, ChevronUp, Search, Lock
} from 'lucide-react';
import { supabase, type Inquiry, type InquiryStatus } from '../lib/supabase';

function StatusBadge({ status }: { status: InquiryStatus }) {
  const map = {
    new: { label: 'New', cls: 'bg-blue-100 text-blue-700', icon: AlertCircle },
    read: { label: 'Read', cls: 'bg-amber-100 text-amber-700', icon: Eye },
    replied: { label: 'Replied', cls: 'bg-green-100 text-green-700', icon: CheckCircle },
  };
  const { label, cls, icon: Icon } = map[status] || map['new'];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}>
      <Icon size={11} /> {label}
    </span>
  );
}

function InquiryRow({ inquiry, onStatusChange }: { inquiry: Inquiry; onStatusChange: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (status: InquiryStatus) => {
    setUpdating(true);
    await supabase.from('inquiries').update({ status }).eq('id', inquiry.id);
    setUpdating(false);
    onStatusChange();
  };

  return (
    <div className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden">
      <div
        className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-stone-50 transition-colors"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-stone-800 text-sm">{inquiry.name}</span>
            <StatusBadge status={inquiry.status} />
            {inquiry.quantity_tonnes && (
              <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                {inquiry.quantity_tonnes} T
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-1 text-xs text-stone-500">
            <span>{inquiry.email}</span>
            {inquiry.phone && <span>{inquiry.phone}</span>}
            <span>{new Date(inquiry.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
        {expanded ? <ChevronUp size={16} className="text-stone-400 shrink-0" /> : <ChevronDown size={16} className="text-stone-400 shrink-0" />}
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-stone-100 pt-4">
          <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-wrap mb-4">{inquiry.message}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Update status:</span>
            {(['new', 'read', 'replied'] as InquiryStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                disabled={updating || inquiry.status === s}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors border
                  ${inquiry.status === s
                    ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-default'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-green-400 hover:text-green-700'
                  }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | InquiryStatus>('all');

  const fetchInquiries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    setInquiries((data as Inquiry[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, []);

  const counts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    read: inquiries.filter((i) => i.status === 'read').length,
    replied: inquiries.filter((i) => i.status === 'replied').length,
  };

  const filtered = inquiries.filter((i) => {
    const matchesStatus = filterStatus === 'all' || i.status === filterStatus;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      i.name.toLowerCase().includes(q) ||
      i.email.toLowerCase().includes(q) ||
      i.message.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Admin header */}
      <header className="bg-forest-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div>
          <div className="font-bold text-base">Admin Dashboard</div>
          <div className="text-stone-400 text-xs">Prathana Biomass</div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-stone-400 hover:text-white text-sm transition-colors"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total', count: counts.all, icon: MessageSquare, color: 'bg-stone-100 text-stone-700' },
            { label: 'New', count: counts.new, icon: AlertCircle, color: 'bg-blue-50 text-blue-700' },
            { label: 'Read', count: counts.read, icon: Clock, color: 'bg-amber-50 text-amber-700' },
            { label: 'Replied', count: counts.replied, icon: CheckCircle, color: 'bg-green-50 text-green-700' },
          ].map(({ label, count, icon: Icon, color }) => (
            <div key={label} className={`rounded-2xl p-5 ${color} flex items-center gap-3`}>
              <Icon size={20} />
              <div>
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-xs font-medium opacity-70">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-48 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inquiries..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'new', 'read', 'replied'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors
                  ${filterStatus === s
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-green-400'
                  }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={fetchInquiries}
            className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={16} className="text-stone-500" />
          </button>
        </div>

        {/* Inquiries list */}
        {loading ? (
          <div className="text-center py-12 text-stone-500">
            <RefreshCw size={24} className="mx-auto animate-spin mb-2 text-green-500" />
            Loading inquiries...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-100 text-stone-400">
            <MessageSquare size={36} className="mx-auto mb-3 opacity-30" />
            No inquiries found.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((inquiry) => (
              <InquiryRow key={inquiry.id} inquiry={inquiry} onStatusChange={fetchInquiries} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Enter email and password.'); return; }
    setError('');
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError('Invalid credentials. Please try again.');
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-forest-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock size={26} className="text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold">Admin Login</h1>
          <p className="text-stone-400 text-sm mt-1">Prathana Biomass</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-2xl space-y-5"
        >
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-red-700 text-sm">
              <AlertCircle size={15} className="shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-green-300 text-white font-semibold py-3 rounded-xl transition-all duration-200"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Signing in...
              </>
            ) : (
              <><LogIn size={16} /> Sign In</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
    });

    supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (session === null) {
    return (
      <div className="min-h-screen bg-forest-900 flex items-center justify-center">
        <div className="text-white text-sm opacity-60">Loading...</div>
      </div>
    );
  }

  return session
    ? <Dashboard onLogout={handleLogout} />
    : <LoginForm onLogin={() => setSession(true)} />;
}
