import React from 'react';
import { CounsellingPathway } from '../../data/counsellingData';
import { ArrowRight, Compass, Sparkles, Target, Briefcase, TrendingUp } from 'lucide-react';

interface StageCardProps {
  pathway: CounsellingPathway;
  onSelectStage: (pathway: CounsellingPathway) => void;
  onOpenGuidanceModal: (stageBadge: string) => void;
}

export const StageCard: React.FC<StageCardProps> = ({
  pathway,
  onSelectStage,
  onOpenGuidanceModal
}) => {
  const getStageIcon = (stageNumber: string) => {
    switch (stageNumber) {
      case '01':
        return <Compass className="w-5 h-5 text-[#C99A2E]" />;
      case '02':
        return <Sparkles className="w-5 h-5 text-[#C99A2E]" />;
      case '03':
        return <Target className="w-5 h-5 text-[#C99A2E]" />;
      case '04':
        return <Briefcase className="w-5 h-5 text-[#C99A2E]" />;
      case '05':
      default:
        return <TrendingUp className="w-5 h-5 text-[#C99A2E]" />;
    }
  };

  const getStageActionWord = (stageNumber: string) => {
    switch (stageNumber) {
      case '01': return 'Explore';
      case '02': return 'Discover';
      case '03': return 'Choose';
      case '04': return 'Advance';
      case '05': return 'Grow';
      default: return 'Explore';
    }
  };

  return (
    <div className="flex flex-col justify-between bg-white rounded-xl border border-slate-200/90 hover:border-[#0B2A52]/40 shadow-xs hover:shadow-md transition-all duration-200 p-6 text-left group">
      <div>
        {/* Stage Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#0B2A52]/5 flex items-center justify-center">
            {getStageIcon(pathway.stageNumber)}
          </div>
          <span className="text-xs font-bold text-[#C99A2E] tracking-wider uppercase font-mono">
            Stage {pathway.stageNumber} · {getStageActionWord(pathway.stageNumber)}
          </span>
        </div>

        {/* Badge & Target */}
        <h3 className="text-xl font-bold text-[#0B2A52] font-display group-hover:text-[#123E73] transition-colors">
          {pathway.stageBadge}
        </h3>
        <p className="text-xs font-semibold text-slate-500 mt-0.5">
          {pathway.targetGroup}
        </p>

        {/* Title */}
        <h4 className="mt-3 text-sm font-semibold text-slate-800 leading-snug">
          {pathway.title}
        </h4>

        {/* Tagline */}
        <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
          {pathway.tagline}
        </p>

        {/* Core Services bullets */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
          {pathway.coreServices.slice(0, 2).map((service, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
              <span className="text-[#C99A2E] font-bold">›</span>
              <span className="line-clamp-1">{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onSelectStage(pathway)}
          className="flex-1 py-2 px-3 text-xs font-semibold text-[#0B2A52] bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>Pathway Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onOpenGuidanceModal(pathway.stageBadge)}
          className="flex-1 py-2 px-3 text-xs font-bold text-[#0B2A52] bg-[#C99A2E] hover:bg-[#B88922] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>Get Guidance</span>
        </button>
      </div>
    </div>
  );
};
