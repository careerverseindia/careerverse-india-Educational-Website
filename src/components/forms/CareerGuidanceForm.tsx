import React, { useState } from 'react';
import { submitCareerGuidance } from '../../services/leadService';
import { getSiteSettings } from '../../services/settingsService';
import { WhoIsBooking, CounsellingMode } from '../../types';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ExternalLink,
  Check
} from 'lucide-react';

interface CareerGuidanceFormProps {
  initialQualification?: string;
  initialStage?: string;
  initialField?: string;
  onSuccessClose?: () => void;
}

const CATEGORY_SUBCATEGORIES: Record<string, string[]> = {
  'Class 5 to 7': [
    'Foundational Learning & Skill Building',
    'Olympiad & Talent Exams Preparation',
    'Early Subject Aptitude Assessment',
    'General Guidance'
  ],
  'Class 8 to 10': [
    'Stream Selection (Science / Commerce / Arts)',
    'Board Exam Study Strategy',
    'Early Career & Hobby Discovery',
    'NTSE & Olympiads Preparation',
    'General Guidance'
  ],
  'Intermediate (11th & 12th)': [
    'Engineering Entrance (JEE / State CETs)',
    'Medical & Allied Health (NEET / BPT / Nursing)',
    'Commerce, CA Foundation & CS',
    'Law (CLAT / AILET)',
    'Liberal Arts, Humanities & Design (NID/UCEED)',
    'Overseas / Abroad Education Planning',
    'General Guidance'
  ],
  'Degree / Graduation': [
    'Postgraduate Admissions (GATE / CAT / GRE / GMAT)',
    'Campus Placements & IT Job Readiness',
    'Government Exams & Civil Services (UPSC / State PSC)',
    'Career Transition & Skill Switch',
    'General Guidance'
  ],
  'Working Professional': [
    'Executive MBA & Global Management',
    'Tech & AI Leadership Upskilling',
    'Mid-Career Domain Transition',
    'Senior Leadership Certifications',
    'General Guidance'
  ]
};

const CAREER_PREFERENCE_EXAMPLES = [
  'Engineering',
  'Medical',
  'Management',
  'Law',
  'Arts',
  'Government Jobs',
  'IT',
  'Other'
];

export const CareerGuidanceForm: React.FC<CareerGuidanceFormProps> = ({
  initialQualification = '',
  initialStage = '',
  initialField = '',
  onSuccessClose
}) => {
  const getInitialCategory = (): string => {
    if (
      initialStage.includes('5–7') ||
      initialStage.includes('5 to 7')
    ) {
      return 'Class 5 to 7';
    }

    if (
      initialStage.includes('8–10') ||
      initialStage.includes('8 to 10')
    ) {
      return 'Class 8 to 10';
    }

    if (
      initialStage.includes('11–12') ||
      initialStage.includes('Intermediate')
    ) {
      return 'Intermediate (11th & 12th)';
    }

    if (
      initialStage.includes('Graduate') ||
      initialStage.includes('Degree')
    ) {
      return 'Degree / Graduation';
    }

    if (initialStage.includes('Professional')) {
      return 'Working Professional';
    }

    return '';
  };

  const [whoIsBooking, setWhoIsBooking] =
    useState<WhoIsBooking>('Student');

  const [parentGuardianName, setParentGuardianName] =
    useState('');

  const [parentGuardianMobile, setParentGuardianMobile] =
    useState('');

  const [careerCategory, setCareerCategory] =
    useState<string>(getInitialCategory());

  const [careerSubcategory, setCareerSubcategory] =
    useState<string>('');

  const [currentClass, setCurrentClass] =
    useState<string>(
      initialStage || initialQualification
    );

  const [selectedInterests, setSelectedInterests] =
    useState<string[]>(() => {
      if (initialField) {
        return initialField
          .split(',')
          .map(s => s.trim())
          .filter(Boolean)
          .slice(0, 3);
      }

      return [];
    });

  const [customCareer, setCustomCareer] =
    useState<string>('');

  const [counsellingMode, setCounsellingMode] =
    useState<CounsellingMode>('Online Meeting');

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    schoolCollege: '',
    city: '',
    state: '',
    preferredCourse: '',
    careerGoal: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const settings = getSiteSettings();

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(prev =>
        prev.filter(i => i !== item)
      );

      return;
    }

    if (selectedInterests.length >= 3) {
      return;
    }

    setSelectedInterests(prev => [
      ...prev,
      item
    ]);
  };

  const handleTextChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setErrorMsg('');

    /*
     * --------------------------------------------------------
     * VALIDATION
     * --------------------------------------------------------
     */

    if (!whoIsBooking) {
      setErrorMsg(
        'Please select who is booking the session.'
      );
      return;
    }

    if (
      whoIsBooking === 'Parent' ||
      whoIsBooking === 'Guardian'
    ) {
      const guardianMobile =
        parentGuardianMobile
          .replace(/\D/g, '')
          .slice(-10);

      if (!parentGuardianName.trim()) {
        setErrorMsg(
          'Please enter Parent/Guardian Name.'
        );
        return;
      }

      if (guardianMobile.length !== 10) {
        setErrorMsg(
          'Please enter a valid 10-digit Parent/Guardian Mobile.'
        );
        return;
      }
    }

    if (!formData.fullName.trim()) {
      setErrorMsg(
        'Please enter Student / Candidate Name.'
      );
      return;
    }

    const studentMobile = formData.mobileNumber
      .replace(/\D/g, '')
      .slice(-10);

    if (studentMobile.length !== 10) {
      setErrorMsg(
        'Please enter a valid 10-digit Mobile Number.'
      );
      return;
    }

    if (!careerCategory) {
      setErrorMsg(
        'Please select Career Guidance Category.'
      );
      return;
    }

    if (!currentClass.trim()) {
      setErrorMsg(
        'Please enter Current Class / Current Qualification.'
      );
      return;
    }

    if (!counsellingMode) {
      setErrorMsg(
        'Please select Counselling Mode.'
      );
      return;
    }

    /*
     * --------------------------------------------------------
     * BUILD CAREER PREFERENCE
     * --------------------------------------------------------
     */

    const effectiveCareer = selectedInterests
      .map(item =>
        item === 'Other' && customCareer.trim()
          ? customCareer.trim()
          : item
      )
      .join(', ');

    /*
     * --------------------------------------------------------
     * FINAL PAYLOAD
     * --------------------------------------------------------
     */

    const submissionData = {
      who_is_booking: whoIsBooking,

      parent_guardian_name:
        whoIsBooking === 'Parent' ||
        whoIsBooking === 'Guardian'
          ? parentGuardianName.trim()
          : undefined,

      parent_guardian_mobile:
        whoIsBooking === 'Parent' ||
        whoIsBooking === 'Guardian'
          ? parentGuardianMobile
              .replace(/\D/g, '')
              .slice(-10)
          : undefined,

      career_guidance_category:
        careerCategory,

      career_guidance_subcategory:
        careerSubcategory || undefined,

      counselling_mode:
        counsellingMode,

      current_class:
        currentClass.trim(),

      preferred_career:
        effectiveCareer || undefined,

      full_name:
        formData.fullName.trim(),

      mobile_number:
        studentMobile,

      email:
        formData.email.trim() || undefined,

      current_qualification:
        currentClass.trim(),

      school_college:
        formData.schoolCollege.trim() || undefined,

      city:
        formData.city.trim() || undefined,

      state:
        formData.state.trim() || undefined,

      interested_field:
        effectiveCareer || undefined,

      preferred_course:
        formData.preferredCourse.trim() || undefined,

      career_goal:
        formData.careerGoal.trim() || undefined,

      preferred_counselling_mode:
        counsellingMode,

      message:
        formData.message.trim() || undefined
    };

    /*
     * --------------------------------------------------------
     * DEBUG LOG
     * --------------------------------------------------------
     *
     * This does NOT expose the whole form.
     * It helps us verify that the deployed phone frontend
     * actually reaches this function.
     */

    console.log(
      '[CareerVerse] Career guidance form submitting:',
      {
        full_name: submissionData.full_name,
        mobile_number: submissionData.mobile_number,
        career_category:
          submissionData.career_guidance_category,
        counselling_mode:
          submissionData.counselling_mode
      }
    );

    setLoading(true);

    try {
      /*
       * ------------------------------------------------------
       * SUPABASE SUBMISSION
       * ------------------------------------------------------
       */

      const res =
        await submitCareerGuidance(
          submissionData
        );

      console.log(
        '[CareerVerse] submitCareerGuidance response:',
        res
      );

      /*
       * IMPORTANT:
       *
       * Success is shown ONLY when the service explicitly
       * returns success === true.
       */

      if (!res || res.success !== true) {
        const actualError =
          res?.error ||
          'The request could not be saved to the database.';

        console.error(
          '[CareerVerse] Lead submission was NOT successful:',
          actualError
        );

        setErrorMsg(actualError);
        return;
      }

      /*
       * ------------------------------------------------------
       * SUCCESS
       * ------------------------------------------------------
       */

      console.log(
        '[CareerVerse] Lead successfully submitted.',
        {
          id: res.id,
          mobile_number:
            submissionData.mobile_number
        }
      );

      setIsSuccess(true);

      /*
       * Reset form after successful database insert.
       */

      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        schoolCollege: '',
        city: '',
        state: '',
        preferredCourse: '',
        careerGoal: '',
        message: ''
      });

      setParentGuardianName('');
      setParentGuardianMobile('');
      setSelectedInterests([]);
      setCustomCareer('');
      setCareerSubcategory('');
    } catch (error: unknown) {
      /*
       * ------------------------------------------------------
       * UNEXPECTED ERROR
       * ------------------------------------------------------
       */

      console.error(
        '[CareerVerse] Unexpected career guidance submission error:',
        error
      );

      let message =
        'Unable to submit your request. Please try again.';

      if (error instanceof Error) {
        message = error.message;
      } else if (
        typeof error === 'string' &&
        error.trim()
      ) {
        message = error;
      }

      setErrorMsg(message);
    } finally {
      /*
       * ALWAYS stop spinner.
       */

      setLoading(false);
    }
  };

  /*
   * ----------------------------------------------------------
   * SUCCESS SCREEN
   * ----------------------------------------------------------
   */

  if (isSuccess) {
    return (
      <div className="py-8 px-4 text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <CheckCircle2 className="w-9 h-9 text-emerald-600" />
        </div>

        <h3 className="text-xl font-bold text-[#0B2A52] font-display">
          Career Guidance Request Received!
        </h3>

        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to CareerVerse India.
          Our certified career counselling team has received
          your details and will contact you via phone or
          WhatsApp shortly to schedule your personalized
          session.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);

              if (onSuccessClose) {
                onSuccessClose();
              }
            }}
            className="px-6 py-2.5 bg-[#0B2A52] hover:bg-[#123E73] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  /*
   * ----------------------------------------------------------
   * FORM
   * ----------------------------------------------------------
   */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-left"
    >

      {/* Psychometric Assessment */}

      <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-800">
          <Sparkles className="w-4 h-4 text-[#C99A2E] shrink-0" />

          <span>
            <strong>
              Psychometric Assessment:
            </strong>{' '}
            Evaluate aptitude & interests online.
          </span>
        </div>

        <a
          href={settings.psychometric_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-bold rounded-md transition-colors shrink-0 shadow-2xs"
        >
          <span>Take Assessment</span>

          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Error */}

      {errorMsg && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs sm:text-sm text-rose-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />

          <span className="break-words">
            {errorMsg}
          </span>
        </div>
      )}

      {/* WHO IS BOOKING */}

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Who is booking?{' '}
          <span className="text-rose-500">*</span>
        </label>

        <div className="grid grid-cols-3 gap-2">
          {(
            ['Student', 'Parent', 'Guardian'] as WhoIsBooking[]
          ).map(opt => (
            <button
              type="button"
              key={opt}
              onClick={() =>
                setWhoIsBooking(opt)
              }
              className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                whoIsBooking === opt
                  ? 'bg-[#0B2A52] text-white border-[#0B2A52] shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* PARENT / GUARDIAN */}

      {(whoIsBooking === 'Parent' ||
        whoIsBooking === 'Guardian') && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-3 animate-fade-in">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B2A52] font-mono block">
            {whoIsBooking} Contact Information
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {whoIsBooking} Name{' '}
                <span className="text-rose-500">*</span>
              </label>

              <input
                type="text"
                required
                value={parentGuardianName}
                onChange={e =>
                  setParentGuardianName(
                    e.target.value
                  )
                }
                placeholder={`e.g. ${
                  whoIsBooking === 'Parent'
                    ? 'Suresh Sharma'
                    : 'Rajesh Verma'
                }`}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {whoIsBooking} Mobile{' '}
                <span className="text-rose-500">*</span>
              </label>

              <input
                type="tel"
                required
                value={parentGuardianMobile}
                onChange={e =>
                  setParentGuardianMobile(
                    e.target.value
                  )
                }
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* NAME + MOBILE */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Student / Candidate Name{' '}
            <span className="text-rose-500">*</span>
          </label>

          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleTextChange}
            placeholder="e.g. Aarav Sharma"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mobile Number{' '}
            <span className="text-rose-500">*</span>
          </label>

          <input
            type="tel"
            name="mobileNumber"
            required
            value={formData.mobileNumber}
            onChange={handleTextChange}
            placeholder="+91 63034 64800"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          />
        </div>
      </div>

      {/* EMAIL */}

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Email Address (Optional)
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleTextChange}
          placeholder="aarav@example.com"
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
        />
      </div>

      {/* CATEGORY */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Career Guidance Category{' '}
            <span className="text-rose-500">*</span>
          </label>

          <select
            required
            value={careerCategory}
            onChange={e => {
              setCareerCategory(
                e.target.value
              );
              setCareerSubcategory('');
            }}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          >
            <option value="">
              Select Category *
            </option>

            <option value="Class 5 to 7">
              Class 5 to 7
            </option>

            <option value="Class 8 to 10">
              Class 8 to 10
            </option>

            <option value="Intermediate (11th & 12th)">
              Intermediate (11th & 12th)
            </option>

            <option value="Degree / Graduation">
              Degree / Graduation
            </option>

            <option value="Working Professional">
              Working Professional
            </option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Sub-Category (Optional)
          </label>

          <select
            value={careerSubcategory}
            onChange={e =>
              setCareerSubcategory(
                e.target.value
              )
            }
            disabled={!careerCategory}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors disabled:opacity-50"
          >
            <option value="">
              Select Sub-Category (Optional)
            </option>

            {careerCategory &&
              CATEGORY_SUBCATEGORIES[
                careerCategory
              ]?.map((sub, i) => (
                <option
                  key={i}
                  value={sub}
                >
                  {sub}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* CURRENT CLASS */}

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Current Class / Current Qualification{' '}
          <span className="text-rose-500">*</span>
        </label>

        <input
          type="text"
          required
          list="current-class-options"
          value={currentClass}
          onChange={e =>
            setCurrentClass(e.target.value)
          }
          placeholder="e.g. Class 8, Class 10, Intermediate MPC, B.Tech, MBA"
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
        />

        <datalist id="current-class-options">
          <option value="Class 8" />
          <option value="Class 9" />
          <option value="Class 10" />
          <option value="Intermediate MPC" />
          <option value="Intermediate BiPC" />
          <option value="Intermediate Commerce / MEC" />
          <option value="Intermediate Arts / CEC" />
          <option value="B.Tech Computer Science" />
          <option value="B.Tech Core Engineering" />
          <option value="B.Com" />
          <option value="BBA" />
          <option value="BCA" />
          <option value="B.Sc" />
          <option value="MBA" />
          <option value="Working Professional (IT)" />
          <option value="Working Professional (Operations/Sales)" />
        </datalist>
      </div>

      {/* CAREER INTERESTS */}

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Preferred Career / Interest Area{' '}
            <span className="text-slate-400 font-normal">
              (Select up to 3)
            </span>
          </label>

          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              selectedInterests.length === 3
                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                : selectedInterests.length > 0
                  ? 'bg-blue-50 text-[#0B2A52] border border-blue-200'
                  : 'bg-slate-100 text-slate-500'
            }`}
          >
            {selectedInterests.length} of 3 selected
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
          {CAREER_PREFERENCE_EXAMPLES.map(item => {
            const isSelected =
              selectedInterests.includes(item);

            const isMaxReached =
              selectedInterests.length >= 3 &&
              !isSelected;

            return (
              <button
                type="button"
                key={item}
                onClick={() =>
                  toggleInterest(item)
                }
                className={`py-2 px-2.5 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#0B2A52] text-white border-[#0B2A52] shadow-xs font-semibold'
                    : isMaxReached
                      ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
                }`}
              >
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                )}

                <span>{item}</span>
              </button>
            );
          })}
        </div>

        {selectedInterests.length === 3 && (
          <p className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 mb-2">
            ✓ Maximum 3 interests selected.
            Click any selected interest to change
            your choices.
          </p>
        )}

        {selectedInterests.includes('Other') && (
          <div className="mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Custom Career / Domain Preference
            </label>

            <input
              type="text"
              value={customCareer}
              onChange={e =>
                setCustomCareer(
                  e.target.value
                )
              }
              placeholder="Type your custom career preference or domain..."
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden"
            />
          </div>
        )}
      </div>

      {/* COUNSELLING MODE */}

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Counselling Mode{' '}
          <span className="text-rose-500">*</span>
        </label>

        <div className="grid grid-cols-3 gap-2">
          {(
            [
              'Online Meeting',
              'Phone Call',
              'In-Person'
            ] as CounsellingMode[]
          ).map(mode => (
            <button
              type="button"
              key={mode}
              onClick={() =>
                setCounsellingMode(mode)
              }
              className={`py-2 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                counsellingMode === mode
                  ? 'bg-[#0B2A52] text-white border-[#0B2A52] shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* SCHOOL + CITY */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            School / College / Organization
          </label>

          <input
            type="text"
            name="schoolCollege"
            value={formData.schoolCollege}
            onChange={handleTextChange}
            placeholder="e.g. DPS R.K. Puram"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            City & State
          </label>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleTextChange}
              placeholder="City"
              className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
            />

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleTextChange}
              placeholder="State"
              className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
            />
          </div>
        </div>
      </div>

      {/* MESSAGE */}

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Your Specific Query or Doubts
        </label>

        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleTextChange}
          placeholder="Tell us what guidance you need..."
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
        />
      </div>

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-bold text-sm sm:text-base rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>
              Submitting Request...
            </span>
          </>
        ) : (
          <span>Submit Request</span>
        )}
      </button>

      <p className="text-[11px] text-center text-slate-500">
        Your information is securely handled by the
        CareerVerse India counselling division. No student
        account required.
      </p>
    </form>
  );
};
