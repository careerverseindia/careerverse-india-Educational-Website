import React from 'react';
import { motion } from 'framer-motion';
import { initialPrograms } from '../data/programsData';
import { initialUniversities } from '../data/universitiesData';
import { counsellingPathways, CounsellingPathway } from '../data/counsellingData';
import { ProgramCard } from '../components/cards/ProgramCard';
import { UniversityCard } from '../components/cards/UniversityCard';
import { StageCard } from '../components/cards/StageCard';
import { OnlineCertificationsSection } from '../components/sections/OnlineCertificationsSection';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/common/ScrollReveal';
import { Program } from '../types';
import { 
  Compass, 
  GraduationCap, 
  ArrowRight, 
  Target, 
  Building2, 
  PhoneCall, 
  Award,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Users,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenGuidanceModal: (initialStage?: string) => void;
  onOpenAdmissionModal: (program?: Program | string) => void;
  onOpenCounsellingModal: () => void;
  onSelectProgram: (slug: string) => void;
  onSelectPathway: (pathway: CounsellingPathway) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenGuidanceModal,
  onOpenAdmissionModal,
  onOpenCounsellingModal,
  onSelectProgram,
  onSelectPathway
}) => {
  const featuredPrograms = initialPrograms.filter(p => p.featured).slice(0, 3);

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* ========================================================
          SECTION 1: HERO SECTION
          ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B2A52] via-[#0D3466] to-[#071D3A] text-white pt-14 pb-20 sm:pt-20 sm:pb-28">
        {/* Subtle geometric grid backdrop */}
        <div 
          className="absolute inset-0 opacity-10 bg-[radial-gradient(#C99A2E_1px,transparent_1px)] [background-size:24px_24px]" 
          aria-hidden="true" 
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Column */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Unboxed Kicker */}
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#E5C66B] uppercase font-mono">
                <span>CareerVerse India</span>
                <span aria-hidden="true">·</span>
                <span>Guiding Careers. Building Futures.</span>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white leading-tight sm:leading-none">
                Your Career Starts With the Right Decision.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Career Counselling & Admission Support Across India for Students, Graduates and Working Professionals.
              </p>

              {/* Core Pillars Line */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#C99A2E]" />
                  <span>Guiding Students Across India</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#C99A2E]" />
                  <span>Stream & Course Discovery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#C99A2E]" />
                  <span>Direct Admission Support</span>
                </div>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenGuidanceModal()}
                  className="py-3.5 px-7 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-extrabold text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-5 h-5" />
                  <span>Get Career Guidance</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/programs')}
                  className="py-3.5 px-7 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-lg border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-5 h-5 text-[#E5C66B]" />
                  <span>Explore Programs</span>
                </button>
              </div>

              {/* Trust Metric Micro-line */}
              <div className="pt-3 text-xs text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C99A2E]" />
                <span>Zero registration hassle · Direct connect with accredited counsellors & partner campuses</span>
              </div>
            </motion.div>

            {/* Hero Visual Card / Trust Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 text-white space-y-6 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/15">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E5C66B] font-mono">
                    ADMISSIONS & COUNSELLING DESK
                  </span>
                  <span className="text-xs text-slate-300">Session 2026-27</span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#C99A2E]/20 text-[#E5C66B] flex items-center justify-center shrink-0 mt-0.5">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Stream & Degree Selection</div>
                      <div className="text-xs text-slate-300 mt-0.5">Custom psychometric mapping for Classes 8–10 and 11–12 boards.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#C99A2E]/20 text-[#E5C66B] flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Institutional Match & Verification</div>
                      <div className="text-xs text-slate-300 mt-0.5">Verified accreditation, NIRF benchmarks, and genuine placement track records.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#C99A2E]/20 text-[#E5C66B] flex items-center justify-center shrink-0 mt-0.5">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">1-on-1 Counsellor Touchpoint</div>
                      <div className="text-xs text-slate-300 mt-0.5">Personal interaction via video call, phone, or in-person regional desks.</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenCounsellingModal}
                    className="w-full py-3 bg-white text-[#0B2A52] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Schedule Free Assessment Call</span>
                    <ArrowRight className="w-4 h-4 text-[#C99A2E]" />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================
          ACHIEVEMENT COUNTERS (Requirement 1: 5000+ Students & 500+ Campuses)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            <div className="text-center pt-2 lg:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A52] font-display">
                5000+
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                Students Guided Across India
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Empowered with scientific counselling & clarity
              </div>
            </div>

            <div className="text-center pt-2 lg:pt-0 lg:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#C99A2E] font-display">
                1000+
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                Admissions Completed
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Across engineering, medical & management faculties
              </div>
            </div>

            <div className="text-center pt-4 lg:pt-0 lg:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A52] font-display">
                500+
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                Accredited Campuses
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                UGC, AICTE & NAAC accredited campuses
              </div>
            </div>

            <div className="text-center pt-4 lg:pt-0 lg:pl-6">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A52] font-display">
                100%
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                Independent Advice
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Zero commercial quotas · Student-first ethos
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: WHAT CAN WE HELP YOU WITH?
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#C99A2E] uppercase font-mono">
            Core Service Offerings
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#0B2A52] font-display">
            What Can We Help You With?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Whether you are at a career crossroads or looking for institutional admission assistance, CareerVerse India provides expert navigation.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.12}>
          
          {/* Card 1: Career Counselling */}
          <StaggerItem className="h-full">
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#0B2A52] p-8 sm:p-10 shadow-xs hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between group h-full"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#0B2A52] text-[#C99A2E] flex items-center justify-center mb-6 shadow-sm">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B2A52] font-display group-hover:text-[#123E73] transition-colors">
                  Career Counselling
                </h3>
                <p className="mt-3 text-base font-semibold text-slate-800">
                  "Discover your strengths, explore career options and choose the right pathway."
                </p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Objective, scientific evaluation for school students, college graduates, and working professionals. We analyze your cognitive aptitudes, intrinsic interests, and market trends so you make decisions with clarity and conviction.
                </p>

                <div className="mt-6 space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99A2E] shrink-0" />
                    <span>Stream selection for Class 10 & 11 students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99A2E] shrink-0" />
                    <span>Undergraduate degree and competitive exam roadmap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99A2E] shrink-0" />
                    <span>Mid-career growth and executive transition consulting</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/career-counselling')}
                  className="flex-1 py-3 px-4 bg-[#0B2A52] hover:bg-[#123E73] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Counselling</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenGuidanceModal()}
                  className="py-3 px-4 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Get Guidance
                </button>
              </div>
            </motion.div>
          </StaggerItem>

          {/* Card 2: Admissions */}
          <StaggerItem className="h-full">
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#0B2A52] p-8 sm:p-10 shadow-xs hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between group h-full"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#0B2A52] text-[#C99A2E] flex items-center justify-center mb-6 shadow-sm">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B2A52] font-display group-hover:text-[#123E73] transition-colors">
                  Admissions
                </h3>
                <p className="mt-3 text-base font-semibold text-slate-800">
                  "Find the right program and get support throughout your admission journey."
                </p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Direct institutional guidance across UGC-recognized universities, medical institutions, engineering faculties, and executive academies. We eliminate admission confusion with institutional comparisons, eligibility evaluations, and seat confirmation support.
                </p>

                <div className="mt-6 space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99A2E] shrink-0" />
                    <span>UG Degrees: Engineering, Medical, Commerce, Law & Sciences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99A2E] shrink-0" />
                    <span>UGC-DEB Accredited Online Degrees & Professional Diplomas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99A2E] shrink-0" />
                    <span>Executive MBAs for working managers and entrepreneurs</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/admissions')}
                  className="flex-1 py-3 px-4 bg-[#0B2A52] hover:bg-[#123E73] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Admissions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAdmissionModal()}
                  className="py-3 px-4 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Apply Support
                </button>
              </div>
            </motion.div>
          </StaggerItem>

        </StaggerContainer>
      </section>

      {/* ========================================================
          SECTION 3: FIND GUIDANCE FOR YOUR STAGE - CAREERVERSE PATHWAYS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#C99A2E] uppercase font-mono">
            CareerVerse Pathways
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#0B2A52] font-display">
            Find Guidance For Your Career Stage
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Every educational milestone comes with unique challenges. Choose your current phase to unlock targeted counselling and actionable clarity.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6" staggerDelay={0.08}>
          {counsellingPathways.map((pathway) => (
            <StaggerItem key={pathway.id} className="h-full">
              <StageCard
                pathway={pathway}
                onSelectStage={onSelectPathway}
                onOpenGuidanceModal={onOpenGuidanceModal}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ========================================================
          SECTION 4: EXPLORE PROGRAMS
          ======================================================== */}
      <section className="bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#C99A2E] uppercase font-mono">
                Verified Curricula
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#0B2A52] font-display">
                Explore Programs & Degrees
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
                Browse leading full-time campus degrees, specialized professional diplomas, and UGC-approved online executive programs.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/programs')}
              className="py-3 px-6 bg-[#0B2A52] hover:bg-[#123E73] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <span>Explore All Programs</span>
              <ArrowRight className="w-4 h-4 text-[#C99A2E]" />
            </button>
          </ScrollReveal>

          {/* Program Categories Quick Bar */}
          <ScrollReveal delay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
            <div className="bg-white p-6 rounded-xl border border-slate-200/80">
              <h3 className="text-base font-bold text-[#0B2A52] font-display mb-2">
                Undergraduate
              </h3>
              <p className="text-xs text-slate-500 mb-3">Foundational degrees across premier faculties</p>
              <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                <li>• Medical & Allied Sciences</li>
                <li>• Engineering & Technology</li>
                <li>• Science & IT</li>
                <li>• Commerce & Management</li>
                <li>• Arts, Humanities & Law</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80">
              <h3 className="text-base font-bold text-[#0B2A52] font-display mb-2">
                Professional Education
              </h3>
              <p className="text-xs text-slate-500 mb-3">Industry-recognized vocational credentials</p>
              <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                <li>• Hospital Administration Diplomas</li>
                <li>• Data Science & AI Certifications</li>
                <li>• Professional PG Diplomas</li>
                <li>• Digital Media & Communications</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80">
              <h3 className="text-base font-bold text-[#0B2A52] font-display mb-2">
                Higher & Executive Education
              </h3>
              <p className="text-xs text-slate-500 mb-3">Flexible learning for managers and leaders</p>
              <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
                <li>• Online Degrees (UGC-DEB Accredited)</li>
                <li>• Online PG Programs & MCAs</li>
                <li>• Executive MBA for Professionals</li>
                <li>• Senior Management Programs</li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Featured Programs Cards Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {featuredPrograms.map((prog) => (
              <StaggerItem key={prog.id} className="h-full">
                <ProgramCard
                  program={prog}
                  onSelectProgram={onSelectProgram}
                  onOpenAdmissionModal={onOpenAdmissionModal}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </section>

      {/* ========================================================
          ONLINE CERTIFICATIONS & EXECUTIVE PROGRAMMES SECTION
          ======================================================== */}
      <OnlineCertificationsSection 
        onOpenAdmissionModal={onOpenAdmissionModal} 
        onNavigate={onNavigate} 
      />

      {/* ========================================================
          SECTION 5: HOW CAREERVERSE WORKS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-[#C99A2E] uppercase font-mono">
            Transparent Workflow
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#0B2A52] font-display">
            How CareerVerse Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            A comprehensive 21-step structured journey from initial student enquiry to confirmed college reporting and alumni networking.
          </p>
          <div className="pt-3">
            <button
              type="button"
              onClick={() => onNavigate('/how-it-works')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2A52] hover:text-[#C99A2E] bg-amber-50 hover:bg-amber-100/70 border border-amber-200 px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <span>View Full 21-Step Process Flow</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C99A2E]" />
            </button>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left" staggerDelay={0.07}>
          
          <StaggerItem className="h-full">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#0B2A52] transition-colors relative h-full flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C99A2E] font-mono uppercase tracking-wider">PHASE 01</span>
                  <span className="text-[11px] font-semibold text-slate-500 font-mono">Steps 01–05</span>
                </div>
                <h3 className="text-base font-bold text-[#0B2A52] font-display">
                  Initial Discovery & Intake
                </h3>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">01.</span> Student Enquiry</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">02.</span> Enquiry Form</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">03.</span> Lead Qualification</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">04.</span> Career Counselling</li>
                  <li className="flex items-center gap-1.5 font-semibold text-[#0B2A52]"><span className="text-[#C99A2E] font-bold">05.</span> Psychometric Test + Guidance</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Profile Mapping</span>
                <span className="text-[#C99A2E] font-bold">↓</span>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem className="h-full">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#0B2A52] transition-colors relative h-full flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C99A2E] font-mono uppercase tracking-wider">PHASE 02</span>
                  <span className="text-[11px] font-semibold text-slate-500 font-mono">Steps 06–09</span>
                </div>
                <h3 className="text-base font-bold text-[#0B2A52] font-display">
                  Course & Entrance Planning
                </h3>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">06.</span> Course Finalisation</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">07.</span> Merit + Budget + Location</li>
                  <li className="flex items-center gap-1.5 font-semibold text-[#0B2A52]"><span className="text-[#C99A2E] font-bold">08.</span> Entrance Exam Planning</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">09.</span> College Shortlisting</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>JEE / NEET / CUET / CAT</span>
                <span className="text-[#C99A2E] font-bold">↓</span>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem className="h-full">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#0B2A52] transition-colors relative h-full flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C99A2E] font-mono uppercase tracking-wider">PHASE 03</span>
                  <span className="text-[11px] font-semibold text-slate-500 font-mono">Steps 10–16</span>
                </div>
                <h3 className="text-base font-bold text-[#0B2A52] font-display">
                  Application & Seat Allotment
                </h3>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">10.</span> Application / Registration</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">11.</span> Selection Process</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">12.</span> Offer / Seat Allotment</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">13.</span> Seat Blocking & Campus Visit</li>
                  <li className="flex items-center gap-1.5 font-semibold text-[#0B2A52]"><span className="text-[#C99A2E] font-bold">16.</span> Admission Confirmation</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Document Verification</span>
                <span className="text-[#C99A2E] font-bold">↓</span>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem className="h-full">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#0B2A52] transition-colors relative h-full flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C99A2E] font-mono uppercase tracking-wider">PHASE 04</span>
                  <span className="text-[11px] font-semibold text-slate-500 font-mono">Steps 17–21</span>
                </div>
                <h3 className="text-base font-bold text-[#0B2A52] font-display">
                  Onboarding & Lifetime Network
                </h3>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">17.</span> Pre-Joining Support</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">18.</span> College Reporting</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">19.</span> Orientation / Joining</li>
                  <li className="flex items-center gap-1.5"><span className="text-[#C99A2E] font-bold">20.</span> Post Admission Support</li>
                  <li className="flex items-center gap-1.5 font-semibold text-[#0B2A52]"><span className="text-[#C99A2E] font-bold">21.</span> Referral / Alumni Network</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Alumni Circle Access</span>
                <span className="text-emerald-600 font-bold">✓ Complete</span>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>

        {/* CTA Bar below roadmap */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onOpenAdmissionModal()}
            className="py-3 px-6 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-extrabold text-xs sm:text-sm rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Admission Guidance Form</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/student-journey')}
            className="py-3 px-6 bg-[#0B2A52] hover:bg-[#123E73] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#E5C66B]" />
            <span>Interactive Student Journey Roadmap</span>
            <ArrowRight className="w-4 h-4 text-[#C99A2E]" />
          </button>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: WHY CAREERVERSE?
          ======================================================== */}
      <section className="bg-[#0B2A52] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-[#E5C66B] uppercase font-mono">
              The CareerVerse Advantage
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold font-display text-white">
              Why CareerVerse India?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-200">
              Built on ethics, student-first advocacy, and deep domain intelligence across Indian and global higher education.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left" staggerDelay={0.08}>
            
            <StaggerItem className="h-full">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#C99A2E]/50 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#C99A2E]/20 text-[#E5C66B] flex items-center justify-center mb-4">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">Personalized Guidance</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    No cookie-cutter advice. Every student gets a custom roadmap aligned with their aptitude, interests, and family context.
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem className="h-full">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#C99A2E]/50 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#C99A2E]/20 text-[#E5C66B] flex items-center justify-center mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">Multiple Education Pathways</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    From full-time campus engineering to healthcare allied sciences, professional diplomas, and UGC-approved online master's degrees.
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem className="h-full">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#C99A2E]/50 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#C99A2E]/20 text-[#E5C66B] flex items-center justify-center mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">Student-Centric Approach</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    We prioritize what is best for the student’s career growth, not institutional commission quotas or inflated marketing brochures.
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem className="h-full">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#C99A2E]/50 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#C99A2E]/20 text-[#E5C66B] flex items-center justify-center mb-4">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">Program & Institution Discovery</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Objective comparisons of UGC recognition, NAAC ratings, campus facilities, faculty credentials, and genuine placement track records.
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem className="h-full">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#C99A2E]/50 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#C99A2E]/20 text-[#E5C66B] flex items-center justify-center mb-4">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">End-to-End Admission Support</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    From initial eligibility check to document verification, merit list tracking, scholarship queries, and enrolment confirmation.
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem className="h-full">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#C99A2E]/50 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#C99A2E]/20 text-[#E5C66B] flex items-center justify-center mb-4">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">Professional Counselling</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Trained, certified educational psychologists and admission strategists with over a decade of collective academic guidance experience.
                  </p>
                </div>
              </div>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: STRONG LEAD CTA
          ======================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal yOffset={24}>
          <div className="bg-gradient-to-r from-[#0B2A52] to-[#123E73] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-700 text-center space-y-6 relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5C66B] font-mono">
                Direct Counsellor Access
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                Not Sure What To Choose?
              </h2>
              <p className="text-base sm:text-lg text-slate-200">
                Get personalized guidance from a CareerVerse counsellor.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenCounsellingModal}
                className="py-3.5 px-8 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-extrabold text-base rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Talk to a Counsellor</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenGuidanceModal()}
                className="py-3.5 px-8 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-lg border border-white/20 transition-all cursor-pointer"
              >
                Submit Career Query
              </button>
            </div>

            <p className="text-xs text-slate-300 pt-2">
              No signup required. Our team will contact you within 24 business hours.
            </p>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
};
