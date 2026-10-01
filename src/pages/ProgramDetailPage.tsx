import React from 'react';
import { Program } from '../types';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  School, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Users
} from 'lucide-react';

interface ProgramDetailPageProps {
  program: Program;
  onBack: () => void;
  onOpenAdmissionModal: (program: Program) => void;
  onSelectUniversity: (slug: string) => void;
}

export const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({
  program,
  onBack,
  onOpenAdmissionModal,
  onSelectUniversity
}) => {
  return (
    <div className="space-y-10 pb-20 text-left">
      
      {/* Top Breadcrumb & Hero */}
      <section className="bg-[#0B2A52] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Programs Catalog</span>
          </button>

          {/* Zero-Pill Metadata */}
          <div className="flex items-center flex-wrap gap-2 text-xs font-medium text-slate-300">
            <span className="text-[#E5C66B] font-bold">{program.level}</span>
            <span aria-hidden="true">·</span>
            <span>{program.field}</span>
            <span aria-hidden="true">·</span>
            <span>{program.mode}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
            {program.name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-200 pt-2">
            <div 
              onClick={() => onSelectUniversity(program.university_slug)}
              className="flex items-center gap-1.5 hover:text-[#E5C66B] cursor-pointer transition-colors"
            >
              <School className="w-4 h-4 text-[#C99A2E]" />
              <span className="font-semibold">{program.university_name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{program.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{program.duration}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Info Columns */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-3">
              <h2 className="text-xl font-bold text-[#0B2A52] font-display flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#C99A2E]" />
                <span>Program Overview</span>
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {program.overview}
              </p>
            </div>

            {/* Who Is This Program For? */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-3">
              <h2 className="text-xl font-bold text-[#0B2A52] font-display flex items-center gap-2">
                <Users className="w-5 h-5 text-[#C99A2E]" />
                <span>Who Is This Program For?</span>
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {program.who_is_it_for}
              </p>
            </div>

            {/* Specializations */}
            {program.specializations.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-bold text-[#0B2A52] font-display">
                  Available Specializations
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {program.specializations.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#C99A2E] shrink-0 mt-0.5" />
                      <span className="font-semibold">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum Highlights */}
            {program.curriculum_highlights.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-bold text-[#0B2A52] font-display">
                  Curriculum & Practical Pillars
                </h2>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {program.curriculum_highlights.map((curr, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#0B2A52] font-bold text-sm">›</span>
                      <span>{curr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Career Opportunities */}
            {program.career_opportunities.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-bold text-[#0B2A52] font-display flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#C99A2E]" />
                  <span>Career Opportunities & Roles</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {program.career_opportunities.map((role, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg text-xs font-semibold text-slate-800 border border-slate-100 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#C99A2E]" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admission Process */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-3">
              <h2 className="text-xl font-bold text-[#0B2A52] font-display">
                Admission Process
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {program.admission_process}
              </p>
            </div>

          </div>

          {/* Sticky Side Summary Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-5">
              
              <div className="space-y-3 text-xs text-slate-700">
                <div>
                  <span className="font-semibold text-slate-500 block">Eligibility:</span>
                  <span className="text-slate-800 font-medium">{program.eligibility}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block">Duration & Format:</span>
                  <span className="text-slate-800 font-medium">{program.duration} · {program.mode}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block">Intake / Important Dates:</span>
                  <span className="text-slate-800 font-medium">{program.important_dates}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  onClick={() => onOpenAdmissionModal(program)}
                  className="w-full py-3.5 px-4 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-extrabold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Get Admission Guidance</span>
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  Direct counselling via CareerVerse India. No student login required.
                </p>
              </div>

            </div>

            {/* University Link Card */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                INSTITUTION PARTNER
              </span>
              <h3 className="text-sm font-bold text-[#0B2A52]">
                {program.university_name}
              </h3>
              <p className="text-xs text-slate-600">
                Campus Location: {program.location}
              </p>
              <button
                type="button"
                onClick={() => onSelectUniversity(program.university_slug)}
                className="text-xs font-semibold text-[#0B2A52] hover:text-[#C99A2E] underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Full University Profile</span>
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
