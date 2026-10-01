import React, { useState } from 'react';
import { admissionCategories, AdmissionCategory } from '../data/admissionsData';
import { OnlineCertificationsSection } from '../components/sections/OnlineCertificationsSection';
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  Briefcase, 
  Sparkles,
  PhoneCall,
  Award
} from 'lucide-react';

interface AdmissionsPageProps {
  onOpenAdmissionModal: (initialProgramName?: string) => void;
  onNavigate: (path: string) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({
  onOpenAdmissionModal,
  onNavigate
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('All');

  const groups = ['All', 'UG Admissions', 'PG Admissions', 'Diplomas & Professional Programs', 'Online & Executive Education'];

  const filteredCategories = selectedGroup === 'All'
    ? admissionCategories
    : admissionCategories.filter(cat => cat.group === selectedGroup);

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0B2A52] to-[#123E73] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-[#E5C66B] uppercase font-mono">
            <span>CareerVerse India Admissions Desk</span>
            <span aria-hidden="true">·</span>
            <span>Academic Intake 2026-27</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
            Find the Right Program. Apply With Confidence.
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
            Direct institutional guidance across undergraduate degrees, clinical allied health, professional diplomas, and UGC-accredited online & executive education.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenAdmissionModal()}
              className="py-3 px-6 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-bold text-sm rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Get Admission Guidance
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/programs')}
              className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-lg border border-white/20 transition-colors cursor-pointer"
            >
              Search Program Directory
            </button>
          </div>
        </div>
      </section>

      {/* Priority Admission Categories Grid (Requirement 8) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="text-left mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C99A2E] font-mono">
            ADMISSION PORTFOLIO
          </span>
          <h2 className="text-2xl font-bold text-[#0B2A52] font-display mt-0.5">
            Key Admission Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select your target academic category to receive structured admission advice and direct desk assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {[
            {
              title: 'UG Admissions',
              desc: 'Full-time campus undergraduate programs across Engineering (B.Tech), Business (BBA, B.Com), Law & Humanities.',
              highlights: ['Direct Institutional Merit Seats', 'Entrance Strategy (JEE/CUET)', 'Verified NAAC Campus Facilities'],
              icon: <GraduationCap className="w-6 h-6 text-[#C99A2E]" />,
              query: 'UG Admissions'
            },
            {
              title: 'PG Admissions',
              desc: 'Premier postgraduate master’s degrees including MBA, MCA, M.Tech, M.Com and specialized postgraduate faculties.',
              highlights: ['Corporate Internship Affiliations', 'Dual Specialization Options', 'Merit Scholarship Assistance'],
              icon: <Briefcase className="w-6 h-6 text-[#C99A2E]" />,
              query: 'PG Admissions'
            },
            {
              title: 'Medical Admissions',
              desc: 'MBBS, BDS, Bachelor of Physiotherapy (BPT), B.Pharm, B.Sc Nursing, and advanced clinical paramedical diagnostics.',
              highlights: ['Teaching Hospital Rotations', 'State Medical Council Approved', 'Clinical Equipment Labs'],
              icon: <ShieldCheck className="w-6 h-6 text-[#C99A2E]" />,
              query: 'Medical Admissions'
            },
            {
              title: 'Online Programs',
              desc: '100% accredited UGC-DEB recognized online bachelor’s and master’s degrees (Online MBA, MCA, BBA, B.Com).',
              highlights: ['Learn Anywhere via Mobile LMS', 'Weekend Live Masterclasses', 'Degrees Valid for Govt & Corporates'],
              icon: <BookOpen className="w-6 h-6 text-[#C99A2E]" />,
              query: 'Online Programs'
            },
            {
              title: 'Certifications',
              desc: 'High-impact industry micro-credentials in AI, cloud computing, financial analytics, digital marketing, and HR tech.',
              highlights: ['Corporate Partner Badges', 'Weekend Fast-Track Batches', 'Hands-On Capstone Projects'],
              icon: <Sparkles className="w-6 h-6 text-[#C99A2E]" />,
              query: 'Certifications'
            },
            {
              title: 'Executive Programs',
              desc: '1-Year Executive MBAs, Senior Management Programs, and CXO strategic leadership cohorts for working professionals.',
              highlights: ['Peer Cohorts with 3+ Yrs Exp', 'Central Business Hub Campuses', 'Direct Executive Alumni Network'],
              icon: <Award className="w-6 h-6 text-[#C99A2E]" />,
              query: 'Executive Programs'
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#0B2A52] shadow-2xs hover:shadow-md transition-all group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 group-hover:bg-[#0B2A52] group-hover:text-white transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0B2A52] font-display">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  {card.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A2E] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenAdmissionModal(card.query)}
                  className="w-full py-2.5 px-4 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>Enquire for {card.title}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          DEDICATED PG ADMISSIONS SECTION (Requirement 2)
          Placed below UG Admissions and before Professional Programs
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm text-left space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C99A2E] font-mono">
                  POSTGRADUATE ADMISSIONS
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-mono text-slate-500 font-medium">Session 2026-27</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A52] font-display mt-1">
                PG Admissions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Explore premier postgraduate master’s programs, executive degrees, and online degrees across UGC and AICTE accredited institutions.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenAdmissionModal('PG Admissions')}
              className="py-3 px-6 bg-[#0B2A52] hover:bg-[#123E73] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 self-start md:self-auto shadow-xs"
            >
              <Briefcase className="w-4 h-4 text-[#E5C66B]" />
              <span>General PG Admission Enquiry</span>
            </button>
          </div>

          {/* 10 PG Admissions Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'MBA (Master of Business Administration)',
                duration: '2 Years',
                eligibility: 'Bachelor’s degree in any discipline with min 50% marks (45% for SC/ST). Valid CAT / MAT / XAT / CMAT / CET score or institutional merit counselling.',
                badge: 'Premier Master’s',
                tracks: 'Marketing, Finance, HR, Business Analytics, Operations'
              },
              {
                name: 'MCA (Master of Computer Applications)',
                duration: '2 Years',
                eligibility: 'Passed BCA / B.Sc (Computer Science / IT) or Bachelor’s degree with Mathematics at 10+2 level or graduation with min 50% aggregate.',
                badge: 'Top Tech Master’s',
                tracks: 'AI & Data Science, Cloud Computing, Full-Stack, Cybersecurity'
              },
              {
                name: 'M.Tech (Master of Technology)',
                duration: '2 Years',
                eligibility: 'B.Tech / B.E. in relevant discipline with minimum 50-55% aggregate. Valid GATE score or institute-level entrance counselling.',
                badge: 'Engineering & Tech',
                tracks: 'Computer Science, VLSI, Robotics, Structural Engineering'
              },
              {
                name: 'M.Com (Master of Commerce)',
                duration: '2 Years',
                eligibility: 'B.Com / BBA / BBM or equivalent commerce graduate degree from a recognized university with minimum 45-50% marks.',
                badge: 'Commerce & Finance',
                tracks: 'Accounting, Taxation, Corporate Finance, Banking & FinTech'
              },
              {
                name: 'MA (Master of Arts)',
                duration: '2 Years',
                eligibility: 'Bachelor’s degree in relevant arts or humanities discipline with min 45-50% aggregate from an accredited university.',
                badge: 'Humanities & Social Sciences',
                tracks: 'Psychology, Economics, English Literature, Journalism'
              },
              {
                name: 'MSc (Master of Science)',
                duration: '2 Years',
                eligibility: 'B.Sc in relevant subject or allied scientific discipline with min 50% aggregate marks from a recognized university.',
                badge: 'Pure & Applied Science',
                tracks: 'Data Science, Biotechnology, Physics, Applied Mathematics'
              },
              {
                name: 'Executive MBA',
                duration: '1–2 Years',
                eligibility: 'Graduation in any discipline with min 50% marks plus 2 to 5 years of relevant full-time professional corporate experience.',
                badge: 'For Working Professionals',
                tracks: 'Strategic Leadership, Digital Transformation, CXO Cohorts'
              },
              {
                name: 'Online MBA',
                duration: '2 Years',
                eligibility: 'Recognized Bachelor’s degree (min 50% marks). 100% online flexibility approved by UGC-DEB for working professionals.',
                badge: 'UGC-DEB Accredited',
                tracks: 'Dual Specialization, Marketing, IT Management, Healthcare'
              },
              {
                name: 'Online MCA',
                duration: '2 Years',
                eligibility: 'BCA / B.Sc / Bachelor’s degree with Mathematics background. UGC-DEB recognized degree valid for MNCs and global roles.',
                badge: 'UGC-DEB Accredited',
                tracks: 'Software Architecture, Cloud, Cyber Security, GenAI'
              },
              {
                name: 'International PG Programs',
                duration: '1–2 Years',
                eligibility: 'Recognized Bachelor’s degree with English proficiency. Dual-credential degrees partnered with prestigious UK, US & Australian universities.',
                badge: 'Global Dual Degree',
                tracks: 'Global MBA, MS in AI & ML (UK/US), International Business'
              }
            ].map((prog, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#0B2A52] p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C99A2E] font-mono bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {prog.badge}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#C99A2E]" />
                      <span>{prog.duration}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B2A52] font-display group-hover:text-[#123E73] transition-colors leading-snug">
                    {prog.name}
                  </h3>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                        Eligibility
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                        {prog.eligibility}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                        Specialisations
                      </span>
                      <p className="text-xs text-slate-700 font-medium mt-0.5">
                        {prog.tracks}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenAdmissionModal(prog.name)}
                    className="w-full py-2.5 px-4 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-extrabold text-xs rounded-xl transition-all shadow-2xs hover:shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    <span>Admission Guidance Button</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 border-b border-slate-200">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedGroup === group
                  ? 'bg-[#0B2A52] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-[#0B2A52]/40 shadow-2xs hover:shadow-md transition-all group"
            >
              <div>
                {/* Zero-Pill Group Indicator */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
                  <span className="text-[#C99A2E] font-bold uppercase">{cat.group}</span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-[#0B2A52] font-display group-hover:text-[#123E73] transition-colors">
                  {cat.name}
                </h3>

                {/* Tagline */}
                <p className="mt-1 text-xs font-semibold text-slate-700">
                  {cat.tagline}
                </p>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {cat.description}
                </p>

                {/* Key Disciplines */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 font-mono">
                    Popular Disciplines & Degrees
                  </span>
                  <div className="space-y-1.5">
                    {cat.keyDisciplines.map((disc, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A2E] shrink-0 mt-0.5" />
                        <span>{disc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Intake Timeline */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{cat.intakeTimeline}</span>
                </div>
              </div>

              {/* Category CTA */}
              <div className="mt-6 pt-3 border-t border-slate-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => onOpenAdmissionModal(cat.name)}
                  className="w-full py-2.5 px-4 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>{cat.ctaText}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Admission Support Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2A52] text-white rounded-2xl p-8 sm:p-12 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-[#E5C66B] font-mono uppercase tracking-wider">
                TRANSPARENT ADMISSION FACILITATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                How CareerVerse Supports Your Admission
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                We work directly with admissions desks across India. From clarifying genuine scholarship eligibility to arranging campus visits and managing seat reservation deadlines, our team ensures zero misrepresentation.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-200">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C99A2E]" />
                  <span>Direct Admission Verification</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C99A2E]" />
                  <span>UGC & Council Verification</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C99A2E]" />
                  <span>Education Loan Assistance</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                type="button"
                onClick={() => onOpenAdmissionModal()}
                className="py-3.5 px-6 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-extrabold text-sm rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                Request Admission Guidance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Online Certifications & Executive Programmes Portfolio */}
      <div className="border-t border-slate-200 bg-slate-50/60">
        <OnlineCertificationsSection 
          onOpenAdmissionModal={onOpenAdmissionModal}
          onNavigate={onNavigate}
        />
      </div>

    </div>
  );
};
