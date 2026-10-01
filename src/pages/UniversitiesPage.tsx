import React, { useState, useEffect, useMemo } from 'react';
import { getStoredUniversities } from '../services/settingsService';
import { UniversityCard } from '../components/cards/UniversityCard';
import { Search, Building2, Award, ShieldCheck, MapPin, Filter, RotateCcw, GraduationCap, Globe, BookOpen, Layers } from 'lucide-react';
import { University } from '../types';

interface UniversitiesPageProps {
  onSelectUniversity: (slug: string) => void;
  onOpenAdmissionModal?: (universityName?: string) => void;
  onOpenCounsellingModal?: () => void;
}

export const CATEGORIES = [
  'All Institutions',
  'Engineering Colleges',
  'Online Universities',
  'Global Universities',
  'Executive Education Partners',
  'Professional Learning Partners'
] as const;

export const LOCATIONS = [
  'All Locations',
  'Bangalore, Karnataka',
  'Delhi NCR',
  'Maharashtra (Mumbai / Pune)',
  'Tamil Nadu',
  'Punjab & North India',
  'International / Global',
  'Online / Pan India'
] as const;

export const getInstitutionCategory = (univ: University): string => {
  if (univ.category === 'Engineering Colleges' || univ.category === 'Engineering Colleges & Universities') {
    return 'Engineering Colleges';
  }
  if (univ.category) return univ.category;
  const nameLower = univ.name.toLowerCase();
  const slugLower = univ.slug.toLowerCase();

  if (
    nameLower.includes('engineering') || 
    slugLower.includes('eng') ||
    nameLower.includes('rv ') || 
    nameLower.includes('bms') || 
    nameLower.includes('ramaiah') || 
    nameLower.includes('msrit') || 
    nameLower.includes('pes ') ||
    nameLower.includes('technology') ||
    nameLower.includes('rns') ||
    nameLower.includes('new horizon') ||
    nameLower.includes('amc') ||
    nameLower.includes('cmr') ||
    nameLower.includes('presidency') ||
    nameLower.includes('bnm') ||
    nameLower.includes('brindavan') ||
    nameLower.includes('akash') ||
    nameLower.includes('cambridge') ||
    nameLower.includes('east point') ||
    nameLower.includes('hkbk') ||
    nameLower.includes('gopalan') ||
    slugLower.includes('institute-of-technology')
  ) {
    return 'Engineering Colleges';
  }

  if (
    nameLower.includes('iim ') || 
    nameLower.includes('iit ') || 
    nameLower.includes('iiit') ||
    nameLower.includes('executive') || 
    nameLower.includes('liba') || 
    nameLower.includes('imt ') || 
    nameLower.includes('gim')
  ) {
    return 'Executive Education Partners';
  }

  if (
    nameLower.includes('waterloo') || 
    nameLower.includes('geneva') || 
    nameLower.includes('eu global') || 
    nameLower.includes('rushford') || 
    nameLower.includes('woolf') || 
    nameLower.includes('paris') || 
    nameLower.includes('escp') || 
    nameLower.includes('edgewood') || 
    nameLower.includes('davis') || 
    nameLower.includes('eimt') ||
    nameLower.includes('london') ||
    nameLower.includes('liverpool') ||
    nameLower.includes('applied management') ||
    nameLower.includes('golden gate')
  ) {
    return 'Global Universities';
  }

  if (
    nameLower.includes('upgrad') || 
    nameLower.includes('zell') || 
    nameLower.includes('lingaya')
  ) {
    return 'Professional Learning Partners';
  }

  return 'Online Universities';
};

export const UniversitiesPage: React.FC<UniversitiesPageProps> = ({
  onSelectUniversity,
  onOpenAdmissionModal,
  onOpenCounsellingModal
}) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Institutions');
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');

  useEffect(() => {
    setUniversities(getStoredUniversities());
  }, []);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Institutions');
    setSelectedLocation('All Locations');
  };

  const filteredUniversities = useMemo(() => {
    return universities.filter((univ) => {
      const cat = getInstitutionCategory(univ);

      // Category filter
      if (selectedCategory !== 'All Institutions' && cat !== selectedCategory) {
        return false;
      }

      // Location filter
      if (selectedLocation !== 'All Locations') {
        const locLower = (univ.location + ' ' + (univ.city || '') + ' ' + (univ.state || '')).toLowerCase();
        if (selectedLocation === 'Bangalore, Karnataka') {
          if (!locLower.includes('bangalore') && !locLower.includes('karnataka')) return false;
        } else if (selectedLocation === 'Delhi NCR') {
          if (!locLower.includes('noida') && !locLower.includes('delhi') && !locLower.includes('ghaziabad') && !locLower.includes('faridabad') && !locLower.includes('haryana')) return false;
        } else if (selectedLocation === 'Maharashtra (Mumbai / Pune)') {
          if (!locLower.includes('mumbai') && !locLower.includes('pune') && !locLower.includes('maharashtra')) return false;
        } else if (selectedLocation === 'Tamil Nadu') {
          if (!locLower.includes('tamil nadu') && !locLower.includes('chennai') && !locLower.includes('vellore') && !locLower.includes('coimbatore')) return false;
        } else if (selectedLocation === 'Punjab & North India') {
          if (!locLower.includes('punjab') && !locLower.includes('mohali') && !locLower.includes('jalandhar') && !locLower.includes('amritsar') && !locLower.includes('himachal') && !locLower.includes('uttarakhand')) return false;
        } else if (selectedLocation === 'International / Global') {
          if (!locLower.includes('usa') && !locLower.includes('canada') && !locLower.includes('switzerland') && !locLower.includes('france') && !locLower.includes('germany') && !locLower.includes('uk') && !locLower.includes('united kingdom') && !locLower.includes('malta')) return false;
        } else if (selectedLocation === 'Online / Pan India') {
          if (!univ.name.toLowerCase().includes('online') && !locLower.includes('online') && !locLower.includes('pan india')) return false;
        }
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = univ.name.toLowerCase().includes(q);
        const matchLoc = univ.location.toLowerCase().includes(q);
        const matchCity = (univ.city || '').toLowerCase().includes(q);
        const matchState = (univ.state || '').toLowerCase().includes(q);
        const matchAbout = univ.about.toLowerCase().includes(q);
        const matchAccreditation = univ.accreditation.toLowerCase().includes(q);
        const matchNaac = (univ.naac_grade || '').toLowerCase().includes(q);
        const matchCat = cat.toLowerCase().includes(q);
        const matchPrograms = univ.programs_available.some(p => p.toLowerCase().includes(q));

        if (!matchName && !matchLoc && !matchCity && !matchState && !matchAbout && !matchAccreditation && !matchNaac && !matchCat && !matchPrograms) {
          return false;
        }
      }

      return true;
    });
  }, [universities, searchQuery, selectedCategory, selectedLocation]);

  // Grouped institutions for sectioned display when "All Institutions" is selected and no search
  const isBrowseMode = selectedCategory === 'All Institutions' && !searchQuery.trim() && selectedLocation === 'All Locations';

  const grouped = useMemo(() => {
    const map: Record<string, University[]> = {
      'Engineering Colleges': [],
      'Online Universities': [],
      'Global Universities': [],
      'Executive Education Partners': [],
      'Professional Learning Partners': []
    };

    for (const u of universities) {
      const c = getInstitutionCategory(u);
      if (map[c]) {
        map[c].push(u);
      } else {
        map['Online Universities'].push(u);
      }
    }
    return map;
  }, [universities]);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#0B2A52] to-[#123E73] text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#E5C66B] uppercase font-mono">
            Verified Partner Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
            Top Partner Universities & Colleges
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto">
            Explore UGC-recognized institutions, autonomous technological institutes, top engineering colleges, and accredited online & global universities represented across India.
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 p-5 sm:p-7 space-y-5">
          
          {/* Top Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search universities, colleges (e.g. BMS, RVCE, Amity, IIM), location or programs..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B2A52] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-[#0B2A52]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Location and Active Filter Status Row */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-500 uppercase font-mono">Location:</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#0B2A52] outline-hidden cursor-pointer"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4 text-slate-500">
              <span>Showing <strong className="text-[#0B2A52]">{filteredUniversities.length}</strong> institutions</span>
              {(searchQuery || selectedCategory !== 'All Institutions' || selectedLocation !== 'All Locations') && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[#0B2A52] hover:text-[#C99A2E] font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Directory Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredUniversities.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-display">No institutions found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search criteria or resetting filters to browse all verified partners.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="py-2 px-4 bg-[#0B2A52] text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : isBrowseMode ? (
          /* Sectioned Browsing View */
          <div className="space-y-16">
            
            {/* 1. Online Universities */}
            {grouped['Online Universities'].length > 0 && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#C99A2E] uppercase font-mono tracking-wider">Accredited Digital Degrees</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-[#C99A2E]" />
                      <span>Online Universities</span>
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {grouped['Online Universities'].length} Institutions
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {grouped['Online Universities'].map((univ) => (
                    <UniversityCard
                      key={univ.id}
                      university={univ}
                      onSelectUniversity={onSelectUniversity}
                      onOpenAdmissionModal={onOpenAdmissionModal}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 2. Global Universities */}
            {grouped['Global Universities'].length > 0 && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#C99A2E] uppercase font-mono tracking-wider">International Credentials</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display flex items-center gap-2">
                      <Globe className="w-6 h-6 text-[#C99A2E]" />
                      <span>Global Universities</span>
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {grouped['Global Universities'].length} Institutions
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {grouped['Global Universities'].map((univ) => (
                    <UniversityCard
                      key={univ.id}
                      university={univ}
                      onSelectUniversity={onSelectUniversity}
                      onOpenAdmissionModal={onOpenAdmissionModal}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 3. Executive Education Partners */}
            {grouped['Executive Education Partners'].length > 0 && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#C99A2E] uppercase font-mono tracking-wider">Premier IITs, IIMs & Top Business Schools</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display flex items-center gap-2">
                      <Award className="w-6 h-6 text-[#C99A2E]" />
                      <span>Executive Education Partners</span>
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {grouped['Executive Education Partners'].length} Institutions
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {grouped['Executive Education Partners'].map((univ) => (
                    <UniversityCard
                      key={univ.id}
                      university={univ}
                      onSelectUniversity={onSelectUniversity}
                      onOpenAdmissionModal={onOpenAdmissionModal}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 4. Professional Learning Partners */}
            {grouped['Professional Learning Partners'].length > 0 && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#C99A2E] uppercase font-mono tracking-wider">Finance, Tech & Industry Certifications</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-[#C99A2E]" />
                      <span>Professional Learning Partners</span>
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {grouped['Professional Learning Partners'].length} Partners
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {grouped['Professional Learning Partners'].map((univ) => (
                    <UniversityCard
                      key={univ.id}
                      university={univ}
                      onSelectUniversity={onSelectUniversity}
                      onOpenAdmissionModal={onOpenAdmissionModal}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 5. Engineering Colleges */}
            {grouped['Engineering Colleges'].length > 0 && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#C99A2E] uppercase font-mono tracking-wider">Autonomous & Premier Technological Campuses</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display flex items-center gap-2">
                      <Building2 className="w-6 h-6 text-[#C99A2E]" />
                      <span>Engineering Colleges</span>
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {grouped['Engineering Colleges'].length} Campuses
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {grouped['Engineering Colleges'].map((univ) => (
                    <UniversityCard
                      key={univ.id}
                      university={univ}
                      onSelectUniversity={onSelectUniversity}
                      onOpenAdmissionModal={onOpenAdmissionModal}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Filtered Cards Grid */
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0B2A52] font-display">
                {selectedCategory !== 'All Institutions' ? selectedCategory : 'Matching Institutions'}
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {filteredUniversities.length} institutions matching filters
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUniversities.map((univ) => (
                <UniversityCard
                  key={univ.id}
                  university={univ}
                  onSelectUniversity={onSelectUniversity}
                  onOpenAdmissionModal={onOpenAdmissionModal}
                />
              ))}
            </div>
          </div>
        )}
      </section>

    </div>
  );
};
