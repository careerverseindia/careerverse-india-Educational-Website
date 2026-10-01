import { University } from '../types';
import { initialUniversities } from './universitiesData';
import { getInstitutionLogoUrl } from './institutionLogos';

export interface DynamicUniversityRecord {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  city: string;
  state: string;
  naacGrade?: string;
  established?: number | string;
  ranking?: string;
  category: string;
  about: string;
  shortDescription?: string;
  programsAvailable: string[];
  accreditation: string;
  campusHighlights: string[];
  admissionProcess: string;
  importantDates: string;
}

/**
 * Standardized dynamic dataset for all CareerVerse Universities & Colleges
 */
export const universitiesDataset: DynamicUniversityRecord[] = initialUniversities.map((u) => ({
  id: u.id,
  slug: u.slug,
  name: u.name,
  logoUrl: (u.logo_url && !u.logo_url.includes('unsplash.com') ? u.logo_url : '') || getInstitutionLogoUrl(u.slug, u.name),
  city: u.city || u.location.split(',')[0]?.trim() || '',
  state: u.state || u.location.split(',')[1]?.trim() || '',
  naacGrade: u.naac_grade,
  established: u.established_year,
  ranking: u.ranking,
  category: u.category || 'Online Universities',
  about: u.about,
  shortDescription: u.short_description,
  programsAvailable: u.programs_available,
  accreditation: u.accreditation,
  campusHighlights: u.campus_highlights,
  admissionProcess: u.admission_process,
  importantDates: u.important_dates
}));

/**
 * Helper to fetch university by slug or ID
 */
export function getUniversityBySlug(slug: string): DynamicUniversityRecord | undefined {
  return universitiesDataset.find((item) => item.slug === slug || item.id === slug);
}
