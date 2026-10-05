import React, { useState } from 'react';
import { 
  Compass, 
  Target, 
  Search, 
  UserCheck, 
  GraduationCap, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ClipboardCheck,
  Building,
  Calendar,
  Award,
  Users,
  MapPin,
  Sparkles,
  ExternalLink,
  PhoneCall,
  Check
} from 'lucide-react';
import { getSiteSettings } from '../services/settingsService';

interface HowItWorksPageProps {
  onOpenGuidanceModal: () => void;
  onOpenCounsellingModal: () => void;
  onOpenAdmissionModal?: (programName?: string) => void;
  onNavigate?: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onOpenGuidanceModal,
  onOpenCounsellingModal,
  onOpenAdmissionModal,
  onNavigate
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const settings = getSiteSettings();

  // The Exact 21 Steps Process Flow requested by user
  const processFlowSteps = [
    // Phase 1: Intake & Discovery (Steps 1 - 5)
    {
      num: 1,
      title: 'Student Enquiry',
      desc: 'First point of contact via CareerVerse platform, phone, WhatsApp or direct enquiry form submission.',
      phase: 'Phase 1: Initial Discovery & Intake',
      phaseId: 1,
      actionType: 'enquiry',
      actionLabel: 'Submit Enquiry'
    },
    {
      num: 2,
      title: 'Enquiry Form',
      desc: 'Student or parent shares academic credentials, board scores, field of interest, and career goals without needing an account.',
      phase: 'Phase 1: Initial Discovery & Intake',
      phaseId: 1,
      actionType: 'enquiry',
      actionLabel: 'Open Form'
    },
    {
      num: 3,
      title: 'Lead Qualification',
      desc: 'Academic advisory team evaluates profile details, eligibility parameters, subject requirements, and geographic preferences.',
      phase: 'Phase 1: Initial Discovery & Intake',
      phaseId: 1
    },
    {
      num: 4,
      title: 'Career Counselling',
      desc: 'Dedicated 1-on-1 personalized counselling session with certified education advisors exploring potential career pathways.',
      phase: 'Phase 1: Initial Discovery & Intake',
      phaseId: 1,
      actionType: 'counselling',
      actionLabel: 'Book Counselling'
    },
    {
      num: 5,
      title: 'Psychometric Test + Expert Guidance',
      desc: 'Scientifically calibrated assessment mapping cognitive aptitude, behavioural traits, and career alignment followed by expert debrief.',
      phase: 'Phase 1: Initial Discovery & Intake',
      phaseId: 1,
      actionType: 'test',
      actionLabel: 'Take Psychometric Test'
    },

    // Phase 2: Strategic Planning (Steps 6 - 9)
    {
      num: 6,
      title: 'Course Finalisation',
      desc: 'Locking in the ideal undergraduate, postgraduate, diploma or online degree matching student capabilities and market demand.',
      phase: 'Phase 2: Course & Entrance Planning',
      phaseId: 2
    },
    {
      num: 7,
      title: 'Merit + Budget + Location Analysis',
      desc: 'In-depth institutional evaluation comparing academic cut-offs, financial planning options, hostel accommodations, and city connectivity.',
      phase: 'Phase 2: Course & Entrance Planning',
      phaseId: 2
    },
    {
      num: 8,
      title: 'Entrance Exam Planning (JEE / NEET / CUET / CAT / GATE / COMEDK / PGCET / CET)',
      desc: 'Strategic preparation roadmap, exam timelines, mock score benchmarks, and backup institutional contingency plans.',
      phase: 'Phase 2: Course & Entrance Planning',
      phaseId: 2,
      highlightBadge: 'National & State Exams'
    },
    {
      num: 9,
      title: 'College Shortlisting',
      desc: 'Curating an objective list of verified UGC, NAAC-accredited, and NIRF-ranked partner universities and colleges across India.',
      phase: 'Phase 2: Course & Entrance Planning',
      phaseId: 2,
      actionType: 'directory',
      actionLabel: 'Browse Colleges'
    },

    // Phase 3: Application, Selection & Seat Allocation (Steps 10 - 16)
    {
      num: 10,
      title: 'Application / Registration',
      desc: 'End-to-end handholding through official application filing, portal registrations, and document attachments to avoid rejections.',
      phase: 'Phase 3: Application, Selection & Seat Allotment',
      phaseId: 3,
      actionType: 'admission',
      actionLabel: 'Admission Guidance Form'
    },
    {
      num: 11,
      title: 'Selection Process',
      desc: 'Tracking university merit lists, entrance cutoffs, group discussions, and personal interview rounds where applicable.',
      phase: 'Phase 3: Application, Selection & Seat Allotment',
      phaseId: 3
    },
    {
      num: 12,
      title: 'Offer / Seat Allotment',
      desc: 'Receipt of official provisional admission offer or centralized counselling seat allotment from the institution.',
      phase: 'Phase 3: Application, Selection & Seat Allotment',
      phaseId: 3
    },
    {
      num: 13,
      title: 'Seat Blocking',
      desc: 'Facilitating provisional fee deposit and seat blocking compliance within official institutional deadlines.',
      phase: 'Phase 3: Application, Selection & Seat Allotment',
      phaseId: 3
    },
    {
      num: 14,
      title: 'Campus Visit',
      desc: 'Arranging campus tours, hostel inspection, lab walk-throughs, and interactions with department heads and senior scholars.',
      phase: 'Phase 3: Application, Selection & Seat Allotment',
      phaseId: 3
    },
    {
      num: 15,
      title: 'Document Verification',
      desc: 'Rigorous pre-verification of 10th/12th marksheets, transfer certificates, migration, caste/category certificates, and ID proofs.',
      phase: 'Phase 3: Application, Selection & Seat Allotment',
      phaseId: 3
    },
    {
      num: 16,
      title: 'Admission Confirmation',
      desc: 'Formal verification sign-off, official fee receipt generation, and issuance of permanent university enrolment number.',
      phase: 'Phase 3: Application, Selection & Seat Allotment',
      phaseId: 3,
      actionType: 'admission',
      actionLabel: 'Admission Guidance Form'
    },

    // Phase 4: Onboarding, Transition & Lifetime Alumni Network (Steps 17 - 21)
    {
      num: 17,
      title: 'Pre-Joining Support',
      desc: 'Checklist guidance on hostel packing, textbook syllabi, laptop configurations, and preparatory bridge modules.',
      phase: 'Phase 4: Onboarding, Transition & Lifetime Alumni Network',
      phaseId: 4
    },
    {
      num: 18,
      title: 'College Reporting',
      desc: 'In-person physical reporting assistance at the college registrar office on the designated intake day.',
      phase: 'Phase 4: Onboarding, Transition & Lifetime Alumni Network',
      phaseId: 4
    },
    {
      num: 19,
      title: 'Orientation / Joining',
      desc: 'Attendance at the institutional orientation ceremony, campus onboarding, and first official lecture attendance.',
      phase: 'Phase 4: Onboarding, Transition & Lifetime Alumni Network',
      phaseId: 4
    },
    {
      num: 20,
      title: 'Post Admission Support',
      desc: 'Continuous advisory support during semester adjustments, academic mentoring queries, and hostel welfare check-ins.',
      phase: 'Phase 4: Onboarding, Transition & Lifetime Alumni Network',
      phaseId: 4
    },
    {
      num: 21,
      title: 'Referral / Alumni Network',
      desc: 'Lifelong inclusion into the CareerVerse Alumni Circle, corporate mentorship connections, and peer referral privileges.',
      phase: 'Phase 4: Onboarding, Transition & Lifetime Alumni Network',
      phaseId: 4
    }
  ];

  const handleAction = (type?: string) => {
    if (type === 'test') {
      const url = settings.psychometric_link || 'https://career-finder.universityadmission.co.in?id=M2UzZWVjNmItMzNlZi00NDZmLWExNGEtYTI1OGMxYTllNzZkMTYzM2UzZWVjNmItMzNlZi00NDZmLWExNGEtYTI1OGMxYTllNzZk';
      try {
        const win = window.open(url, '_blank', 'noopener,noreferrer');
        if (!win) {
          onOpenCounsellingModal();
        }
      } catch (err) {
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
      onNavigate('/universities');
    } else {
      onOpenGuidanceModal();
    }
  };

  const faqs = [
    {
      q: 'Do students or parents need to create an account or password to use CareerVerse?',
      a: 'No. CareerVerse India operates on an open lead-generation and advisory framework. You do not need to register an account, remember passwords, or navigate complicated student portals. Simply fill our short request form, and our internal counselling desk contacts you directly.'
    },
    {
      q: 'How does CareerVerse India maintain objectivity in recommending universities?',
      a: 'We evaluate institutions based on verifiable statutory metrics: UGC recognition, NAAC grading, NIRF participation, infrastructure quality, and actual placement records. Our counsellors are trained to recommend what fits the student’s career aspirations and potential rather than commercial quotas.'
    },
    {
      q: 'Can working professionals get guidance on Online Degrees and Executive MBAs?',
      a: 'Yes. We guide working professionals and career changers through UGC-DEB accredited online degrees, executive MBAs, and advanced certifications that accommodate working schedules while providing legitimate degree recognition.'
    },
    {
      q: 'What entrance exams does CareerVerse assist in planning for?',
      a: 'We provide structured planning and backup institutional counseling for JEE (Main & Advanced), NEET-UG, CUET, CAT, GATE, COMEDK, PGCET, and state CETs across India.'
    },
    {
      q: 'How quickly does the CareerVerse counselling desk respond after form submission?',
      a: 'Our admissions desk reviews incoming requests in real-time. A counsellor typically connects within 24 business hours to discuss your query and schedule an in-depth conversation.'
    }
  ];

  const phases = [
    { id: 1, title: 'Phase 1: Initial Discovery & Intake', range: 'Steps 01 – 05' },
    { id: 2, title: 'Phase 2: Course & Entrance Planning', range: 'Steps 06 – 09' },
    { id: 3, title: 'Phase 3: Application, Selection & Seat Allotment', range: 'Steps 10 – 16' },
    { id: 4, title: 'Phase 4: Onboarding, Transition & Lifetime Alumni Network', range: 'Steps 17 – 21' }
  ];

  return (
    <div className="space-y-16 pb-20 text-left">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0B2A52] to-[#123E73] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#E5C66B] uppercase font-mono">
            Structured End-to-End Roadmap
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
            How CareerVerse Works
          </h1>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
            From your very first enquiry to confirmed college reporting and lifetime alumni networking — our comprehensive 21-step process ensures complete transparency, scientific clarity, and reliable guidance at every milestone.
          </p>
          
          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-wrap justify-center items-center gap-3">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/student-journey')}
                className="py-3 px-6 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-extrabold text-sm rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#0B2A52]" />
                <span>Explore Student Journey Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (onOpenAdmissionModal) onOpenAdmissionModal();
                else onOpenGuidanceModal();
              }}
              className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-lg border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Admission Guidance Form</span>
            </button>

            <a
              href={settings.psychometric_link || 'https://career-finder.universityadmission.co.in?id=M2UzZWVjNmItMzNlZi00NDZmLWExNGEtYTI1OGMxYTllNzZkMTYzM2UzZWVjNmItMzNlZi00NDZmLWExNGEtYTI1OGMxYTllNzZk'}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-lg border border-white/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#E5C66B]" />
              <span>Take Psychometric Test</span>
            </a>

            <button
              type="button"
              onClick={onOpenCounsellingModal}
              className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-lg border border-white/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4 text-[#E5C66B]" />
              <span>Book Career Counselling</span>
            </button>
          </div>
        </div>
      </section>

      {/* 21-STEP PROCESS FLOW SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          
          <div className="mb-8 text-center sm:text-left border-b border-slate-100 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C99A2E] font-mono">
              ROADMAP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A52] font-display mt-1">
              CareerVerse 21-Step Process Flow
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Follow our sequential roadmap from enquiry to confirmed admission and alumni support.
            </p>
          </div>

          {/* Sequential 21 Steps Flow with Connected Arrows */}
          <div className="space-y-3">
            {processFlowSteps.map((step, idx) => {
              const isLast = idx === processFlowSteps.length - 1;
              const isFirstInPhase = idx === 0 || processFlowSteps[idx - 1].phaseId !== step.phaseId;
              const currentPhase = phases.find(p => p.id === step.phaseId);

              return (
                <div key={step.num}>
                  {/* Phase Header divider */}
                  {isFirstInPhase && currentPhase && (
                    <div className="pt-4 pb-2 mb-2 flex items-center justify-between border-b border-slate-200">
                      <span className="text-xs font-bold text-[#0B2A52] font-mono uppercase tracking-wider">
                        {currentPhase.title}
                      </span>
                      <span className="text-[11px] font-semibold text-[#C99A2E] bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200 font-mono">
                        {currentPhase.range}
                      </span>
                    </div>
                  )}

                  {/* Step Card */}
                  <div 
                    className={`rounded-xl border p-4 sm:p-5 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      step.num === 1 || step.num === 5 || step.num === 8 || step.num === 10 || step.num === 16 || step.num === 21
                        ? 'bg-gradient-to-r from-amber-50/50 to-white border-amber-300 shadow-2xs'
                        : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-[#0B2A52]/40'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-4 flex-1">
                      {/* Step Number Badge */}
                      <div 
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black font-mono text-sm shrink-0 shadow-2xs ${
                          step.num === 1 || step.num === 5 || step.num === 8 || step.num === 10 || step.num === 16 || step.num === 21
                            ? 'bg-[#0B2A52] text-[#E5C66B] ring-2 ring-[#C99A2E]/30' 
                            : 'bg-white border border-slate-300 text-[#0B2A52]'
                        }`}
                      >
                        {String(step.num).padStart(2, '0')}
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <h3 className="text-base font-bold text-[#0B2A52] font-display">
                            {step.title}
                          </h3>
                          {step.highlightBadge && (
                            <span className="text-xs font-semibold text-[#C99A2E] bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200">
                              {step.highlightBadge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* Action Button or Step Counter */}
                    <div className="shrink-0 flex items-center gap-2 self-stretch sm:self-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                      {step.actionType ? (
                        <button
                          type="button"
                          onClick={() => handleAction(step.actionType)}
                          className={`py-1.5 px-3.5 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-2xs inline-flex items-center gap-1.5 ${
                            step.actionType === 'admission'
                              ? 'bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52]'
                              : step.actionType === 'test'
                              ? 'bg-[#0B2A52] hover:bg-[#123E73] text-[#E5C66B]'
                              : 'bg-slate-100 hover:bg-slate-200 text-[#0B2A52]'
                          }`}
                        >
                          {step.actionType === 'test' && <Sparkles className="w-3.5 h-3.5 text-[#E5C66B]" />}
                          {step.actionType === 'admission' && <FileText className="w-3.5 h-3.5" />}
                          <span>{step.actionLabel}</span>
                          {step.actionType === 'test' && <ExternalLink className="w-3 h-3" />}
                        </button>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-400 font-medium">
                          Step {step.num} of 21
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Downward Arrow (↓) between each step */}
                  {!isLast && (
                    <div className="flex justify-center py-1">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-[#C99A2E] shadow-2xs">
                        <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Milestone Summary Card */}
          <div className="mt-10 p-6 bg-gradient-to-br from-[#0B2A52] to-[#123E73] rounded-xl text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-wider text-[#E5C66B] font-mono uppercase">
                Admissions & Counselling Desk
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Ready to Start Your Admission Journey?
              </h3>
              <p className="text-xs text-slate-200 max-w-xl">
                Submit the Admission Guidance Form to receive structured, objective counselling across accredited institutions in India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (onOpenAdmissionModal) onOpenAdmissionModal();
                  else onOpenGuidanceModal();
                }}
                className="py-3 px-6 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-extrabold text-sm rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <FileText className="w-4 h-4" />
                <span>Admission Guidance Form</span>
              </button>
              <a
                href={settings.psychometric_link || 'https://career-finder.universityadmission.co.in?id=M2UzZWVjNmItMzNlZi00NDZmLWExNGEtYTI1OGMxYTllNzZkMTYzM2UzZWVjNmItMzNlZi00NDZmLWExNGEtYTI1OGMxYTllNzZk'}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-lg border border-white/20 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>Take Psychometric Test</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E5C66B]" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold tracking-widest text-[#C99A2E] uppercase font-mono">
            Clear Answers
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#0B2A52] font-display">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0B2A52] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#C99A2E] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
