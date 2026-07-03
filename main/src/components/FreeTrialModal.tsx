import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, ShieldAlert, Check, Calendar, Download, Sparkles } from 'lucide-react';
import { TrialPass } from '../types';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FreeTrialModal({ isOpen, onClose }: FreeTrialModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activePass, setActivePass] = useState<TrialPass | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your email.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your mobile phone number.');
      return;
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // Valid for 7 days

    const passCode = 'SOUL-SF-' + Math.floor(100000 + Math.random() * 900000);
    const newPass: TrialPass = {
      id: 'pass-' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      code: passCode,
      expiresAt: expiryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    setActivePass(newPass);
    // Persist registered status
    localStorage.setItem('soul_fitness_trial_pass', JSON.stringify(newPass));
  };

  const handleReset = () => {
    setActivePass(null);
    setName('');
    setEmail('');
    setPhone('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 overflow-hidden z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-1.5 bg-neutral-950 hover:bg-neutral-800 text-gray-400 hover:text-white rounded-full border border-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {activePass ? (
            /* Ticket View */
            <div id="trial-pass-ticket-view" className="space-y-6 text-center">
              <div className="flex flex-col items-center gap-1">
                <div className="p-2.5 bg-yellow-400/10 text-yellow-400 rounded-full border border-yellow-400/20">
                  <Sparkles className="w-6 h-6 animate-spin-slow" />
                </div>
                <h3 className="text-xl font-display font-black text-white uppercase tracking-tight mt-2">
                  Trial Pass Generated!
                </h3>
                <p className="text-gray-400 text-xs font-light">
                  Screenshot or save this ticket to show at the gym front desk.
                </p>
              </div>

              {/* Graphic Ticket Pass Layout */}
              <div className="relative bg-gradient-to-b from-neutral-950 to-neutral-900 border border-yellow-400/40 rounded-2xl overflow-hidden shadow-2xl p-6 text-left space-y-5">
                {/* Yellow header bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-400"></div>

                {/* Gym logo marker */}
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                  <div>
                    <h4 className="text-sm font-display font-black text-white uppercase tracking-widest">
                      SOUL <span className="text-yellow-400">FITNESS</span>
                    </h4>
                    <p className="text-[8px] font-mono font-bold tracking-wider text-gray-500 uppercase">
                      COMMIT TO BE FIT
                    </p>
                  </div>
                  <div className="bg-yellow-400 text-black text-[9px] font-mono font-black px-2.5 py-1 rounded-md uppercase">
                    1-DAY TRIAL
                  </div>
                </div>

                {/* Ticket Body details */}
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                        GUEST NAME
                      </span>
                      <span className="text-sm font-bold text-gray-100 truncate block">
                        {activePass.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                        PASS CODE
                      </span>
                      <span className="text-sm font-mono font-extrabold text-yellow-400 block">
                        {activePass.code}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                        PHONE REGISTERED
                      </span>
                      <span className="text-xs text-gray-300 block">
                        {activePass.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                        EXPIRATION DATE
                      </span>
                      <span className="text-xs text-rose-400 font-bold block flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {activePass.expiresAt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Realistic looking Barcode */}
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col items-center justify-center space-y-2.5">
                  {/* Mock Barcode Bars */}
                  <div className="flex items-center justify-center gap-0.5 h-10 w-full overflow-hidden max-w-[280px]">
                    {[2, 4, 1, 3, 2, 4, 1, 2, 4, 1, 3, 4, 1, 2, 3, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 3, 2, 1, 4].map((width, bIdx) => (
                      <div
                        key={bIdx}
                        className="bg-gray-300 h-full shrink-0"
                        style={{ width: `${width}px` }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-[9px] font-mono tracking-[4px] text-gray-400 font-bold uppercase">
                    *{activePass.code}*
                  </span>
                </div>

                {/* Small disclaimer terms */}
                <p className="text-[8px] text-gray-500 font-sans leading-relaxed text-center">
                  Valid for 1 first-time guest. Must present valid ID showing Karachi residence. Soul Fitness Gym reservation rules apply.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-gray-300 text-xs font-bold uppercase font-mono rounded-xl border border-neutral-700 flex-1 transition-colors cursor-pointer"
                >
                  Generate New Pass
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-3 bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-extrabold uppercase rounded-xl flex-1 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Print / Save Pass
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form id="gym-trial-form" onSubmit={handleSubmit} className="space-y-5 text-left">
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-yellow-400 tracking-widest uppercase block">
                  FREE TRIAL DESK
                </span>
                <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight leading-none">
                  CLAIM YOUR <span className="text-yellow-400">1-DAY PASS</span>
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  Sign up for your free 1-day pass. Test our treadmills, explore our lifting equipment, and chill in the outdoor recovery terrace absolutely free.
                </p>
              </div>

              {errorMsg && (
                <div id="trial-error-badge" className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs font-bold">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Name field */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jahanzaib Ahmed"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors"
                  required
                />
              </div>

              {/* Email field */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. user@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors"
                  required
                />
              </div>

              {/* Phone field */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                  WhatsApp / Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 03462459535"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors"
                  required
                />
              </div>

              <div className="bg-neutral-950/50 p-4 rounded-xl border border-neutral-800 flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-xs text-white font-bold uppercase">No Hidden Commitments</h4>
                  <p className="text-[10px] text-gray-400 leading-normal">
                    This free trial gives you complete access to all lifting equipment, functional zones, and terrace lounges. No credit card is required.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold tracking-wider rounded-xl transition-all uppercase flex items-center justify-center gap-1.5 shadow-lg shadow-yellow-400/15 text-sm"
              >
                <Award className="w-4.5 h-4.5" />
                Generate Ticket Pass
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
