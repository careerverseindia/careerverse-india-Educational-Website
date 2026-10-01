import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Target, 
  UserCheck, 
  GraduationCap, 
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  CheckCircle2, 
  FileText, 
  Sparkles, 
  ExternalLink, 
  PhoneCall, 
  MapPin, 
  Building2, 
  Calendar, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  Briefcase,
  Layers,
  ChevronRight
} from 'lucide-react';
import { getSiteSettings } from '../services/settingsService';

interface StudentJourneyPageProps {
  onOpenGuidanceModal: () => void;
  onOpenCounsellingModal: () => void;
  onOpenAdmissionModal?: (programName?: string) => void;
  onNavigate?: (path: string) => void;
}

export const StudentJourneyPage: React.FC<StudentJourneyPageProps> = ({
  onOpenGuidanceModal,
  onOpenCounsellingModal,
  onOpenAdmissionModal,
  onNavigate
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activePhaseFilter, setActivePhaseFilter] = useState<number>(0);
  const settings = getSiteSettings();

  const phases = [
    { id: 1, name: 'Phase 1: Initial Discovery & Intake', range: 'Steps 1–5', color: '#C99A2E' },
    { id: 2, name: 'Phase 2: Course & Entrance Planning', range: 'Steps 6–9', color: '#0B2A52' },
    { id: 3, name: 'Phase 3: Application & Seat Allotment', range: 'Steps 10–16', color: '#C99A2E' },
    { id: 4, name: 'Phase 4: Onboarding & Lifetime Alumni', range: 'Steps 17–21', color: '#0B2A52' },
  ];

  const steps = [
    {
      num: 1,
      phaseId: 1,
      title: 'Student Enquiry',
      tagline: 'Initial Student & Parent Contact Point',
      desc: 'First point of contact through the CareerVerse India platform, telephone hotline, WhatsApp advisory desk, or walk-in enquiry.',
      exams: null,
      actionText: 'Submit Quick Enquiry',
      actionType: 'enquiry',
      highlights: ['Zero registration barrier', 'No password or student account needed', 'Instant acknowledgement receipt']
    },
    {
      num: 2,
      phaseId: 1,
      title: 'Enquiry Form',
      tagline: 'Academic Background & Career Aspirations',
      desc: 'Candidate or parent fills our streamlined academic profile form detailing recent board marks, target degrees, budget preferences, and preferred cities.',
      exams: null,
      actionText: 'Open Enquiry Form',
      actionType: 'enquiry',
      highlights: ['Class 10th & 12th score capture', 'Target faculty selection', 'Geographic preference mapping']
    },
    {
      num: 3,
      phaseId: 1,
      title: 'Lead Qualification',
      tagline: 'Profile Evaluation by Academic Advisors',
      desc: 'Our academic review board evaluates eligibility criteria, board normalization cutoffs, age parameters, and institutional quota alignments.',
      exams: null,
      actionText: null,
      actionType: null,
      highlights: ['Eligibility screening', 'Cutoff feasibility analysis', 'Scholarship baseline audit']
    },
    {
      num: 4,
      phaseId: 1,
      title: 'Career Counselling',
      tagline: '1-on-1 Personal Mentorship Session',
      desc: 'Direct confidential consultation with certified educational mentors to dissect candidate interests, family context, and industry growth trends.',
      exams: null,
      actionText: 'Book Career Counselling',
      actionType: 'counselling',
      highlights: ['Certified career advisors', 'Parent-student alignment', 'Salary & career trend insights']
    },
    {
      num: 5,
      phaseId: 1,
      title: 'Psychometric Test + Expert Guidance',
      tagline: 'Scientific Aptitude & Behavioral Mapping',
      desc: 'Scientifically validated multidimensional aptitude test assessing logical reasoning, spatial orientation, personality traits, and stream alignment followed by expert debrief.',
      exams: null,
      actionText: 'Take Psychometric Test',
      actionType: 'test',
      highlights: ['Multi-trait cognitive analysis', 'Detailed debrief report', 'Objective stream matching']
    },
    {
      num: 6,
      phaseId: 2,
      title: 'Course Finalisation',
      tagline: 'Pinpointing Degree & Specialization',
      desc: 'Synthesizing test insights and counselling debrief to lock in the ideal undergraduate, postgraduate, or professional degree specialization.',
      exams: null,
      actionText: 'Browse Courses',
      actionType: 'directory',
      highlights: ['Emerging specializations (AI, FinTech, Cyber)', 'Accreditation verification', 'Market demand projection']
    },
    {
      num: 7,
      phaseId: 2,
      title: 'Merit + Budget + Location Analysis',
      tagline: 'Tri-Factor Institutional Compatibility Matrix',
      desc: 'Comprehensive comparative matrix balancing academic cutoffs, parental fee budgets, hostel & living expenses, and campus connectivity.',
      exams: null,
      actionText: null,
      actionType: null,
      highlights: ['Academic cutoff parity', 'All-inclusive cost forecasting', 'Safe & connected campus locations']
    },
    {
      num: 8,
      phaseId: 2,
      title: 'Entrance Exam Planning',
      tagline: 'Strategic Preparation & Examination Benchmarks',
      desc: 'Curated timeline mapping, syllabus guidance, mock score targeting, and contingency institution planning across national and state competitive examinations.',
      exams: ['JEE', 'NEET', 'CUET', 'CAT', 'GATE', 'COMEDK', 'PGCET', 'State CET'],
      actionText: 'Plan Exam Strategy',
      actionType: 'counselling',
      highlights: ['National & state exam cutoffs', 'Backup institutional contingency', 'Mock score benchmark audit']
    },
    {
      num: 9,
      phaseId: 2,
      title: 'College Shortlisting',
      tagline: 'Objective Campus Curation Across India',
      desc: 'Shortlisting verified UGC, AICTE, NAAC A/A+ accredited institutions and NIRF-ranked universities tailored to the candidate profile.',
      exams: null,
      actionText: 'View Universities',
      actionType: 'universities',
      highlights: ['Zero commercial bias', 'NAAC A/A+ accreditation check', 'Placement track-record scrutiny']
    },
    {
      num: 10,
      phaseId: 3,
      title: 'Application / Registration',
      tagline: 'Error-Free Institutional Submission',
      desc: 'End-to-end guidance through official university portals, application form filling, document attachments, and application fee compliance.',
      exams: null,
      actionText: 'Admission Guidance Form',
      actionType: 'admission',
      highlights: ['Portal registration guidance', 'Prevent application rejections', 'Quota application handling']
    },
    {
      num: 11,
      phaseId: 3,
      title: 'Selection Process',
      tagline: 'Merit Lists, GD & Interview Coordination',
      desc: 'Active tracking of university merit rosters, entrance exam cutoff releases, group discussion (GD) scheduling, and personal interview (PI) coaching.',
      exams: null,
      actionText: null,
      actionType: null,
      highlights: ['Merit list notifications', 'GD/PI preparation tips', 'Seat allotment tracking']
    },
    {
      num: 12,
      phaseId: 3,
      title: 'Offer / Seat Allotment',
      tagline: 'Provisional Offer & Counselling Rank Result',
      desc: 'Formal receipt and review of provisional admission letters, seat allotment orders, and institutional scholarship sanction documents.',
      exams: null,
      actionText: null,
      actionType: null,
      highlights: ['Allotment letter validation', 'Scholarship clause check', 'Option upgrade guidance']
    },
    {
      num: 13,
      phaseId: 3,
      title: 'Seat Blocking',
      tagline: 'Provisional Fee Deposit & Reservation',
      desc: 'Assistance with official seat blocking fee transactions within prescribed statutory institutional deadlines to prevent forfeiture.',
      exams: null,
      actionText: 'Verify Seat Offer',
      actionType: 'admission',
      highlights: ['Deadline management', 'Official receipt tracking', 'Fee refund policy audit']
    },
    {
      num: 14,
      phaseId: 3,
      title: 'Campus Visit',
      tagline: 'Infrastructure Inspection & Faculty Interaction',
      desc: 'Coordinating physical or virtual guided campus walk-throughs, laboratory inspections, hostel accommodation visits, and meeting department heads.',
      exams: null,
      actionText: 'Schedule Visit Guidance',
      actionType: 'counselling',
      highlights: ['Lab & classroom inspection', 'Hostel hygiene & security check', 'Senior faculty interactions']
    },
    {
      num: 15,
      phaseId: 3,
      title: 'Document Verification',
      tagline: 'Original Credentials & Statutory Verification',
      desc: 'Rigorous pre-verification of academic certificates, migration credentials, transfer certificates, category reservations, and medical clearances.',
      exams: null,
      actionText: null,
      actionType: null,
      highlights: ['Original credential audit', 'Transfer certificate clearances', 'Eligibility compliance check']
    },
    {
      num: 16,
      phaseId: 3,
      title: 'Admission Confirmation',
      tagline: 'Enrolment Number & Permanent ID Issuance',
      desc: 'Final administrative sign-off by registrar, tuition fee completion, and generation of the student permanent university enrolment register ID.',
      exams: null,
      actionText: 'Request Admission Desk',
      actionType: 'admission',
      highlights: ['Official enrolment confirmation', 'Permanent ID generation', 'Fee receipt archival']
    },
    {
      num: 17,
      phaseId: 4,
      title: 'Pre-Joining Support',
      tagline: 'Hostel, Academic Bridge & Tech Checklist',
      desc: 'Comprehensive transition checklists covering hostel packing, computing requirements, syllabus overviews, and preparatory bridge modules.',
      exams: null,
      actionText: null,
      actionType: null,
      highlights: ['Laptop specification guidelines', 'Preparatory reading lists', 'Hostel packing checklists']
    },
    {
      num: 18,
      phaseId: 4,
      title: 'College Reporting',
      tagline: 'On-Campus Registrar Verification Day',
      desc: 'Guidance and desk support during physical reporting at the institution’s administrative block on the designated reporting date.',
      exams: null,
      actionText: null,
      actionType: null,
      highlights: ['Reporting day checklist', 'Campus desk coordination', 'Hostel room possession']
    },
    {
      num: 19,
      phaseId: 4,
      title: 'Orientation',
      tagline: 'Induction Ceremony & First Lecture Day',
      desc: 'Participation in campus induction week, faculty introductions, peer student buddy allocations, and first day of academic lectures.',
      exams: null,
      actionText: null,
      actionType: null,
      highlights: ['Induction ceremony participation', 'Student club signups', 'Campus buddy pairing']
    },
    {
      num: 20,
      phaseId: 4,
      title: 'Post Admission Support',
      tagline: 'Ongoing Academic & Welfare Monitoring',
      desc: 'Periodic follow-ups throughout the first academic year addressing semester adjustments, mentor advice, and academic guidance.',
      exams: null,
      actionText: 'Student Advisory Desk',
      actionType: 'counselling',
      highlights: ['First semester welfare check', 'Internship readiness advisory', 'Continuous academic support']
    },
    {
      num: 21,
      phaseId: 4,
      title: 'Alumni & Referral Network',
      tagline: 'Lifelong CareerVerse Network Access',
      desc: 'Induction into the exclusive CareerVerse India Alumni Circle, unlocking corporate mentorship, campus referral benefits, and career transitions.',
      exams: null,
      actionText: 'Join Alumni Network',
      actionType: 'counselling',
      highlights: ['Executive alumni mentorship', 'Peer referral advantages', 'Lifelong career guidance']
    }
  ];

  const handleAction = (type?: string | null) => {
    if (!type) return;
    if (type === 'test') {
      if (settings.psychometric_link) {
        window.open(settings.psychometric_link, '_blank', 'noopener,noreferrer');
      } else {
        onOpenCounsellingModal();
      }
    } else if (type === 'admission') {
      if (onOpenAdmissionModal) {
        onOpenAdmissionModal();
      } else {
        onOpenGuidanceModal();
      }
    } else if (type === 'counselling') {
      onOpenCounsellingModal();
    } else if (type === 'directory' && onNavigate) {
      onNavigate('/programs');
    } else if (type === 'universities' && onNavigate) {
      onNavigate('/universities');
    } else {
      onOpenGuidanceModal();
    }
  };

  const filteredSteps = activePhaseFilter === 0 
    ? steps 
    : steps.filter(s => s.phaseId === activePhaseFilter);

  const currentStepData = steps.find(s => s.num === activeStep) || steps[0];

  return (
    <div className="space-y-12 pb-24 text-left">
      
      {/* ========================================================
          HERO BANNER
          ======================================================== */}
      <section className="bg-gradient-to-b from-[#0B2A52] via-[#0D3465] to-[#123E73] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C99A2E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C99A2E]/40 text-[#E5C66B] text-xs font-mono font-bold uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Roadmap Timeline</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
            Student Journey with CareerVerse India
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
            Experience our animated, end-to-end 21-step roadmap designed to guide you from initial discovery to confirmed university admission and lifelong alumni mentorship.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5C66B]" />
              <span>4 Strategic Phases</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5C66B]" />
              <span>21 Guided Milestones</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5C66B]" />
              <span>100% Objective & Independent</span>
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (onOpenAdmissionModal) onOpenAdmissionModal();
                else onOpenGuidanceModal();
              }}
              className="py-3 px-6 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-extrabold text-xs sm:text-sm rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Admission Guidance Form</span>
            </button>
            <button
              type="button"
              onClick={onOpenCounsellingModal}
              className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-lg border border-white/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#E5C66B]" />
              <span>Book Career Counselling</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          PHASE FILTER TABS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs sm:text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActivePhaseFilter(0)}
              className={`py-2 px-4 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activePhaseFilter === 0
                  ? 'bg-[#0B2A52] text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              All 21 Steps
            </button>
            {phases.map(phase => (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActivePhaseFilter(phase.id)}
                className={`py-2 px-4 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activePhaseFilter === phase.id
                    ? 'bg-[#0B2A52] text-[#E5C66B] shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <span>{phase.name}</span>
                <span className="text-[11px] font-mono opacity-80">({phase.range})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          DESKTOP ROADMAP: HORIZONTAL ANIMATED TIMELINE
          ======================================================== */}
      <section className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-8">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#C99A2E] uppercase font-mono">
                DESKTOP HORIZONTAL ROADMAP
              </span>
              <h2 className="text-2xl font-extrabold text-[#0B2A52] font-display mt-0.5">
                Sequential Milestone Navigator
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Click any milestone node to view in-depth parameters, entrance exam strategies, and direct desk actions.
              </p>
            </div>

            {/* Step Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={activeStep <= 1}
                onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                className="p-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Previous Step"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-[#0B2A52] px-3 py-1 bg-slate-100 rounded-md">
                Step {activeStep} of 21
              </span>
              <button
                type="button"
                disabled={activeStep >= 21}
                onClick={() => setActiveStep(prev => Math.min(21, prev + 1))}
                className="p-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Next Step"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Track with Step Nodes */}
          <div className="relative pt-6 pb-4 overflow-x-auto scrollbar-thin">
            {/* Background connecting bar */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
            
            {/* Active connecting bar */}
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#0B2A52] to-[#C99A2E] -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((activeStep - 1) / 20) * 100}%` }}
            />

            <div className="flex items-center justify-between min-w-[980px] relative z-10 px-2">
              {steps.map((step) => {
                const isCurrent = step.num === activeStep;
                const isPassed = step.num < activeStep;
                
                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => setActiveStep(step.num)}
                    className="group flex flex-col items-center cursor-pointer focus:outline-none transition-transform hover:scale-110"
                    title={`Step ${step.num}: ${step.title}`}
                  >
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-200 ${
                        isCurrent 
                          ? 'bg-[#0B2A52] text-[#E5C66B] ring-4 ring-[#C99A2E]/40 scale-125 shadow-md' 
                          : isPassed 
                          ? 'bg-[#C99A2E] text-white shadow-2xs' 
                          : 'bg-white border-2 border-slate-300 text-slate-500 group-hover:border-[#0B2A52]'
                      }`}
                    >
                      {String(step.num).padStart(2, '0')}
                    </div>
                    
                    <span 
                      className={`mt-2 text-[10px] font-semibold max-w-[54px] text-center leading-tight truncate ${
                        isCurrent ? 'text-[#0B2A52] font-bold' : 'text-slate-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Detailed Card Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepData.num}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-[#0B2A52]/20 p-8 shadow-md"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-200/80 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0B2A52] text-[#E5C66B] flex items-center justify-center font-mono font-black text-2xl shadow-sm border border-slate-300">
                    {String(currentStepData.num).padStart(2, '0')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C99A2E]">
                        {phases.find(p => p.id === currentStepData.phaseId)?.name}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-mono text-slate-500">
                        Milestone {currentStepData.num} of 21
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#0B2A52] font-display">
                      {currentStepData.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                      {currentStepData.tagline}
                    </p>
                  </div>
                </div>

                {currentStepData.actionText && (
                  <button
                    type="button"
                    onClick={() => handleAction(currentStepData.actionType)}
                    className="py-3 px-6 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-extrabold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0 whitespace-nowrap"
                  >
                    {currentStepData.actionType === 'admission' && <FileText className="w-4 h-4" />}
                    {currentStepData.actionType === 'counselling' && <PhoneCall className="w-4 h-4" />}
                    {currentStepData.actionType === 'test' && <Sparkles className="w-4 h-4" />}
                    <span>{currentStepData.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Step Description & Highlights */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-7 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Milestone Overview
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {currentStepData.desc}
                  </p>

                  {/* Entrance Exam Badges if applicable */}
                  {currentStepData.exams && (
                    <div className="pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C99A2E] font-mono block mb-2">
                        Supported Entrance Examinations
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {currentStepData.exams.map(exam => (
                          <span
                            key={exam}
                            className="px-2.5 py-1 bg-amber-50 border border-amber-300 text-[#0B2A52] font-bold text-xs rounded-md shadow-2xs"
                          >
                            {exam}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-5 bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Key Deliverables & Safeguards
                  </h4>
                  <div className="space-y-2">
                    {currentStepData.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#C99A2E] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Bottom Controls */}
              <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  disabled={activeStep <= 1}
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0B2A52] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Milestone</span>
                </button>

                <div className="flex gap-1.5">
                  {steps.map(s => (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => setActiveStep(s.num)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        s.num === activeStep ? 'w-6 bg-[#C99A2E]' : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Jump to step ${s.num}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  disabled={activeStep >= 21}
                  onClick={() => setActiveStep(prev => Math.min(21, prev + 1))}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2A52] hover:text-[#C99A2E] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Next Milestone</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ========================================================
          MOBILE & ALL-VIEW ROADMAP: VERTICAL FLOWING TIMELINE
          ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          
          <div className="border-b border-slate-100 pb-5">
            <span className="text-xs font-bold tracking-widest text-[#C99A2E] uppercase font-mono">
              COMPLETE 21-STEP PROCESS FLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A52] font-display mt-0.5">
              End-to-End Admission Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Follow every sequential step with verified institutional guidance, entrance planning, and admission confirmation.
            </p>
          </div>

          {/* Flowing Vertical Timeline */}
          <div className="relative pl-6 sm:pl-8 space-y-6">
            {/* Vertical connector line */}
            <div className="absolute top-4 bottom-4 left-3 sm:left-4 w-0.5 bg-gradient-to-b from-[#0B2A52] via-[#C99A2E] to-[#0B2A52]" />

            {filteredSteps.map((step, idx) => {
              const isLast = idx === filteredSteps.length - 1;
              const isKeyStep = [1, 5, 8, 10, 16, 21].includes(step.num);

              return (
                <div key={step.num} className="relative group">
                  {/* Timeline Node Point */}
                  <div 
                    className={`absolute -left-[27px] sm:-left-[31px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[10px] transition-all shadow-xs ${
                      isKeyStep 
                        ? 'bg-[#0B2A52] text-[#E5C66B] ring-2 ring-[#C99A2E]' 
                        : 'bg-white border-2 border-slate-300 text-slate-600 group-hover:border-[#0B2A52]'
                    }`}
                  >
                    {step.num}
                  </div>

                  {/* Step Container Box */}
                  <div 
                    className={`rounded-2xl border p-5 sm:p-6 transition-all duration-200 ${
                      isKeyStep 
                        ? 'bg-gradient-to-br from-amber-50/40 via-white to-white border-amber-200/90 shadow-2xs hover:shadow-md' 
                        : 'bg-white border-slate-200 hover:border-[#0B2A52]/40 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase text-[#C99A2E]">
                            Step {String(step.num).padStart(2, '0')}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="text-[11px] font-mono text-slate-500">
                            {phases.find(p => p.id === step.phaseId)?.name.split(':')[0]}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#0B2A52] font-display mt-0.5">
                          {step.title}
                        </h3>
                        <p className="text-xs font-medium text-slate-500">
                          {step.tagline}
                        </p>
                      </div>

                      {step.actionText && (
                        <button
                          type="button"
                          onClick={() => handleAction(step.actionType)}
                          className={`py-2 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                            step.actionType === 'admission'
                              ? 'bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52]'
                              : step.actionType === 'test'
                              ? 'bg-[#0B2A52] hover:bg-[#123E73] text-[#E5C66B]'
                              : 'bg-slate-100 hover:bg-slate-200 text-[#0B2A52]'
                          }`}
                        >
                          {step.actionType === 'test' && <Sparkles className="w-3.5 h-3.5 text-[#E5C66B]" />}
                          {step.actionType === 'admission' && <FileText className="w-3.5 h-3.5" />}
                          <span>{step.actionText}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>

                    {/* Entrance Exam Badges */}
                    {step.exams && (
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <span className="text-[11px] font-mono font-bold uppercase text-slate-400 block mb-1.5">
                          Entrance Exam Support:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {step.exams.map(exam => (
                            <span 
                              key={exam}
                              className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-[#0B2A52] font-bold text-[11px] rounded"
                            >
                              {exam}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Highlights bullet strip */}
                    <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {step.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A2E] shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Downward indicator between cards */}
                  {!isLast && (
                    <div className="flex justify-center py-1">
                      <ArrowDown className="w-4 h-4 text-[#C99A2E] opacity-70" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          BOTTOM ASSURANCE & ADMISSION CALL-TO-ACTION
          ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B2A52] via-[#0D3465] to-[#123E73] rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C66B] font-mono">
              BEGIN YOUR ADMISSION JOURNEY TODAY
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Ready to Navigate Your Career With Certainty?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Connect with certified CareerVerse India academic counsellors. We guide you through entrance exam planning, course finalisation, merit seat booking, and college reporting across 500+ accredited campuses nationwide.
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                if (onOpenAdmissionModal) onOpenAdmissionModal();
                else onOpenGuidanceModal();
              }}
              className="py-3.5 px-6 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>Admission Guidance Form</span>
            </button>
            <button
              type="button"
              onClick={onOpenCounsellingModal}
              className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 text-[#E5C66B]" />
              <span>Book Career Counselling</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
