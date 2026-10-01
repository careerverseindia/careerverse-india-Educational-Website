import React, { useState } from 'react';
import { University } from '../../types';
import { 
  getInstitutionLogoUrl, 
  getInstitutionDomain, 
  getInstitutionDdgLogoUrl 
} from '../../data/institutionLogos';
import { MapPin, Award, ArrowRight, Calendar, Trophy, FileText, Landmark } from 'lucide-react';

interface UniversityCardProps {
  university: University | {
    id?: string;
    slug?: string;
    name: string;
    logoUrl?: string;
    logo_url?: string;
    naacGrade?: string;
    naac_grade?: string;
    ranking?: string;
    established?: number | string;
    established_year?: number | string;
    city?: string;
    state?: string;
    location?: string;
    about?: string;
    programs_available?: string[];
    accreditation?: string;
    campus_highlights?: string[];
    admission_process?: string;
    important_dates?: string;
  };
  onSelectUniversity: (slug: string) => void;
  onOpenAdmissionModal?: (universityName?: string) => void;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({
  university,
  onSelectUniversity,
  onOpenAdmissionModal
}) => {
  const name = university.name;
  const slug = university.slug || university.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Normalized Data Model: name, logoUrl, naacGrade, ranking, established, city, state
  const resolvedLogoUrl = 
    ('logoUrl' in university && university.logoUrl ? university.logoUrl : '') ||
    (university.logo_url && !university.logo_url.includes('unsplash.com') ? university.logo_url : '') ||
    getInstitutionLogoUrl(slug, name);

  const naacGrade = ('naacGrade' in university ? university.naacGrade : undefined) || university.naac_grade;
  const ranking = university.ranking;
  const established = ('established' in university ? university.established : undefined) || university.established_year;

  const rawLocation = university.location || '';
  const city = university.city || rawLocation.split(',')[0]?.trim() || '';
  const state = university.state || rawLocation.split(',')[1]?.trim() || '';
  const cityStateDisplay = city && state ? `${city}, ${state}` : (city || state || rawLocation);

  const [currentLogo, setCurrentLogo] = useState<string>(resolvedLogoUrl);
  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageError = () => {
    // If primary logo fails, fallback to secondary DuckDuckGo icon
    const domain = getInstitutionDomain(slug, name);
    const ddgUrl = getInstitutionDdgLogoUrl(slug, name);
    if (currentLogo !== ddgUrl) {
      setCurrentLogo(ddgUrl);
    } else {
      // If all logo URLs fail, cleanly show professional placeholder icon without broken text
      setImageError(true);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-[#0B2A52]/40 shadow-xs hover:shadow-lg transition-all duration-300 p-6 text-center group">
      <div>
        {/* 1. LOGO IMAGE (Width: 80–120px, Height: auto, Maintain aspect ratio, Transparent background preferred, Center aligned, Responsive, Lazy loaded) */}
        <div className="w-full h-24 sm:h-28 bg-white rounded-xl border border-slate-100 flex items-center justify-center p-3 mb-4 shadow-2xs group-hover:border-slate-200 transition-colors overflow-hidden">
          {currentLogo && !imageError ? (
            <img
              src={currentLogo}
              alt={`${name} Logo`}
              loading="lazy"
              onError={handleImageError}
              className="w-[80px] sm:w-[100px] md:w-[110px] max-w-[120px] h-auto max-h-[84px] object-contain mx-auto transition-transform duration-300 group-hover:scale-105 bg-transparent"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#0B2A52] mx-auto shadow-2xs">
              <Landmark className="w-8 h-8 text-[#0B2A52]/80" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* MIDDLE SECTION */}
        <div className="space-y-3">
          {/* 2. INSTITUTION NAME */}
          <h3 
            onClick={() => onSelectUniversity(slug)}
            className="text-base sm:text-lg font-bold text-[#0B2A52] font-display hover:text-[#C99A2E] cursor-pointer transition-colors leading-snug line-clamp-2 min-h-[2.75rem] flex items-center justify-center"
            title={name}
          >
            {name}
          </h3>

          {/* 3. NAAC GRADE & 4. RANKING */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 min-h-[1.75rem]">
            {naacGrade && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-[#0B2A52] border border-amber-200/90 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-[#C99A2E]" />
                {naacGrade}
              </span>
            )}

            {ranking && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-900 border border-blue-100 shadow-2xs">
                <Trophy className="w-3.5 h-3.5 text-blue-600" />
                <span className="truncate max-w-[200px]">{ranking}</span>
              </span>
            )}
          </div>

          {/* 5. ESTABLISHED YEAR */}
          {established && (
            <div className="flex items-center justify-center text-xs text-slate-500 pt-0.5">
              <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Est. {established}
              </span>
            </div>
          )}

          {/* 6. CITY & STATE */}
          <div className="flex items-center justify-center text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-[#C99A2E] shrink-0" />
              <span>{cityStateDisplay}</span>
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
        {/* 7. GET ADMISSION GUIDANCE */}
        <button
          type="button"
          onClick={() => {
            if (onOpenAdmissionModal) {
              onOpenAdmissionModal(name);
            }
          }}
          className="w-full py-2.5 px-4 text-xs font-extrabold text-[#0B2A52] bg-[#C99A2E] hover:bg-[#B88922] rounded-xl transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span>Get Admission Guidance</span>
        </button>

        {/* 8. VIEW DETAILS */}
        <button
          type="button"
          onClick={() => onSelectUniversity(slug)}
          className="w-full py-1 text-[11px] font-semibold text-slate-500 hover:text-[#0B2A52] transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
        </button>
      </div>
    </div>
  );
};
