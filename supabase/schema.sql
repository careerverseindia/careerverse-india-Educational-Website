-- ==========================================================
-- CAREERVERSE INDIA - SUPABASE DATABASE SCHEMA
-- "Guiding Careers. Building Futures."
-- ==========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CAREER GUIDANCE LEADS TABLE
CREATE TABLE IF NOT EXISTS career_guidance_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'New', -- 'New', 'Contacted', 'Follow-up', 'Counselling Scheduled', 'Converted', 'Closed'
    full_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    email TEXT,
    who_is_booking TEXT DEFAULT 'Student',
    parent_guardian_name TEXT,
    parent_guardian_mobile TEXT,
    counselling_mode TEXT DEFAULT 'Online Meeting',
    current_class TEXT,
    preferred_career TEXT,
    current_qualification TEXT NOT NULL,
    school_college TEXT,
    city TEXT,
    state TEXT,
    interested_field TEXT,
    preferred_course TEXT,
    career_goal TEXT,
    preferred_counselling_mode TEXT NOT NULL DEFAULT 'Online', -- 'Online', 'Phone', 'In-person'
    message TEXT,
    internal_notes TEXT
);

-- 3. ADMISSION ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS admission_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'New',
    full_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    email TEXT NOT NULL,
    who_is_booking TEXT DEFAULT 'Student',
    parent_guardian_name TEXT,
    parent_guardian_mobile TEXT,
    current_class TEXT,
    preferred_career TEXT,
    current_qualification TEXT NOT NULL,
    preferred_program TEXT NOT NULL,
    preferred_specialization TEXT,
    preferred_location TEXT,
    budget_range TEXT,
    preferred_intake_year TEXT,
    message TEXT,
    internal_notes TEXT
);

-- 4. COUNSELLING REQUESTS TABLE ("Book Career Counselling")
CREATE TABLE IF NOT EXISTS counselling_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'New',
    full_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    email TEXT,
    who_is_booking TEXT DEFAULT 'Student',
    parent_guardian_name TEXT,
    parent_guardian_mobile TEXT,
    counselling_mode TEXT DEFAULT 'Online Meeting',
    current_class TEXT,
    preferred_career TEXT,
    counselling_category TEXT NOT NULL, -- 'Classes 5–7', 'Classes 8–10', 'Classes 11–12', 'Graduate / Recent Graduate', 'Working Professional'
    preferred_mode TEXT NOT NULL DEFAULT 'Online', -- 'Online', 'Phone', 'In-person'
    preferred_date DATE,
    preferred_time TEXT,
    message TEXT,
    internal_notes TEXT
);

-- 4B. SITE SETTINGS TABLE (Psychometric Link & Map Configuration)
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure backwards-compatibility with existing tables
ALTER TABLE career_guidance_leads ADD COLUMN IF NOT EXISTS who_is_booking TEXT;
ALTER TABLE career_guidance_leads ADD COLUMN IF NOT EXISTS parent_guardian_name TEXT;
ALTER TABLE career_guidance_leads ADD COLUMN IF NOT EXISTS parent_guardian_mobile TEXT;
ALTER TABLE career_guidance_leads ADD COLUMN IF NOT EXISTS counselling_mode TEXT;
ALTER TABLE career_guidance_leads ADD COLUMN IF NOT EXISTS current_class TEXT;
ALTER TABLE career_guidance_leads ADD COLUMN IF NOT EXISTS preferred_career TEXT;

ALTER TABLE admission_enquiries ADD COLUMN IF NOT EXISTS who_is_booking TEXT;
ALTER TABLE admission_enquiries ADD COLUMN IF NOT EXISTS parent_guardian_name TEXT;
ALTER TABLE admission_enquiries ADD COLUMN IF NOT EXISTS parent_guardian_mobile TEXT;
ALTER TABLE admission_enquiries ADD COLUMN IF NOT EXISTS current_class TEXT;
ALTER TABLE admission_enquiries ADD COLUMN IF NOT EXISTS preferred_career TEXT;

ALTER TABLE counselling_requests ADD COLUMN IF NOT EXISTS who_is_booking TEXT;
ALTER TABLE counselling_requests ADD COLUMN IF NOT EXISTS parent_guardian_name TEXT;
ALTER TABLE counselling_requests ADD COLUMN IF NOT EXISTS parent_guardian_mobile TEXT;
ALTER TABLE counselling_requests ADD COLUMN IF NOT EXISTS counselling_mode TEXT;
ALTER TABLE counselling_requests ADD COLUMN IF NOT EXISTS current_class TEXT;
ALTER TABLE counselling_requests ADD COLUMN IF NOT EXISTS preferred_career TEXT;

-- 5. UNIVERSITIES TABLE
CREATE TABLE IF NOT EXISTS universities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    location TEXT NOT NULL,
    about TEXT NOT NULL,
    accreditation TEXT NOT NULL,
    campus_highlights TEXT[] NOT NULL DEFAULT '{}',
    programs_available TEXT[] NOT NULL DEFAULT '{}',
    fees_range TEXT NOT NULL,
    admission_process TEXT NOT NULL,
    important_dates TEXT NOT NULL,
    featured BOOLEAN DEFAULT FALSE
);

-- 6. PROGRAMS TABLE
CREATE TABLE IF NOT EXISTS programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    level TEXT NOT NULL, -- 'Undergraduate', 'Diploma', 'Certification', 'PG Diploma', 'Postgraduate', 'Online Degree', 'Executive MBA', 'Executive PG Program'
    field TEXT NOT NULL, -- 'Medical & Allied Sciences', 'Engineering & Technology', 'Science & IT', 'Commerce & Management', 'Arts & Humanities', 'Social Sciences', 'Law'
    overview TEXT NOT NULL,
    who_is_it_for TEXT NOT NULL,
    eligibility TEXT NOT NULL,
    duration TEXT NOT NULL,
    mode TEXT NOT NULL,
    specializations TEXT[] NOT NULL DEFAULT '{}',
    curriculum_highlights TEXT[] NOT NULL DEFAULT '{}',
    career_opportunities TEXT[] NOT NULL DEFAULT '{}',
    university_name TEXT NOT NULL,
    university_slug TEXT NOT NULL,
    location TEXT NOT NULL,
    fees TEXT NOT NULL,
    admission_process TEXT NOT NULL,
    important_dates TEXT NOT NULL,
    featured BOOLEAN DEFAULT FALSE
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================

ALTER TABLE career_guidance_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE counselling_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

-- 1. Career Guidance Leads
CREATE POLICY "Public can insert career guidance leads" 
ON career_guidance_leads FOR INSERT TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Staff can view career guidance leads" 
ON career_guidance_leads FOR SELECT TO anon, authenticated 
USING (true);

CREATE POLICY "Staff can update career guidance leads" 
ON career_guidance_leads FOR UPDATE TO anon, authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Staff can delete career guidance leads" 
ON career_guidance_leads FOR DELETE TO anon, authenticated 
USING (true);

-- 2. Admission Enquiries
CREATE POLICY "Public can insert admission enquiries" 
ON admission_enquiries FOR INSERT TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Staff can view admission enquiries" 
ON admission_enquiries FOR SELECT TO anon, authenticated 
USING (true);

CREATE POLICY "Staff can update admission enquiries" 
ON admission_enquiries FOR UPDATE TO anon, authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Staff can delete admission enquiries" 
ON admission_enquiries FOR DELETE TO anon, authenticated 
USING (true);

-- 3. Counselling Requests
CREATE POLICY "Public can insert counselling requests" 
ON counselling_requests FOR INSERT TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Staff can view counselling requests" 
ON counselling_requests FOR SELECT TO anon, authenticated 
USING (true);

CREATE POLICY "Staff can update counselling requests" 
ON counselling_requests FOR UPDATE TO anon, authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Staff can delete counselling requests" 
ON counselling_requests FOR DELETE TO anon, authenticated 
USING (true);

-- 4. Universities & Programs: Public read-only
CREATE POLICY "Public can view universities" 
ON universities FOR SELECT TO anon, authenticated 
USING (true);

CREATE POLICY "Public can view programs" 
ON programs FOR SELECT TO anon, authenticated 
USING (true);
