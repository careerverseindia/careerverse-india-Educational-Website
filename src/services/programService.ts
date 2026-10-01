import { initialPrograms } from '../data/programsData';
import { initialUniversities } from '../data/universitiesData';
import { Program, University, ProgramFilterState } from '../types';

export function getAllPrograms(): Program[] {
  return initialPrograms;
}

export function getProgramBySlug(slug: string): Program | undefined {
  return initialPrograms.find(p => p.slug === slug);
}

export function getAllUniversities(): University[] {
  return initialUniversities;
}

export function getUniversityBySlug(slug: string): University | undefined {
  return initialUniversities.find(u => u.slug === slug);
}

export function filterPrograms(filters: ProgramFilterState): Program[] {
  return initialPrograms.filter(prog => {
    // Search query matching name, overview, specializations, university
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = prog.name.toLowerCase().includes(q);
      const matchOverview = prog.overview.toLowerCase().includes(q);
      const matchUniv = prog.university_name.toLowerCase().includes(q);
      const matchSpec = prog.specializations.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchOverview && !matchUniv && !matchSpec) {
        return false;
      }
    }

    // Level filter
    if (filters.level && filters.level !== 'All Levels') {
      if (prog.level !== filters.level) return false;
    }

    // Field filter
    if (filters.field && filters.field !== 'All Fields') {
      if (prog.field !== filters.field) return false;
    }

    // Location filter
    if (filters.location && filters.location !== 'All Locations') {
      if (filters.location === 'Online') {
        if (!prog.location.toLowerCase().includes('online')) return false;
      } else if (filters.location === 'India') {
        if (!prog.location.toLowerCase().includes('karnataka') && 
            !prog.location.toLowerCase().includes('delhi') && 
            !prog.location.toLowerCase().includes('maharashtra') && 
            !prog.location.toLowerCase().includes('telangana') &&
            !prog.location.toLowerCase().includes('bangalore') &&
            !prog.location.toLowerCase().includes('pune') &&
            !prog.location.toLowerCase().includes('mumbai') &&
            !prog.location.toLowerCase().includes('hyderabad')) {
          return false;
        }
      } else {
        if (!prog.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }
    }

    return true;
  });
}
