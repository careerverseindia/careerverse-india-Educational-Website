import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenGuidanceModal: () => void;
  onOpenAdmissionModal: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenGuidanceModal,
  onOpenAdmissionModal,
  onOpenAdmin
}) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#051429] text-white border-t border-slate-800">
      {/* Top Banner CTA */}
      <div className="border-b border-slate-800/80 bg-[#0B2A52]/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Ready to take the next step in your career journey?
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Speak with a certified CareerVerse India counsellor today. No obligation, 100% confidential.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenGuidanceModal}
              className="py-3 px-6 text-xs sm:text-sm font-bold text-[#0B2A52] bg-[#C99A2E] hover:bg-[#B88922] rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Get Career Guidance
            </button>
            <button
              type="button"
              onClick={onOpenAdmissionModal}
              className="py-3 px-6 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors cursor-pointer"
            >
              Explore Admissions
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" size="lg" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm pt-2">
              CareerVerse India is dedicated to bridging the gap between student aspirations and higher education pathways. Providing scientific career counselling, stream roadmapping, and institutional admission guidance across undergraduate, postgraduate, and executive domains.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#E5C66B]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#C99A2E]" />
              <span>Certified Counsellors · Pan-India Institutional Network</span>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#C99A2E] uppercase font-mono mb-4">
              Explore Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <button 
                  onClick={() => handleNav('/career-counselling')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#C99A2E]" />
                  <span>Career Counselling</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/admissions')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#C99A2E]" />
                  <span>Admissions Guidance</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/programs')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#C99A2E]" />
                  <span>Programs & Finder</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/universities')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#C99A2E]" />
                  <span>Universities & Colleges</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & How It Works */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#C99A2E] uppercase font-mono mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <button 
                  onClick={() => handleNav('/how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#C99A2E]" />
                  <span>How It Works</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/student-journey')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-[#E5C66B] font-semibold"
                >
                  <ArrowRight className="w-3 h-3 text-[#C99A2E]" />
                  <span>Student Journey</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/about')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#C99A2E]" />
                  <span>About CareerVerse</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/contact')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#C99A2E]" />
                  <span>Contact Information</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Channels */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#C99A2E] uppercase font-mono mb-4">
              Admissions Desk
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C99A2E] shrink-0 mt-0.5" />
                <span>23-11-271, S V Nagar, Revenue Ward No. 23, Tirupati – 517501</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C99A2E] shrink-0" />
                <a href="mailto:enquiry@careerverseindia.com" className="hover:text-[#E5C66B] transition-colors">
                  enquiry@careerverseindia.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C99A2E] shrink-0" />
                <a href="tel:+916303464800" className="hover:text-[#E5C66B] transition-colors">
                  +91 63034 64800
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C99A2E] shrink-0" />
                <span>Mon – Sat: 9:30 AM – 6:30 PM IST</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} CareerVerse India. All rights reserved. Guiding Careers. Building Futures.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Lead Generation & Admission Guidance Architecture</span>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
              title="CareerVerse Staff Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
