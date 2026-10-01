import React, { useState } from 'react';
import { submitAdmissionEnquiry } from '../../services/leadService';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface AdmissionEnquiryFormProps {
  initialProgramName?: string;
  initialLocation?: string;
  onSuccessClose?: () => void;
}

const PROGRAM_EXAMPLES = [
  'B.Tech',
  'MBA',
  'MCA',
  'BBA',
  'Medical',
  'Law',
  'B.Sc',
  'B.Com',
  'Other'
];

export const AdmissionEnquiryForm: React.FC<AdmissionEnquiryFormProps> = ({
  initialProgramName = '',
  initialLocation = '',
  onSuccessClose
}) => {
  const [whoIsApplying, setWhoIsApplying] = useState<'Student' | 'Parent' | 'Guardian'>('Student');
  const [parentGuardianName, setParentGuardianName] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    currentQualification: '',
    preferredProgram: initialProgramName,
    preferredSpecialization: '',
    preferredLocation: initialLocation,
    preferredIntakeYear: '2026-27',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!whoIsApplying) {
      setErrorMsg('Please select who is applying.');
      return;
    }
    if ((whoIsApplying === 'Parent' || whoIsApplying === 'Guardian') && !parentGuardianName.trim()) {
      setErrorMsg('Please enter Parent/Guardian Name.');
      return;
    }
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter Student / Applicant Full Name.');
      return;
    }
    if (!formData.mobileNumber.trim() || formData.mobileNumber.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.currentQualification.trim()) {
      setErrorMsg('Please enter Current Class / Qualification.');
      return;
    }
    if (!formData.preferredProgram.trim()) {
      setErrorMsg('Please specify Preferred Course / Program.');
      return;
    }

    setLoading(true);
    const res = await submitAdmissionEnquiry({
      who_is_booking: whoIsApplying,
      parent_guardian_name: (whoIsApplying === 'Parent' || whoIsApplying === 'Guardian') ? parentGuardianName.trim() : undefined,
      current_class: formData.currentQualification.trim(),
      full_name: formData.fullName.trim(),
      mobile_number: formData.mobileNumber.trim(),
      email: formData.email.trim(),
      current_qualification: formData.currentQualification.trim(),
      preferred_program: formData.preferredProgram.trim(),
      preferred_specialization: formData.preferredSpecialization.trim() || undefined,
      preferred_location: formData.preferredLocation.trim() || undefined,
      preferred_intake_year: formData.preferredIntakeYear || undefined,
      message: formData.message.trim() || undefined,
    });
    setLoading(false);

    if (res.success) {
      setIsSuccess(true);
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        currentQualification: '',
        preferredProgram: '',
        preferredSpecialization: '',
        preferredLocation: '',
        preferredIntakeYear: '2026-27',
        message: ''
      });
      setParentGuardianName('');
    } else {
      setErrorMsg(res.error || 'Failed to submit admission enquiry. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="py-8 px-4 text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <CheckCircle2 className="w-9 h-9 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-[#0B2A52] font-display">
          Admission Guidance Request Submitted!
        </h3>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Your admission enquiry for <span className="font-semibold text-slate-800">{formData.preferredProgram || 'your chosen program'}</span> has been forwarded to our CareerVerse institutional admission cell. An admission advisor will contact you with eligibility criteria, course structures, and application support.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              if (onSuccessClose) onSuccessClose();
            }}
            className="px-6 py-2.5 bg-[#0B2A52] hover:bg-[#123E73] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {errorMsg && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2.5 text-xs sm:text-sm text-rose-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* WHO IS APPLYING? (Mandatory) */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Who is applying? <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['Student', 'Parent', 'Guardian'] as const).map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setWhoIsApplying(opt)}
              className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                whoIsApplying === opt
                  ? 'bg-[#0B2A52] text-white border-[#0B2A52] shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* PARENT / GUARDIAN NAME */}
      {(whoIsApplying === 'Parent' || whoIsApplying === 'Guardian') && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg animate-fade-in">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Parent / Guardian Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={parentGuardianName}
            onChange={(e) => setParentGuardianName(e.target.value)}
            placeholder={`e.g. ${whoIsApplying === 'Parent' ? 'Suresh Sharma' : 'Rajesh Verma'}`}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden"
          />
        </div>
      )}

      {/* Row 1: Full Name and Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Student / Applicant Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Rohan Deshmukh"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mobile Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            name="mobileNumber"
            required
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="+91 63034 64800"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          />
        </div>
      </div>

      {/* Row 2: Email and Current Class / Qualification */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="rohan@example.com"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Current Class / Qualification <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="currentQualification"
            required
            value={formData.currentQualification}
            onChange={handleChange}
            placeholder="e.g. 10+2 (PCB / PCM / Commerce), B.Com, B.Tech, etc."
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          />
        </div>
      </div>

      {/* Row 3: Preferred Course / Program (Examples: B.Tech, MBA, MCA, BBA, Medical, Law, etc.) */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Preferred Course / Program <span className="text-rose-500">*</span>
        </label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {PROGRAM_EXAMPLES.map((ex) => (
            <button
              type="button"
              key={ex}
              onClick={() => {
                if (ex !== 'Other') {
                  setFormData(prev => ({ ...prev, preferredProgram: ex }));
                }
              }}
              className={`py-1 px-2.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                formData.preferredProgram === ex
                  ? 'bg-[#0B2A52] text-white border-[#0B2A52]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {ex}
            </button>
          ))}
        </div>
        <input
          type="text"
          name="preferredProgram"
          required
          value={formData.preferredProgram}
          onChange={handleChange}
          placeholder="e.g. B.Tech, MBA, MCA, BBA, Medical, Law, BPT, etc."
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
        />
      </div>

      {/* Row 4: Preferred Specialization & Preferred Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Specialization (Optional)
          </label>
          <input
            type="text"
            name="preferredSpecialization"
            value={formData.preferredSpecialization}
            onChange={handleChange}
            placeholder="e.g. Artificial Intelligence, Finance, Cyber Security"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Location
          </label>
          <input
            type="text"
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleChange}
            placeholder="e.g. Bangalore, Delhi NCR, Pune, Hyderabad, Online"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          />
        </div>
      </div>

      {/* Row 5: Intake Year */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Preferred Intake / Academic Year
        </label>
        <select
          name="preferredIntakeYear"
          value={formData.preferredIntakeYear}
          onChange={handleChange}
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
        >
          <option value="2026-27 (Upcoming Session)">2026-27 (Upcoming Session)</option>
          <option value="Immediate / Current Intake">Immediate / Current Intake</option>
          <option value="Next Year 2027">Next Year 2027</option>
        </select>
      </div>

      {/* Specific Questions Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Specific Admission Questions
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Ask about eligibility, campus facilities, placement history, or document requirements..."
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-[#C99A2E] hover:bg-[#B88922] text-[#0B2A52] font-bold text-sm sm:text-base rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Request...</span>
          </>
        ) : (
          <span>Request Admission Guidance</span>
        )}
      </button>

      <p className="text-[11px] text-center text-slate-500">
        Direct admission coordination supported by CareerVerse India partner institutional desks. No fees or charges.
      </p>
    </form>
  );
};
