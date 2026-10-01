import React, { useState, useRef, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Menu, X, CalendarCheck, GraduationCap, Shield, ChevronDown, Compass, MapPin } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenCounsellingModal: () => void;
  onOpenAdmissionModal: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenCounsellingModal,
  onOpenAdmissionModal,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [howItWorksDropdown, setHowItWorksDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setHowItWorksDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Career Pathways', path: '/career-counselling' },
    { label: 'Admissions', path: '/admissions' },
    { label: 'Universities & Colleges', path: '/universities' },
    { 
      label: 'How It Works', 
      path: '/how-it-works',
      children: [
        { label: 'How It Works Overview', path: '/how-it-works', desc: 'Process Architecture & FAQs' },
        { label: 'Student Journey', path: '/student-journey', desc: 'Animated 21-Step Roadmap' }
      ]
    },
    { label: 'About CareerVerse', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setHowItWorksDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleLinkClick('/')}
            className="cursor-pointer py-1"
          >
            <BrandLogo size="md" variant="dark" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {navLinks.map((link) => {
              const hasChildren = Boolean(link.children && link.children.length > 0);
              const isChildActive = hasChildren && link.children?.some(c => currentPath === c.path);
              const isActive = currentPath === link.path || isChildActive || (link.path === '/programs' && (currentPath.startsWith('/programs') || currentPath.startsWith('/universities')));

              if (hasChildren) {
                return (
                  <div 
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => setHowItWorksDropdown(true)}
                    onMouseLeave={() => setHowItWorksDropdown(false)}
                    ref={dropdownRef}
                  >
                    <button
                      type="button"
                      onClick={() => setHowItWorksDropdown(prev => !prev)}
                      className={`text-xs font-semibold tracking-wide transition-colors relative py-1 cursor-pointer flex items-center gap-1 ${
                        isActive 
                          ? 'text-[#0B2A52] font-bold' 
                          : 'text-slate-600 hover:text-[#0B2A52]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${howItWorksDropdown ? 'rotate-180 text-[#C99A2E]' : 'text-slate-400'}`} />
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C99A2E] rounded-full" />
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {howItWorksDropdown && (
                      <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-fadeIn">
                        <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 p-2 space-y-1">
                          {link.children?.map(subItem => (
                            <button
                              key={subItem.path}
                              type="button"
                              onClick={() => handleLinkClick(subItem.path)}
                              className={`w-full text-left p-2.5 rounded-lg transition-colors cursor-pointer flex flex-col ${
                                currentPath === subItem.path
                                  ? 'bg-amber-50 text-[#0B2A52] font-bold border-l-2 border-[#C99A2E]'
                                  : 'hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#0B2A52]">
                                  {subItem.label}
                                </span>
                                {subItem.path === '/student-journey' && (
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#C99A2E]/20 text-[#0B2A52] font-extrabold">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-500 mt-0.5">
                                {subItem.desc}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-xs font-semibold tracking-wide transition-colors relative py-1 cursor-pointer ${
                    isActive 
                      ? 'text-[#0B2A52] font-bold' 
                      : 'text-slate-600 hover:text-[#0B2A52]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C99A2E] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenAdmissionModal}
              className="py-2.5 px-4 text-xs font-bold text-[#0B2A52] bg-slate-100 hover:bg-slate-200/80 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#0B2A52]" />
              <span>Get Admission Guidance</span>
            </button>

            <button
              type="button"
              onClick={onOpenCounsellingModal}
              className="py-2.5 px-4 text-xs font-bold text-[#0B2A52] bg-[#C99A2E] hover:bg-[#B88922] rounded-lg shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-[#0B2A52]" />
              <span>Book Counselling</span>
            </button>

            <button
              type="button"
              onClick={onOpenAdmin}
              className="p-2.5 text-slate-400 hover:text-[#0B2A52] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-200"
              title="Admin Portal Login"
              aria-label="Admin Portal Login"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              type="button"
              onClick={onOpenCounsellingModal}
              className="py-1.5 px-3 text-xs font-bold text-[#0B2A52] bg-[#C99A2E] rounded-lg shadow-xs cursor-pointer"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0B2A52] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const hasChildren = Boolean(link.children && link.children.length > 0);
              const isChildActive = hasChildren && link.children?.some(c => currentPath === c.path);
              const isActive = currentPath === link.path || isChildActive || (link.path === '/programs' && (currentPath.startsWith('/programs') || currentPath.startsWith('/universities')));

              if (hasChildren) {
                return (
                  <div key={link.path} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => handleLinkClick(link.path)}
                      className={`w-full text-left px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                        isActive 
                          ? 'bg-slate-100 text-[#0B2A52] font-bold border-l-4 border-[#C99A2E]' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.label}</span>
                    </button>
                    <div className="pl-4 pr-1 py-1 space-y-1 bg-slate-50/70 rounded-lg">
                      {link.children?.map(subItem => (
                        <button
                          key={subItem.path}
                          type="button"
                          onClick={() => handleLinkClick(subItem.path)}
                          className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center justify-between ${
                            currentPath === subItem.path
                              ? 'bg-amber-100/70 text-[#0B2A52] font-bold'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <span>{subItem.label}</span>
                          {subItem.path === '/student-journey' && (
                            <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-[#C99A2E]/20 text-[#0B2A52] font-bold">
                              NEW
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-left px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-slate-100 text-[#0B2A52] font-bold border-l-4 border-[#C99A2E]' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmissionModal();
              }}
              className="w-full py-3 px-4 text-sm font-bold text-[#0B2A52] bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Get Admission Guidance</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCounsellingModal();
              }}
              className="w-full py-3 px-4 text-sm font-bold text-[#0B2A52] bg-[#C99A2E] hover:bg-[#B88922] rounded-lg shadow-sm flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Career Counselling</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 px-3 text-xs text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>CareerVerse Staff Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
