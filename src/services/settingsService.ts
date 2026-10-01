import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { initialUniversities } from '../data/universitiesData';
import { admissionCategories, AdmissionCategory } from '../data/admissionsData';
import { University } from '../types';

export interface SiteSettings {
  psychometric_link: string;
  office_location: string;
  map_embed_url: string;
}

const SETTINGS_STORAGE_KEY = 'careerverse_site_settings';
const UNIVERSITIES_STORAGE_KEY = 'careerverse_custom_universities';
const CATEGORIES_STORAGE_KEY = 'careerverse_custom_categories';

export const DEFAULT_SETTINGS: SiteSettings = {
  psychometric_link: 'https://assessment.careerverse.in',
  office_location: '23-11-271, S V Nagar, Revenue Ward No. 23, Tirupati – 517501',
  map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15509.393700479!2d79.419!3d13.628!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3a4d4b0000000001%3A0x1!2sS%20V%20Nagar%2C%20Tirupati%2C%20Andhra%20Pradesh%20517501!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin',
};

// 1. SETTINGS
export function getSiteSettings(): SiteSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    return DEFAULT_SETTINGS;
  }
}

export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = getSiteSettings();
  const merged: SiteSettings = { ...current, ...updates };

  if (typeof window !== 'undefined') {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
  }

  // Attempt to sync to Supabase if configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const entries = Object.entries(updates);
      for (const [key, value] of entries) {
        if (value !== undefined) {
          await supabase.from('site_settings').upsert({
            key,
            value: String(value),
            updated_at: new Date().toISOString(),
          });
        }
      }
    } catch (err) {
      console.warn('Could not sync settings to Supabase:', err);
    }
  }

  return merged;
}

// 2. UNIVERSITIES & COLLEGES MANAGEMENT
export function getStoredUniversities(): University[] {
  if (typeof window === 'undefined') return initialUniversities;
  try {
    const raw = localStorage.getItem(UNIVERSITIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(UNIVERSITIES_STORAGE_KEY, JSON.stringify(initialUniversities));
      return initialUniversities;
    }
    const parsed: University[] = JSON.parse(raw);
    // Ensure initialUniversities always provide the fresh official logos and details
    const customEntries = parsed.filter(p => !initialUniversities.some(u => u.slug === p.slug || u.id === p.id));
    const merged = [...initialUniversities, ...customEntries];
    localStorage.setItem(UNIVERSITIES_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch (err) {
    return initialUniversities;
  }
}

export function saveStoredUniversities(universities: University[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(UNIVERSITIES_STORAGE_KEY, JSON.stringify(universities));
}

export async function addOrUpdateUniversity(univ: University): Promise<University[]> {
  const list = getStoredUniversities();
  const idx = list.findIndex(u => u.id === univ.id || u.slug === univ.slug);
  let updatedList: University[];

  if (idx !== -1) {
    updatedList = [...list];
    updatedList[idx] = univ;
  } else {
    updatedList = [univ, ...list];
  }

  saveStoredUniversities(updatedList);

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('universities').upsert({
        id: univ.id,
        name: univ.name,
        slug: univ.slug,
        location: `${univ.city || ''}, ${univ.state || ''}`.trim() || univ.location,
        city: univ.city,
        state: univ.state,
        established_year: univ.established_year,
        naac_grade: univ.naac_grade,
        ranking: univ.ranking,
        logo_url: univ.logo_url,
        banner_url: univ.banner_url,
        short_description: univ.short_description,
        about: univ.about,
        accreditation: univ.accreditation,
        campus_highlights: univ.campus_highlights || [],
        programs_available: univ.programs_available || [],
        admission_process: univ.admission_process,
        important_dates: univ.important_dates || '',
        gallery: univ.gallery || [],
      });
    } catch (err) {
      console.warn('Supabase university save error:', err);
    }
  }

  return updatedList;
}

export async function deleteUniversity(id: string): Promise<University[]> {
  const list = getStoredUniversities();
  const updatedList = list.filter(u => u.id !== id);
  saveStoredUniversities(updatedList);

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('universities').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase university delete error:', err);
    }
  }

  return updatedList;
}

// 3. CATEGORIES MANAGEMENT
export function getStoredCategories(): AdmissionCategory[] {
  if (typeof window === 'undefined') return admissionCategories;
  try {
    const raw = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(admissionCategories));
      return admissionCategories;
    }
    return JSON.parse(raw);
  } catch (err) {
    return admissionCategories;
  }
}

export function saveStoredCategories(categories: AdmissionCategory[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
}

export function addOrUpdateCategory(cat: AdmissionCategory): AdmissionCategory[] {
  const list = getStoredCategories();
  const idx = list.findIndex(c => c.id === cat.id);
  let updatedList: AdmissionCategory[];

  if (idx !== -1) {
    updatedList = [...list];
    updatedList[idx] = cat;
  } else {
    updatedList = [cat, ...list];
  }

  saveStoredCategories(updatedList);
  return updatedList;
}

export function deleteCategory(id: string): AdmissionCategory[] {
  const list = getStoredCategories();
  const updatedList = list.filter(c => c.id !== id);
  saveStoredCategories(updatedList);
  return updatedList;
}
