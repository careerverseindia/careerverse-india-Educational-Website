import React, { useState } from 'react';
import { University } from '../types';
import { initialPrograms } from '../data/programsData';
import { getInstitutionLogoUrl } from '../data/institutionLogos';
import { 
  ArrowLeft, 
  MapPin, 
  Award, 
  Building2, 
  CheckCircle2, 
  PhoneCall, 
  BookOpen,
  Calendar,
  Trophy,
  GraduationCap,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';

interface UniversityDetailPageProps {
  university: University;
  onBack: () => void;
  onOpenAdmissionModal: (universityName?: string) => void;
  onOpenCounsellingModal: () => void;
  onSelectProgram: (slug: string) => void;
}

export const UniversityDetailPage: React.FC<UniversityDetailPageProps> = ({
  university,
  onBack,
  onOpenAdmissionModal,
  onOpenCounsellingModal,
  onSelectProgram
}) => {
  const [logoError, setLogoError] = useState(false);

  // Deriving initials for logo fallback
  const initials = university.name
    .split(' ')
    .filter(word => !['of', '&', 'and', 'the', 'in'].includes(word.toLowerCase()))
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase() || 'CV';

  const city = university.city || university.location.split(',')[0]?.trim();
  const state = university.state || university.location.split(',')[1]?.trim() || '';
  const locationDisplay = city && state ? `${city}, ${state}` : university.location;

  // Fallback banner image if not defined
  const bannerImage = university.banner_url || 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&auto=format&fit=crop&q=80';

  return (
    <div className="space-y-12 pb-20 text-left">
      
      {/* ========================================================
          HERO & BANNER IMAGE SECTION (Requirement 7)
          ======================================================== */}
      <section className="relative overflow-hidden bg-[#071D3A]">
        {/* Banner Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bannerImage}
            alt={`${university.name} Campus Banner`}
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071D3A] via-[#0B2A52]/90 to-[#071D3A]/95" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-white space-y-6">
          {/* Back Button */}
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 text-[#C99A2E]" />
            <span>Back to University Directory</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center gap-6 pt-2">
            {/* University Logo */}
            {(getInstitutionLogoUrl(university.slug, university.name) || university.logo_url) && !logoError ? (
              <img
                src={getInstitutionLogoUrl(university.slug, university.name) || university.logo_url}
                alt={`${university.name} Logo`}
                loading="lazy"
                onError={() => setLogoError(true)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-contain border-2 border-white/20 bg-white p-2 shadow-xl shrink-0"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#0B2A52] to-[#123E73] text-[#E5C66B] flex items-center justify-center border-2 border-white/20 shadow-xl shrink-0">
                <Building2 className="w-10 h-10 text-[#E5C66B]" aria-hidden="true" />
              </div>
            )}

            {/* University Meta & Title */}
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-1.5 font-sans font-medium text-slate-200">
                  <MapPin className="w-4 h-4 text-[#C99A2E] shrink-0" />
                  <span>{locationDisplay}</span>
                </span>
                {university.established_year && (
                  <>
                    <span className="text-slate-500">·</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Established {university.established_year}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
                {university.name}
              </h1>

              {/* NAAC Grade & Ranking Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                {university.naac_grade && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-[#C99A2E]/20 text-[#E5C66B] border border-[#C99A2E]/40">
                    <Award className="w-4 h-4 text-[#C99A2E]" />
                    {university.naac_grade}
                  </span>
                )}

                {university.ranking && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white/10 text-slate-100 border border-white/20">
                    <Trophy className="w-4 h-4 text-blue-300" />
                    <span>{university.ranking}</span>
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs text-slate-300 bg-white/5 border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-[#C99A2E]" />
                  <span>{university.accreditation}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          MAIN CONTENT BODY (Requirements 7, 8, 11)
          ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols): Info, Courses, Admission, Facilities, Gallery */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. About University */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-3.5 shadow-2xs">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#C99A2E]" />
                <span>About the University</span>
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {university.about}
              </p>
              {university.short_description && university.short_description !== university.about && (
                <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                  {university.short_description}
                </p>
              )}
            </div>

            {/* 2. Courses Offered (Requirement 7) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#C99A2E]" />
                  <span>Courses Offered</span>
                </h2>
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  {university.programs_available.length} Programs
                </span>
              </div>

              <p className="text-xs text-slate-600">
                The following programs are offered with admission guidance, merit assessment, and documentation support through CareerVerse:
              </p>

              <div className="space-y-3">
                {university.programs_available.map((progName, i) => {
                  const matched = initialPrograms.find(p => p.name === progName);
                  return (
                    <div 
                      key={i} 
                      className="p-4 bg-slate-50 hover:bg-slate-100/90 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#C99A2E]" />
                          <h3 className="text-sm font-bold text-[#0B2A52]">{progName}</h3>
                        </div>
                        {matched && (
                          <div className="text-xs text-slate-500 mt-1 pl-4 flex items-center gap-2">
                            <span>{matched.level}</span>
                            <span>·</span>
                            <span>{matched.duration}</span>
                            <span>·</span>
                            <span className="text-slate-600 font-medium">{matched.mode}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        {matched && (
                          <button
                            type="button"
                            onClick={() => onSelectProgram(matched.slug)}
                            className="py-1.5 px-3 bg-slate-200 hover:bg-slate-300 text-[#0B2A52] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                          >
                            View Curriculum
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onOpenAdmissionModal(progName)}
                          className="py-1.5 px-3.5 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Enquire
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Admission Information (Requirement 7) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-2xs">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#C99A2E]" />
                <span>Admission Information</span>
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed">
                {university.admission_process}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-[#0B2A52] block font-display">1. Eligibility Screening</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Preliminary verification of 10+2 / Graduation percentages and qualifying entrance scores.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-[#0B2A52] block font-display">2. Counselling Session</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Personalized alignment on branch suitability, campus culture, and career prospects.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-[#0B2A52] block font-display">3. Seat Confirmation</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    End-to-end documentation coordination directly with university admissions office.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Campus Facilities & Highlights */}
            {university.campus_highlights && university.campus_highlights.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-2xs">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C99A2E]" />
                  <span>Campus Facilities & Highlights</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {university.campus_highlights.map((high, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#C99A2E] shrink-0 mt-0.5" />
                      <span className="font-medium">{high}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sticky Column (4 cols): Quick Facts & Primary CTAs */}
          <div className="lg:col-span-4 sticky top-28 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6">
              
              <div className="space-y-4 pb-4 border-b border-slate-100 text-xs text-slate-700">
                <h3 className="font-bold text-sm text-[#0B2A52] font-display uppercase tracking-wider">
                  Quick Institutional Summary
                </h3>

                <div>
                  <span className="font-semibold text-slate-500 block text-[11px] uppercase tracking-wider font-mono">City & State</span>
                  <span className="text-slate-800 font-bold text-sm">{locationDisplay}</span>
                </div>

                {university.established_year && (
                  <div>
                    <span className="font-semibold text-slate-500 block text-[11px] uppercase tracking-wider font-mono">Established Year</span>
                    <span className="text-slate-800 font-bold text-sm">{university.established_year}</span>
                  </div>
                )}

                {university.naac_grade && (
                  <div>
                    <span className="font-semibold text-slate-500 block text-[11px] uppercase tracking-wider font-mono">NAAC Accreditation</span>
                    <span className="text-slate-800 font-bold text-sm flex items-center gap-1.5 mt-0.5">
                      <Award className="w-4 h-4 text-[#C99A2E]" />
                      {university.naac_grade}
                    </span>
                  </div>
                )}

                {university.ranking && (
                  <div>
                    <span className="font-semibold text-slate-500 block text-[11px] uppercase tracking-wider font-mono">Institutional Ranking</span>
                    <span className="text-slate-800 font-bold text-sm flex items-center gap-1.5 mt-0.5">
                      <Trophy className="w-4 h-4 text-blue-600" />
                      {university.ranking}
                    </span>
                  </div>
                )}

                <div>
                  <span className="font-semibold text-slate-500 block text-[11px] uppercase tracking-wider font-mono">Intake Status</span>
                  <span className="text-slate-800 font-medium text-xs flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {university.important_dates || 'Admissions currently underway'}
                  </span>
                </div>
              </div>

              {/* Exact Requested Button: Request Admission Guidance (Requirement 7) */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => onOpenAdmissionModal(university.name)}
                  className="w-full py-3.5 px-4 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-black text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-5 h-5 text-[#0B2A52]" />
                  <span>Request Admission Guidance</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenCounsellingModal}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-[#0B2A52] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#C99A2E]" />
                  <span>Book Counsellor Discussion</span>
                </button>

                <p className="text-[11px] text-center text-slate-500 leading-normal pt-1">
                  Direct connection with CareerVerse academic advisors. Zero student registration fees.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B2A52] to-[#123E73] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold text-[#E5C66B] uppercase font-mono tracking-wider">
              CAREERVERSE ADMISSIONS FACILITATION
            </span>
            <h3 className="text-2xl font-bold font-display text-white">
              Ready to Apply for {university.name}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Our counsellors verify your academic credentials, clarify seat availability, and coordinate admission documentation smoothly.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenAdmissionModal(university.name)}
            className="py-3.5 px-8 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-black text-sm sm:text-base rounded-xl shadow-md transition-all shrink-0 cursor-pointer whitespace-nowrap"
          >
            Request Admission Guidance
          </button>
        </div>
      </section>

    </div>
  );
};
