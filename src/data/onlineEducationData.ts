export interface FeaturedInstitution {
  id: string;
  name: string;
  location: string;
  badge: string;
  logo: string;
  description: string;
}

export interface ExecutiveProgramme {
  id: string;
  slug: string;
  title: string;
  institution: string;
  duration: string;
  format: string;
  category: 'AI & Emerging Tech' | 'Leadership & Strategy' | 'Data & Analytics' | 'Cybersecurity';
  overview: string;
  highlights: string[];
  eligibility: string;
}

export interface OnlineDegreeProgramme {
  id: string;
  slug: string;
  title: string;
  level: 'UG' | 'PG';
  duration: string;
  starred?: boolean;
  overview: string;
  careerAreas?: string[];
  specialisations?: string[];
  eligibility: string;
}

export interface CertificationCategory {
  id: string;
  code: string;
  title: string;
  description: string;
  iconName: string;
  topics: string[];
}

// 1. Featured Institutions
export const featuredInstitutions: FeaturedInstitution[] = [
  {
    id: 'inst-1',
    name: 'IIM Kozhikode',
    location: 'Kerala, India',
    badge: 'NIRF Top 3 Management',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=160&auto=format&fit=crop&q=80',
    description: 'Premier national management institute offering executive programmes in strategic leadership and AI for senior corporate leaders.'
  },
  {
    id: 'inst-2',
    name: 'IIIT Bangalore',
    location: 'Bangalore, Karnataka',
    badge: 'Premier Tech & AI Institute',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=160&auto=format&fit=crop&q=80',
    description: 'Pioneering technology institute offering executive diplomas and advanced degrees in machine learning, agentic AI, and data science.'
  },
  {
    id: 'inst-3',
    name: 'IIT Delhi',
    location: 'New Delhi',
    badge: 'Institute of National Importance',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=160&auto=format&fit=crop&q=80',
    description: 'India’s premier technological institution delivering executive certifications in deep tech, cybersecurity, and enterprise systems.'
  },
  {
    id: 'inst-4',
    name: 'IIT Kharagpur',
    location: 'West Bengal, India',
    badge: 'Premier Research Institute',
    logo: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=160&auto=format&fit=crop&q=80',
    description: 'Renowned for cutting-edge engineering research, computational intelligence, and executive AI programmes.'
  },
  {
    id: 'inst-5',
    name: 'OP Jindal Global University',
    location: 'Sonipat, Haryana',
    badge: 'India’s #1 Private University QS',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=160&auto=format&fit=crop&q=80',
    description: 'World-ranked global multidisciplinary university delivering cutting-edge executive masters, legal tech, and digital leadership.'
  },
  {
    id: 'inst-6',
    name: 'Liverpool John Moores University',
    location: 'Liverpool, United Kingdom',
    badge: 'UK Public Research University',
    logo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=160&auto=format&fit=crop&q=80',
    description: 'Internationally recognized British university conferring dual-accredited Master of Science degrees in AI & Machine Learning.'
  },
  {
    id: 'inst-7',
    name: 'Golden Gate University',
    location: 'San Francisco, USA',
    badge: 'Silicon Valley Accredited',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=160&auto=format&fit=crop&q=80',
    description: 'Pioneering California institution offering accredited Doctor of Business Administration (DBA) degrees with Generative AI concentrations.'
  }
];

// 2. Featured Programmes (Online Certifications / Executive Programmes)
export const featuredExecutiveProgrammes: ExecutiveProgramme[] = [
  {
    id: 'exec-1',
    slug: 'ai-for-business-professionals',
    title: 'Professional Certificate Programme in AI for Business Professionals',
    institution: 'IIM Kozhikode',
    duration: '6–8 Months',
    format: 'Live Online Masterclasses & Weekend Labs',
    category: 'AI & Emerging Tech',
    overview: 'Equips business leaders, product heads, and functional managers with strategic artificial intelligence competencies, enterprise automation frameworks, and Generative AI business models.',
    highlights: [
      'Strategic Decision Making with Predictive AI',
      'Generative AI Business Integration & ROI Analysis',
      'Executive Masterclasses by IIM Kozhikode Faculty',
      'Hands-on Enterprise Case Studies & Capstone'
    ],
    eligibility: 'Graduation with min. 2+ years of corporate work experience.'
  },
  {
    id: 'exec-2',
    slug: 'forward-deployed-ai-engineering',
    title: 'Executive Post Graduate Programme in Forward Deployed AI Engineering',
    institution: 'IIIT Bangalore',
    duration: '11 Months',
    format: 'Hybrid / Live Virtual & Industry Mentorship',
    category: 'AI & Emerging Tech',
    overview: 'High-intensity engineering programme designed to convert software professionals into elite forward-deployed AI engineers capable of deploying LLMs, Agentic workflows, and production AI architectures.',
    highlights: [
      'Enterprise LLM Fine-Tuning & Quantization',
      'Autonomous Agent Design with LangGraph & CrewAI',
      'Vector Databases & Scalable RAG Architectures',
      'IIIT Bangalore Alumni Status & Executive Credentials'
    ],
    eligibility: 'Bachelor’s degree in Engineering, Computer Applications, or Mathematics with programming proficiency.'
  },
  {
    id: 'exec-3',
    slug: 'applied-ai-and-agentic-ai',
    title: 'Executive Post Graduate Programme in Applied AI and Agentic AI',
    institution: 'IIIT Bangalore',
    duration: '12 Months',
    format: 'Online Interactive with Capstone Labs',
    category: 'AI & Emerging Tech',
    overview: 'Cutting-edge curriculum focused on multi-agent architectures, reasoning models, autonomous agent orchestration, and production deployments for high-scale enterprise applications.',
    highlights: [
      'Agentic System Design & Multi-Agent Swarms',
      'Tool Calling, Function Calling & Cognitive Loops',
      'Model Context Protocol & Retrieval Augmented Generation',
      'Executive Mentorship by Principal AI Scientists'
    ],
    eligibility: 'Degree holders with background in IT, Analytics, or Engineering.'
  },
  {
    id: 'exec-4',
    slug: 'cto-ai-leadership-programme',
    title: 'Chief Technology Officer & AI Leadership Programme',
    institution: 'IIT Delhi',
    duration: '10 Months',
    format: 'Executive Live Online & Campus Immersion',
    category: 'Leadership & Strategy',
    overview: 'Prepares senior engineering directors and technology executives to step into Chief Technology Officer roles, architect AI-native roadmaps, and scale enterprise tech stacks.',
    highlights: [
      'Enterprise Tech Architecture & AI Roadmap Formulation',
      'Boardroom Tech Governance & Capital Allocation',
      'IIT Delhi Campus Immersion & Executive Peer Networking',
      'Executive Leadership Coaching for C-Suite Elevation'
    ],
    eligibility: 'Senior tech leads, architects, and managers with 8+ years experience.'
  },
  {
    id: 'exec-5',
    slug: 'cybersecurity-and-ai-security',
    title: 'Certificate Programme in Cybersecurity and AI Security',
    institution: 'IIT Kharagpur',
    duration: '6 Months',
    format: 'Live Online Weekend Sessions',
    category: 'Cybersecurity',
    overview: 'A specialized credential focused on zero-trust architectures, enterprise security posture, defense against adversarial AI attacks, and securing large language model deployments.',
    highlights: [
      'Adversarial Machine Learning & Prompt Injection Defense',
      'Zero-Trust Cloud & Network Security Systems',
      'AI-Powered Threat Detection & Automated Incident Response',
      'IIT Kharagpur Verified Academic Credential'
    ],
    eligibility: 'IT professionals, network engineers, system admins, or graduates.'
  },
  {
    id: 'exec-6',
    slug: 'chief-data-and-ai-officer-programme',
    title: 'Chief Data and AI Officer Programme',
    institution: 'IIM Kozhikode',
    duration: '10 Months',
    format: 'Executive Live Online & Global Case Pedagogy',
    category: 'Leadership & Strategy',
    overview: 'A flagship C-suite programme designed for Chief Data Officers and AI leaders to formulate data governance policies, monetize data assets, and drive enterprise-wide AI transformation.',
    highlights: [
      'Data Governance, Privacy, & Responsible AI Ethics',
      'Enterprise Data Strategy & Modern Data Stack Architecture',
      'Direct CXO Masterclasses & Capstone Transformation Strategy',
      'IIM Kozhikode Executive Alumni Network Access'
    ],
    eligibility: 'Min 7+ years of professional experience in data, tech, or business leadership.'
  },
  {
    id: 'exec-7',
    slug: 'building-ai-products',
    title: 'Executive Post Graduate Certificate in Building AI Products',
    institution: 'IIIT Bangalore',
    duration: '7 Months',
    format: 'Live Online Sessions & Product Hackathons',
    category: 'AI & Emerging Tech',
    overview: 'Engineered for Product Managers, founders, and business analysts to conceptualize, validate, build, and scale AI-native products from zero to product-market fit.',
    highlights: [
      'AI Product Roadmapping & User Experience for Generative Models',
      'Managing Hallucination, Latency & Model Costs',
      'Product Metrics, Evaluation Benchmarks & AI Telemetry',
      'End-to-End AI Product Capstone Portfolio'
    ],
    eligibility: 'Graduates with work experience in product, engineering, consulting or design.'
  },
  {
    id: 'exec-8',
    slug: 'ai-native-software-engineering',
    title: 'Executive Post Graduate Certificate in AI-Native Software Engineering',
    institution: 'IIIT Bangalore',
    duration: '8 Months',
    format: 'Interactive Virtual Labs & Code Reviews',
    category: 'AI & Emerging Tech',
    overview: 'Modernizes conventional software engineering practices with AI coding agents, autonomous unit testing, AI-driven CI/CD pipelines, and synthetic data development.',
    highlights: [
      'Engineering with AI Coding Copilots & Dev Agents',
      'Automated Refactoring, Static Analysis & Test Generation',
      'Scalable Backend Systems with Microservices & Vector Stores',
      'Industry Verified Project Portfolio'
    ],
    eligibility: 'Software engineers, developers, QA architects, and tech leads.'
  },
  {
    id: 'exec-9',
    slug: 'executive-diploma-machine-learning-ai',
    title: 'Executive Diploma in Machine Learning and AI',
    institution: 'IIIT Bangalore',
    duration: '12 Months',
    format: 'Online with Weekly Faculty Doubt Clearing',
    category: 'AI & Emerging Tech',
    overview: 'Comprehensive, academically rigorous foundational and advanced diploma in statistics, supervised/unsupervised learning, deep learning, NLP, and computer vision.',
    highlights: [
      'Statistical Foundations, Optimization & Python for Data Science',
      'Deep Neural Networks, CNNs, RNNs & Transformers',
      'Natural Language Processing & Computer Vision Specialization',
      'Alumni Status of IIIT Bangalore'
    ],
    eligibility: 'Graduates with Mathematics or Statistics in 10+2 or Degree.'
  },
  {
    id: 'exec-10',
    slug: 'masters-degree-ai-and-data-science',
    title: 'Master’s Degree in Artificial Intelligence and Data Science',
    institution: 'OP Jindal Global University',
    duration: '2 Years',
    format: 'Online Master’s Degree with Live Sessions',
    category: 'Data & Analytics',
    overview: 'A fully accredited, recognized Master’s degree imparting comprehensive mastery over data engineering, machine learning pipelines, cloud AI, and ethical governance.',
    highlights: [
      'Accredited Master’s Degree from OP Jindal Global University',
      'Rigorous Academic Dissertation & Real-World Industry Projects',
      'Comprehensive Curriculum Covering AI, Big Data & Ethics',
      'WES Recognized Degree for Global Mobility'
    ],
    eligibility: 'Bachelor’s degree in any discipline with min. 50% marks.'
  },
  {
    id: 'exec-11',
    slug: 'msc-in-machine-learning-ai',
    title: 'Master of Science in Machine Learning & AI',
    institution: 'Liverpool John Moores University',
    duration: '18 Months',
    format: 'Online Dual Credential (IIIT Bangalore + LJMU UK)',
    category: 'AI & Emerging Tech',
    overview: 'Global British Master of Science degree conferred by LJMU UK paired with an Executive PG Programme from IIIT Bangalore. Recognized globally and evaluated for PR & higher studies.',
    highlights: [
      'Dual Credential: MS from LJMU (UK) + Executive PG from IIIT-B',
      'Supervised UK Faculty Research Project / Thesis',
      'WES Recognized & Global University Equivalency',
      'Alumni Privileges with LJMU Global Network'
    ],
    eligibility: 'Bachelor’s degree in Engineering, Computer Science, or Mathematics.'
  },
  {
    id: 'exec-12',
    slug: 'dba-in-emerging-technologies-generative-ai',
    title: 'DBA in Emerging Technologies with Concentration in Generative AI',
    institution: 'Golden Gate University',
    duration: '3 Years',
    format: 'Online Doctoral Programme with International Faculty',
    category: 'Leadership & Strategy',
    overview: 'Prestigious doctoral-level credential conferring the title of Doctor. Focuses on original applied research on generative AI, enterprise tech adoption, and strategic economics.',
    highlights: [
      'Earn a Terminal Doctorate Degree (DBA) from San Francisco, USA',
      'Original Applied Research in Generative AI & Enterprise Adoption',
      'Faculty Mentorship from Silicon Valley Academics & Leaders',
      'Designed for Senior Executives, Consultants & Educators'
    ],
    eligibility: 'Master’s degree or equivalent with min. 5+ years of managerial experience.'
  },
  {
    id: 'exec-13',
    slug: 'data-science-and-agentic-ai',
    title: 'Professional Certificate Programme in Data Science & Agentic AI',
    institution: 'IIIT Bangalore',
    duration: '9 Months',
    format: 'Live Online Sessions & Virtual Sandboxes',
    category: 'Data & Analytics',
    overview: 'Blends classical data science, data warehousing, and business intelligence with next-generation autonomous AI agents and automated data insights.',
    highlights: [
      'Predictive Analytics, Python & SQL Data Pipelines',
      'Building Agentic Data Analysts & Automated Visualizers',
      'High-Impact Industry Capstones across Finance, Retail & Tech',
      'Direct Career Mentorship & CareerVerse Admission Handholding'
    ],
    eligibility: 'Graduation in Science, Commerce, Engineering, or Management.'
  }
];

// 3. Popular Online UG Programmes
export const popularOnlineUgProgrammes: OnlineDegreeProgramme[] = [
  {
    id: 'ug-online-1',
    slug: 'online-bba',
    title: 'Online BBA (Bachelor of Business Administration)',
    level: 'UG',
    duration: '3 Years',
    overview: 'A dynamic online undergraduate business management degree equipping students with organizational leadership, marketing strategy, operations, and modern financial acumen.',
    careerAreas: ['Management', 'Marketing', 'Sales', 'HR', 'Business Strategy', 'Entrepreneurship'],
    eligibility: '10+2 from any recognized state/central board with min. 45-50% marks.'
  },
  {
    id: 'ug-online-2',
    slug: 'online-bca',
    title: 'Online BCA (Bachelor of Computer Applications)',
    level: 'UG',
    duration: '3 Years',
    overview: 'Career-focused computer applications degree covering full-stack programming, cloud architecture, databases, data structures, and modern software development.',
    careerAreas: ['IT', 'Software', 'Cybersecurity', 'Web Development', 'Cloud Systems'],
    eligibility: '10+2 in any stream (Mathematics/Computer Science at 10+2 preferred).'
  },
  {
    id: 'ug-online-3',
    slug: 'online-bcom',
    title: 'Online B.Com (Bachelor of Commerce)',
    level: 'UG',
    duration: '3 Years',
    overview: 'Foundational commerce degree providing in-depth training in corporate accounting, financial auditing, tax regulations, and commercial law.',
    careerAreas: ['Finance', 'Banking', 'Accounting', 'Auditing', 'Taxation', 'Corporate Business'],
    eligibility: '10+2 with Commerce, Mathematics, or equivalent recognized qualification.'
  },
  {
    id: 'ug-online-4',
    slug: 'online-bcom-hons',
    title: 'Online B.Com (Hons.)',
    level: 'UG',
    duration: '3 Years',
    overview: 'An advanced honours commerce degree featuring specialized electives in international finance, financial markets, taxation law, and banking analytics.',
    careerAreas: ['Banking', 'Investment Management', 'Corporate Finance', 'FinTech', 'Treasury'],
    eligibility: '10+2 from a recognized board with minimum 50% aggregate.'
  },
  {
    id: 'ug-online-5',
    slug: 'online-ba',
    title: 'Online BA (Bachelor of Arts)',
    level: 'UG',
    duration: '3 Years',
    overview: 'Multidisciplinary liberal arts degree offering flexible specializations in English, Sociology, Political Science, Psychology, and Media Communication.',
    careerAreas: ['Content & Media', 'Human Resources', 'Public Relations', 'Civil Services', 'Education'],
    eligibility: '10+2 from any recognized board in Arts, Science, or Commerce.'
  },
  {
    id: 'ug-online-6',
    slug: 'online-bsc',
    title: 'Online B.Sc. (Bachelor of Science)',
    level: 'UG',
    duration: '3 Years',
    overview: 'Science degree with contemporary curricula in applied mathematics, information systems, physics, and scientific computational modeling.',
    careerAreas: ['Data Science', 'IT & Analytics', 'Research & Analysis', 'Technical Support'],
    eligibility: '10+2 with Science stream (Physics, Chemistry, Mathematics/Biology).'
  },
  {
    id: 'ug-online-7',
    slug: 'online-bsc-data-science-programming',
    title: 'Online B.Sc. Data Science / Programming',
    level: 'UG',
    duration: '3–4 Years',
    overview: 'High-demand STEM bachelor’s program providing rigorous foundational training in algorithms, statistical modeling, machine learning, Python, and big data systems.',
    careerAreas: ['Data Science', 'Analytics', 'Software Engineering', 'AI Engineering', 'Business Intelligence'],
    eligibility: '10+2 with Mathematics/Statistics with minimum 50% marks.'
  },
  {
    id: 'ug-online-8',
    slug: 'online-ba-bsc-economics',
    title: 'Online BA Economics / B.Sc. Economics',
    level: 'UG',
    duration: '3 Years',
    overview: 'Rigorous economics degree combining micro/macroeconomics with econometrics, mathematical forecasting, and financial market modeling.',
    careerAreas: ['Finance', 'Banking', 'Analytics', 'Economic Consulting', 'Policy Research'],
    eligibility: '10+2 with Mathematics or Economics preferred.'
  },
  {
    id: 'ug-online-9',
    slug: 'online-bba-business-analytics',
    title: 'Online BBA Business Analytics',
    level: 'UG',
    duration: '3 Years',
    overview: 'Blends core management principles with data visualization, business statistics, predictive analytics, Excel modeling, and Power BI dashboards.',
    careerAreas: ['Business Analytics', 'Management', 'Marketing Analytics', 'Sales Intelligence', 'HR Analytics'],
    eligibility: '10+2 from any stream with minimum 50% marks.'
  }
];

// 4. Popular Online PG Programmes
export const popularOnlinePgProgrammes: OnlineDegreeProgramme[] = [
  {
    id: 'pg-online-1',
    slug: 'online-mba',
    title: 'Online MBA (Master of Business Administration)',
    level: 'PG',
    duration: '2 Years',
    starred: true,
    overview: 'Premier UGC-DEB recognized postgraduate management degree designed for ambitious working professionals, graduates, and aspiring corporate leaders.',
    specialisations: ['Marketing', 'Finance', 'HR', 'Business Analytics', 'AI/ML in Business', 'Data Science', 'Cloud & IT Management', 'Cybersecurity Governance', 'Leadership & Strategy'],
    eligibility: 'Bachelor’s degree in any discipline with min. 50% marks from a recognized university.'
  },
  {
    id: 'pg-online-2',
    slug: 'online-mca',
    title: 'Online MCA (Master of Computer Applications)',
    level: 'PG',
    duration: '2 Years',
    starred: true,
    overview: 'High-level computer applications and software architecture master’s degree providing mastery in cloud computing, enterprise architectures, AI algorithms, and full-stack systems.',
    specialisations: ['Cloud Computing', 'AI/ML', 'Cybersecurity', 'Data Science', 'Full-Stack Software Engineering'],
    eligibility: 'BCA / B.Sc. / B.Tech or Graduation with Mathematics at 10+2 or Graduation level.'
  },
  {
    id: 'pg-online-3',
    slug: 'online-mcom',
    title: 'Online M.Com (Master of Commerce)',
    level: 'PG',
    duration: '2 Years',
    starred: true,
    overview: 'Comprehensive advanced degree in financial accounting, corporate taxation, international trade, treasury management, and banking operations.',
    specialisations: ['Finance & Accounting', 'Banking & FinTech', 'International Trade', 'Corporate Governance'],
    eligibility: 'B.Com / BBA / BBM or relevant commerce degree from an accredited university.'
  },
  {
    id: 'pg-online-4',
    slug: 'online-msc',
    title: 'Online M.Sc. (Master of Science)',
    level: 'PG',
    duration: '2 Years',
    starred: false,
    overview: 'Specialized scientific and quantitative postgraduate degree focusing on applied mathematics, computer science, information systems, and computational data analysis.',
    specialisations: ['Data Science', 'Artificial Intelligence', 'Information Technology', 'Applied Statistics'],
    eligibility: 'Bachelor’s degree in Science, IT, BCA, or Engineering.'
  },
  {
    id: 'pg-online-5',
    slug: 'online-ma',
    title: 'Online MA (Master of Arts)',
    level: 'PG',
    duration: '2 Years',
    starred: false,
    overview: 'Flexible online master’s degree offering humanities, social sciences, clinical psychology, public administration, and English literature tracks.',
    specialisations: ['Psychology', 'English Literature', 'Public Administration', 'Economics', 'Sociology'],
    eligibility: 'Graduation in any discipline from a recognized university.'
  },
  {
    id: 'pg-online-6',
    slug: 'online-pg-executive-management',
    title: 'Online PG / Executive Management',
    level: 'PG',
    duration: '1–2 Years',
    starred: false,
    overview: 'Accelerated executive credential designed for managers seeking promotion, leadership transitions, and strategic business transformation skills without taking a career break.',
    specialisations: ['Strategic Leadership', 'Digital Transformation', 'Marketing & Sales', 'Supply Chain Analytics', 'Corporate Finance'],
    eligibility: 'Bachelor’s degree with 1–2+ years of professional work experience.'
  },
  {
    id: 'pg-online-7',
    slug: 'online-majmc',
    title: 'Online MAJMC (Journalism & Mass Communication)',
    level: 'PG',
    duration: '2 Years',
    starred: false,
    overview: 'Modern media degree covering digital journalism, content strategy, brand communications, public relations, audio-visual broadcasting, and social media production.',
    specialisations: ['Digital Journalism', 'Brand Communications & PR', 'Corporate Media Strategy', 'New Media & Audio-Visual Production'],
    eligibility: 'Bachelor’s degree in any discipline from an accredited university.'
  }
];

// 5. Certification Categories (A through E)
export const certificationCategories: CertificationCategory[] = [
  {
    id: 'cat-a',
    code: 'A',
    title: 'AI & Emerging Technology',
    description: 'Master next-generation artificial intelligence, autonomous agentic systems, and generative technology stacks.',
    iconName: 'Cpu',
    topics: [
      'Generative AI',
      'Agentic AI',
      'AI for Business',
      'AI Engineering',
      'Prompt Engineering',
      'AI Product Management',
      'AI Leadership'
    ]
  },
  {
    id: 'cat-b',
    code: 'B',
    title: 'Data & Analytics',
    description: 'Transform enterprise raw datasets into predictive insights, business intelligence, and automated decision engines.',
    iconName: 'BarChart3',
    topics: [
      'Data Analytics',
      'Business Analytics',
      'Data Science',
      'Data Science + GenAI',
      'Power BI',
      'Data Engineering',
      'Financial Analytics',
      'HR Analytics'
    ]
  },
  {
    id: 'cat-c',
    code: 'C',
    title: 'IT & Digital',
    description: 'Scale modern cloud infrastructures, agile DevOps pipelines, and enterprise cybersecurity postures.',
    iconName: 'ShieldAlert',
    topics: [
      'Cloud Computing',
      'DevOps',
      'Cybersecurity',
      'Cloud Security',
      'AI Cybersecurity',
      'Software Engineering',
      'Digital Transformation'
    ]
  },
  {
    id: 'cat-d',
    code: 'D',
    title: 'BFSI & FinTech',
    description: 'Specialize in modern banking architectures, automated credit risk, AML compliance, and digital investment ecosystems.',
    iconName: 'BadgePercent',
    topics: [
      'Certified BFSI Professional',
      'FinTech',
      'Digital Banking',
      'Credit Risk',
      'Operational Risk',
      'AML/KYC',
      'Wealth Management',
      'Investment',
      'Treasury',
      'Insurance'
    ]
  },
  {
    id: 'cat-e',
    code: 'E',
    title: 'Business & Leadership',
    description: 'Cultivate strategic decision-making, digital marketing execution, agile project governance, and organizational leadership.',
    iconName: 'TrendingUp',
    topics: [
      'AI for Managers',
      'AI Leadership',
      'Product Management',
      'Project Management',
      'Digital Marketing',
      'Sales & CRM',
      'HR Analytics',
      'Supply Chain Analytics'
    ]
  }
];
