import React from 'react';
import { Program } from '../../types';
import { MapPin, Clock, School, ArrowRight, GraduationCap } from 'lucide-react';

interface ProgramCardProps {
  program: Program;
  onSelectProgram: (slug: string) => void;
  onOpenAdmissionModal: (program: Program) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  onSelectProgram,
  onOpenAdmissionModal
}) => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl border border-slate-200/90 hover:border-[#0B2A52]/40 shadow-xs hover:shadow-md transition-all duration-200 p-6 text-left group">
      <div>
        {/* Zero-Pill Metadata Line */}
        <div className="flex items-center flex-wrap gap-2 text-xs font-medium text-slate-500 mb-2.5">
          <span className="text-[#0B2A52] font-semibold">{program.level}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{program.field}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-slate-600">{program.mode}</span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelectProgram(program.slug)}
          className="text-lg font-bold text-[#0B2A52] font-display hover:text-[#C99A2E] cursor-pointer transition-colors leading-snug"
        >
          {program.name}
        </h3>

        {/* University & Location */}
        <div className="mt-2 space-y-1 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <School className="w-3.5 h-3.5 text-[#C99A2E] shrink-0" />
            <span className="truncate">{program.university_name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{program.location}</span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {program.overview}
        </p>

        {/* Key Quick Facts */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{program.duration}</span>
          </div>
          <span className="font-medium text-slate-500">
            {program.mode}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onSelectProgram(program.slug)}
          className="flex-1 py-2 px-3 text-xs font-semibold text-[#0B2A52] bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onOpenAdmissionModal(program)}
          className="flex-1 py-2 px-3 text-xs font-bold text-[#0B2A52] bg-[#C99A2E] hover:bg-[#B88922] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <GraduationCap className="w-3.5 h-3.5 shrink-0" />
          <span>Get Guidance</span>
        </button>
      </div>
    </div>
  );
};
