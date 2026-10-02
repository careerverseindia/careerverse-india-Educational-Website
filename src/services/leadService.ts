import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  CareerGuidanceLead,
  AdmissionEnquiry,
  CounsellingRequest,
  UnifiedLead,
  LeadStatus
} from '../types';

/**
 * ============================================================
 * CareerVerse Lead Service
 * ============================================================
 *
 * PRODUCTION RULE:
 * Supabase is the single source of truth.
 *
 * We intentionally DO NOT use localStorage for lead persistence.
 * This guarantees that:
 *
 * Phone -> Supabase
 * Laptop -> Supabase
 * Admin -> Supabase
 *
 * Everyone sees the same real-time database records.
 * ============================================================
 */

/**
 * ------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------
 */

function getSupabaseClient() {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error(
      'Supabase is not configured. Please check your Supabase environment variables.'
    );
  }

  return supabase;
}

/**
 * Generate an ID on the client.
 *
 * This means we don't need a SELECT permission just to retrieve
 * the generated database ID after INSERT.
 */
function generateId(): string {
  try {
    if (
      typeof crypto !== 'undefined' &&
      typeof crypto.randomUUID === 'function'
    ) {
      return crypto.randomUUID();
    }
  } catch {
    // Ignore and use fallback.
  }

  return (
    Date.now().toString(36) +
    '-' +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * Convert unknown errors into a useful message.
 */
function getErrorMessage(error: unknown): string {
  if (!error) {
    return 'An unknown error occurred.';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  const err = error as {
    message?: string;
    details?: string;
    hint?: string;
    code?: string;
  };

  const parts: string[] = [];

  if (err.message) parts.push(err.message);
  if (err.details) parts.push(err.details);
  if (err.hint) parts.push(`Hint: ${err.hint}`);
  if (err.code) parts.push(`Code: ${err.code}`);

  return parts.length > 0
    ? parts.join(' | ')
    : 'An unexpected error occurred.';
}

/**
 * ------------------------------------------------------------
 * SUBMISSION 1
 * Career Guidance Lead
 * ------------------------------------------------------------
 */

export async function submitCareerGuidance(
  data: Omit<CareerGuidanceLead, 'id' | 'created_at' | 'status'>
): Promise<{
  success: boolean;
  id?: string;
  error?: string;
}> {
  try {
    const client = getSupabaseClient();

    const id = generateId();
    const createdAt = new Date().toISOString();

    const payload: Record<string, any> = {
      id,

      created_at: createdAt,

      status: 'New',

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

      preferred_counselling_mode:
        data.preferred_counselling_mode ||
        data.counselling_mode ||
        'Online',

      message: data.message || null
    };

    /**
     * Optional fields.
     */
    if (data.who_is_booking) {
      payload.who_is_booking = data.who_is_booking;
    }

    if (data.parent_guardian_name) {
      payload.parent_guardian_name = data.parent_guardian_name;
    }

    if (data.parent_guardian_mobile) {
      payload.parent_guardian_mobile = data.parent_guardian_mobile;
    }

    if (data.counselling_mode) {
      payload.counselling_mode = data.counselling_mode;
    }

    if (data.current_class) {
      payload.current_class = data.current_class;
    }

    if (data.preferred_career) {
      payload.preferred_career = data.preferred_career;
    }

    console.log(
      '[CareerVerse] Submitting career guidance lead to Supabase:',
      {
        id,
        full_name: payload.full_name,
        mobile_number: payload.mobile_number
      }
    );

    const { error } = await client
      .from('career_guidance_leads')
      .insert([payload]);

    /**
     * IMPORTANT:
     *
     * Do NOT continue if Supabase rejected the insert.
     */
    if (error) {
      console.error(
        '[CareerVerse] Career guidance Supabase insert failed:',
        error
      );

      return {
        success: false,
        error: getErrorMessage(error)
      };
    }

    console.log(
      '[CareerVerse] Career guidance lead successfully saved:',
      id
    );

    return {
      success: true,
      id
    };
  } catch (error) {
    console.error(
      '[CareerVerse] submitCareerGuidance error:',
      error
    );

    return {
      success: false,
      error: getErrorMessage(error)
    };
  }
}

/**
 * ------------------------------------------------------------
 * SUBMISSION 2
 * Admission Enquiry
 * ------------------------------------------------------------
 */

export async function submitAdmissionEnquiry(
  data: Omit<AdmissionEnquiry, 'id' | 'created_at' | 'status'>
): Promise<{
  success: boolean;
  id?: string;
  error?: string;
}> {
  try {
    const client = getSupabaseClient();

    const id = generateId();
    const createdAt = new Date().toISOString();

    const payload: Record<string, any> = {
      id,

      created_at: createdAt,

      status: 'New',

      full_name: data.full_name,
      mobile_number: data.mobile_number,
      email: data.email || null,

      current_qualification: data.current_qualification,

      preferred_program: data.preferred_program,

      preferred_specialization:
        data.preferred_specialization || null,

      preferred_location:
        data.preferred_location || null,

      budget_range:
        data.budget_range || null,

      preferred_intake_year:
        data.preferred_intake_year || null,

      message:
        data.message || null
    };

    /**
     * Optional fields.
     */
    if (data.who_is_booking) {
      payload.who_is_booking = data.who_is_booking;
    }

    if (data.parent_guardian_name) {
      payload.parent_guardian_name =
        data.parent_guardian_name;
    }

    if (data.parent_guardian_mobile) {
      payload.parent_guardian_mobile =
        data.parent_guardian_mobile;
    }

    if (data.current_class) {
      payload.current_class = data.current_class;
    }

    if (data.preferred_career) {
      payload.preferred_career = data.preferred_career;
    }

    console.log(
      '[CareerVerse] Submitting admission enquiry to Supabase:',
      {
        id,
        full_name: payload.full_name,
        mobile_number: payload.mobile_number
      }
    );

    const { error } = await client
      .from('admission_enquiries')
      .insert([payload]);

    /**
     * Never show success if Supabase rejected it.
     */
    if (error) {
      console.error(
        '[CareerVerse] Admission Supabase insert failed:',
        error
      );

      return {
        success: false,
        error: getErrorMessage(error)
      };
    }

    console.log(
      '[CareerVerse] Admission enquiry successfully saved:',
      id
    );

    return {
      success: true,
      id
    };
  } catch (error) {
    console.error(
      '[CareerVerse] submitAdmissionEnquiry error:',
      error
    );

    return {
      success: false,
      error: getErrorMessage(error)
    };
  }
}

/**
 * ------------------------------------------------------------
 * SUBMISSION 3
 * Counselling Request
 * ------------------------------------------------------------
 */

export async function submitCounsellingRequest(
  data: Omit<CounsellingRequest, 'id' | 'created_at' | 'status'>
): Promise<{
  success: boolean;
  id?: string;
  error?: string;
}> {
  try {
    const client = getSupabaseClient();

    const id = generateId();
    const createdAt = new Date().toISOString();

    const payload: Record<string, any> = {
      id,

      created_at: createdAt,

      status: 'New',

      full_name: data.full_name,
      mobile_number: data.mobile_number,
      email: data.email || null,

      counselling_category:
        data.counselling_category,

      preferred_mode:
        data.preferred_mode ||
        data.counselling_mode ||
        'Online',

      preferred_date:
        data.preferred_date || null,

      preferred_time:
        data.preferred_time || null,

      message:
        data.message || null
    };

    /**
     * Optional fields.
     */
    if (data.who_is_booking) {
      payload.who_is_booking = data.who_is_booking;
    }

    if (data.parent_guardian_name) {
      payload.parent_guardian_name =
        data.parent_guardian_name;
    }

    if (data.parent_guardian_mobile) {
      payload.parent_guardian_mobile =
        data.parent_guardian_mobile;
    }

    if (data.counselling_mode) {
      payload.counselling_mode =
        data.counselling_mode;
    }

    if (data.current_class) {
      payload.current_class =
        data.current_class;
    }

    if (data.preferred_career) {
      payload.preferred_career =
        data.preferred_career;
    }

    console.log(
      '[CareerVerse] Submitting counselling request to Supabase:',
      {
        id,
        full_name: payload.full_name,
        mobile_number: payload.mobile_number
      }
    );

    const { error } = await client
      .from('counselling_requests')
      .insert([payload]);

    /**
     * Never show success if Supabase rejected it.
     */
    if (error) {
      console.error(
        '[CareerVerse] Counselling Supabase insert failed:',
        error
      );

      return {
        success: false,
        error: getErrorMessage(error)
      };
    }

    console.log(
      '[CareerVerse] Counselling request successfully saved:',
      id
    );

    return {
      success: true,
      id
    };
  } catch (error) {
    console.error(
      '[CareerVerse] submitCounsellingRequest error:',
      error
    );

    return {
      success: false,
      error: getErrorMessage(error)
    };
  }
}

/**
 * ------------------------------------------------------------
 * ADMIN
 * Fetch all leads
 * ------------------------------------------------------------
 *
 * IMPORTANT:
 * Admin reads ONLY from Supabase.
 *
 * No localStorage fallback.
 * No dummy records.
 * No device-specific records.
 * ------------------------------------------------------------
 */

export async function fetchUnifiedLeads(): Promise<UnifiedLead[]> {
  try {
    const client = getSupabaseClient();

    console.log(
      '[CareerVerse] Fetching leads from Supabase...'
    );

    const [
      careerGuidanceResult,
      admissionResult,
      counsellingResult
    ] = await Promise.all([
      client
        .from('career_guidance_leads')
        .select('*')
        .order('created_at', {
          ascending: false
        }),

      client
        .from('admission_enquiries')
        .select('*')
        .order('created_at', {
          ascending: false
        }),

      client
        .from('counselling_requests')
        .select('*')
        .order('created_at', {
          ascending: false
        })
    ]);

    /**
     * Check every table individually.
     */
    if (careerGuidanceResult.error) {
      console.error(
        '[CareerVerse] Career guidance fetch failed:',
        careerGuidanceResult.error
      );

      throw careerGuidanceResult.error;
    }

    if (admissionResult.error) {
      console.error(
        '[CareerVerse] Admission fetch failed:',
        admissionResult.error
      );

      throw admissionResult.error;
    }

    if (counsellingResult.error) {
      console.error(
        '[CareerVerse] Counselling fetch failed:',
        counsellingResult.error
      );

      throw counsellingResult.error;
    }

    const careerGuidanceLeads: UnifiedLead[] = (
      careerGuidanceResult.data || []
    ).map((item: any) => ({
      ...item,
      lead_type: 'career_guidance' as const
    }));

    const admissionLeads: UnifiedLead[] = (
      admissionResult.data || []
    ).map((item: any) => ({
      ...item,
      lead_type: 'admission_enquiry' as const
    }));

    const counsellingLeads: UnifiedLead[] = (
      counsellingResult.data || []
    ).map((item: any) => ({
      ...item,
      lead_type: 'counselling_request' as const
    }));

    const unified: UnifiedLead[] = [
      ...careerGuidanceLeads,
      ...admissionLeads,
      ...counsellingLeads
    ];

    /**
     * Newest leads first.
     */
    unified.sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    );

    console.log(
      '[CareerVerse] Total Supabase leads loaded:',
      unified.length
    );

    return unified;
  } catch (error) {
    console.error(
      '[CareerVerse] fetchUnifiedLeads error:',
      error
    );

    /**
     * IMPORTANT:
     *
     * Do not silently return fake/local data.
     *
     * Returning [] means the admin UI can display an actual
     * database error instead of pretending there are zero leads.
     */
    throw new Error(
      `Unable to load leads from the database: ${getErrorMessage(error)}`
    );
  }
}

/**
 * ------------------------------------------------------------
 * ADMIN
 * Update lead status and internal notes
 * ------------------------------------------------------------
 */

export async function updateLeadStatus(
  leadType:
    | 'career_guidance'
    | 'admission_enquiry'
    | 'counselling_request',

  id: string,

  newStatus: LeadStatus,

  internalNotes?: string
): Promise<boolean> {
  try {
    const client = getSupabaseClient();

    const tableName =
      leadType === 'career_guidance'
        ? 'career_guidance_leads'
        : leadType === 'admission_enquiry'
          ? 'admission_enquiries'
          : 'counselling_requests';

    const updatePayload: Record<string, any> = {
      status: newStatus
    };

    if (internalNotes !== undefined) {
      updatePayload.internal_notes =
        internalNotes;
    }

    console.log(
      '[CareerVerse] Updating lead:',
      {
        table: tableName,
        id,
        status: newStatus
      }
    );

    const { error } = await client
      .from(tableName)
      .update(updatePayload)
      .eq('id', id);

    if (error) {
      console.error(
        '[CareerVerse] Lead status update failed:',
        error
      );

      return false;
    }

    console.log(
      '[CareerVerse] Lead updated successfully:',
      id
    );

    return true;
  } catch (error) {
    console.error(
      '[CareerVerse] updateLeadStatus error:',
      error
    );

    return false;
  }
}

/**
 * ------------------------------------------------------------
 * ADMIN
 * Delete lead
 * ------------------------------------------------------------
 */

export async function deleteLead(
  leadType:
    | 'career_guidance'
    | 'admission_enquiry'
    | 'counselling_request',

  id: string
): Promise<boolean> {
  try {
    const client = getSupabaseClient();

    const tableName =
      leadType === 'career_guidance'
        ? 'career_guidance_leads'
        : leadType === 'admission_enquiry'
          ? 'admission_enquiries'
          : 'counselling_requests';

    console.log(
      '[CareerVerse] Deleting lead:',
      {
        table: tableName,
        id
      }
    );

    const { error } = await client
      .from(tableName)
      .delete()
      .eq('id', id);

    if (error) {
      console.error(
        '[CareerVerse] Lead deletion failed:',
        error
      );

      return false;
    }

    console.log(
      '[CareerVerse] Lead deleted successfully:',
      id
    );

    return true;
  } catch (error) {
    console.error(
      '[CareerVerse] deleteLead error:',
      error
    );

    return false;
  }
}
