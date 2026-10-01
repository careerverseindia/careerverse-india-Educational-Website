import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  CareerGuidanceLead, 
  AdmissionEnquiry, 
  CounsellingRequest, 
  UnifiedLead, 
  LeadStatus 
} from '../types';

const STORAGE_KEYS = {
  CAREER_GUIDANCE: 'careerverse_career_guidance_leads',
  ADMISSIONS: 'careerverse_admission_enquiries',
  COUNSELLING: 'careerverse_counselling_requests',
};

// Seed sample initial leads into LocalStorage if empty so admin has realistic immediate data to view
const initLocalSeed = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.CAREER_GUIDANCE)) {
    const seedGuidance: CareerGuidanceLead[] = [
      {
        id: 'cg-seed-1',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        status: 'New',
        full_name: 'Aarav Sharma',
        mobile_number: '+91 98765 43210',
        email: 'aarav.sharma@example.com',
        current_qualification: 'Class 12 (CBSE - Science PCM)',
        school_college: 'Delhi Public School, R.K. Puram',
        city: 'New Delhi',
        state: 'Delhi',
        interested_field: 'Engineering & Technology',
        preferred_course: 'B.Tech AI & Data Science',
        career_goal: 'Wants to specialize in artificial intelligence and machine learning.',
        preferred_counselling_mode: 'Online',
        message: 'Looking for advice between computer science core vs AI specialization and top deemed universities.'
      },
      {
        id: 'cg-seed-2',
        created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
        status: 'Contacted',
        full_name: 'Pooja Iyer',
        mobile_number: '+91 98220 11223',
        email: 'pooja.iyer@example.com',
        current_qualification: 'B.Com Graduate',
        school_college: 'St. Joseph College of Commerce',
        city: 'Bangalore',
        state: 'Karnataka',
        interested_field: 'Commerce & Management',
        preferred_course: 'Online MBA or PGDM',
        career_goal: 'Transition into corporate financial analytics.',
        preferred_counselling_mode: 'Phone',
        message: 'Currently working in accounts, want guidance on accredited executive or online MBA.'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.CAREER_GUIDANCE, JSON.stringify(seedGuidance));
  }

  if (!localStorage.getItem(STORAGE_KEYS.ADMISSIONS)) {
    const seedAdmissions: AdmissionEnquiry[] = [
      {
        id: 'adm-seed-1',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: 'New',
        full_name: 'Rohan Deshmukh',
        mobile_number: '+91 98450 78901',
        email: 'rohan.deshmukh@example.com',
        current_qualification: 'Class 12 (PCB)',
        preferred_program: 'Bachelor of Physiotherapy (BPT)',
        preferred_specialization: 'Sports & Orthopedic Rehabilitation',
        preferred_location: 'Pune / Mumbai',
        budget_range: '₹1 Lakh - ₹1.5 Lakh / Year',
        preferred_intake_year: '2026-27',
        message: 'Interested in clinical teaching hospital affiliations and internship guarantees.'
      },
      {
        id: 'adm-seed-2',
        created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
        status: 'Follow-up',
        full_name: 'Ananya Verma',
        mobile_number: '+91 97110 33445',
        email: 'ananya.v@example.com',
        current_qualification: 'Class 12 (Commerce)',
        preferred_program: 'Bachelor of Business Administration (BBA - Honours)',
        preferred_specialization: 'Business Analytics & FinTech',
        preferred_location: 'Delhi NCR',
        budget_range: '₹1.5 Lakh - ₹2.5 Lakh / Year',
        preferred_intake_year: '2026',
        message: 'Need help with direct admission counselling and scholarship criteria.'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.ADMISSIONS, JSON.stringify(seedAdmissions));
  }

  if (!localStorage.getItem(STORAGE_KEYS.COUNSELLING)) {
    const seedCounselling: CounsellingRequest[] = [
      {
        id: 'coun-seed-1',
        created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
        status: 'New',
        full_name: 'Meera Nambiar',
        mobile_number: '+91 99001 55667',
        email: 'meera.nambiar@example.com',
        counselling_category: 'Classes 8–10',
        preferred_mode: 'Online',
        preferred_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        preferred_time: '5:00 PM - 6:00 PM',
        message: 'Daughter is in Class 10; confused between Science and Commerce stream.'
      },
      {
        id: 'coun-seed-2',
        created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
        status: 'Counselling Scheduled',
        full_name: 'Vikramjit Singh',
        mobile_number: '+91 94170 88990',
        email: 'vikram.singh@example.com',
        counselling_category: 'Working Professional',
        preferred_mode: 'Phone',
        preferred_date: new Date(Date.now() + 86400000 * 1).toISOString().split('T')[0],
        preferred_time: '11:00 AM - 12:00 PM',
        message: '8 years experience in operations, exploring Executive MBA options.'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.COUNSELLING, JSON.stringify(seedCounselling));
  }
};

// Initialize seed on module load in browser
if (typeof window !== 'undefined') {
  initLocalSeed();
}

/**
 * SUBMISSION 1: Career Guidance Lead
 */
export async function submitCareerGuidance(
  data: Omit<CareerGuidanceLead, 'id' | 'created_at' | 'status'>
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const newLead: CareerGuidanceLead = {
      ...data,
      id: 'cg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      created_at: new Date().toISOString(),
      status: 'New'
    };

    // Store in Supabase if configured
    if (isSupabaseConfigured() && supabase) {
      const payload: any = {
        full_name: data.full_name,
        mobile_number: data.mobile_number,
        email: data.email || null,
        current_qualification: data.current_qualification,
        school_college: data.school_college || null,
        city: data.city || null,
        state: data.state || null,
        interested_field: data.interested_field || null,
        preferred_course: data.preferred_course || null,
        career_goal: data.career_goal || null,
        preferred_counselling_mode: data.preferred_counselling_mode || data.counselling_mode || 'Online',
        message: data.message || null,
        status: 'New'
      };

      if (data.who_is_booking) payload.who_is_booking = data.who_is_booking;
      if (data.parent_guardian_name) payload.parent_guardian_name = data.parent_guardian_name;
      if (data.parent_guardian_mobile) payload.parent_guardian_mobile = data.parent_guardian_mobile;
      if (data.counselling_mode) payload.counselling_mode = data.counselling_mode;
      if (data.current_class) payload.current_class = data.current_class;
      if (data.preferred_career) payload.preferred_career = data.preferred_career;

      const { data: inserted, error } = await supabase
        .from('career_guidance_leads')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert warning, saving to local store:', error.message);
      } else if (inserted) {
        newLead.id = inserted.id;
      }
    }

    // Always ensure local persistence
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.CAREER_GUIDANCE) || '[]');
      stored.unshift(newLead);
      localStorage.setItem(STORAGE_KEYS.CAREER_GUIDANCE, JSON.stringify(stored));
    }

    return { success: true, id: newLead.id };
  } catch (err: any) {
    console.error('submitCareerGuidance error:', err);
    return { success: false, error: err.message || 'An unexpected error occurred. Please try again.' };
  }
}

/**
 * SUBMISSION 2: Admission Enquiry
 */
export async function submitAdmissionEnquiry(
  data: Omit<AdmissionEnquiry, 'id' | 'created_at' | 'status'>
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const newEnquiry: AdmissionEnquiry = {
      ...data,
      id: 'adm-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      created_at: new Date().toISOString(),
      status: 'New'
    };

    if (isSupabaseConfigured() && supabase) {
      const payload: any = {
        full_name: data.full_name,
        mobile_number: data.mobile_number,
        email: data.email,
        current_qualification: data.current_qualification,
        preferred_program: data.preferred_program,
        preferred_specialization: data.preferred_specialization || null,
        preferred_location: data.preferred_location || null,
        budget_range: data.budget_range || null,
        preferred_intake_year: data.preferred_intake_year || null,
        message: data.message || null,
        status: 'New'
      };

      if (data.who_is_booking) payload.who_is_booking = data.who_is_booking;
      if (data.parent_guardian_name) payload.parent_guardian_name = data.parent_guardian_name;
      if (data.parent_guardian_mobile) payload.parent_guardian_mobile = data.parent_guardian_mobile;
      if (data.current_class) payload.current_class = data.current_class;
      if (data.preferred_career) payload.preferred_career = data.preferred_career;

      const { data: inserted, error } = await supabase
        .from('admission_enquiries')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert warning, saving to local store:', error.message);
      } else if (inserted) {
        newEnquiry.id = inserted.id;
      }
    }

    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMISSIONS) || '[]');
      stored.unshift(newEnquiry);
      localStorage.setItem(STORAGE_KEYS.ADMISSIONS, JSON.stringify(stored));
    }

    return { success: true, id: newEnquiry.id };
  } catch (err: any) {
    console.error('submitAdmissionEnquiry error:', err);
    return { success: false, error: err.message || 'An unexpected error occurred. Please try again.' };
  }
}

/**
 * SUBMISSION 3: Counselling Request ("Book Career Counselling")
 */
export async function submitCounsellingRequest(
  data: Omit<CounsellingRequest, 'id' | 'created_at' | 'status'>
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const newRequest: CounsellingRequest = {
      ...data,
      id: 'coun-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      created_at: new Date().toISOString(),
      status: 'New'
    };

    if (isSupabaseConfigured() && supabase) {
      const payload: any = {
        full_name: data.full_name,
        mobile_number: data.mobile_number,
        email: data.email || null,
        counselling_category: data.counselling_category,
        preferred_mode: data.preferred_mode || data.counselling_mode || 'Online',
        preferred_date: data.preferred_date || null,
        preferred_time: data.preferred_time || null,
        message: data.message || null,
        status: 'New'
      };

      if (data.who_is_booking) payload.who_is_booking = data.who_is_booking;
      if (data.parent_guardian_name) payload.parent_guardian_name = data.parent_guardian_name;
      if (data.parent_guardian_mobile) payload.parent_guardian_mobile = data.parent_guardian_mobile;
      if (data.counselling_mode) payload.counselling_mode = data.counselling_mode;
      if (data.current_class) payload.current_class = data.current_class;
      if (data.preferred_career) payload.preferred_career = data.preferred_career;

      const { data: inserted, error } = await supabase
        .from('counselling_requests')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert warning, saving to local store:', error.message);
      } else if (inserted) {
        newRequest.id = inserted.id;
      }
    }

    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.COUNSELLING) || '[]');
      stored.unshift(newRequest);
      localStorage.setItem(STORAGE_KEYS.COUNSELLING, JSON.stringify(stored));
    }

    return { success: true, id: newRequest.id };
  } catch (err: any) {
    console.error('submitCounsellingRequest error:', err);
    return { success: false, error: err.message || 'An unexpected error occurred. Please try again.' };
  }
}

/**
 * ADMIN: Fetch all leads unified
 */
export async function fetchUnifiedLeads(): Promise<UnifiedLead[]> {
  try {
    initLocalSeed();

    // If Supabase configured, attempt fetching from Supabase tables
    if (isSupabaseConfigured() && supabase) {
      try {
        const [resCG, resAdm, resCoun] = await Promise.all([
          supabase.from('career_guidance_leads').select('*').order('created_at', { ascending: false }),
          supabase.from('admission_enquiries').select('*').order('created_at', { ascending: false }),
          supabase.from('counselling_requests').select('*').order('created_at', { ascending: false }),
        ]);

        if (!resCG.error && !resAdm.error && !resCoun.error) {
          const list: UnifiedLead[] = [
            ...(resCG.data || []).map((item) => ({ ...item, lead_type: 'career_guidance' as const })),
            ...(resAdm.data || []).map((item) => ({ ...item, lead_type: 'admission_enquiry' as const })),
            ...(resCoun.data || []).map((item) => ({ ...item, lead_type: 'counselling_request' as const })),
          ];
          list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          if (list.length > 0) return list;
        }
      } catch (err) {
        console.warn('Supabase fetch failed or restricted by RLS; falling back to local store:', err);
      }
    }

    // Local storage fallback
    const cgList: CareerGuidanceLead[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.CAREER_GUIDANCE) || '[]');
    const admList: AdmissionEnquiry[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMISSIONS) || '[]');
    const counList: CounsellingRequest[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.COUNSELLING) || '[]');

    const unified: UnifiedLead[] = [
      ...cgList.map(item => ({ ...item, lead_type: 'career_guidance' as const })),
      ...admList.map(item => ({ ...item, lead_type: 'admission_enquiry' as const })),
      ...counList.map(item => ({ ...item, lead_type: 'counselling_request' as const })),
    ];

    unified.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return unified;
  } catch (err) {
    console.error('fetchUnifiedLeads error:', err);
    return [];
  }
}

/**
 * ADMIN: Update lead status & notes
 */
export async function updateLeadStatus(
  leadType: 'career_guidance' | 'admission_enquiry' | 'counselling_request',
  id: string,
  newStatus: LeadStatus,
  internalNotes?: string
): Promise<boolean> {
  try {
    const key = leadType === 'career_guidance' 
      ? STORAGE_KEYS.CAREER_GUIDANCE 
      : leadType === 'admission_enquiry'
        ? STORAGE_KEYS.ADMISSIONS
        : STORAGE_KEYS.COUNSELLING;

    const list = JSON.parse(localStorage.getItem(key) || '[]');
    const idx = list.findIndex((item: any) => item.id === id);
    if (idx !== -1) {
      list[idx].status = newStatus;
      if (internalNotes !== undefined) {
        list[idx].internal_notes = internalNotes;
      }
      localStorage.setItem(key, JSON.stringify(list));
    }

    if (isSupabaseConfigured() && supabase) {
      const tableName = leadType === 'career_guidance'
        ? 'career_guidance_leads'
        : leadType === 'admission_enquiry'
          ? 'admission_enquiries'
          : 'counselling_requests';

      const updatePayload: any = { status: newStatus };
      if (internalNotes !== undefined) updatePayload.internal_notes = internalNotes;

      await supabase.from(tableName).update(updatePayload).eq('id', id);
    }

    return true;
  } catch (err) {
    console.error('updateLeadStatus error:', err);
    return false;
  }
}

/**
 * ADMIN: Delete lead record
 */
export async function deleteLead(
  leadType: 'career_guidance' | 'admission_enquiry' | 'counselling_request',
  id: string
): Promise<boolean> {
  try {
    const key = leadType === 'career_guidance' 
      ? STORAGE_KEYS.CAREER_GUIDANCE 
      : leadType === 'admission_enquiry'
        ? STORAGE_KEYS.ADMISSIONS
        : STORAGE_KEYS.COUNSELLING;

    const list = JSON.parse(localStorage.getItem(key) || '[]');
    const filtered = list.filter((item: any) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(filtered));

    if (isSupabaseConfigured() && supabase) {
      const tableName = leadType === 'career_guidance'
        ? 'career_guidance_leads'
        : leadType === 'admission_enquiry'
          ? 'admission_enquiries'
          : 'counselling_requests';

      await supabase.from(tableName).delete().eq('id', id);
    }

    return true;
  } catch (err) {
    console.error('deleteLead error:', err);
    return false;
  }
}
