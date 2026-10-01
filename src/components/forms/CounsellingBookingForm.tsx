import React, { useState } from 'react';
import { submitCounsellingRequest } from '../../services/leadService';
import { CounsellingStage, CounsellingMode, WhoIsBooking } from '../../types';
import { CheckCircle2, AlertCircle, Loader2, Check } from 'lucide-react';

interface CounsellingBookingFormProps {
  initialCategory?: CounsellingStage;
  onSuccessClose?: () => void;
}

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

export const CounsellingBookingForm: React.FC<CounsellingBookingFormProps> = ({
  initialCategory = 'Classes 11–12',
  onSuccessClose
}) => {
  const [whoIsBooking, setWhoIsBooking] = useState<WhoIsBooking>('Student');
  const [parentGuardianName, setParentGuardianName] = useState('');
  const [parentGuardianMobile, setParentGuardianMobile] = useState('');

  const [currentClass, setCurrentClass] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customCareer, setCustomCareer] = useState('');

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(prev => prev.filter(i => i !== item));
    } else {
      if (selectedInterests.length >= 3) {
        return; // Max 3 allowed
      }
      setSelectedInterests(prev => [...prev, item]);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    counsellingCategory: initialCategory as CounsellingStage,
    counsellingMode: 'Online Meeting' as CounsellingMode,
    preferredDate: '',
    preferredTime: '',
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

    if (!whoIsBooking) {
      setErrorMsg('Please select who is booking the session.');
      return;
    }

    if (whoIsBooking === 'Parent' || whoIsBooking === 'Guardian') {
      if (!parentGuardianName.trim()) {
        setErrorMsg('Please enter Parent/Guardian Name.');
        return;
      }
      if (!parentGuardianMobile.trim() || parentGuardianMobile.trim().length < 10) {
        setErrorMsg('Please enter a valid 10-digit Parent/Guardian Mobile.');
        return;
      }
    }

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.counsellingCategory) {
      setErrorMsg('Please select a counselling category.');
      return;
    }
    if (!currentClass.trim()) {
      setErrorMsg('Please specify Current Class / Current Qualification.');
      return;
    }
    if (!formData.counsellingMode) {
      setErrorMsg('Please select a counselling mode.');
      return;
    }

    const effectiveCareer = selectedInterests
      .map(item => (item === 'Other' && customCareer.trim()) ? customCareer.trim() : item)
      .join(', ');

    setLoading(true);
    const res = await submitCounsellingRequest({
      who_is_booking: whoIsBooking,
      parent_guardian_name: (whoIsBooking === 'Parent' || whoIsBooking === 'Guardian') ? parentGuardianName.trim() : undefined,
      parent_guardian_mobile: (whoIsBooking === 'Parent' || whoIsBooking === 'Guardian') ? parentGuardianMobile.trim() : undefined,
      current_class: currentClass.trim(),
      preferred_career: effectiveCareer || undefined,
      full_name: formData.name.trim(),
      mobile_number: formData.mobile.trim(),
      email: formData.email.trim() || undefined,
      counselling_category: formData.counsellingCategory,
      counselling_mode: formData.counsellingMode,
      preferred_mode: formData.counsellingMode,
      preferred_date: formData.preferredDate || undefined,
      preferred_time: formData.preferredTime || undefined,
      message: formData.message.trim() || undefined
    });
    setLoading(false);

    if (res.success) {
      setIsSuccess(true);
      setFormData({
        name: '',
        mobile: '',
        email: '',
        counsellingCategory: initialCategory,
        counsellingMode: 'Online Meeting',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
      setParentGuardianName('');
      setParentGuardianMobile('');
      setCurrentClass('');
      setSelectedInterests([]);
      setCustomCareer('');
    } else {
      setErrorMsg(res.error || 'Failed to submit booking request. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="py-8 px-4 text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <CheckCircle2 className="w-9 h-9 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-[#0B2A52] font-display">
          Request Received
        </h3>
        <p className="mt-3 text-base text-slate-700 max-w-md mx-auto font-medium">
          Your counselling request has been received. Our CareerVerse team will contact you.
        </p>
        <p className="mt-2 text-xs text-slate-500 max-w-sm mx-auto">
          Our scheduling desk will review your slot preference and reach out to confirm the counsellor’s availability.
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

      {/* WHO IS BOOKING? (Mandatory) */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Who is booking? <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['Student', 'Parent', 'Guardian'] as WhoIsBooking[]).map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setWhoIsBooking(opt)}
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

      {/* PARENT / GUARDIAN DETAILS */}
      {(whoIsBooking === 'Parent' || whoIsBooking === 'Guardian') && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-3 animate-fade-in">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B2A52] font-mono block">
            {whoIsBooking} Contact Details
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {whoIsBooking} Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={parentGuardianName}
                onChange={(e) => setParentGuardianName(e.target.value)}
                placeholder={`e.g. ${whoIsBooking === 'Parent' ? 'Suresh Sharma' : 'Rajesh Verma'}`}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {whoIsBooking} Mobile <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={parentGuardianMobile}
                onChange={(e) => setParentGuardianMobile(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* Name and Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Student / Candidate Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Meera Nambiar"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Candidate Mobile <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            name="mobile"
            required
            value={formData.mobile}
            onChange={handleChange}
            placeholder="+91 63034 64800"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          />
        </div>
      </div>

      {/* Email and Counselling Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="meera@example.com"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Counselling Category <span className="text-rose-500">*</span>
          </label>
          <select
            name="counsellingCategory"
            required
            value={formData.counsellingCategory}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          >
            <option value="Classes 5–7">Classes 5–7 (Explore Strengths)</option>
            <option value="Classes 8–10">Classes 8–10 (Stream Selection & Discovery)</option>
            <option value="Classes 11–12">Classes 11–12 (UG Course & Entrance Strategy)</option>
            <option value="Graduate / Recent Graduate">Graduate / Recent Graduate (PG & Career)</option>
            <option value="Working Professional">Working Professional (Executive & Growth)</option>
          </select>
        </div>
      </div>

      {/* Current Class / Current Qualification */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Current Class / Current Qualification <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          required
          list="counselling-class-options"
          value={currentClass}
          onChange={(e) => setCurrentClass(e.target.value)}
          placeholder="e.g. Class 8, Class 10, Intermediate MPC, Intermediate BiPC, B.Tech, B.Com, MBA, etc."
          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
        />
        <datalist id="counselling-class-options">
          <option value="Class 8" />
          <option value="Class 9" />
          <option value="Class 10" />
          <option value="Intermediate MPC" />
          <option value="Intermediate BiPC" />
          <option value="Intermediate Commerce" />
          <option value="B.Tech" />
          <option value="B.Com" />
          <option value="BBA" />
          <option value="BCA" />
          <option value="MBA" />
        </datalist>
      </div>

      {/* Preferred Career / Interest Area (Multiple Selection - Select up to 3) */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Preferred Career / Interest Area <span className="text-slate-400 font-normal">(Select up to 3)</span>
          </label>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
            selectedInterests.length === 3 
              ? 'bg-amber-100 text-amber-800 border border-amber-200' 
              : selectedInterests.length > 0 
                ? 'bg-blue-50 text-[#0B2A52] border border-blue-200' 
                : 'bg-slate-100 text-slate-500'
          }`}>
            {selectedInterests.length} of 3 selected
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
          {CAREER_PREFERENCE_EXAMPLES.map((item) => {
            const isSelected = selectedInterests.includes(item);
            const isMaxReached = selectedInterests.length >= 3 && !isSelected;
            return (
              <button
                type="button"
                key={item}
                onClick={() => toggleInterest(item)}
                className={`py-2 px-2.5 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#0B2A52] text-white border-[#0B2A52] shadow-xs font-semibold'
                    : isMaxReached
                      ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
                }`}
                title={isMaxReached ? 'Maximum 3 interests already selected. Click a selected interest to deselect it.' : undefined}
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
            ✓ Maximum 3 interests selected. Click any selected interest to change your choices.
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
              onChange={(e) => setCustomCareer(e.target.value)}
              placeholder="Type your custom career preference or domain..."
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden"
            />
          </div>
        )}
      </div>

      {/* Counselling Mode (Mandatory) */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Counselling Mode <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['Online Meeting', 'Phone Call', 'In-Person'] as CounsellingMode[]).map((mode) => (
            <button
              type="button"
              key={mode}
              onClick={() => setFormData(prev => ({ ...prev, counsellingMode: mode }))}
              className={`py-2 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                formData.counsellingMode === mode
                  ? 'bg-[#0B2A52] text-white border-[#0B2A52] shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Date and Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Date (Optional)
          </label>
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Time Slot (Optional)
          </label>
          <select
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B2A52] focus:ring-1 focus:ring-[#0B2A52] outline-hidden transition-colors"
          >
            <option value="">Any Convenient Time</option>
            <option value="10:00 AM - 1:00 PM (Morning)">10:00 AM - 1:00 PM (Morning)</option>
            <option value="2:00 PM - 5:00 PM (Afternoon)">2:00 PM - 5:00 PM (Afternoon)</option>
            <option value="5:00 PM - 8:00 PM (Evening)">5:00 PM - 8:00 PM (Evening)</option>
            <option value="Weekend Slot">Weekend Slot</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Brief Message or Student Background
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Provide any details about subjects, current board, challenges, or goals..."
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
          <span>Request Counselling</span>
        )}
      </button>

      <p className="text-[11px] text-center text-slate-500">
        All counselling requests are processed by certified educational counsellors. No student login required.
      </p>
    </form>
  );
};
