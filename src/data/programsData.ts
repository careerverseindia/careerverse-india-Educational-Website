import { Program } from '../types';

export const initialPrograms: Program[] = [
  // 1. Full-Time Campus Programs (No Fees)
  {
    id: 'prog-1',
    slug: 'btech-computer-science-engineering',
    name: 'B.Tech in Computer Science & Engineering',
    level: 'Undergraduate',
    field: 'Engineering & Technology',
    overview: 'A premier 4-year undergraduate engineering program focused on foundational computing, artificial intelligence, software architecture, and systems engineering.',
    who_is_it_for: 'Students who completed 10+2 with Physics, Mathematics, and Chemistry/Computer Science looking to build careers in software, tech leadership, or research.',
    eligibility: 'Minimum 60% aggregate in 10+2 (PCM) or equivalent recognized board examination.',
    duration: '4 Years (8 Semesters)',
    mode: 'Full-Time Campus',
    specializations: [
      'Artificial Intelligence & Machine Learning',
      'Cloud Computing & DevOps',
      'Cybersecurity & Forensics',
      'Data Engineering'
    ],
    curriculum_highlights: [
      'Data Structures & Algorithms',
      'Operating Systems & Distributed Computing',
      'Full-Stack Web & Mobile Architectures',
      'Capstone Industry Project & 6-Month Internship'
    ],
    career_opportunities: [
      'Software Development Engineer',
      'Cloud Systems Architect',
      'Machine Learning Engineer',
      'Product Engineer'
    ],
    university_name: 'Chandigarh University',
    university_slug: 'chandigarh-university',
    location: 'Mohali, Punjab',
    admission_process: 'Entrance merit score / Direct Counselling based on 10+2 performance and CareerVerse assessment.',
    important_dates: 'Applications for Academic Session 2026-27 are currently open.',
    featured: true
  },
  {
    id: 'prog-2',
    slug: 'bba-finance-marketing',
    name: 'Bachelor of Business Administration (BBA - Honours)',
    level: 'Undergraduate',
    field: 'Commerce & Management',
    overview: 'A forward-looking undergraduate management degree providing deep grounding in business fundamentals, marketing analytics, financial strategy, and organizational leadership.',
    who_is_it_for: '10+2 graduates from any stream (Commerce, Science, or Humanities) aspiring to venture into corporate management, banking, consulting, or entrepreneurship.',
    eligibility: 'Minimum 50% in 10+2 from a recognized board.',
    duration: '3 to 4 Years (with Research option)',
    mode: 'Full-Time Campus',
    specializations: [
      'Marketing Management & Digital Growth',
      'Banking & Financial Services',
      'Business Analytics',
      'Entrepreneurship & Family Business'
    ],
    curriculum_highlights: [
      'Managerial Economics & Financial Accounting',
      'Marketing Strategies & Consumer Insights',
      'Business Intelligence & Excel Analytics',
      'Corporate Live Projects & Summer Internship'
    ],
    career_opportunities: [
      'Business Analyst',
      'Marketing Associate',
      'Financial Analyst',
      'Management Trainee'
    ],
    university_name: 'Alliance University',
    university_slug: 'alliance-university',
    location: 'Bangalore, Karnataka',
    admission_process: 'Merit screening followed by CareerVerse personal counselling session.',
    important_dates: 'Rolling admissions for upcoming intake. Early round closing soon.',
    featured: true
  },
  {
    id: 'prog-3',
    slug: 'bachelor-of-physiotherapy-bpt',
    name: 'Bachelor of Physiotherapy (BPT)',
    level: 'Undergraduate',
    field: 'Medical & Allied Sciences',
    overview: 'A clinical allied healthcare program preparing skilled physical therapists equipped in musculoskeletal, neurological, cardiopulmonary, and sports rehabilitation.',
    who_is_it_for: 'Biology students seeking a respected clinical healthcare career with high demand in hospitals, sports councils, and independent clinics.',
    eligibility: '10+2 with Physics, Chemistry, and Biology (PCB) with minimum 50% marks.',
    duration: '4.5 Years (including 6-month compulsory rotational internship)',
    mode: 'Full-Time Campus',
    specializations: [
      'Orthopedic Rehabilitation',
      'Neurological Physiotherapy',
      'Sports Injury Management',
      'Pediatric Rehabilitation'
    ],
    curriculum_highlights: [
      'Human Anatomy, Physiology & Biomechanics',
      'Exercise Therapy & Electrotherapy',
      'Clinical Orthopedics & Neurology',
      'Hospital Clinical Postings & Rotational Internship'
    ],
    career_opportunities: [
      'Consultant Physiotherapist',
      'Sports Team Physio',
      'Rehabilitation Specialist',
      'Clinical Researcher'
    ],
    university_name: 'Dr. D.Y. Patil Vidyapeeth (DYPU)',
    university_slug: 'dy-patil-university',
    location: 'Pune, Maharashtra',
    admission_process: 'PCB merit score evaluation and CareerVerse medical guidance round.',
    important_dates: 'Admissions Open for current academic year.',
    featured: true
  },
  {
    id: 'prog-4',
    slug: 'integrated-ba-llb-honours',
    name: 'Integrated BA LLB (Honours)',
    level: 'Undergraduate',
    field: 'Law',
    overview: 'A comprehensive 5-year integrated double degree program combining liberal arts with in-depth legal jurisprudence, constitutional law, corporate law, and advocacy.',
    who_is_it_for: '10+2 pass outs aspiring to become corporate legal counsels, litigators, judicial officers, or policy analysts.',
    eligibility: '10+2 in any stream with minimum 45% aggregate (40% for reserved categories).',
    duration: '5 Years (10 Semesters)',
    mode: 'Full-Time Campus',
    specializations: [
      'Corporate & Commercial Law',
      'Intellectual Property Rights (IPR)',
      'Constitutional & Criminal Law',
      'Cyber Law'
    ],
    curriculum_highlights: [
      'Constitutional Law, Law of Torts & Contracts',
      'Criminal Law, CPC & CrPC',
      'Moot Court Trainings & Legal Aid Clinics',
      'Judicial & Corporate Law Internships'
    ],
    career_opportunities: [
      'Corporate Legal Advisor',
      'Advocate / Litigator',
      'Legal Researcher',
      'Civil & Judicial Services'
    ],
    university_name: 'O.P. Jindal Global University (JGU)',
    university_slug: 'op-jindal-global-university',
    location: 'Sonipat, Haryana',
    admission_process: 'Law entrance scores (CLAT/LSAT/University Test) or CareerVerse merit screening.',
    important_dates: 'Counselling rounds open now.',
    featured: false
  },

  // 2. FEATURED ONLINE CERTIFICATIONS & EXECUTIVE PROGRAMMES
  {
    id: 'prog-exec-1',
    slug: 'ai-for-business-professionals',
    name: 'Professional Certificate Programme in AI for Business Professionals',
    level: 'Certification',
    field: 'Commerce & Management',
    overview: 'Equips business leaders, product heads, and functional managers with strategic artificial intelligence competencies, enterprise automation frameworks, and Generative AI business models.',
    who_is_it_for: 'Business managers, team leads, consultants, product managers, and enterprise directors.',
    eligibility: 'Graduation in any discipline with minimum 2+ years of professional corporate experience.',
    duration: '6–8 Months',
    mode: 'Online / Distance',
    specializations: [
      'Generative AI Business Models',
      'Predictive Decision Intelligence',
      'Enterprise AI Automation',
      'AI ROI & Risk Management'
    ],
    curriculum_highlights: [
      'Executive Masterclasses by IIM Kozhikode Faculty',
      'Hands-on Enterprise AI Case Studies',
      'Generative AI Business Integration Blueprint',
      'IIM Kozhikode Executive Alumni Network'
    ],
    career_opportunities: [
      'AI Business Strategist',
      'Digital Transformation Lead',
      'Product Innovation Director',
      'Enterprise Strategy Manager'
    ],
    university_name: 'IIM Kozhikode',
    university_slug: 'op-jindal-global-university',
    location: 'Kerala / Online',
    admission_process: 'Executive application screening, resume review, and CareerVerse admission handholding.',
    important_dates: 'Admissions Open for upcoming cohort.',
    featured: true
  },
  {
    id: 'prog-exec-2',
    slug: 'forward-deployed-ai-engineering',
    name: 'Executive Post Graduate Programme in Forward Deployed AI Engineering',
    level: 'Executive PG Program',
    field: 'Engineering & Technology',
    overview: 'High-intensity engineering programme designed to convert software professionals into elite forward-deployed AI engineers capable of deploying LLMs, Agentic workflows, and production AI architectures.',
    who_is_it_for: 'Software engineers, architects, backend developers, and tech leads aiming to master applied AI systems.',
    eligibility: 'Bachelor’s degree in Engineering, Computer Applications, or Mathematics with programming proficiency.',
    duration: '11 Months',
    mode: 'Hybrid / Executive',
    specializations: [
      'LLM Fine-Tuning & Quantization',
      'Autonomous Agent Design (LangGraph / CrewAI)',
      'Vector Databases & Scalable RAG',
      'Production AI Ops & Model Monitoring'
    ],
    curriculum_highlights: [
      'IIIT Bangalore Executive Alumni Status',
      'Enterprise GenAI Architecture Capstones',
      'Hands-on Multi-Agent Workflows & MCP',
      'Real-world GPU Cluster Cloud Deployments'
    ],
    career_opportunities: [
      'Forward Deployed AI Engineer',
      'Generative AI Systems Architect',
      'Principal Machine Learning Engineer',
      'AI Solutions Director'
    ],
    university_name: 'IIIT Bangalore',
    university_slug: 'apex-institute-of-technology',
    location: 'Bangalore, Karnataka / Online',
    admission_process: 'Technical profile screening and CareerVerse counsellor interview.',
    important_dates: 'Cohort registrations actively being processed.',
    featured: true
  },
  {
    id: 'prog-exec-3',
    slug: 'applied-ai-and-agentic-ai',
    name: 'Executive Post Graduate Programme in Applied AI and Agentic AI',
    level: 'Executive PG Program',
    field: 'Science & IT',
    overview: 'Cutting-edge curriculum focused on multi-agent architectures, reasoning models, autonomous agent orchestration, and production deployments for high-scale enterprise applications.',
    who_is_it_for: 'Developers, IT leaders, and data scientists building autonomous AI systems and intelligent agent workflows.',
    eligibility: 'Degree holders with background in IT, Analytics, or Engineering.',
    duration: '12 Months',
    mode: 'Hybrid / Executive',
    specializations: [
      'Multi-Agent System Orchestration',
      'Tool Calling & Cognitive Loops',
      'Retrieval Augmented Generation (RAG)',
      'AI Agent Security & Hallucination Guardrails'
    ],
    curriculum_highlights: [
      'Executive Mentorship by Principal AI Scientists',
      'Autonomous Agent Swarm Simulations',
      'Industry Verified Portfolio Capstone',
      'Alumni Status and CareerVerse Placement Guidance'
    ],
    career_opportunities: [
      'Agentic AI Engineer',
      'AI Automation Consultant',
      'Staff Machine Learning Engineer',
      'Applied AI Research Associate'
    ],
    university_name: 'IIIT Bangalore',
    university_slug: 'apex-institute-of-technology',
    location: 'Bangalore, Karnataka / Online',
    admission_process: 'Eligibility verification and CareerVerse direct guidance.',
    important_dates: 'Upcoming batch enrolments active.',
    featured: true
  },
  {
    id: 'prog-exec-4',
    slug: 'cto-ai-leadership-programme',
    name: 'Chief Technology Officer & AI Leadership Programme',
    level: 'Executive MBA',
    field: 'Engineering & Technology',
    overview: 'Prepares senior engineering directors and technology executives to step into Chief Technology Officer roles, architect AI-native roadmaps, and scale enterprise tech stacks.',
    who_is_it_for: 'Senior tech leads, architects, and engineering managers with 8+ years experience.',
    eligibility: 'Graduation in tech/science with minimum 8 years of professional industry experience.',
    duration: '10 Months',
    mode: 'Hybrid / Executive',
    specializations: [
      'Enterprise Tech Strategy & AI Roadmaps',
      'Boardroom Tech Governance & Capital Allocation',
      'Scalable Distributed Cloud Systems',
      'Engineering Culture & C-Suite Elevation'
    ],
    curriculum_highlights: [
      'Campus Immersion at IIT Delhi',
      'C-Suite Mentorship & Global CXO Masterclasses',
      'Executive Peer Networking with Senior Tech Leaders',
      'Verified Academic Credential from IIT Delhi'
    ],
    career_opportunities: [
      'Chief Technology Officer (CTO)',
      'Head of Engineering',
      'VP of Technology & Architecture',
      'Chief Digital Officer'
    ],
    university_name: 'IIT Delhi',
    university_slug: 'op-jindal-global-university',
    location: 'New Delhi / Hybrid',
    admission_process: 'Senior profile evaluation, CV submission, and interview.',
    important_dates: 'Limited seats per executive cohort.',
    featured: true
  },
  {
    id: 'prog-exec-5',
    slug: 'cybersecurity-and-ai-security',
    name: 'Certificate Programme in Cybersecurity and AI Security',
    level: 'Certification',
    field: 'Science & IT',
    overview: 'A specialized credential focused on zero-trust architectures, enterprise security posture, defense against adversarial AI attacks, and securing large language model deployments.',
    who_is_it_for: 'Security analysts, network engineers, cloud architects, and IT managers.',
    eligibility: 'Graduates with interest in cybersecurity or working IT professionals.',
    duration: '6 Months',
    mode: 'Online / Distance',
    specializations: [
      'Zero-Trust Cloud & Network Security',
      'Adversarial AI & Prompt Injection Defense',
      'AI Threat Detection & Incident Response',
      'SOC Automation & Regulatory Compliance'
    ],
    curriculum_highlights: [
      'IIT Kharagpur Verified Academic Credential',
      'Hands-on Red Team / Blue Team Cyber Labs',
      'Securing Large Language Model Pipelines',
      'Enterprise Security Auditing & Governance'
    ],
    career_opportunities: [
      'Cybersecurity Architect',
      'AI Security Specialist',
      'Information Security Officer',
      'SOC Operations Manager'
    ],
    university_name: 'IIT Kharagpur',
    university_slug: 'op-jindal-global-university',
    location: 'West Bengal / Online',
    admission_process: 'Online application and CareerVerse admission counselling.',
    important_dates: 'Admissions open for upcoming session.',
    featured: true
  },
  {
    id: 'prog-exec-6',
    slug: 'chief-data-and-ai-officer-programme',
    name: 'Chief Data and AI Officer Programme',
    level: 'Executive MBA',
    field: 'Commerce & Management',
    overview: 'A flagship C-suite programme designed for Chief Data Officers and AI leaders to formulate data governance policies, monetize data assets, and drive enterprise-wide AI transformation.',
    who_is_it_for: 'Senior data leaders, analytics heads, and corporate executives aiming for CDAO roles.',
    eligibility: 'Min 7+ years of experience in data, tech, or business leadership.',
    duration: '10 Months',
    mode: 'Hybrid / Executive',
    specializations: [
      'Modern Data Architecture & Fabric',
      'Data Asset Monetization & Valuation',
      'Responsible AI, Privacy & GDPR Ethics',
      'Enterprise Data Culture & C-Suite Influence'
    ],
    curriculum_highlights: [
      'IIM Kozhikode Executive Alumni Network Access',
      'Direct CXO Masterclasses & Case Studies',
      'Capstone Enterprise Transformation Strategy',
      'Comprehensive Strategic Leadership Coaching'
    ],
    career_opportunities: [
      'Chief Data and AI Officer (CDAO)',
      'Chief Analytics Officer (CAO)',
      'Global Head of Data & Insights',
      'VP of Enterprise Data Strategy'
    ],
    university_name: 'IIM Kozhikode',
    university_slug: 'op-jindal-global-university',
    location: 'Kerala / Online',
    admission_process: 'Executive review round and CareerVerse admissions handholding.',
    important_dates: 'Cohort applications being accepted.',
    featured: true
  },
  {
    id: 'prog-exec-7',
    slug: 'building-ai-products',
    name: 'Executive Post Graduate Certificate in Building AI Products',
    level: 'Certification',
    field: 'Engineering & Technology',
    overview: 'Engineered for Product Managers, founders, and business analysts to conceptualize, validate, build, and scale AI-native products from zero to product-market fit.',
    who_is_it_for: 'Product managers, founders, business analysts, and design leads.',
    eligibility: 'Graduates with work experience in product, engineering, consulting or design.',
    duration: '7 Months',
    mode: 'Online / Distance',
    specializations: [
      'AI Product Strategy & Roadmap',
      'User Experience for Generative Models',
      'Managing Hallucination, Latency & Model Costs',
      'AI Evaluation Benchmarks & Telemetry'
    ],
    curriculum_highlights: [
      'IIIT Bangalore Executive Credential',
      'Product Hackathons with Live AI APIs',
      'End-to-End AI Product Capstone Portfolio',
      'Career Mentorship by Silicon Valley Product Leaders'
    ],
    career_opportunities: [
      'AI Product Manager (AI PM)',
      'Head of Product - Emerging Tech',
      'Product Growth Lead',
      'AI Startup Founder / Co-Founder'
    ],
    university_name: 'IIIT Bangalore',
    university_slug: 'apex-institute-of-technology',
    location: 'Bangalore, Karnataka / Online',
    admission_process: 'Profile evaluation and CareerVerse verification.',
    important_dates: 'Open admissions for upcoming cohort.',
    featured: false
  },
  {
    id: 'prog-exec-8',
    slug: 'ai-native-software-engineering',
    name: 'Executive Post Graduate Certificate in AI-Native Software Engineering',
    level: 'Certification',
    field: 'Engineering & Technology',
    overview: 'Modernizes conventional software engineering practices with AI coding agents, autonomous unit testing, AI-driven CI/CD pipelines, and synthetic data development.',
    who_is_it_for: 'Software engineers, developers, QA architects, and tech leads.',
    eligibility: 'Bachelor’s degree in Computer Science, IT, or Engineering.',
    duration: '8 Months',
    mode: 'Online / Distance',
    specializations: [
      'AI Dev Agents & Copilot Architectures',
      'Automated Refactoring & Static Analysis',
      'Vector Stores & Microservices Backend',
      'Synthetic Data Generation & Unit Testing'
    ],
    curriculum_highlights: [
      'Hands-on Virtual Coding Sandboxes',
      'IIIT Bangalore Verified Academic Certificate',
      'Real-world CI/CD Pipeline Automation',
      'Code Review Sessions with Senior Principal Engineers'
    ],
    career_opportunities: [
      'AI-Native Software Engineer',
      'Senior Backend Engineer (AI Systems)',
      'Lead DevSecOps Engineer',
      'Software Engineering Specialist'
    ],
    university_name: 'IIIT Bangalore',
    university_slug: 'apex-institute-of-technology',
    location: 'Bangalore, Karnataka / Online',
    admission_process: 'Online submission and CareerVerse profile screening.',
    important_dates: 'Current intake open.',
    featured: false
  },
  {
    id: 'prog-exec-9',
    slug: 'executive-diploma-machine-learning-ai',
    name: 'Executive Diploma in Machine Learning and AI',
    level: 'PG Diploma',
    field: 'Science & IT',
    overview: 'Comprehensive, academically rigorous foundational and advanced diploma in statistics, supervised/unsupervised learning, deep learning, NLP, and computer vision.',
    who_is_it_for: 'Engineers, data analysts, and science graduates aiming for ML specializations.',
    eligibility: 'Graduates with Mathematics or Statistics in 10+2 or Degree.',
    duration: '12 Months',
    mode: 'Hybrid / Executive',
    specializations: [
      'Deep Neural Networks & Transformers',
      'Natural Language Processing (NLP)',
      'Computer Vision & Image Generation',
      'Statistical Foundations & Optimization'
    ],
    curriculum_highlights: [
      'IIIT Bangalore Alumni Status',
      'Weekly Doubt Clearing with Faculty & Industry Mentors',
      '12+ Industry Grade Real-World ML Projects',
      'Dedicated Career Placement Support'
    ],
    career_opportunities: [
      'Machine Learning Engineer',
      'NLP Specialist',
      'Computer Vision Scientist',
      'Senior AI Analyst'
    ],
    university_name: 'IIIT Bangalore',
    university_slug: 'apex-institute-of-technology',
    location: 'Bangalore, Karnataka / Online',
    admission_process: 'Academic screening and direct enrolment via CareerVerse.',
    important_dates: 'Rolling enrolments active.',
    featured: false
  },
  {
    id: 'prog-exec-10',
    slug: 'masters-degree-ai-and-data-science',
    name: 'Master’s Degree in Artificial Intelligence and Data Science',
    level: 'Postgraduate',
    field: 'Science & IT',
    overview: 'A fully accredited, recognized Master’s degree imparting comprehensive mastery over data engineering, machine learning pipelines, cloud AI, and ethical governance.',
    who_is_it_for: 'Working professionals seeking an accredited, formal master’s degree with international recognition.',
    eligibility: 'Bachelor’s degree in any discipline with min. 50% marks.',
    duration: '2 Years',
    mode: 'Online / Distance',
    specializations: [
      'Cloud AI Architectures',
      'Big Data Engineering & Spark',
      'Advanced Predictive Analytics',
      'AI Ethics, Policy & Governance'
    ],
    curriculum_highlights: [
      'Accredited Master’s Degree from OP Jindal Global University',
      'Rigorous Dissertation Supervised by PhD Scholars',
      'WES Recognized Degree for Global Career Mobility',
      'Comprehensive High-Performance Computing Labs'
    ],
    career_opportunities: [
      'Lead Data Scientist',
      'AI Research Associate',
      'Big Data Architect',
      'Analytics Consultant'
    ],
    university_name: 'O.P. Jindal Global University (JGU)',
    university_slug: 'op-jindal-global-university',
    location: 'Sonipat, Haryana / Online',
    admission_process: 'Academic transcript verification and CareerVerse counselling.',
    important_dates: 'January & July semester admissions open.',
    featured: true
  },
  {
    id: 'prog-exec-11',
    slug: 'msc-in-machine-learning-ai',
    name: 'Master of Science in Machine Learning & AI',
    level: 'Postgraduate',
    field: 'Engineering & Technology',
    overview: 'Global British Master of Science degree conferred by Liverpool John Moores University (UK) paired with an Executive PG Programme from IIIT Bangalore. Recognized globally for PR and higher research.',
    who_is_it_for: 'Software and tech professionals seeking a top British university master’s credential without relocating.',
    eligibility: 'Bachelor’s degree in Engineering, Computer Science, or Mathematics.',
    duration: '18 Months',
    mode: 'Online / Distance',
    specializations: [
      'Deep Learning & Reinforcement Learning',
      'Computer Vision & Video Analytics',
      'Generative AI & Large Language Models',
      'Supervised UK Faculty Research Thesis'
    ],
    curriculum_highlights: [
      'Dual Credential: MS from LJMU UK + Exec PG from IIIT-B',
      'WES Recognized & Global University Equivalency',
      'Access to LJMU Digital Library with 16,000+ Journals',
      'Alumni Privileges with Liverpool John Moores University'
    ],
    career_opportunities: [
      'Principal Machine Learning Scientist',
      'AI Researcher',
      'Global Tech Consultant',
      'Algorithmic Systems Architect'
    ],
    university_name: 'Liverpool John Moores University',
    university_slug: 'op-jindal-global-university',
    location: 'Liverpool, UK / Online',
    admission_process: 'International profile evaluation and CareerVerse verification.',
    important_dates: 'Cohort applications active.',
    featured: true
  },
  {
    id: 'prog-exec-12',
    slug: 'dba-in-emerging-technologies-generative-ai',
    name: 'DBA in Emerging Technologies with Concentration in Generative AI',
    level: 'Executive PG Program',
    field: 'Commerce & Management',
    overview: 'Prestigious doctoral-level credential conferring the title of Doctor. Focuses on original applied research on generative AI, enterprise tech adoption, and strategic economics.',
    who_is_it_for: 'Senior business executives, consultants, directors, and researchers aiming for a terminal doctorate degree.',
    eligibility: 'Master’s degree or equivalent with min. 5+ years of managerial experience.',
    duration: '3 Years',
    mode: 'Online / Distance',
    specializations: [
      'Enterprise Generative AI Adoption',
      'Applied Economics & Tech Strategy',
      'Doctoral Research Methodology & Dissertation',
      'C-Suite Strategic Leadership'
    ],
    curriculum_highlights: [
      'Terminal Doctorate Degree (DBA) from San Francisco, USA',
      'Faculty Mentorship from Silicon Valley Academics',
      'Opportunity to Publish Applied Research Papers',
      'WES Evaluated Credential for Global Recognition'
    ],
    career_opportunities: [
      'Doctor of Business Administration (Dr. Title)',
      'Management Consultant Partner',
      'Chief Strategy Officer',
      'Adjunct Professor & Board Advisor'
    ],
    university_name: 'Golden Gate University',
    university_slug: 'premier-school-of-executive-studies',
    location: 'San Francisco, USA / Online',
    admission_process: 'Doctoral profile review, SOP evaluation, and CareerVerse interview.',
    important_dates: 'Doctoral cohorts commence twice annually.',
    featured: true
  },
  {
    id: 'prog-exec-13',
    slug: 'data-science-and-agentic-ai',
    name: 'Professional Certificate Programme in Data Science & Agentic AI',
    level: 'Certification',
    field: 'Science & IT',
    overview: 'Blends classical data science, data warehousing, and business intelligence with next-generation autonomous AI agents and automated data insights.',
    who_is_it_for: 'Analysts, engineers, commerce and science graduates aiming for high-impact data analytics roles.',
    eligibility: 'Graduation in Science, Commerce, Engineering, or Management.',
    duration: '9 Months',
    mode: 'Online / Distance',
    specializations: [
      'Predictive Analytics & Python Pipelines',
      'Autonomous Agentic Data Analysts',
      'SQL & Cloud Data Warehousing',
      'Automated Executive Visualizations'
    ],
    curriculum_highlights: [
      'IIIT Bangalore Certificate of Completion',
      'High-Impact Capstones in Finance, Retail & Tech',
      'Live Online Sessions with Industry Practitioners',
      'CareerVerse 1-on-1 Career Mentorship'
    ],
    career_opportunities: [
      'Data Scientist',
      'Business Intelligence Architect',
      'Agentic Data Engineer',
      'Analytics Consultant'
    ],
    university_name: 'IIIT Bangalore',
    university_slug: 'apex-institute-of-technology',
    location: 'Bangalore, Karnataka / Online',
    admission_process: 'Online submission followed by CareerVerse admission counselling.',
    important_dates: 'Open admissions for upcoming batch.',
    featured: false
  },

  // 3. POPULAR ONLINE UG PROGRAMMES
  {
    id: 'prog-ug-online-1',
    slug: 'online-bba',
    name: 'Online BBA (Bachelor of Business Administration)',
    level: 'Online Degree',
    field: 'Commerce & Management',
    overview: 'A dynamic online undergraduate business management degree equipping students with organizational leadership, marketing strategy, operations, and modern financial acumen.',
    who_is_it_for: '10+2 students, diploma holders, and working adults seeking a recognized business management degree.',
    eligibility: '10+2 from any recognized board with minimum 45-50% marks.',
    duration: '3 Years (6 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'Marketing Management',
      'Financial Management',
      'Human Resource Management',
      'Business Analytics',
      'Digital Business & E-Commerce'
    ],
    curriculum_highlights: [
      '100% UGC-DEB Approved Degree Equivalent to On-Campus BBA',
      'Interactive Learning Management System (LMS) with Live Weekend Classes',
      'Industry-Guided Real-World Case Studies',
      'Career Placement Portal Access & Interview Prep'
    ],
    career_opportunities: [
      'Business Development Executive',
      'Marketing Associate',
      'HR Coordinator',
      'Sales Operations Manager'
    ],
    university_name: 'Manipal Academy of Higher Education (MAHE)',
    university_slug: 'manipal-university',
    location: 'Online / Pan-India',
    admission_process: 'Online document verification and direct enrolment through CareerVerse.',
    important_dates: 'January & July batch admissions active.',
    featured: true
  },
  {
    id: 'prog-ug-online-2',
    slug: 'online-bca',
    name: 'Online BCA (Bachelor of Computer Applications)',
    level: 'Online Degree',
    field: 'Science & IT',
    overview: 'Career-focused computer applications degree covering full-stack programming, cloud architecture, databases, data structures, and modern software development.',
    who_is_it_for: 'Aspiring programmers, tech enthusiasts, and 10+2 students wanting to build tech careers remotely.',
    eligibility: '10+2 in any stream (Mathematics/Computer Science at 10+2 preferred).',
    duration: '3 Years (6 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'Cloud Computing',
      'Full-Stack Web Development',
      'Cybersecurity',
      'Data Analytics'
    ],
    curriculum_highlights: [
      'Hands-on Programming Labs in Python, Java, and C++',
      'UGC-DEB Accredited Online Degree',
      'Live Masterclasses by Silicon Valley & Indian Tech Engineers',
      'Final Year Capstone Project with Real-World Hosting'
    ],
    career_opportunities: [
      'Junior Software Developer',
      'Web Application Engineer',
      'Cloud Support Engineer',
      'Cybersecurity Analyst'
    ],
    university_name: 'Amrita Vishwa Vidyapeetham',
    university_slug: 'amrita-vishwa-vidyapeetham',
    location: 'Online / Pan-India',
    admission_process: 'Fast-track online admission support via CareerVerse.',
    important_dates: 'Enrolments open for upcoming academic session.',
    featured: true
  },
  {
    id: 'prog-ug-online-3',
    slug: 'online-bcom',
    name: 'Online B.Com (Bachelor of Commerce)',
    level: 'Online Degree',
    field: 'Commerce & Management',
    overview: 'Foundational commerce degree providing in-depth training in corporate accounting, financial auditing, tax regulations, and commercial law.',
    who_is_it_for: 'Students pursuing CA, CS, CMA or seeking corporate finance and banking roles.',
    eligibility: '10+2 with Commerce, Mathematics, or equivalent recognized qualification.',
    duration: '3 Years (6 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'Corporate Accounting & Auditing',
      'Financial Markets & Banking',
      'Taxation & Corporate Law'
    ],
    curriculum_highlights: [
      'Comprehensive Accounting & Taxation Syllabus',
      'Recorded and Live Lecture Formats Compatible with CA Prep',
      'UGC-DEB Accredited Bachelor of Commerce Degree',
      'Dedicated Student Mentor for Academic Doubts'
    ],
    career_opportunities: [
      'Financial Accountant',
      'Tax Consultant',
      'Banking Associate',
      'Audit Assistant'
    ],
    university_name: 'Andhra University',
    university_slug: 'andhra-university',
    location: 'Online / Pan-India',
    admission_process: 'Direct merit registration and eligibility check via CareerVerse.',
    important_dates: 'Rolling session admissions underway.',
    featured: false
  },
  {
    id: 'prog-ug-online-4',
    slug: 'online-bcom-hons',
    name: 'Online B.Com (Hons.)',
    level: 'Online Degree',
    field: 'Commerce & Management',
    overview: 'An advanced honours commerce degree featuring specialized electives in international finance, financial markets, taxation law, and banking analytics.',
    who_is_it_for: 'Ambitious commerce students targeting high-level corporate finance, treasury, or investment careers.',
    eligibility: '10+2 from a recognized board with minimum 50% aggregate.',
    duration: '3 Years (6 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'International Finance & Accounting',
      'FinTech & Digital Banking',
      'Applied Financial Analytics'
    ],
    curriculum_highlights: [
      'Advanced Electives Aligned with Global Financial Certifications',
      'UGC-DEB Accredited Honours Degree',
      'Bloomberg Market Concepts Exposure',
      'Corporate Live Case Studies & Capstone'
    ],
    career_opportunities: [
      'Investment Analyst',
      'Corporate Finance Executive',
      'FinTech Specialist',
      'Credit Risk Analyst'
    ],
    university_name: 'Chandigarh University',
    university_slug: 'chandigarh-university',
    location: 'Online / Pan-India',
    admission_process: 'Merit screening and document verification handled by CareerVerse.',
    important_dates: 'Admissions open for current intake.',
    featured: false
  },
  {
    id: 'prog-ug-online-5',
    slug: 'online-ba',
    name: 'Online BA (Bachelor of Arts)',
    level: 'Online Degree',
    field: 'Arts & Humanities',
    overview: 'Multidisciplinary liberal arts degree offering flexible specializations in English, Sociology, Political Science, Psychology, and Media Communication.',
    who_is_it_for: 'Students preparing for Civil Services, media careers, content strategy, or public policy.',
    eligibility: '10+2 from any recognized board in Arts, Science, or Commerce.',
    duration: '3 Years (6 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'English Literature & Communication',
      'Political Science & Public Administration',
      'Sociology & Social Welfare',
      'Applied Psychology'
    ],
    curriculum_highlights: [
      'Flexible Study Hours Ideal for Competitive Exam Preparation',
      'UGC-DEB Recognized Bachelor of Arts Degree',
      'Comprehensive Digital Study Material and Video Library',
      'Periodic Online Masterclasses by Senior Academicians'
    ],
    career_opportunities: [
      'Civil Services Aspirant / Officer',
      'Content Strategist',
      'Public Relations Executive',
      'Educational Coordinator'
    ],
    university_name: 'Kurukshetra University',
    university_slug: 'kurukshetra-university',
    location: 'Online / Pan-India',
    admission_process: 'Direct enrolment and document processing through CareerVerse.',
    important_dates: 'Admissions open for upcoming semester.',
    featured: false
  },
  {
    id: 'prog-ug-online-6',
    slug: 'online-bsc',
    name: 'Online B.Sc. (Bachelor of Science)',
    level: 'Online Degree',
    field: 'Science & IT',
    overview: 'Science degree with contemporary curricula in applied mathematics, information systems, physics, and scientific computational modeling.',
    who_is_it_for: 'Science stream 10+2 students seeking structured flexible higher education in analytical disciplines.',
    eligibility: '10+2 with Science stream (Physics, Chemistry, Mathematics/Biology).',
    duration: '3 Years (6 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'Applied Mathematics & Statistics',
      'Information Technology & Computing',
      'Applied Physics & Electronics'
    ],
    curriculum_highlights: [
      'Virtual Science Simulations & Virtual Lab Exercises',
      'UGC-DEB Accredited Bachelor of Science Degree',
      'Interactive Doubt Resolution by Faculty Panels',
      'Regular Academic Assessments and Feedback'
    ],
    career_opportunities: [
      'Scientific Data Analyst',
      'Technical Support Executive',
      'Research Assistant',
      'Operations Analyst'
    ],
    university_name: 'Lovely Professional University (LPU)',
    university_slug: 'lovely-professional-university',
    location: 'Online / Pan-India',
    admission_process: 'Class 12th science merit screening via CareerVerse.',
    important_dates: 'Enrolments active for current session.',
    featured: false
  },
  {
    id: 'prog-ug-online-7',
    slug: 'online-bsc-data-science-programming',
    name: 'Online B.Sc. Data Science / Programming',
    level: 'Online Degree',
    field: 'Science & IT',
    overview: 'High-demand STEM bachelor’s program providing rigorous foundational training in algorithms, statistical modeling, machine learning, Python, and big data systems.',
    who_is_it_for: 'Mathematics and science enthusiasts aiming for high-growth data science and software engineering jobs.',
    eligibility: '10+2 with Mathematics or Statistics with minimum 50% marks.',
    duration: '3–4 Years',
    mode: 'Online / Distance',
    specializations: [
      'Data Science & Predictive Analytics',
      'Full-Stack Programming in Python & JS',
      'Machine Learning & Big Data Systems'
    ],
    curriculum_highlights: [
      'Advanced Programming in Python, SQL, and R',
      'Real-world Kaggle Style Datasets & Industry Projects',
      'UGC-DEB Accredited Degree with Global Equivalency',
      'Placement Support with Leading Capability Centers'
    ],
    career_opportunities: [
      'Data Scientist',
      'Software Developer',
      'Machine Learning Engineer',
      'Business Intelligence Analyst'
    ],
    university_name: 'Shoolini University',
    university_slug: 'shoolini-university',
    location: 'Online / Pan-India',
    admission_process: 'Online assessment and CareerVerse guided registration.',
    important_dates: 'Applications being accepted for upcoming batch.',
    featured: true
  },
  {
    id: 'prog-ug-online-8',
    slug: 'online-ba-bsc-economics',
    name: 'Online BA Economics / B.Sc. Economics',
    level: 'Online Degree',
    field: 'Commerce & Management',
    overview: 'Rigorous economics degree combining micro/macroeconomics with econometrics, mathematical forecasting, and financial market modeling.',
    who_is_it_for: 'Students keen on financial economics, data analysis, policy advisory, or banking consulting.',
    eligibility: '10+2 with Mathematics or Economics preferred.',
    duration: '3 Years (6 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'Applied Econometrics & Forecasting',
      'Financial Economics & Banking',
      'Development Economics & Public Policy'
    ],
    curriculum_highlights: [
      'Mathematical Economics & Statistical Modeling Tools',
      'UGC-DEB Accredited Bachelor Degree',
      'Macroeconomic Policy Case Studies & Analysis',
      'Direct Guidance for Banking and Financial Entrances'
    ],
    career_opportunities: [
      'Economic Consultant',
      'Market Research Analyst',
      'Financial Planning Executive',
      'Policy Associate'
    ],
    university_name: 'Parul University',
    university_slug: 'parul-university',
    location: 'Online / Pan-India',
    admission_process: 'Academic screening and direct enrolment via CareerVerse.',
    important_dates: 'Open admissions for upcoming academic year.',
    featured: false
  },
  {
    id: 'prog-ug-online-9',
    slug: 'online-bba-business-analytics',
    name: 'Online BBA Business Analytics',
    level: 'Online Degree',
    field: 'Commerce & Management',
    overview: 'Blends core management principles with data visualization, business statistics, predictive analytics, Excel modeling, and Power BI dashboards.',
    who_is_it_for: 'Tech-minded business students wishing to lead corporate decision-making through data insights.',
    eligibility: '10+2 from any stream with minimum 50% marks.',
    duration: '3 Years (6 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'Business Intelligence & Power BI',
      'Marketing Analytics & Consumer Metrics',
      'Financial Analytics & Forecasting',
      'HR Analytics & Talent Metrics'
    ],
    curriculum_highlights: [
      'Hands-on Training in Power BI, Advanced Excel, and SQL',
      'UGC-DEB Accredited Business Administration Degree',
      'Industry Projects Guided by Corporate BI Leads',
      'Integrated Placement Support and Soft-Skills Coaching'
    ],
    career_opportunities: [
      'Business Analytics Associate',
      'Operations Analyst',
      'Marketing Intelligence Executive',
      'Management Consultant Trainee'
    ],
    university_name: 'Vivekananda Global University (VGU)',
    university_slug: 'vivekananda-global-university',
    location: 'Online / Pan-India',
    admission_process: 'Direct merit counselling and document verification via CareerVerse.',
    important_dates: 'Admissions active for current batch.',
    featured: true
  },

  // 4. POPULAR ONLINE PG PROGRAMMES
  {
    id: 'prog-pg-online-1',
    slug: 'online-mba-postgraduate',
    name: '⭐ Online MBA (Master of Business Administration)',
    level: 'Online Degree',
    field: 'Commerce & Management',
    overview: 'Premier UGC-DEB recognized postgraduate management degree designed for ambitious working professionals, graduates, and aspiring corporate leaders.',
    who_is_it_for: 'Working professionals with 0 to 10+ years experience seeking accelerated corporate promotions and senior roles.',
    eligibility: 'Bachelor’s degree in any discipline with min. 50% marks from a recognized university.',
    duration: '2 Years (4 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'Marketing Management',
      'Finance & FinTech',
      'Human Resource Management',
      'Business Analytics',
      'AI/ML in Business Strategy',
      'Cloud & IT Management',
      'Cybersecurity Governance',
      'Leadership & Strategic Management'
    ],
    curriculum_highlights: [
      'UGC-DEB Approved Degree Recognized for Govt. & Corporate Jobs Worldwide',
      'Live Masterclasses by Senior Industry CXOs and Top B-School Faculty',
      'Dual Specialization Options for Multi-Skilled Career Growth',
      'Digital Career Placement Support with 500+ Partner Corporates'
    ],
    career_opportunities: [
      'Senior Marketing Manager',
      'Corporate Finance Lead',
      'Operations Director',
      'HR Business Partner (HRBP)',
      'Management Consultant'
    ],
    university_name: 'NMIMS (Narsee Monjee Institute of Management Studies)',
    university_slug: 'nmims-university',
    location: 'Online / Pan-India',
    admission_process: 'Fast-track profile review and direct enrolment assistance via CareerVerse.',
    important_dates: 'January & July intake admissions open.',
    featured: true
  },
  {
    id: 'prog-pg-online-2',
    slug: 'online-mca-postgraduate',
    name: '⭐ Online MCA (Master of Computer Applications)',
    level: 'Online Degree',
    field: 'Science & IT',
    overview: 'High-level computer applications and software architecture master’s degree providing mastery in cloud computing, enterprise architectures, AI algorithms, and full-stack systems.',
    who_is_it_for: 'BCA, B.Sc, B.Tech graduates and IT professionals wanting to elevate into senior software architect roles.',
    eligibility: 'BCA / B.Sc. / B.Tech or Graduation with Mathematics at 10+2 or Graduation level.',
    duration: '2 Years (4 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'Cloud Computing & DevOps',
      'Artificial Intelligence & Machine Learning',
      'Cybersecurity & Information Defense',
      'Data Science & Analytics',
      'Full-Stack Software Engineering'
    ],
    curriculum_highlights: [
      'UGC-DEB Approved Master’s Degree Equal to Campus MCA',
      'Modern Curriculum Covering Kubernetes, Docker, Microservices, and AI',
      'Virtual Labs and Cloud Sandboxes for Coding Practicals',
      'Dedicated Placement Assistance with Top MNC IT Services'
    ],
    career_opportunities: [
      'Lead Software Architect',
      'Cloud Systems Engineer',
      'Machine Learning Specialist',
      'Senior Full-Stack Developer'
    ],
    university_name: 'Chandigarh University',
    university_slug: 'chandigarh-university',
    location: 'Online / Pan-India',
    admission_process: 'Academic screening and direct online admission via CareerVerse.',
    important_dates: 'Admissions open for next semester.',
    featured: true
  },
  {
    id: 'prog-pg-online-3',
    slug: 'online-mcom-postgraduate',
    name: '⭐ Online M.Com (Master of Commerce)',
    level: 'Online Degree',
    field: 'Commerce & Management',
    overview: 'Comprehensive advanced degree in financial accounting, corporate taxation, international trade, treasury management, and banking operations.',
    who_is_it_for: 'Commerce graduates, accountants, finance executives, and lecturers pursuing deep financial mastery.',
    eligibility: 'B.Com / BBA / BBM or relevant commerce degree from an accredited university.',
    duration: '2 Years (4 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'Finance & Accounting',
      'Banking & FinTech',
      'International Trade & Logistics',
      'Corporate Governance & Tax Laws'
    ],
    curriculum_highlights: [
      'UGC-DEB Accredited Master of Commerce Degree',
      'Aligned with UGC-NET JRF and Corporate Accounting Certifications',
      '24/7 Digital Library Access & Expert Doubt Clarifications',
      'Placement Assistance with BFSI and Corporate Accounting Firms'
    ],
    career_opportunities: [
      'Senior Financial Analyst',
      'Corporate Tax Manager',
      'Treasury Specialist',
      'Banking Operations Head'
    ],
    university_name: 'Kurukshetra University',
    university_slug: 'kurukshetra-university',
    location: 'Online / Pan-India',
    admission_process: 'Direct document verification and counselling through CareerVerse.',
    important_dates: 'Enrolments active for upcoming batch.',
    featured: true
  },
  {
    id: 'prog-pg-online-4',
    slug: 'online-msc-postgraduate',
    name: 'Online M.Sc. (Master of Science)',
    level: 'Online Degree',
    field: 'Science & IT',
    overview: 'Specialized scientific and quantitative postgraduate degree focusing on applied mathematics, computer science, information systems, and computational data analysis.',
    who_is_it_for: 'Science graduates, programmers, and analysts looking to deepen technical or mathematical foundations.',
    eligibility: 'Bachelor’s degree in Science, IT, BCA, or Engineering.',
    duration: '2 Years (4 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'Data Science & Computational Math',
      'Artificial Intelligence Systems',
      'Information Technology',
      'Applied Statistics'
    ],
    curriculum_highlights: [
      'UGC-DEB Accredited Master of Science Degree',
      'Advanced Statistical Analysis and Machine Learning Algorithms',
      'Supervised Academic Thesis & Research Project',
      'Career Mentoring for Tech and Data Roles'
    ],
    career_opportunities: [
      'Data Scientist',
      'Quantitative Analyst',
      'AI Research Associate',
      'Systems Architect'
    ],
    university_name: 'Amrita Vishwa Vidyapeetham',
    university_slug: 'amrita-vishwa-vidyapeetham',
    location: 'Online / Pan-India',
    admission_process: 'Academic screening and direct application via CareerVerse.',
    important_dates: 'Admissions open for current intake.',
    featured: false
  },
  {
    id: 'prog-pg-online-5',
    slug: 'online-ma-postgraduate',
    name: 'Online MA (Master of Arts)',
    level: 'Online Degree',
    field: 'Arts & Humanities',
    overview: 'Flexible online master’s degree offering humanities, social sciences, clinical psychology, public administration, and English literature tracks.',
    who_is_it_for: 'Civil services aspirants, educators, writers, and social scientists.',
    eligibility: 'Graduation in any discipline from a recognized university.',
    duration: '2 Years (4 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'Applied & Clinical Psychology',
      'English Literature & Language',
      'Public Administration & Governance',
      'Sociology & Development Studies',
      'Economics'
    ],
    curriculum_highlights: [
      'UGC-DEB Accredited Master of Arts Degree',
      'Designed to Accommodate UPSC & State PSC Preparations',
      'Comprehensive Digital Study Guides and Live Discussions',
      'Academic Mentorship by Senior Faculty'
    ],
    career_opportunities: [
      'Policy Analyst',
      'Senior Content Writer / Editor',
      'Assistant Professor (with NET/PhD)',
      'Public Relations Director'
    ],
    university_name: 'Andhra University',
    university_slug: 'andhra-university',
    location: 'Online / Pan-India',
    admission_process: 'Direct enrolment and merit verification through CareerVerse.',
    important_dates: 'Open admissions for upcoming session.',
    featured: false
  },
  {
    id: 'prog-pg-online-6',
    slug: 'online-pg-executive-management',
    name: 'Online PG / Executive Management',
    level: 'Executive PG Program',
    field: 'Commerce & Management',
    overview: 'Accelerated executive credential designed for managers seeking promotion, leadership transitions, and strategic business transformation skills without taking a career break.',
    who_is_it_for: 'Managers with 1–2+ years experience seeking mid-career acceleration.',
    eligibility: 'Bachelor’s degree with 1–2+ years of professional work experience.',
    duration: '1–2 Years',
    mode: 'Online / Distance',
    specializations: [
      'Strategic Corporate Leadership',
      'Digital Transformation & Innovation',
      'Supply Chain & Operations Analytics',
      'Marketing & Sales Leadership',
      'Corporate Finance Strategy'
    ],
    curriculum_highlights: [
      'Weekend Live Classes Designed for Busy Executives',
      'Harvard & IIM Style Business Case Studies',
      'Alumni Status with Recognized Executive Network',
      'CareerVerse 1-on-1 Executive Counselling'
    ],
    career_opportunities: [
      'Associate Director',
      'Operations Manager',
      'Strategic Planning Lead',
      'Business Unit Head'
    ],
    university_name: 'UPES (University of Petroleum & Energy Studies)',
    university_slug: 'upes-dehradun',
    location: 'Dehradun / Online',
    admission_process: 'Executive CV review and CareerVerse direct guidance.',
    important_dates: 'Rolling cohort enrolments underway.',
    featured: false
  },
  {
    id: 'prog-pg-online-7',
    slug: 'online-majmc-postgraduate',
    name: 'Online MAJMC (Journalism & Mass Communication)',
    level: 'Online Degree',
    field: 'Arts & Humanities',
    overview: 'Modern media degree covering digital journalism, content strategy, brand communications, public relations, audio-visual broadcasting, and social media production.',
    who_is_it_for: 'Media professionals, writers, journalists, content creators, and corporate PR specialists.',
    eligibility: 'Bachelor’s degree in any discipline from an accredited university.',
    duration: '2 Years (4 Semesters)',
    mode: 'Online / Distance',
    specializations: [
      'Digital Media & Investigative Journalism',
      'Corporate Communications & Public Relations',
      'Broadcast & Audio-Visual Media',
      'Social Media & Digital Brand Strategy'
    ],
    curriculum_highlights: [
      'UGC-DEB Accredited Master of Arts in Journalism & Mass Communication',
      'Hands-on Digital Portfolio and Media Studio Assignments',
      'Live Masterclasses by Renowned Journalists and PR Directors',
      'Direct Media Industry Placement Connections'
    ],
    career_opportunities: [
      'Digital Content Lead',
      'Corporate Communications Manager',
      'Senior Journalist / Reporter',
      'Public Relations Consultant'
    ],
    university_name: 'Shoolini University',
    university_slug: 'shoolini-university',
    location: 'Solan, HP / Online',
    admission_process: 'Direct online admission through CareerVerse verification.',
    important_dates: 'Admissions open for upcoming cycle.',
    featured: false
  }
];
