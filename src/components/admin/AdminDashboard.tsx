import React, { useState, useEffect } from 'react';
import {
  fetchUnifiedLeads,
  updateLeadStatus,
  deleteLead
} from '../../services/leadService';
import {
  getSiteSettings,
  updateSiteSettings,
  getStoredUniversities,
  addOrUpdateUniversity,
  deleteUniversity as removeStoredUniversity,
  getStoredCategories,
  addOrUpdateCategory,
  deleteCategory as removeStoredCategory,
  SiteSettings
} from '../../services/settingsService';
import { UnifiedLead, LeadStatus, University } from '../../types';
import { AdmissionCategory } from '../../data/admissionsData';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import {
  ShieldCheck,
  Search,
  Trash2,
  Check,
  FileSpreadsheet,
  RefreshCw,
  Clock,
  AlertTriangle,
  Phone,
  Mail,
  Lock,
  Eye,
  Building,
  Database,
  Link,
  MapPin,
  Plus,
  Edit2,
  ExternalLink,
  Layers,
  GraduationCap,
  Sparkles,
  Save,
  Award,
  Calendar
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Main Section Navigation
  const [mainSection, setMainSection] = useState<'leads' | 'settings' | 'colleges' | 'categories'>('leads');

  // Leads State
  const [leads, setLeads] = useState<UnifiedLead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'career_guidance' | 'admission_enquiry' | 'counselling_request'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Lead Detail Modal & Action States
  const [selectedLead, setSelectedLead] = useState<UnifiedLead | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Settings State
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [savingSettings, setSavingSettings] = useState(false);

  // Colleges / Universities State
  const [universities, setUniversities] = useState<University[]>([]);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
  const [isAddingUniv, setIsAddingUniv] = useState(false);
  const [univSearchQuery, setUnivSearchQuery] = useState('');

  // Categories State
  const [categories, setCategories] = useState<AdmissionCategory[]>([]);
  const [editingCategory, setEditingCategory] = useState<AdmissionCategory | null>(null);
  const [isAddingCat, setIsAddingCat] = useState(false);

  const loadLeads = async () => {
  setLoading(true);
  setError('');

  try {
    const data = await fetchUnifiedLeads();

    setLeads(data);
  } catch (error: unknown) {
    console.error(
      'Failed to load leads from Supabase:',
      error
    );

    setLeads([]);

    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError(
        'Unable to load leads from the database.'
      );
    }
  } finally {
    setLoading(false);
  }
};

  const loadAllData = () => {
  loadLeads();

  setSettings(getSiteSettings());
  setUniversities(getStoredUniversities());
  setCategories(getStoredCategories());
};

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setAuthError('');
    setAuthLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      if (!data.user) {
        setAuthError('Authentication failed.');
        return;
      }

      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', data.user.id)
        .maybeSingle();

      if (adminError) {
        console.error('Admin verification error:', adminError);
        await supabase.auth.signOut();
        setAuthError(`Admin verification failed: ${adminError.message}`);
        return;
      }

      if (!adminUser) {
        await supabase.auth.signOut();
        setAuthError('Your account is not authorized as an administrator.');
        return;
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('Unable to sign in. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const showFlash = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  // Lead Handlers
  const handleStatusChange = async (lead: UnifiedLead, newStatus: LeadStatus) => {
    const success = await updateLeadStatus(lead.lead_type, lead.id, newStatus);
    if (success) {
      setLeads(prev => prev.map(item => item.id === lead.id ? { ...item, status: newStatus } : item));
      if (selectedLead && selectedLead.id === lead.id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
      showFlash('Lead status updated successfully');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    const success = await updateLeadStatus(selectedLead.lead_type, selectedLead.id, selectedLead.status, editNotes);
    if (success) {
      setLeads(prev => prev.map(item => item.id === selectedLead.id ? { ...item, internal_notes: editNotes } : item));
      setSelectedLead({ ...selectedLead, internal_notes: editNotes });
      showFlash('Internal notes saved');
    }
  };

  const handleDeleteLead = async (lead: UnifiedLead) => {
    const success = await deleteLead(lead.lead_type, lead.id);
    if (success) {
      setLeads(prev => prev.filter(item => item.id !== lead.id));
      if (selectedLead && selectedLead.id === lead.id) {
        setSelectedLead(null);
      }
      setDeleteConfirmId(null);
      showFlash('Record removed');
    }
  };

  // Settings Save Handler
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    await updateSiteSettings(settings);
    setSavingSettings(false);
    showFlash('Settings & Links saved successfully');
  };

  // University Save / Delete Handlers
  const handleSaveUniversity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUniversity) return;
    const updated = await addOrUpdateUniversity(editingUniversity);
    setUniversities(updated);
    setEditingUniversity(null);
    setIsAddingUniv(false);
    showFlash('Institution saved successfully');
  };

  const handleDeleteUniversity = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this institution?')) {
      const updated = await deleteUniversityHandler(id);
      setUniversities(updated);
      showFlash('Institution deleted');
    }
  };

  const deleteUniversityHandler = async (id: string) => {
    return await removeStoredUniversity(id);
  };

  // Category Save / Delete Handlers
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    const updated = addOrUpdateCategory(editingCategory);
    setCategories(updated);
    setEditingCategory(null);
    setIsAddingCat(false);
    showFlash('Category saved successfully');
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Are you sure you want to remove this category?')) {
      const updated = removeStoredCategory(id);
      setCategories(updated);
      showFlash('Category removed');
    }
  };

  // Lead Metrics
  const totalCount = leads.length;
  const careerGuidanceCount = leads.filter(l => l.lead_type === 'career_guidance').length;
  const admissionCount = leads.filter(l => l.lead_type === 'admission_enquiry').length;
  const counsellingCount = leads.filter(l => l.lead_type === 'counselling_request').length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const followUpCount = leads.filter(l => l.status === 'Follow-up' || l.status === 'Contacted').length;
  const completedCount = leads.filter(l => l.status === 'Converted' || l.status === 'Closed' || l.status === 'Counselling Scheduled').length;

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    if (activeTab !== 'all' && lead.lead_type !== activeTab) return false;
    if (statusFilter !== 'All' && lead.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.full_name.toLowerCase().includes(q);
      const matchPhone = lead.mobile_number.toLowerCase().includes(q);
      const matchEmail = (lead.email || '').toLowerCase().includes(q);
      const matchBooker = (lead.parent_guardian_name || '').toLowerCase().includes(q);
      return matchName || matchPhone || matchEmail || matchBooker;
    }
    return true;
  });

  // Filtered Universities
  const filteredUnivs = universities.filter(u => {
    if (!univSearchQuery.trim()) return true;
    const q = univSearchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.location.toLowerCase().includes(q) ||
      (u.city && u.city.toLowerCase().includes(q)) ||
      (u.naac_grade && u.naac_grade.toLowerCase().includes(q))
    );
  });

  // Export to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Date', 'Type', 'Who is Booking', 'Full Name', 'Mobile', 'Email', 'Parent Name', 'Parent Mobile', 'Class/Qualification', 'Preferred Career', 'Counselling Mode', 'Status', 'Notes'];
    const rows = leads.map(l => {
      const who = l.who_is_booking || 'Student';
      const parentName = l.parent_guardian_name || '';
      const parentMobile = l.parent_guardian_mobile || '';
      const currentClass = l.current_class || ('current_qualification' in l ? l.current_qualification : '');
      const prefCareer = l.preferred_career || ('interested_field' in l ? l.interested_field : '') || '';
      const mode = l.counselling_mode || ('preferred_counselling_mode' in l ? l.preferred_counselling_mode : '') || '';

      return [
        l.id,
        new Date(l.created_at).toLocaleString(),
        l.lead_type,
        `"${who}"`,
        `"${l.full_name}"`,
        `"${l.mobile_number}"`,
        `"${l.email || ''}"`,
        `"${parentName}"`,
        `"${parentMobile}"`,
        `"${currentClass}"`,
        `"${prefCareer}"`,
        `"${mode}"`,
        l.status,
        `"${(l.internal_notes || '').replace(/"/g, '""')}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `careerverse_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If not authenticated, show passcode screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 p-8 text-center">
          <div className="w-14 h-14 bg-[#0B2A52] rounded-xl flex items-center justify-center mx-auto mb-4 text-[#C99A2E] shadow-sm">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#0B2A52] font-display">
            CareerVerse India Staff Portal
          </h2>
          <p className="mt-1.5 text-xs text-slate-500">
            Internal admissions, institutional management and lead operations.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin email"
                autoComplete="email"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] outline-hidden"
              />
            </div>

            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                autoComplete="current-password"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] outline-hidden"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-600 font-medium">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2.5 px-4 bg-[#0B2A52] hover:bg-[#123E73] disabled:opacity-60 text-white text-sm font-bold rounded-lg transition-colors cursor-pointer"
            >
              {authLoading ? 'Signing in...' : 'Sign in as Administrator'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="mt-2 text-xs text-slate-500 hover:text-slate-800 transition-colors"
            >
              Return to Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F9FC] flex flex-col overflow-hidden">

      {/* Top Navbar */}
      <div className="bg-[#0B2A52] text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C99A2E] text-[#0B2A52] flex items-center justify-center font-black text-sm">
            CV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold font-display text-white">CareerVerse Operations Console</h1>
              <span className="text-[10px] bg-white/10 text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3 h-3" /> Staff Secure
              </span>
            </div>
          </div>
        </div>

        {/* Section Tabs in Header */}
        <div className="hidden lg:flex items-center gap-1 bg-white/10 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setMainSection('leads')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${mainSection === 'leads' ? 'bg-[#C99A2E] text-[#0B2A52]' : 'text-slate-200 hover:text-white'
              }`}
          >
            Leads Management ({leads.length})
          </button>
          <button
            type="button"
            onClick={() => setMainSection('settings')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${mainSection === 'settings' ? 'bg-[#C99A2E] text-[#0B2A52]' : 'text-slate-200 hover:text-white'
              }`}
          >
            Psychometric & Map Links
          </button>
          <button
            type="button"
            onClick={() => setMainSection('colleges')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${mainSection === 'colleges' ? 'bg-[#C99A2E] text-[#0B2A52]' : 'text-slate-200 hover:text-white'
              }`}
          >
            Colleges & Universities ({universities.length})
          </button>
          <button
            type="button"
            onClick={() => setMainSection('categories')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${mainSection === 'categories' ? 'bg-[#C99A2E] text-[#0B2A52]' : 'text-slate-200 hover:text-white'
              }`}
          >
            Categories ({categories.length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          {actionMessage && (
            <span className="hidden sm:inline-block text-xs bg-emerald-500 text-white px-2.5 py-1 rounded-md animate-fade-in">
              {actionMessage}
            </span>
          )}
          <button
            type="button"
            onClick={loadAllData}
            disabled={loading}
            className="p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            title="Refresh All Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          {mainSection === 'leads' && (
            <button
              type="button"
              onClick={handleExportCSV}
              className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="py-1.5 px-3 text-xs text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            Lock
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-1.5 px-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Back to Site
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden bg-slate-800 text-white px-3 py-2 flex items-center gap-1 overflow-x-auto border-b border-slate-700">
        <button
          onClick={() => setMainSection('leads')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${mainSection === 'leads' ? 'bg-[#C99A2E] text-[#0B2A52]' : 'text-slate-300'
            }`}
        >
          Leads ({leads.length})
        </button>
        <button
          onClick={() => setMainSection('settings')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${mainSection === 'settings' ? 'bg-[#C99A2E] text-[#0B2A52]' : 'text-slate-300'
            }`}
        >
          Psychometric & Map
        </button>
        <button
          onClick={() => setMainSection('colleges')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${mainSection === 'colleges' ? 'bg-[#C99A2E] text-[#0B2A52]' : 'text-slate-300'
            }`}
        >
          Colleges & Univs ({universities.length})
        </button>
        <button
          onClick={() => setMainSection('categories')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${mainSection === 'categories' ? 'bg-[#C99A2E] text-[#0B2A52]' : 'text-slate-300'
            }`}
        >
          Categories ({categories.length})
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">

        {/* ========================================================
            VIEW 1: LEADS MANAGEMENT (Original & Enhanced)
            ======================================================== */}
        {mainSection === 'leads' && (
  <>
    {error && (
      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />

        <div className="flex-1">
          <p className="text-sm font-bold text-rose-800">
            Unable to load leads
          </p>

          <p className="mt-1 text-xs text-rose-700 break-words">
            {error}
          </p>

          <button
            type="button"
            onClick={loadLeads}
            disabled={loading}
            className="mt-3 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg"
          >
            {loading ? 'Retrying...' : 'Retry'}
          </button>
        </div>
      </div>
    )}

    {/* rest of Leads Management content */}
  </>
)}
       

    {/* Supabase Status Pill */}
    {!isSupabaseConfigured() && (
      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-800">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4" />
          {/* YOUR EXISTING CONTENT CONTINUES */}
        </div>
      </div>
    )}
            {/* Supabase Status Pill */}
            {!isSupabaseConfigured() && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-800">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Local & Cloud Ready:</strong> Form submissions persist instantly in browser storage and sync seamlessly with Supabase cloud when connected via <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env</code>.
                  </span>
                </div>
              </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Leads</span>
                <div className="mt-1 text-2xl font-black text-[#0B2A52] font-display">{totalCount}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Career Guidance</span>
                <div className="mt-1 text-2xl font-black text-[#0B2A52] font-display">{careerGuidanceCount}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Admissions</span>
                <div className="mt-1 text-2xl font-black text-[#0B2A52] font-display">{admissionCount}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Counselling</span>
                <div className="mt-1 text-2xl font-black text-[#0B2A52] font-display">{counsellingCount}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs border-l-4 border-l-amber-500">
                <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">New Leads</span>
                <div className="mt-1 text-2xl font-black text-amber-600 font-display">{newLeadsCount}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs border-l-4 border-l-blue-500">
                <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">Pending Follow</span>
                <div className="mt-1 text-2xl font-black text-blue-600 font-display">{followUpCount}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs border-l-4 border-l-emerald-500 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">Completed</span>
                <div className="mt-1 text-2xl font-black text-emerald-600 font-display">{completedCount}</div>
              </div>
            </div>

            {/* Filters and Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">

              {/* Type Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-full md:w-auto overflow-x-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'all' ? 'bg-white text-[#0B2A52] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  All Leads ({leads.length})
                </button>
                <button
                  onClick={() => setActiveTab('career_guidance')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'career_guidance' ? 'bg-white text-[#0B2A52] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Career Guidance ({careerGuidanceCount})
                </button>
                <button
                  onClick={() => setActiveTab('admission_enquiry')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'admission_enquiry' ? 'bg-white text-[#0B2A52] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Admissions ({admissionCount})
                </button>
                <button
                  onClick={() => setActiveTab('counselling_request')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'counselling_request' ? 'bg-white text-[#0B2A52] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Counselling ({counsellingCount})
                </button>
              </div>

              {/* Search & Status Filter */}
              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, phone, parent..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] outline-hidden"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] outline-hidden shrink-0"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Counselling Scheduled">Counselling Scheduled</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Lead Source</th>
                      <th className="py-3 px-4">Candidate / Booker</th>
                      <th className="py-3 px-4">Class & Preference</th>
                      <th className="py-3 px-4">Date Received</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-500">
                          No leads match the selected criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const isNew = lead.status === 'New';
                        const who = lead.who_is_booking || 'Student';
                        const currentClass = lead.current_class || ('current_qualification' in lead ? lead.current_qualification : '');
                        const prefCareer = lead.preferred_career || ('interested_field' in lead ? lead.interested_field : '') || '';

                        const leadLabel = lead.lead_type === 'career_guidance'
                          ? 'Career Guidance'
                          : lead.lead_type === 'admission_enquiry'
                            ? 'Admission'
                            : 'Counselling Slot';

                        return (
                          <tr
                            key={lead.id}
                            className={`hover:bg-slate-50/80 transition-colors ${isNew ? 'bg-amber-50/20' : ''}`}
                          >
                            {/* Source */}
                            <td className="py-3.5 px-4">
                              <span className={`font-semibold ${lead.lead_type === 'career_guidance'
                                  ? 'text-blue-700'
                                  : lead.lead_type === 'admission_enquiry'
                                    ? 'text-indigo-700'
                                    : 'text-emerald-700'
                                }`}>
                                {leadLabel}
                              </span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                  {who}
                                </span>
                                {lead.counselling_mode && (
                                  <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-50 text-blue-800 border border-blue-100">
                                    {lead.counselling_mode}
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Candidate & Parent */}
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900 text-sm">{lead.full_name}</div>
                              <div className="flex items-center gap-3 text-slate-500 mt-0.5">
                                <span className="flex items-center gap-1 font-mono">
                                  <Phone className="w-3 h-3 text-[#C99A2E]" />
                                  {lead.mobile_number}
                                </span>
                                {lead.email && (
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3 h-3 text-slate-400" />
                                    <span className="truncate max-w-[120px]">{lead.email}</span>
                                  </span>
                                )}
                              </div>
                              {lead.parent_guardian_name && (
                                <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
                                  Parent: {lead.parent_guardian_name} ({lead.parent_guardian_mobile || 'N/A'})
                                </div>
                              )}
                            </td>

                            {/* Class & Preference */}
                            <td className="py-3.5 px-4 text-slate-700">
                              <div className="font-semibold text-slate-800 line-clamp-1">{currentClass}</div>
                              {prefCareer && (
                                <div className="text-[11px] text-[#0B2A52] font-medium">Interest: {prefCareer}</div>
                              )}
                              {'preferred_program' in lead && (
                                <div className="text-[11px] text-slate-500">Program: {lead.preferred_program}</div>
                              )}
                            </td>

                            {/* Date */}
                            <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </td>

                            {/* Status Select */}
                            <td className="py-3.5 px-4">
                              <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead, e.target.value as LeadStatus)}
                                className={`py-1 px-2.5 text-xs font-semibold rounded-md border outline-hidden transition-colors cursor-pointer ${lead.status === 'New'
                                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                                    : lead.status === 'Contacted'
                                      ? 'bg-blue-100 text-blue-900 border-blue-300'
                                      : lead.status === 'Follow-up'
                                        ? 'bg-purple-100 text-purple-900 border-purple-300'
                                        : lead.status === 'Counselling Scheduled'
                                          ? 'bg-cyan-100 text-cyan-900 border-cyan-300'
                                          : lead.status === 'Converted'
                                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                            : 'bg-slate-100 text-slate-700 border-slate-300'
                                  }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Follow-up">Follow-up</option>
                                <option value="Counselling Scheduled">Counselling Scheduled</option>
                                <option value="Converted">Converted</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedLead(lead);
                                    setEditNotes(lead.internal_notes || '');
                                  }}
                                  className="p-1.5 text-slate-600 hover:text-[#0B2A52] hover:bg-slate-100 rounded-md transition-colors"
                                  title="View full record & notes"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmId(lead.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ========================================================
            VIEW 2: PSYCHOMETRIC TEST LINK & MAP SETTINGS (Requirement 11 & 12)
            ======================================================== */}
        {mainSection === 'settings' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs text-left max-w-4xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C99A2E] font-mono">
                CONFIGURATION
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display mt-0.5">
                Psychometric Assessment & Location Map Settings
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Configure external diagnostic assessment links and official contact map coordinates. Changes apply across the website immediately.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              {/* Psychometric Link */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Psychometric Assessment External URL *
                </label>
                <div className="relative">
                  <Link className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    required
                    value={settings.psychometric_link}
                    onChange={(e) => setSettings(prev => ({ ...prev, psychometric_link: e.target.value }))}
                    placeholder="https://assessment.careerverse.in"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] outline-hidden font-mono"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  This external URL will open when students or parents click "Take Assessment" in the Career Guidance section or on the Career Guidance form.
                </p>
              </div>

              {/* Office Location */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Office Location Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={settings.office_location}
                    onChange={(e) => setSettings(prev => ({ ...prev, office_location: e.target.value }))}
                    placeholder="23-11-271, S V Nagar, Revenue Ward No. 23, Tirupati â€“ 517501"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] outline-hidden"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Display address shown above the map on the Contact page.
                </p>
              </div>

              {/* Google Maps Embed URL */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Google Maps Embed URL (iframe src) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={settings.map_embed_url}
                  onChange={(e) => setSettings(prev => ({ ...prev, map_embed_url: e.target.value }))}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] outline-hidden font-mono"
                />
                <p className="text-[11px] text-slate-500">
                  Paste the <code className="bg-slate-100 px-1 py-0.5 rounded">src="..."</code> URL from Google Maps Embed iframe code.
                </p>
              </div>

              {/* Live Preview of Map */}
              {settings.map_embed_url && (
                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Live Map Embed Preview:
                  </span>
                  <div className="w-full h-48 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                    <iframe
                      title="Admin Map Preview"
                      src={settings.map_embed_url}
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="py-2.5 px-6 bg-[#0B2A52] hover:bg-[#123E73] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4 text-[#C99A2E]" />
                  <span>{savingSettings ? 'Saving...' : 'Save Configuration'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            VIEW 3: COLLEGE & UNIVERSITY MANAGEMENT (Requirement 12)
            ======================================================== */}
        {mainSection === 'colleges' && (
          <div className="space-y-6 text-left">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C99A2E] font-mono">
                  INSTITUTION ROSTER
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display mt-0.5">
                  Colleges & Universities Directory
                </h2>
                <p className="text-xs text-slate-500">
                  Manage partner campuses, logos, NAAC ratings, and city/state listings.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={univSearchQuery}
                    onChange={(e) => setUnivSearchQuery(e.target.value)}
                    placeholder="Search institution or city..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] outline-hidden"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingUniversity({
                      id: 'univ-' + Date.now(),
                      slug: 'new-institution-' + Date.now(),
                      name: '',
                      location: '',
                      city: '',
                      state: '',
                      established_year: 2000,
                      naac_grade: 'NAAC A Grade',
                      ranking: '',
                      logo_url: '',
                      short_description: '',
                      about: '',
                      programs_available: [],
                      accreditation: 'UGC Recognized',
                      campus_highlights: [],
                      admission_process: 'Direct merit screening and counselling through CareerVerse.',
                      important_dates: 'Admissions open for upcoming session.'
                    });
                    setIsAddingUniv(true);
                  }}
                  className="py-1.5 px-3.5 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add College / University</span>
                </button>
              </div>
            </div>

            {/* University Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredUnivs.map((univ) => (
                <div
                  key={univ.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-[#0B2A52]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      {univ.logo_url ? (
                        <img
                          src={univ.logo_url}
                          alt={univ.name}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-50"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#0B2A52] text-[#C99A2E] flex items-center justify-center font-bold font-mono text-xs shrink-0">
                          {univ.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-0.5">
                          <MapPin className="w-3 h-3 text-[#C99A2E]" />
                          <span className="truncate">{univ.city || univ.location}, {univ.state || ''}</span>
                        </div>
                        <h3 className="font-bold text-sm text-[#0B2A52] line-clamp-1" title={univ.name}>
                          {univ.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                      {univ.naac_grade && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 rounded">
                          {univ.naac_grade}
                        </span>
                      )}
                      {univ.ranking && (
                        <span className="px-2 py-0.5 text-[10px] font-medium bg-blue-50 text-blue-800 border border-blue-100 rounded truncate max-w-[150px]">
                          {univ.ranking}
                        </span>
                      )}
                      {univ.established_year && (
                        <span className="text-[10px] font-mono text-slate-500">
                          Est. {univ.established_year}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {univ.short_description || univ.about}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {univ.programs_available.length} Programs
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingUniversity({ ...univ });
                          setIsAddingUniv(false);
                        }}
                        className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-[#0B2A52] text-xs font-semibold rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3 text-[#C99A2E]" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUniversity(univ.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="Delete institution"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* University Edit / Add Modal */}
            {editingUniversity && (
              <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
                  <div className="bg-[#0B2A52] text-white p-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg font-display">
                        {isAddingUniv ? 'Add New College / University' : `Edit: ${editingUniversity.name}`}
                      </h3>
                      <p className="text-xs text-slate-300">
                        Configure institutional details, logo, NAAC Grade and location.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingUniversity(null)}
                      className="text-slate-300 hover:text-white p-1"
                    >
                      âœ•
                    </button>
                  </div>

                  <form onSubmit={handleSaveUniversity} className="p-6 overflow-y-auto space-y-4 text-xs">
                    {/* Name & Slug */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Institution Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingUniversity.name}
                          onChange={(e) => setEditingUniversity(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                          placeholder="e.g. Apex Institute of Technology & Sciences"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          URL Slug / ID *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingUniversity.slug}
                          onChange={(e) => setEditingUniversity(prev => prev ? ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }) : null)}
                          placeholder="e.g. apex-institute-of-technology"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* Logo URL & Preview */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        College / University Logo URL
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="url"
                          value={editingUniversity.logo_url || ''}
                          onChange={(e) => setEditingUniversity(prev => prev ? ({ ...prev, logo_url: e.target.value }) : null)}
                          placeholder="https://example.com/logo.png"
                          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                        />
                        {editingUniversity.logo_url && (
                          <img
                            src={editingUniversity.logo_url}
                            alt="Logo preview"
                            className="w-9 h-9 rounded object-cover border border-slate-300 bg-white shrink-0"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        )}
                      </div>
                    </div>

                    {/* Banner URL & Preview */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        University Campus Banner Image URL
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="url"
                          value={editingUniversity.banner_url || ''}
                          onChange={(e) => setEditingUniversity(prev => prev ? ({ ...prev, banner_url: e.target.value }) : null)}
                          placeholder="https://example.com/campus-banner.jpg"
                          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                        />
                        {editingUniversity.banner_url && (
                          <img
                            src={editingUniversity.banner_url}
                            alt="Banner preview"
                            className="w-16 h-9 rounded object-cover border border-slate-300 bg-white shrink-0"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        )}
                      </div>
                    </div>

                    {/* City, State, Year */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingUniversity.city || ''}
                          onChange={(e) => setEditingUniversity(prev => prev ? ({ ...prev, city: e.target.value, location: `${e.target.value}, ${prev.state || ''}` }) : null)}
                          placeholder="e.g. Bangalore"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingUniversity.state || ''}
                          onChange={(e) => setEditingUniversity(prev => prev ? ({ ...prev, state: e.target.value, location: `${prev.city || ''}, ${e.target.value}` }) : null)}
                          placeholder="e.g. Karnataka"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Established Year
                        </label>
                        <input
                          type="number"
                          value={editingUniversity.established_year || ''}
                          onChange={(e) => setEditingUniversity(prev => prev ? ({ ...prev, established_year: Number(e.target.value) }) : null)}
                          placeholder="e.g. 1998"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    {/* NAAC Grade & Ranking */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          NAAC Grade
                        </label>
                        <input
                          type="text"
                          value={editingUniversity.naac_grade || ''}
                          onChange={(e) => setEditingUniversity(prev => prev ? ({ ...prev, naac_grade: e.target.value }) : null)}
                          placeholder="e.g. NAAC A+ Grade"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Ranking
                        </label>
                        <input
                          type="text"
                          value={editingUniversity.ranking || ''}
                          onChange={(e) => setEditingUniversity(prev => prev ? ({ ...prev, ranking: e.target.value }) : null)}
                          placeholder="e.g. NIRF Top 75 Ranked Institute"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    {/* Short Description */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Short Description *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={editingUniversity.short_description || ''}
                        onChange={(e) => setEditingUniversity(prev => prev ? ({ ...prev, short_description: e.target.value, about: e.target.value }) : null)}
                        placeholder="Concise overview shown on the card..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    {/* Accreditation */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Accreditations & Affiliations
                      </label>
                      <input
                        type="text"
                        value={editingUniversity.accreditation}
                        onChange={(e) => setEditingUniversity(prev => prev ? ({ ...prev, accreditation: e.target.value }) : null)}
                        placeholder="e.g. UGC Recognized Â· AICTE Approved Â· NAAC A+ Grade"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    {/* Programs Available (comma-separated) */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Available Programs (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={editingUniversity.programs_available.join(', ')}
                        onChange={(e) => {
                          const progs = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          setEditingUniversity(prev => prev ? ({ ...prev, programs_available: progs }) : null);
                        }}
                        placeholder="B.Tech Computer Science, BCA, MCA, MBA"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingUniversity(null)}
                        className="py-1.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-1.5 px-5 bg-[#0B2A52] hover:bg-[#123E73] text-white font-bold rounded-lg text-xs"
                      >
                        Save Institution
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            VIEW 4: CATEGORY MANAGEMENT (Requirement 12)
            ======================================================== */}
        {mainSection === 'categories' && (
          <div className="space-y-6 text-left">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C99A2E] font-mono">
                  TAXONOMY
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display mt-0.5">
                  Admission Categories Management
                </h2>
                <p className="text-xs text-slate-500">
                  Manage academic groupings, intake schedules, and target disciplines.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingCategory({
                    id: 'cat-' + Date.now(),
                    group: 'UG Admissions',
                    name: '',
                    tagline: '',
                    description: '',
                    keyDisciplines: [],
                    intakeTimeline: 'Academic Session 2026-27 Open',
                    ctaText: 'Enquire for Program'
                  });
                  setIsAddingCat(true);
                }}
                className="py-1.5 px-3.5 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:border-[#0B2A52]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#C99A2E] font-bold uppercase mb-1">
                      <span>{cat.group}</span>
                    </div>
                    <h3 className="font-bold text-base text-[#0B2A52]">{cat.name}</h3>
                    <p className="text-xs text-slate-600 mt-1 font-medium">{cat.tagline}</p>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3">{cat.description}</p>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                      <strong>Timeline:</strong> {cat.intakeTimeline}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCategory({ ...cat });
                        setIsAddingCat(false);
                      }}
                      className="py-1 px-3 bg-slate-100 hover:bg-slate-200 text-[#0B2A52] text-xs font-semibold rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3 text-[#C99A2E]" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Delete category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Category Edit / Add Modal */}
            {editingCategory && (
              <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
                  <div className="bg-[#0B2A52] text-white p-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg font-display">
                        {isAddingCat ? 'Add New Category' : `Edit: ${editingCategory.name}`}
                      </h3>
                      <p className="text-xs text-slate-300">
                        Configure category title, group, description and disciplines.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingCategory(null)}
                      className="text-slate-300 hover:text-white p-1"
                    >
                      âœ•
                    </button>
                  </div>

                  <form onSubmit={handleSaveCategory} className="p-6 overflow-y-auto space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Category Group *
                      </label>
                      <select
                        value={editingCategory.group}
                        onChange={(e) => setEditingCategory(prev => prev ? ({ ...prev, group: e.target.value as any }) : null)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      >
                        <option value="UG Admissions">UG Admissions</option>
                        <option value="Diplomas & Professional Programs">Diplomas & Professional Programs</option>
                        <option value="Online & Executive Education">Online & Executive Education</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Category Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                        placeholder="e.g. Medical & Allied Sciences"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={editingCategory.tagline}
                        onChange={(e) => setEditingCategory(prev => prev ? ({ ...prev, tagline: e.target.value }) : null)}
                        placeholder="e.g. Healthcare, Clinical Care, Nursing & Pharmacy"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={editingCategory.description}
                        onChange={(e) => setEditingCategory(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
                        placeholder="Detailed description of opportunities and support..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Key Disciplines (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={editingCategory.keyDisciplines.join(', ')}
                        onChange={(e) => {
                          const discs = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          setEditingCategory(prev => prev ? ({ ...prev, keyDisciplines: discs }) : null);
                        }}
                        placeholder="MBBS, BPT, B.Pharm, B.Sc Nursing"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Intake Timeline
                      </label>
                      <input
                        type="text"
                        value={editingCategory.intakeTimeline}
                        onChange={(e) => setEditingCategory(prev => prev ? ({ ...prev, intakeTimeline: e.target.value }) : null)}
                        placeholder="Academic Session 2026-27 Registrations Open"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingCategory(null)}
                        className="py-1.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-1.5 px-5 bg-[#0B2A52] hover:bg-[#123E73] text-white font-bold rounded-lg text-xs"
                      >
                        Save Category
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#0B2A52] text-white p-6 flex items-start justify-between">
              <div>
                <div className="text-xs text-[#E5C66B] font-mono uppercase tracking-wider">
                  {selectedLead.lead_type.replace('_', ' ').toUpperCase()} LEAD
                </div>
                <h2 className="text-xl font-bold font-display text-white mt-1">
                  {selectedLead.full_name}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
                  <span className="flex items-center gap-1 font-mono">
                    <Phone className="w-3.5 h-3.5 text-[#C99A2E]" />
                    {selectedLead.mobile_number}
                  </span>
                  {selectedLead.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {selectedLead.email}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-300 hover:text-white p-1 rounded-md"
              >
                âœ•
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 text-left">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                <div>
                  <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Received</span>
                  <div className="font-medium text-slate-900 mt-0.5">{new Date(selectedLead.created_at).toLocaleString()}</div>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Current Status</span>
                  <div className="font-bold text-[#0B2A52] mt-0.5">{selectedLead.status}</div>
                </div>
              </div>

              {/* Specific Fields */}
              <div className="space-y-2.5">
                {selectedLead.who_is_booking && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Who is Booking / Applying:</span>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                      {selectedLead.who_is_booking}
                    </span>
                  </div>
                )}

                {selectedLead.parent_guardian_name && (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Parent / Guardian Information:</span>
                    <div>Name: <strong className="text-slate-800">{selectedLead.parent_guardian_name}</strong></div>
                    <div>Mobile: <strong className="font-mono text-slate-800">{selectedLead.parent_guardian_mobile || 'N/A'}</strong></div>
                  </div>
                )}

                {selectedLead.current_class && (
                  <div>
                    <span className="font-bold text-slate-900">Current Class / Qualification: </span>
                    <span className="font-semibold text-slate-800">{selectedLead.current_class}</span>
                  </div>
                )}

                {selectedLead.preferred_career && (
                  <div>
                    <span className="font-bold text-slate-900">Preferred Career / Interest: </span>
                    <span className="font-semibold text-[#0B2A52]">{selectedLead.preferred_career}</span>
                  </div>
                )}

                {(selectedLead.counselling_mode || selectedLead.preferred_counselling_mode) && (
                  <div>
                    <span className="font-bold text-slate-900">Counselling Mode: </span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-800 font-semibold rounded border border-blue-100">
                      {selectedLead.counselling_mode || selectedLead.preferred_counselling_mode}
                    </span>
                  </div>
                )}

                {'career_guidance_category' in selectedLead && selectedLead.career_guidance_category && (
                  <div>
                    <span className="font-bold text-slate-900">Guidance Category: </span>
                    <span>{selectedLead.career_guidance_category}</span>
                  </div>
                )}

                {'career_guidance_subcategory' in selectedLead && selectedLead.career_guidance_subcategory && (
                  <div>
                    <span className="font-bold text-slate-900">Sub-Category: </span>
                    <span>{selectedLead.career_guidance_subcategory}</span>
                  </div>
                )}

                {'school_college' in selectedLead && selectedLead.school_college && (
                  <div>
                    <span className="font-bold text-slate-900">School/College: </span>
                    <span>{selectedLead.school_college}</span>
                  </div>
                )}
                {'city' in selectedLead && selectedLead.city && (
                  <div>
                    <span className="font-bold text-slate-900">Location: </span>
                    <span>{selectedLead.city}, {selectedLead.state || ''}</span>
                  </div>
                )}
                {'preferred_program' in selectedLead && (
                  <div>
                    <span className="font-bold text-slate-900">Preferred Program: </span>
                    <span>{selectedLead.preferred_program}</span>
                  </div>
                )}
                {'preferred_specialization' in selectedLead && selectedLead.preferred_specialization && (
                  <div>
                    <span className="font-bold text-slate-900">Specialization: </span>
                    <span>{selectedLead.preferred_specialization}</span>
                  </div>
                )}
                {'counselling_category' in selectedLead && (
                  <div>
                    <span className="font-bold text-slate-900">Counselling Category: </span>
                    <span>{selectedLead.counselling_category}</span>
                  </div>
                )}
                {'preferred_date' in selectedLead && selectedLead.preferred_date && (
                  <div>
                    <span className="font-bold text-slate-900">Preferred Date & Time: </span>
                    <span>{selectedLead.preferred_date} ({selectedLead.preferred_time || 'Any'})</span>
                  </div>
                )}
                {'message' in selectedLead && selectedLead.message && (
                  <div className="bg-slate-50 p-3 rounded-md border border-slate-200 mt-2">
                    <span className="font-bold text-slate-900 block mb-1">Student / Candidate Note:</span>
                    <p className="whitespace-pre-line text-slate-600">{selectedLead.message}</p>
                  </div>
                )}
              </div>

              {/* Internal Staff Notes */}
              <div className="pt-4 border-t border-slate-200">
                <label className="block font-bold text-slate-900 mb-1.5">
                  Internal Counsellor Notes (Follow-up log, student interest, call outcome)
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record counsellor interaction, next follow-up date, or institutional recommendation..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-[#0B2A52] outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="mt-2 py-1.5 px-4 bg-[#0B2A52] hover:bg-[#123E73] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Save Internal Notes
                </button>
              </div>
            </div>

            <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-600">Update Status:</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead, e.target.value as LeadStatus)}
                  className="text-xs py-1 px-2.5 bg-white border border-slate-300 rounded-md font-medium"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Counselling Scheduled">Counselling Scheduled</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="py-1.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Confirm Deletion</h3>
            <p className="mt-1.5 text-xs text-slate-600">
              Are you sure you want to remove this lead record? This action cannot be undone.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const leadToDelete = leads.find(l => l.id === deleteConfirmId);
                  if (leadToDelete) handleDeleteLead(leadToDelete);
                }}
                className="flex-1 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

