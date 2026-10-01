import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Modal } from './components/common/Modal';
import { CareerGuidanceForm } from './components/forms/CareerGuidanceForm';
import { AdmissionEnquiryForm } from './components/forms/AdmissionEnquiryForm';
import { CounsellingBookingForm } from './components/forms/CounsellingBookingForm';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Pages
import { HomePage } from './pages/HomePage';
import { CareerCounsellingPage } from './pages/CareerCounsellingPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';
import { UniversitiesPage } from './pages/UniversitiesPage';
import { UniversityDetailPage } from './pages/UniversityDetailPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { StudentJourneyPage } from './pages/StudentJourneyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Data
import { initialPrograms } from './data/programsData';
import { initialUniversities } from './data/universitiesData';
import { CounsellingPathway } from './data/counsellingData';
import { Program, CounsellingStage } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Modal States
  const [guidanceModal, setGuidanceModal] = useState<{ open: boolean; stage?: string }>({ open: false });
  const [admissionModal, setAdmissionModal] = useState<{ open: boolean; programName?: string; location?: string }>({ open: false });
  const [counsellingModal, setCounsellingModal] = useState<{ open: boolean; category?: CounsellingStage }>({ open: false });
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    return window.location.pathname === '/admin' || window.location.hash === '#admin';
  });

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      if (path === '/admin' || window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentPath === '/admin' || window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Helper Modal Openers
  const openGuidanceModal = (initialStage?: string) => {
    setGuidanceModal({ open: true, stage: initialStage });
  };

  const openAdmissionModal = (programOrName?: Program | string) => {
    if (typeof programOrName === 'string') {
      setAdmissionModal({ open: true, programName: programOrName });
    } else if (programOrName && typeof programOrName === 'object') {
      setAdmissionModal({ open: true, programName: programOrName.name, location: programOrName.location });
    } else {
      setAdmissionModal({ open: true });
    }
  };

  const openCounsellingModal = (category?: CounsellingStage) => {
    setCounsellingModal({ open: true, category: category || 'Classes 11–12' });
  };

  // Selected Program and University from path
  const isProgramDetail = currentPath.startsWith('/programs/') && currentPath.length > 10;
  const programSlug = isProgramDetail ? currentPath.replace('/programs/', '') : null;
  const selectedProgram = programSlug ? initialPrograms.find(p => p.slug === programSlug) : null;

  const isUniversityDetail = currentPath.startsWith('/universities/') && currentPath.length > 14;
  const universitySlug = isUniversityDetail ? currentPath.replace('/universities/', '') : null;
  const selectedUniversity = universitySlug ? initialUniversities.find(u => u.slug === universitySlug) : null;

  const renderCurrentPage = () => {
    // Program Detail View
    if (isProgramDetail && selectedProgram) {
      return (
        <ProgramDetailPage
          program={selectedProgram}
          onBack={() => navigate('/programs')}
          onOpenAdmissionModal={openAdmissionModal}
          onSelectUniversity={(slug) => navigate(`/universities/${slug}`)}
        />
      );
    }

    // University Detail View
    if (isUniversityDetail && selectedUniversity) {
      return (
        <UniversityDetailPage
          university={selectedUniversity}
          onBack={() => navigate('/universities')}
          onOpenAdmissionModal={openAdmissionModal}
          onOpenCounsellingModal={() => openCounsellingModal()}
          onSelectProgram={(slug) => navigate(`/programs/${slug}`)}
        />
      );
    }

    // Route Switcher
    switch (currentPath) {
      case '/':
        return (
          <HomePage
            onNavigate={navigate}
            onOpenGuidanceModal={openGuidanceModal}
            onOpenAdmissionModal={openAdmissionModal}
            onOpenCounsellingModal={() => openCounsellingModal()}
            onSelectProgram={(slug) => navigate(`/programs/${slug}`)}
            onSelectPathway={(_pathway: CounsellingPathway) => {
              navigate('/career-counselling');
            }}
          />
        );

      case '/career-counselling':
      case '/career-pathways':
        return (
          <CareerCounsellingPage
            onOpenGuidanceModal={openGuidanceModal}
            onOpenAdmissionModal={openAdmissionModal}
            onOpenCounsellingModal={() => openCounsellingModal()}
            onNavigate={navigate}
          />
        );

      case '/admissions':
        return (
          <AdmissionsPage
            onOpenAdmissionModal={openAdmissionModal}
            onNavigate={navigate}
          />
        );

      case '/programs':
        return (
          <ProgramsPage
            onSelectProgram={(slug) => navigate(`/programs/${slug}`)}
            onOpenAdmissionModal={openAdmissionModal}
          />
        );

      case '/universities':
        return (
          <UniversitiesPage
            onSelectUniversity={(slug) => navigate(`/universities/${slug}`)}
            onOpenAdmissionModal={openAdmissionModal}
            onOpenCounsellingModal={() => openCounsellingModal()}
          />
        );

      case '/how-it-works':
        return (
          <HowItWorksPage
            onOpenGuidanceModal={openGuidanceModal}
            onOpenCounsellingModal={() => openCounsellingModal()}
            onOpenAdmissionModal={openAdmissionModal}
            onNavigate={navigate}
          />
        );

      case '/student-journey':
        return (
          <StudentJourneyPage
            onOpenGuidanceModal={openGuidanceModal}
            onOpenCounsellingModal={() => openCounsellingModal()}
            onOpenAdmissionModal={openAdmissionModal}
            onNavigate={navigate}
          />
        );

      case '/about':
        return (
          <AboutPage
            onOpenGuidanceModal={openGuidanceModal}
            onOpenCounsellingModal={() => openCounsellingModal()}
          />
        );

      case '/contact':
        return <ContactPage />;

      default:
        return (
          <HomePage
            onNavigate={navigate}
            onOpenGuidanceModal={openGuidanceModal}
            onOpenAdmissionModal={openAdmissionModal}
            onOpenCounsellingModal={() => openCounsellingModal()}
            onSelectProgram={(slug) => navigate(`/programs/${slug}`)}
            onSelectPathway={(_pathway: CounsellingPathway) => {
              navigate('/career-counselling');
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-slate-900 font-sans selection:bg-[#C99A2E] selection:text-[#0B2A52]">
      
      {/* Main Top Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenCounsellingModal={() => openCounsellingModal()}
        onOpenAdmissionModal={() => openAdmissionModal()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Page Routing with framer-motion page transition */}
      <main className="flex-1 relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{
              duration: 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full"
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigate}
        onOpenGuidanceModal={() => openGuidanceModal()}
        onOpenAdmissionModal={() => openAdmissionModal()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Career Guidance Modal */}
      <Modal
        isOpen={guidanceModal.open}
        onClose={() => setGuidanceModal({ open: false })}
        title="Get Career Guidance"
        subtitle="Speak with certified career counsellors. No registration or account required."
      >
        <CareerGuidanceForm
          initialStage={guidanceModal.stage}
          onSuccessClose={() => setGuidanceModal({ open: false })}
        />
      </Modal>

      {/* Admission Guidance Modal */}
      <Modal
        isOpen={admissionModal.open}
        onClose={() => setAdmissionModal({ open: false })}
        title="Request Admission Guidance"
        subtitle="Direct institutional guidance across UGC-recognized degrees & professional programs."
      >
        <AdmissionEnquiryForm
          initialProgramName={admissionModal.programName}
          initialLocation={admissionModal.location}
          onSuccessClose={() => setAdmissionModal({ open: false })}
        />
      </Modal>

      {/* Counselling Booking Modal */}
      <Modal
        isOpen={counsellingModal.open}
        onClose={() => setCounsellingModal({ open: false })}
        title="Book Career Counselling"
        subtitle="1-on-1 personalized counselling for students, graduates and working professionals."
      >
        <CounsellingBookingForm
          initialCategory={counsellingModal.category}
          onSuccessClose={() => setCounsellingModal({ open: false })}
        />
      </Modal>

      {/* Protected Admin Portal */}
      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}

    </div>
  );
}
