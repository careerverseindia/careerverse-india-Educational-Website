import React from 'react';
import { Target, Compass, Award, ShieldCheck, Users, Building, HeartHandshake } from 'lucide-react';

interface AboutPageProps {
  onOpenGuidanceModal: () => void;
  onOpenCounsellingModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenGuidanceModal,
  onOpenCounsellingModal
}) => {
  return (
    <div className="space-y-16 pb-20 text-left">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0B2A52] to-[#123E73] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#E5C66B] uppercase font-mono">
            Our Purpose & Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
            About CareerVerse India
          </h1>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
            "Guiding Careers. Connecting Futures." — Empowering students, parents, and working professionals with objective career science and verified admission pathways.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B2A52] text-[#C99A2E] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0B2A52] font-display">Our Mission</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To eliminate educational confusion and predatory admission practices across India by delivering transparent, aptitude-based career counselling and verified university admissions guidance. We strive to ensure every student selects a stream, degree, and institution that unlocks their unique human potential.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B2A52] text-[#C99A2E] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0B2A52] font-display">Our Vision</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be India’s most trusted and respected career navigation institution, bridging the gap between student aspirations and global career demands through psychometric rigor, institutional integrity, and personalized mentorship.
            </p>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#C99A2E] uppercase font-mono">
              Operating Principles
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#0B2A52] font-display">
              Our Non-Negotiable Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#C99A2E]" />
              <h3 className="text-base font-bold text-[#0B2A52] font-display">Student-First Ethics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We never recommend a college or degree that is not in the candidate's authentic best interest.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <Award className="w-6 h-6 text-[#C99A2E]" />
              <h3 className="text-base font-bold text-[#0B2A52] font-display">Scientific Precision</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Decisions backed by multi-dimensional psychometric evaluations, spatial intelligence tests, and empirical job trends.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <Building className="w-6 h-6 text-[#C99A2E]" />
              <h3 className="text-base font-bold text-[#0B2A52] font-display">Statutory Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All partnered campuses undergo verification for UGC, AICTE, NAAC, and respective national statutory councils.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <HeartHandshake className="w-6 h-6 text-[#C99A2E]" />
              <h3 className="text-base font-bold text-[#0B2A52] font-display">Parental Partnership</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We bridge generational gaps, aligning parental financial expectations with the student’s natural strengths.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Leadership & Network Info */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Achievement Impact Strip */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div>
              <div className="text-3xl font-extrabold text-[#0B2A52] font-display">5000+</div>
              <div className="text-xs font-bold text-slate-700 mt-1">Students Guided Across India</div>
              <div className="text-[11px] text-slate-500">Pan India Presence</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-3xl font-extrabold text-[#C99A2E] font-display">1000+</div>
              <div className="text-xs font-bold text-slate-700 mt-1">Admissions Completed</div>
              <div className="text-[11px] text-slate-500">UG, PG & Online Degrees</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-3xl font-extrabold text-[#0B2A52] font-display">500+</div>
              <div className="text-xs font-bold text-slate-700 mt-1">Accredited Campuses</div>
              <div className="text-[11px] text-slate-500">UGC & NAAC Verified</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-3xl font-extrabold text-[#0B2A52] font-display">100%</div>
              <div className="text-xs font-bold text-slate-700 mt-1">Independent Advice</div>
              <div className="text-[11px] text-slate-500">Zero Commercial Quotas</div>
            </div>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C99A2E] flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B2A52] font-display">Career Counselling</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              1-on-1 personalized mentorship mapping authentic strengths, academic goals, and multi-year industry trajectories across emerging domains.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B2A52] flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B2A52] font-display">Psychometric Assessment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scientifically calibrated cognitive tests mapping spatial, numerical, verbal, and personality alignments followed by expert guidance debriefs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C99A2E] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B2A52] font-display">Admission Guidance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              End-to-end statutory institutional facilitation across 500+ accredited campuses nationwide with complete fee transparency and merit parity.
            </p>
          </div>
        </div>

        <div className="bg-[#0B2A52] text-white rounded-2xl p-8 sm:p-12 text-center space-y-4">
          <span className="text-xs font-bold text-[#E5C66B] uppercase tracking-widest font-mono">
            Pan India Presence · 5000+ Students Guided
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            A Pan-India Institutional Presence
          </h2>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
            With centralized counselling desks Across India and advisory ties across 500+ accredited Indian and global institutions, CareerVerse India provides accessible, world-class admission facilitation, career counselling, and psychometric assessments for students nationwide.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button
              type="button"
              onClick={onOpenCounsellingModal}
              className="py-3 px-6 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
            >
              Book 1-on-1 Guidance
            </button>
            <button
              type="button"
              onClick={onOpenGuidanceModal}
              className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-lg border border-white/20 transition-colors cursor-pointer"
            >
              Submit Student Enquiry
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
