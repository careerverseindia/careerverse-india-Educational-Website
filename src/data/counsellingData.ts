export interface CounsellingPathway {
  id: string;
  stageNumber: string;
  stageBadge: string;
  targetGroup: string;
  title: string;
  tagline: string;
  description: string;
  coreServices: string[];
  keyOutcomes: string[];
  recommendedFor: string;
  ctaText: string;
}

export const counsellingPathways: CounsellingPathway[] = [
  {
    id: 'stage-5-7',
    stageNumber: '01',
    stageBadge: 'Classes 5–7',
    targetGroup: 'Middle School Students',
    title: 'Explore Your Strengths & Discover Your Interests',
    tagline: 'Laying the foundation for curiosity, cognitive aptitude, and early talent discovery.',
    description: 'During the formative middle school years, students benefit most from low-pressure exploration of their natural curiosity, learning styles, and emerging talents. We help young learners and parents identify aptitudes early without premature academic pigeonholing.',
    coreServices: [
      'Age-appropriate interest & learning style mapping',
      'Cognitive aptitude & creativity identification',
      'Guidance on balanced extracurricular & co-curricular pursuits',
      'Parent-child educational harmony sessions'
    ],
    keyOutcomes: [
      'Clarity on intrinsic interests and learning strengths',
      'Reduced early academic stress and peer anxiety',
      'Actionable recommendations for hobby and skill development'
    ],
    recommendedFor: 'Students in grades 5, 6, and 7 and their parents looking for healthy, holistic academic development.',
    ctaText: 'Get Guidance for Classes 5–7'
  },
  {
    id: 'stage-8-10',
    stageNumber: '02',
    stageBadge: 'Classes 8–10',
    targetGroup: 'Secondary School Students',
    title: 'Discover Your Career Direction & Stream Selection',
    tagline: 'Scientific stream selection (Science, Commerce, Arts) backed by psychometric evaluation.',
    description: 'The decision of which stream to select after Class 10 shapes a student’s higher secondary journey and future college options. Our certified counsellors evaluate aptitude, personality, and career clusters to make stream selection confident, informed, and objective.',
    coreServices: [
      'Comprehensive Psychometric & Aptitude Assessment (Stream Matrix)',
      '1-on-1 Certified Counsellor Strategy Session with student & parents',
      'Detailed Stream Roadmapping (Science PCM/PCB, Commerce, Humanities)',
      'Overview of 50+ Modern Emerging Career Clusters'
    ],
    keyOutcomes: [
      'Zero confusion between parental expectations and student strengths',
      'Clear, data-backed recommendation on 11th-grade stream selection',
      'Long-term perspective on career prospects and competitive exams'
    ],
    recommendedFor: 'Students in grades 8 to 10 making critical decisions on subject choices and boards.',
    ctaText: 'Get Guidance for Classes 8–10'
  },
  {
    id: 'stage-11-12',
    stageNumber: '03',
    stageBadge: 'Classes 11–12',
    targetGroup: 'Senior Secondary Students',
    title: 'Choose the Right Course. Build the Right Career.',
    tagline: 'Undergraduate degree selection, entrance exam strategy, and institution shortlisting.',
    description: 'The final two years of school require sharp focus on undergraduate program selection, national and university-specific entrance examinations (JEE, NEET, CUET, CLAT, IPMAT, etc.), and strategic institution shortlisting tailored to the student\'s potential.',
    coreServices: [
      'Targeted Degree & Program Selection based on career trajectory',
      'Entrance Exam Strategy & Backup College Planning',
      'Institutional Profile Matching (Curriculum, Placements, Campus Infrastructure)',
      'College Application, Portfolio & Statement of Purpose guidance'
    ],
    keyOutcomes: [
      'Structured UG roadmap with 1st, 2nd, and 3rd tier backup plans',
      'Stress-free entrance exam strategy with clear milestone tracking',
      'Direct admission guidance for top-ranked private and deemed universities'
    ],
    recommendedFor: 'Class 11 and 12 students preparing for college admissions, boards, and entrance exams.',
    ctaText: 'Get Guidance for Classes 11–12'
  },
  {
    id: 'stage-graduates',
    stageNumber: '04',
    stageBadge: 'Graduates & Recent Graduates',
    targetGroup: 'College Students & Fresh Graduates',
    title: 'Turn Your Degree Into the Right Career Path',
    tagline: 'Postgraduate admissions, specialized certifications, and career transition roadmaps.',
    description: 'Earning an undergraduate degree is just the first milestone. Whether contemplating an immediate Master\'s degree, studying abroad, switching functional tracks, or entering high-growth corporate sectors, we provide pragmatic guidance for fresh graduates.',
    coreServices: [
      'Postgraduate Degree vs. Professional Certification strategic evaluation',
      'MBA, M.Tech, MS & PGDM Specialization Matching',
      'Resume Review, Employability Gap Analysis & Interview Readiness',
      'Admission Guidance into Top Tier Business Schools & Technical Institutes'
    ],
    keyOutcomes: [
      'Clear decision framework: PG immediately vs. Work Experience first',
      'Profile-matched university applications with high conversion rates',
      'Clarity on high-ROI professional programs and salary benchmarks'
    ],
    recommendedFor: 'Final year undergraduate students and fresh graduates within 0-2 years of graduation.',
    ctaText: 'Get Guidance for Graduates'
  },
  {
    id: 'stage-professionals',
    stageNumber: '05',
    stageBadge: 'Working Professionals',
    targetGroup: 'Executives & Mid-Career Professionals',
    title: 'Advance Your Career With the Right Education',
    tagline: 'Executive MBAs, online master\'s, career pivots, and leadership credentials.',
    description: 'In today’s fast-changing economy, career advancement demands strategic upskilling. We guide working professionals toward recognized Executive MBAs, UGC-approved online master\'s degrees, and specialized leadership programs that fit demanding work schedules.',
    coreServices: [
      'Mid-Career Plateau Diagnostic & Pivot Consulting',
      'Executive MBA vs. Online Master’s vs. Global Immersion comparative study',
      'Corporate Profile Evaluation & Executive CV Enhancement',
      'Fast-track admission processing with complete documentation guidance'
    ],
    keyOutcomes: [
      'Selection of accredited, high-credibility programs without pausing career',
      'Readiness for senior managerial, director-level, and strategic positions',
      'Strategic networking leverage and tangible ROI on executive education'
    ],
    recommendedFor: 'Professionals with 2 to 15+ years of experience looking to scale into leadership or pivot domains.',
    ctaText: 'Get Guidance for Professionals'
  }
];
