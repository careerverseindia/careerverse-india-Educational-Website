export type LeadStatus = 'New' | 'Contacted' | 'Follow-up' | 'Counselling Scheduled' | 'Converted' | 'Closed';

export type WhoIsBooking = 'Parent' | 'Guardian' | 'Student';

export type CareerGuidanceCategoryType = 
  | 'Class 5 to 7'
  | 'Class 8 to 10'
  | 'Intermediate (11th & 12th)'
  | 'Degree / Graduation'
  | 'Working Professional';

export type CounsellingStage = 
  | 'Classes 5–7'
  | 'Classes 8–10'
  | 'Classes 11–12'
  | 'Graduate / Recent Graduate'
  | 'Working Professional';

export type CounsellingMode = 'Online Meeting' | 'Phone Call' | 'In-Person' | 'Online' | 'Phone' | 'In-person';

export type EducationLevel = 
  | 'Undergraduate'
  | 'Diploma'
  | 'Certification'
  | 'PG Diploma'
  | 'Postgraduate'
  | 'Online Degree'
  | 'Executive MBA'
  | 'Executive PG Program';

export type StudyField = 
  | 'Medical & Allied Sciences'
  | 'Engineering & Technology'
  | 'Science & IT'
  | 'Commerce & Management'
  | 'Arts & Humanities'
  | 'Social Sciences'
  | 'Law';

export type LocationType = 'India' | 'Online' | 'International';

// Lead 1: Career Guidance Lead
export interface CareerGuidanceLead {
  id: string;
  created_at: string;
  status: LeadStatus;
  full_name: string;
  mobile_number: string;
  email?: string;
  who_is_booking?: WhoIsBooking;
  parent_guardian_name?: string;
  parent_guardian_mobile?: string;
  career_guidance_category?: string;
  career_guidance_subcategory?: string;
  counselling_mode?: CounsellingMode | string;
  current_class?: string;
  preferred_career?: string;
  current_qualification: string;
  school_college?: string;
  city?: string;
  state?: string;
  interested_field?: string;
  preferred_course?: string;
  career_goal?: string;
  preferred_counselling_mode?: CounsellingMode | string;
  message?: string;
  internal_notes?: string;
}

// Lead 2: Admission Enquiry
export interface AdmissionEnquiry {
  id: string;
  created_at: string;
  status: LeadStatus;
  full_name: string;
  mobile_number: string;
  email: string;
  who_is_booking?: 'Student' | 'Parent' | 'Guardian';
  parent_guardian_name?: string;
  parent_guardian_mobile?: string;
  current_class?: string;
  current_qualification: string;
  preferred_program: string;
  preferred_specialization?: string;
  preferred_location?: string;
  budget_range?: string;
  preferred_intake_year?: string;
  preferred_career?: string;
  counselling_mode?: CounsellingMode | string;
  preferred_counselling_mode?: CounsellingMode | string;
  message?: string;
  internal_notes?: string;
}

// Lead 3: Counselling Request ("Book Career Counselling")
export interface CounsellingRequest {
  id: string;
  created_at: string;
  status: LeadStatus;
  full_name: string;
  mobile_number: string;
  email?: string;
  who_is_booking?: WhoIsBooking;
  parent_guardian_name?: string;
  parent_guardian_mobile?: string;
  counselling_mode?: CounsellingMode | string;
  current_class?: string;
  preferred_career?: string;
  counselling_category: CounsellingStage | string;
  preferred_mode?: CounsellingMode | string;
  preferred_counselling_mode?: CounsellingMode | string;
  preferred_date?: string;
  preferred_time?: string;
  message?: string;
  internal_notes?: string;
}

// Unified Lead type for Admin Dashboard
export type UnifiedLead = 
  | ({ lead_type: 'career_guidance' } & CareerGuidanceLead)
  | ({ lead_type: 'admission_enquiry' } & AdmissionEnquiry)
  | ({ lead_type: 'counselling_request' } & CounsellingRequest);

// Program definition
export interface Program {
  id: string;
  slug: string;
  name: string;
  level: EducationLevel;
  field: StudyField;
  overview: string;
  who_is_it_for: string;
  eligibility: string;
  duration: string;
  mode: 'Full-Time Campus' | 'Online / Distance' | 'Hybrid / Executive';
  specializations: string[];
  curriculum_highlights: string[];
  career_opportunities: string[];
  university_name: string;
  university_slug: string;
  location: string;
  fees?: string;
  admission_process: string;
  important_dates: string;
  featured?: boolean;
}

// University definition
export interface University {
  id: string;
  slug: string;
  name: string;
  location: string;
  about: string;
  programs_available: string[];
  accreditation: string;
  campus_highlights: string[];
  admission_process: string;
  fees_range?: string;
  important_dates: string;
  website_url?: string;
  // Reusable College / University card enhancements:
  logo_url?: string;
  logoUrl?: string;
  banner_url?: string;
  gallery?: string[];
  naac_grade?: string;
  naacGrade?: string;
  ranking?: string;
  established_year?: number | string;
  established?: number | string;
  city?: string;
  state?: string;
  short_description?: string;
  category?: 'Online Universities' | 'Global Universities' | 'Executive Education Partners' | 'Professional Learning Partners' | 'Engineering Colleges & Universities' | string;
}

// Filter State for Program Finder
export interface ProgramFilterState {
  searchQuery: string;
  level: string;
  field: string;
  location: string;
}
