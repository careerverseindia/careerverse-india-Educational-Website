import React, { useState, useEffect } from 'react';
import { CareerGuidanceForm } from '../components/forms/CareerGuidanceForm';
import { getSiteSettings, SiteSettings } from '../services/settingsService';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Navigation } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    setSettings(getSiteSettings());
  }, []);

  return (
    <div className="space-y-16 pb-20 text-left">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0B2A52] to-[#123E73] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#E5C66B] uppercase font-mono">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
            Connect With CareerVerse India
          </h1>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Have questions regarding stream choice, UG admissions, or university eligibility? Our educational advisors are ready to assist you.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Office Contacts */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="text-xl font-bold text-[#0B2A52] font-display">
                Headquarters & National Coordination Desks
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C99A2E] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900">CareerVerse India Headquarters</h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      23-11-271, S V Nagar, Revenue Ward No. 23, Tirupati – 517501
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C99A2E] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900">National Student Advisory Network</h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Career Counselling & Admission Support Across India (Online & Regional Desks)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <Phone className="w-5 h-5 text-[#C99A2E] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900">Direct Telephone & WhatsApp</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Admissions Desk & WhatsApp: <a href="tel:+916303464800" className="hover:text-[#0B2A52] font-semibold text-slate-800 transition-colors">+91 63034 64800</a><br />
                      Helpline: <a href="tel:+916303464800" className="hover:text-[#0B2A52] font-semibold text-slate-800 transition-colors">6303464800</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <Mail className="w-5 h-5 text-[#C99A2E]" />
                  <div>
                    <h3 className="font-bold text-slate-900">Email Correspondence</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Enquiries & Admissions: <a href="mailto:enquiry@careerverseindia.com" className="hover:text-[#0B2A52] font-semibold text-slate-800 transition-colors">enquiry@careerverseindia.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <Clock className="w-5 h-5 text-[#C99A2E]" />
                  <div>
                    <h3 className="font-bold text-slate-900">Operational Hours</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Monday to Saturday: 9:30 AM – 6:30 PM IST<br />
                      Sunday: Pre-booked online sessions only
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C99A2E] shrink-0" />
                <span>Zero registration charges for initial diagnostic enquiry.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C99A2E] font-mono">
                SEND AN ENQUIRY
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display mt-1">
                Consult With Our Academic Counsellors
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill the details below. Our team stores this enquiry in Supabase and contacts you directly.
              </p>
            </div>

            <CareerGuidanceForm />
          </div>

        </div>
      </section>

      {/* EMBEDDED MAP SECTION (Requirement 11) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          
          <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C99A2E] font-mono">
                VISIT US
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A52] font-display mt-0.5 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C99A2E]" />
                <span>Office Location & Interactive Map</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                <strong className="text-slate-800">Office Location:</strong> {settings.office_location}
              </p>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.office_location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-[#0B2A52] text-xs font-semibold rounded-lg transition-colors shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-[#C99A2E]" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Google Maps Embed iFrame */}
          <div className="w-full h-80 sm:h-96 bg-slate-100 relative">
            {settings.map_embed_url ? (
              <iframe
                title="CareerVerse Office Location Map"
                src={settings.map_embed_url}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 p-4">
                <MapPin className="w-8 h-8 text-[#C99A2E] mb-2" />
                <p className="text-sm font-semibold">{settings.office_location}</p>
                <p className="text-xs text-slate-400 mt-1">Configure map link in Staff Portal Settings</p>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
