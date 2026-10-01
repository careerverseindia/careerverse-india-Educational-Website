import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'xl'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className={`relative w-full ${maxWidthClasses[maxWidth]} bg-white rounded-xl shadow-2xl border border-slate-200/80 overflow-hidden my-8 transform transition-all animate-in zoom-in-95 duration-200`}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between px-6 py-5 bg-[#0B2A52] text-white border-b border-slate-700/50">
          <div>
            <h2 id="modal-title" className="text-xl font-bold tracking-tight text-white font-display">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-xs sm:text-sm text-slate-300">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-4"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[calc(85vh-120px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
