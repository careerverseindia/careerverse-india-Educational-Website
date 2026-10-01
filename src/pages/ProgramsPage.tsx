import React, { useState } from 'react';
import { initialPrograms } from '../data/programsData';
import { ProgramCard } from '../components/cards/ProgramCard';
import { OnlineCertificationsSection } from '../components/sections/OnlineCertificationsSection';
import { Program, EducationLevel, StudyField, LocationType } from '../types';
import { Search, Filter, RotateCcw, Sparkles } from 'lucide-react';

interface ProgramsPageProps {
  onSelectProgram: (slug: string) => void;
  onOpenAdmissionModal: (program: Program | string) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onSelectProgram,
  onOpenAdmissionModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedField, setSelectedField] = useState('All Fields');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const levels = [
    'All Levels',
    'Undergraduate',
    'Diploma',
    'Certification',
    'PG Diploma',
    'Postgraduate',
    'Online Degree',
    'Executive MBA',
    'Executive PG Program'
  ];

  const fields = [
    'All Fields',
    'Medical & Allied Sciences',
    'Engineering & Technology',
    'Science & IT',
    'Commerce & Management',
    'Arts & Humanities',
    'Social Sciences',
    'Law'
  ];

  const locations = [
    'All Locations',
    'India',
    'Bangalore, Karnataka',
    'Delhi NCR',
    'Pune, Maharashtra',
    'Hyderabad, Telangana',
    'Mumbai, Maharashtra',
    'Online',
    'International'
  ];

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLevel('All Levels');
    setSelectedField('All Fields');
    setSelectedLocation('All Locations');
  };

  const filteredPrograms = initialPrograms.filter((prog) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = prog.name.toLowerCase().includes(q);
      const matchDesc = prog.overview.toLowerCase().includes(q);
      const matchUniv = prog.university_name.toLowerCase().includes(q);
      const matchSpec = prog.specializations.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchUniv && !matchSpec) return false;
    }

    if (selectedLevel !== 'All Levels') {
      if (prog.level !== selectedLevel) return false;
    }

    if (selectedField !== 'All Fields') {
      if (prog.field !== selectedField) return false;
    }

    if (selectedLocation !== 'All Locations') {
      if (selectedLocation === 'Online') {
        if (!prog.location.toLowerCase().includes('online')) return false;
      } else if (selectedLocation === 'India') {
        if (prog.location.toLowerCase().includes('international')) return false;
      } else {
        if (!prog.location.toLowerCase().includes(selectedLocation.toLowerCase().split(',')[0])) return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-12 pb-20">
      
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#0B2A52] to-[#123E73] text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#E5C66B] uppercase font-mono">
            Academic & Professional Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
            Find Your Program
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto">
            Discover accredited degrees, engineering programs, healthcare certifications, and online executive qualifications tailored to your career aspirations.
          </p>
        </div>
      </section>

      {/* Program Finder Filter Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 p-5 sm:p-7 space-y-4">
          
          {/* Top Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by degree name, specialization (e.g. AI, BPT, Finance), or university..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
            />
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">
                Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#0B2A52] outline-hidden cursor-pointer"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">
                Field
              </label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#0B2A52] outline-hidden cursor-pointer"
              >
                {fields.map((fld) => (
                  <option key={fld} value={fld}>{fld}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#0B2A52] outline-hidden cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Summary & Reset */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
            <div>
              Showing <span className="font-bold text-[#0B2A52]">{filteredPrograms.length}</span> programs matching your criteria
            </div>
            {(searchQuery || selectedLevel !== 'All Levels' || selectedField !== 'All Fields' || selectedLocation !== 'All Locations') && (
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1 text-[#0B2A52] hover:text-[#C99A2E] font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Programs List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPrograms.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-display">No matching programs found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search terms or relaxing one of the filters above.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="py-2 px-4 bg-[#0B2A52] text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onSelectProgram={onSelectProgram}
                onOpenAdmissionModal={onOpenAdmissionModal}
              />
            ))}
          </div>
        )}
      </section>

      {/* Online Certifications, Executive Programmes & Online Degrees Showcase */}
      <div className="border-t border-slate-200 bg-slate-50/50">
        <OnlineCertificationsSection 
          onOpenAdmissionModal={(name) => onOpenAdmissionModal(name || 'Executive Programme')} 
        />
      </div>

    </div>
  );
};
