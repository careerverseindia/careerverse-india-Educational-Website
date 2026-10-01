import React, { useState } from 'react';
import { 
  featuredInstitutions, 
  featuredExecutiveProgrammes, 
  popularOnlineUgProgrammes, 
  popularOnlinePgProgrammes, 
  certificationCategories 
} from '../../data/onlineEducationData';
import { 
  Award, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  Cpu, 
  BarChart3, 
  ShieldAlert, 
  BadgePercent, 
  TrendingUp,
  Star,
  Layers,
  ChevronRight,
  FileText
} from 'lucide-react';

interface OnlineCertificationsSectionProps {
  onOpenAdmissionModal: (programName?: string) => void;
  onNavigate?: (path: string) => void;
  defaultTab?: 'exec' | 'ug' | 'pg' | 'categories';
}

export const OnlineCertificationsSection: React.FC<OnlineCertificationsSectionProps> = ({
  onOpenAdmissionModal,
  onNavigate,
  defaultTab = 'exec'
}) => {
  const [activeTab, setActiveTab] = useState<'exec' | 'ug' | 'pg' | 'categories'>(defaultTab);
  const [selectedExecFilter, setSelectedExecFilter] = useState<string>('All');

  const execCategories = ['All', 'AI & Emerging Tech', 'Leadership & Strategy', 'Data & Analytics', 'Cybersecurity'];

  const filteredExecProgrammes = selectedExecFilter === 'All'
    ? featuredExecutiveProgrammes
    : featuredExecutiveProgrammes.filter(p => p.category === selectedExecFilter);

  const getCategoryIcon = (code: string) => {
    switch (code) {
      case 'A':
        return <Cpu className="w-5 h-5 text-[#C99A2E]" />;
      case 'B':
        return <BarChart3 className="w-5 h-5 text-[#C99A2E]" />;
      case 'C':
        return <ShieldAlert className="w-5 h-5 text-[#C99A2E]" />;
      case 'D':
        return <BadgePercent className="w-5 h-5 text-[#C99A2E]" />;
      case 'E':
      default:
        return <TrendingUp className="w-5 h-5 text-[#C99A2E]" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#0B2A52] text-xs font-bold font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C99A2E]" />
            <span>Executive & Digital Education Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2A52] font-display">
            Online Certifications & Executive Programmes
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Upskill with globally recognized credentials from premier Indian institutes (IITs, IIMs, IIITs) and world-renowned international universities.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/90 flex-wrap justify-center gap-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('exec')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'exec'
                  ? 'bg-[#0B2A52] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B2A52] hover:bg-white/60'
              }`}
            >
              <Award className="w-4 h-4 text-[#E5C66B]" />
              <span>Certifications & Executive Programmes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ug')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'ug'
                  ? 'bg-[#0B2A52] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B2A52] hover:bg-white/60'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-[#E5C66B]" />
              <span>Popular Online UG Programmes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pg')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'pg'
                  ? 'bg-[#0B2A52] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B2A52] hover:bg-white/60'
              }`}
            >
              <Star className="w-4 h-4 text-[#E5C66B] fill-[#E5C66B]" />
              <span>Popular Online PG Programmes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('categories')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'categories'
                  ? 'bg-[#0B2A52] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B2A52] hover:bg-white/60'
              }`}
            >
              <Layers className="w-4 h-4 text-[#E5C66B]" />
              <span>Certification Categories</span>
            </button>
          </div>
        </div>

        {/* TAB 1: EXECUTIVE & ADVANCED CERTIFICATIONS */}
        {activeTab === 'exec' && (
          <div className="space-y-10">
            {/* Featured Institutions Strip */}
            <div className="bg-gradient-to-r from-slate-50 via-amber-50/30 to-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="text-center sm:text-left mb-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C99A2E] font-mono">
                    PARTNER INSTITUTIONS
                  </span>
                  <h3 className="text-base font-bold text-[#0B2A52] font-display">
                    Featured Institutions Represented
                  </h3>
                </div>
                <span className="text-xs text-slate-500">IIMs · IITs · IIITs · Global Accredited Universities</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {featuredInstitutions.map((inst) => (
                  <div 
                    key={inst.id}
                    className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs hover:border-[#0B2A52] transition-colors text-center flex flex-col items-center justify-center gap-1.5"
                  >
                    <span className="text-xs font-bold text-[#0B2A52] font-display line-clamp-1">
                      {inst.name}
                    </span>
                    <span className="text-[10px] text-[#C99A2E] font-semibold bg-amber-50 px-1.5 py-0.5 rounded-xs line-clamp-1">
                      {inst.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-500 uppercase font-mono mr-1">Domain:</span>
                {execCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedExecFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      selectedExecFilter === cat
                        ? 'bg-[#0B2A52] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-500">
                Showing {filteredExecProgrammes.length} executive programmes
              </span>
            </div>

            {/* Featured Executive Programmes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExecProgrammes.map((prog) => (
                <div 
                  key={prog.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#0B2A52]/40 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="space-y-4">
                    {/* Top Row: Institution + Category Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-[#0B2A52] border border-blue-100">
                        <Building2 className="w-3.5 h-3.5 text-[#C99A2E]" />
                        {prog.institution}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">
                        {prog.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold text-[#0B2A52] font-display group-hover:text-[#C99A2E] transition-colors leading-snug">
                      {prog.title}
                    </h4>

                    {/* Overview */}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {prog.overview}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        Key Curriculum Pillars:
                      </span>
                      {prog.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A2E] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Duration & Format */}
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-[#C99A2E]" />
                        Duration: {prog.duration}
                      </span>
                      <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
                        {prog.format}
                      </span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenAdmissionModal(prog.title)}
                      className="flex-1 py-2.5 px-3 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Admission Guidance Form</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: POPULAR ONLINE UG PROGRAMMES */}
        {activeTab === 'ug' && (
          <div className="space-y-8">
            <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100 text-xs sm:text-sm text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-[#0B2A52]">Career Areas for Online UG:</span> Management, Sales, HR, Marketing, IT, Software, Cybersecurity, Finance, Banking, Data Science, Analytics and Business.
              </div>
              <span className="font-mono text-xs font-bold text-[#0B2A52] bg-white px-2.5 py-1 rounded-md border border-blue-200 shrink-0">
                100% UGC-DEB Accredited
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularOnlineUgProgrammes.map((prog) => (
                <div 
                  key={prog.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#0B2A52]/40 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-[#0B2A52] border border-amber-200">
                        Undergraduate Degree
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-600 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#C99A2E]" />
                        Duration: {prog.duration}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#0B2A52] font-display group-hover:text-[#C99A2E] transition-colors">
                      {prog.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {prog.overview}
                    </p>

                    {prog.careerAreas && (
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                          Target Career Areas:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {prog.careerAreas.map((area, i) => (
                            <span 
                              key={i}
                              className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-sm"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-slate-500 pt-1">
                      <span className="font-semibold text-slate-700">Eligibility: </span>
                      {prog.eligibility}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => onOpenAdmissionModal(prog.title)}
                      className="w-full py-2.5 px-3 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Admission Guidance Form</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: POPULAR ONLINE PG PROGRAMMES */}
        {activeTab === 'pg' && (
          <div className="space-y-8">
            <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200/80 text-xs sm:text-sm text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-[#0B2A52]">Specialisations Available:</span> Marketing, Finance, HR, Business Analytics, AI/ML, Data Science, Cloud, Cybersecurity and Leadership.
              </div>
              <span className="font-mono text-xs font-bold text-[#0B2A52] bg-white px-2.5 py-1 rounded-md border border-amber-300 shrink-0 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#C99A2E] fill-[#C99A2E]" />
                Top Industry Demand
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularOnlinePgProgrammes.map((prog) => (
                <div 
                  key={prog.id}
                  className={`bg-white rounded-2xl border p-6 flex flex-col justify-between hover:shadow-md transition-all group ${
                    prog.starred ? 'border-amber-300 ring-1 ring-amber-200/70 shadow-xs' : 'border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {prog.starred && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#0B2A52] text-[#E5C66B]">
                            <Star className="w-3 h-3 fill-[#E5C66B]" />
                            Featured Master's
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                          Postgraduate
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-600 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#C99A2E]" />
                        Duration: {prog.duration}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#0B2A52] font-display group-hover:text-[#C99A2E] transition-colors">
                      {prog.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {prog.overview}
                    </p>

                    {prog.specialisations && (
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                          Popular Specialisations:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {prog.specialisations.map((spec, i) => (
                            <span 
                              key={i}
                              className="text-[11px] font-medium bg-amber-50/80 text-[#0B2A52] px-2 py-0.5 rounded-sm border border-amber-100"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-slate-500 pt-1">
                      <span className="font-semibold text-slate-700">Eligibility: </span>
                      {prog.eligibility}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => onOpenAdmissionModal(prog.title)}
                      className="w-full py-2.5 px-3 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Admission Guidance Form</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFICATION CATEGORIES (A to E) */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificationCategories.map((cat) => (
                <div 
                  key={cat.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#0B2A52] shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-[#0B2A52] flex items-center justify-center shrink-0">
                        {getCategoryIcon(cat.code)}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#C99A2E] tracking-wider uppercase">
                          Category {cat.code}
                        </span>
                        <h4 className="text-base font-bold text-[#0B2A52] font-display">
                          {cat.title}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        Domains & Micro-Credentials:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.topics.map((topic, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-xs font-medium bg-slate-50 hover:bg-amber-50 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C99A2E]" />
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => onOpenAdmissionModal(`${cat.title} Certifications`)}
                      className="w-full py-2.5 px-3 bg-[#0B2A52] hover:bg-[#123E73] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#E5C66B]" />
                      <span>Admission Guidance Form</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
