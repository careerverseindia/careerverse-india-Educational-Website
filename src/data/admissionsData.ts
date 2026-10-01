export interface AdmissionCategory {
  id: string;
  group: 'UG Admissions' | 'PG Admissions' | 'Diplomas & Professional Programs' | 'Online & Executive Education';
  name: string;
  tagline: string;
  description: string;
  keyDisciplines: string[];
  intakeTimeline: string;
  ctaText: string;
}

export const admissionCategories: AdmissionCategory[] = [
  // UG Admissions
  {
    id: 'ug-medical',
    group: 'UG Admissions',
    name: 'Medical & Allied Sciences',
    tagline: 'Healthcare, Clinical Care, Nursing, Pharmacy & Rehabilitation',
    description: 'Explore comprehensive admission support for medical, dental, allied health sciences, physiotherapy, pharmacy, and diagnostic healthcare institutions with clinical teaching hospitals.',
    keyDisciplines: ['MBBS & BDS', 'Bachelor of Physiotherapy (BPT)', 'B.Pharm & Pharm.D', 'B.Sc Nursing', 'Medical Laboratory Technology'],
    intakeTimeline: 'Academic Session 2026-27 Registrations Open',
    ctaText: 'Enquire for Medical & Allied Sciences'
  },
  {
    id: 'ug-engineering',
    group: 'UG Admissions',
    name: 'Engineering & Technology',
    tagline: 'AI, Computing, Robotics, Electronics & Core Engineering',
    description: 'Direct admission counselling into top engineering faculties offering modern curricula in artificial intelligence, software systems, robotics, and emerging technologies.',
    keyDisciplines: ['B.Tech Computer Science', 'B.Tech AI & Data Science', 'B.Tech Electronics & Communication', 'Mechanical & Robotics Engineering'],
    intakeTimeline: 'Direct Counselling & Merit Rounds Active',
    ctaText: 'Enquire for Engineering & Tech'
  },
  {
    id: 'ug-science-it',
    group: 'UG Admissions',
    name: 'Science & Information Technology',
    tagline: 'Software Applications, Data Science, Cloud & Applied Sciences',
    description: 'Admissions into cutting-edge BCA, B.Sc Computer Science, and Data Science programs providing direct industry placements in software firms and global capability centers.',
    keyDisciplines: ['Bachelor of Computer Applications (BCA)', 'B.Sc Data Science & Analytics', 'B.Sc Cyber Security', 'B.Sc Information Technology'],
    intakeTimeline: 'Rolling Admissions with early merit scholarships',
    ctaText: 'Enquire for Science & IT'
  },
  {
    id: 'ug-commerce-management',
    group: 'UG Admissions',
    name: 'Commerce & Management',
    tagline: 'Business Administration, Finance, Analytics & Marketing',
    description: 'Guidance into leading BBA, B.Com Honours, and Integrated Management programs that feature live corporate projects, Bloomberg terminal exposure, and corporate internships.',
    keyDisciplines: ['BBA Honours (Finance / Marketing / Analytics)', 'B.Com Honours in Banking & FinTech', 'Integrated BBA+MBA', 'B.Sc in Economics & Finance'],
    intakeTimeline: 'Current Intake Open - Limited Seats per Branch',
    ctaText: 'Enquire for Commerce & Management'
  },
  {
    id: 'ug-arts-humanities',
    group: 'UG Admissions',
    name: 'Arts, Humanities & Social Sciences',
    tagline: 'Psychology, Media Communications, Economics & Liberal Arts',
    description: 'Admission support for progressive universities offering multidisciplinary liberal arts, clinical psychology, digital media, journalism, and public policy programs.',
    keyDisciplines: ['BA Psychology (Honours)', 'BA Journalism & Mass Media', 'BA English Literature', 'BA Political Science & International Relations'],
    intakeTimeline: 'Admissions open for upcoming session',
    ctaText: 'Enquire for Arts & Humanities'
  },
  {
    id: 'ug-law',
    group: 'UG Admissions',
    name: 'Law & Legal Studies',
    tagline: 'Integrated 5-Year Law Programs, Moot Court & Corporate Law',
    description: 'Comprehensive admission guidance for Bar Council of India (BCI) recognized integrated legal programs, preparing advocates and corporate legal counsels.',
    keyDisciplines: ['Integrated BA LLB (Honours)', 'Integrated BBA LLB (Honours)', '3-Year LLB for Graduates', 'LLM Corporate Jurisprudence'],
    intakeTimeline: 'National Entrance & Direct Institutional Rounds Open',
    ctaText: 'Enquire for Law'
  },

  // PG Admissions (Requirement 5)
  {
    id: 'pg-mba',
    group: 'PG Admissions',
    name: 'MBA & Management Master’s',
    tagline: 'Full-Time MBA, PGDM, Executive MBA & Global Pathways',
    description: 'Premier master’s in business administration offering core specialisations in Finance, Marketing, HR, Operations, Business Analytics, and Corporate Strategy.',
    keyDisciplines: ['MBA (Full-Time)', 'PGDM (AICTE Approved)', 'Executive MBA', 'Online MBA', 'International MBA Pathways'],
    intakeTimeline: 'CAT / MAT / XAT / CET / Merit Rounds Active for 2026-27',
    ctaText: 'Get MBA Admission Guidance'
  },
  {
    id: 'pg-mca',
    group: 'PG Admissions',
    name: 'MCA & Advanced Computing',
    tagline: 'Master of Computer Applications, AI, Data Science & Cloud',
    description: 'Postgraduate computing programs designed for technical leadership, software engineering, cloud architecture, and artificial intelligence.',
    keyDisciplines: ['Master of Computer Applications (MCA)', 'Online MCA in Cloud & AI', 'MCA in Cybersecurity', 'M.Sc Data Science'],
    intakeTimeline: 'Admissions Open - Fast-Track Screening Available',
    ctaText: 'Get MCA Admission Guidance'
  },
  {
    id: 'pg-mtech',
    group: 'PG Admissions',
    name: 'M.Tech & Technological Sciences',
    tagline: 'Advanced Engineering Research, Robotics, VLSI & AI Systems',
    description: 'Master of Technology and MS by research programs at premier autonomous technological institutes and universities across India.',
    keyDisciplines: ['M.Tech in Artificial Intelligence', 'M.Tech Computer Science', 'M.Tech VLSI & Embedded', 'M.Tech Structural Engineering'],
    intakeTimeline: 'GATE / PGCET / Institutional Merit Rounds Active',
    ctaText: 'Get M.Tech Admission Guidance'
  },
  {
    id: 'pg-commerce-arts',
    group: 'PG Admissions',
    name: 'M.Com, MA & MSc Postgraduate Programs',
    tagline: 'Humanities, Economics, Pure Sciences & Financial Studies',
    description: 'Accredited postgraduate degrees across commerce, clinical psychology, public policy, economics, mathematics, and biotechnology.',
    keyDisciplines: ['Master of Commerce (M.Com)', 'MA in Clinical Psychology', 'MA in Journalism & Media', 'M.Sc in Applied Mathematics / Physics'],
    intakeTimeline: 'Academic Session 2026-27 Registrations Open',
    ctaText: 'Get PG Admission Guidance'
  },

  // Diplomas & Professional Programs
  {
    id: 'dip-programs',
    group: 'Diplomas & Professional Programs',
    name: 'Diploma Programs',
    tagline: 'Accelerated 1 to 2-Year Practical Career Launchpads',
    description: 'Job-oriented diploma courses that build foundational vocational expertise in hospital administration, computer hardware, interior design, and hospitality.',
    keyDisciplines: ['Diploma in Hospital Administration', 'Diploma in Web Development & UI/UX', 'Diploma in Digital Media', 'Diploma in Clinical Diagnostics'],
    intakeTimeline: 'Flexible batch schedules throughout the year',
    ctaText: 'Enquire for Diploma Programs'
  },
  {
    id: 'dip-certifications',
    group: 'Diplomas & Professional Programs',
    name: 'Professional Certifications',
    tagline: 'Industry-Validated Micro-Credentials & Skill Bootcamps',
    description: 'Short-duration specialized certifications with corporate partner endorsements in AI tools, financial modeling, cloud computing, and digital marketing.',
    keyDisciplines: ['Full-Stack Cloud Architect Certification', 'Financial Modeling & Valuation', 'Digital Marketing & Growth Hacking', 'HR Analytics'],
    intakeTimeline: 'Weekend and weekday batches commencing monthly',
    ctaText: 'Enquire for Certifications'
  },
  {
    id: 'dip-pg-diplomas',
    group: 'Diplomas & Professional Programs',
    name: 'PG Diploma Programs',
    tagline: 'Postgraduate Level Practical Specializations (1 Year)',
    description: 'Intensive postgraduate diplomas for degree holders wishing to specialize in high-demand corporate domains without a two-year commitment.',
    keyDisciplines: ['PG Diploma in Data Science & Machine Learning', 'PG Diploma in Cyber Law', 'PG Diploma in Supply Chain & Logistics', 'PG Diploma in Event & PR'],
    intakeTimeline: 'Admissions open for upcoming cohort',
    ctaText: 'Enquire for PG Diplomas'
  },

  // Online & Executive Education
  {
    id: 'online-degrees',
    group: 'Online & Executive Education',
    name: 'Online Degrees (UGC-DEB Approved)',
    tagline: 'Earn Accredited Bachelor’s & Master’s Degrees 100% Online',
    description: 'Fully accredited online undergraduate and master\'s degrees from top NAAC A++ universities, allowing students and working adults to learn from anywhere.',
    keyDisciplines: ['Online BBA', 'Online BCA', 'Online B.Com', 'Online MBA', 'Online MCA', 'Online M.Com'],
    intakeTimeline: 'January & July Session Admissions Active',
    ctaText: 'Enquire for Online Degrees'
  },
  {
    id: 'online-pg-programs',
    group: 'Online & Executive Education',
    name: 'Online PG Programs',
    tagline: 'Flexible Master’s & Specializations for Working Adults',
    description: 'Convenient online postgraduate learning formats with interactive virtual classrooms, live weekend lectures, and dedicated academic mentor support.',
    keyDisciplines: ['Online Master of Computer Applications (MCA)', 'Online M.Sc in Business Analytics', 'Online Master of Arts (MA)', 'Online M.Com in International Business'],
    intakeTimeline: 'Continuous admissions with rolling intake dates',
    ctaText: 'Enquire for Online PG'
  },
  {
    id: 'exec-mba',
    group: 'Online & Executive Education',
    name: 'Executive MBA',
    tagline: 'Accelerate Mid & Senior Careers Into C-Suite Leadership',
    description: 'Prestigious 1-year and 18-month executive MBA degrees designed for professionals with 3+ years experience, focusing on strategic leadership and innovation.',
    keyDisciplines: ['Executive MBA in Strategic Leadership', 'Executive MBA in FinTech & Corporate Finance', 'Executive MBA in Operations & Supply Chain'],
    intakeTimeline: 'Quarterly Executive Cohorts - Profile Review Required',
    ctaText: 'Enquire for Executive MBA'
  },
  {
    id: 'exec-pg-programs',
    group: 'Online & Executive Education',
    name: 'Executive PG Programs',
    tagline: 'Advanced Leadership & Deep-Tech Executive Diplomas',
    description: 'Executive education for corporate leaders covering enterprise AI strategy, digital transformation, board governance, and global business expansion.',
    keyDisciplines: ['Senior Management Program (SMP)', 'Executive PG in Artificial Intelligence Strategy', 'Chief Technology Officer (CTO) Program'],
    intakeTimeline: 'Rolling admissions for senior professional cohorts',
    ctaText: 'Enquire for Executive PG'
  }
];
