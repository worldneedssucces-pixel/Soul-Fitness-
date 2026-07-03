import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, CheckCircle, ShieldAlert, Award, Trash2 } from 'lucide-react';
import { Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SESSION_TYPES = [
  { id: 'strength', name: 'Strength Arena Power Hour', desc: 'Heavy weight coaching on premium turf.' },
  { id: 'cardio', name: 'High-Intensity Cardio Zone', desc: 'Interval treadmill and elliptical sprints.' },
  { id: 'agility', name: 'Agility & Trampoline Hub', desc: 'Rebound and core agility conditioning.' },
  { id: 'terrace', name: 'Terrace Recovery & Conditioning', desc: 'Outdoor mobility drills and wellness.' }
];

const TIME_SLOTS = [
  '07:00 AM – 09:00 AM',
  '09:00 AM – 11:00 AM',
  '11:00 AM – 01:00 PM',
  '03:00 PM – 05:00 PM',
  '05:00 PM – 07:00 PM',
  '07:00 PM – 09:00 PM',
  '09:00 PM – 11:00 PM',
  '11:00 PM – 01:00 AM'
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [session, setSession] = useState(SESSION_TYPES[0].name);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[3]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  // Load bookings from local storage
  useEffect(() => {
    const saved = localStorage.getItem('soul_fitness_bookings');
    if (saved) {
      try {
        setMyBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your phone number.');
      return;
    }
    if (!date) {
      setErrorMsg('Please pick a workout date.');
      return;
    }

    // Validate if selected date is Sunday
    const selectedDate = new Date(date);
    if (selectedDate.getDay() === 0) {
      setErrorMsg('Soul Fitness Gym is closed on Sundays. Please select Monday to Saturday.');
      return;
    }

    const newBooking: Booking = {
      id: 'book-' + Math.random().toString(36).substr(2, 9),
      clientName: name,
      phoneNumber: phone,
      sessionType: session,
      date,
      timeSlot,
      createdAt: new Date().toLocaleDateString(),
      status: 'confirmed'
    };

    const updated = [newBooking, ...myBookings];
    setMyBookings(updated);
    localStorage.setItem('soul_fitness_bookings', JSON.stringify(updated));

    // Reset Form
    setName('');
    setPhone('');
    setSuccessMsg(true);

    // Keep success message for 3 seconds
    setTimeout(() => {
      setSuccessMsg(false);
    }, 5000);
  };

  const handleDelete = (id: string) => {
    const updated = myBookings.filter(b => b.id !== id);
    setMyBookings(updated);
    localStorage.setItem('soul_fitness_bookings', JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
        {/* Backdrop trigger */}
        <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 z-10"
        >
          {/* Left panel - Branding info */}
          <div className="md:col-span-4 bg-gradient-to-br from-neutral-950 to-neutral-900 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-800 text-left">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-yellow-400 tracking-widest uppercase block">
                MEMBERSHIP DESK
              </span>
              <h3 className="text-2xl font-display font-black text-white uppercase leading-tight">
                BOOK YOUR <br />
                <span className="text-yellow-400">SESSION</span>
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Reserve your spot in Karachi's highest energy gym sections. Select any specialized arena and a suitable training hour.
              </p>
            </div>

            {/* My Active Bookings Dashboard list */}
            <div className="mt-8 space-y-4">
              <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
                My Booked Slots ({myBookings.length})
              </h4>

              {myBookings.length === 0 ? (
                <div className="text-neutral-500 text-[11px] italic bg-neutral-950/40 p-4 rounded-xl border border-neutral-800/50">
                  No upcoming sessions booked yet. Fill out the form to reserve a slot.
                </div>
              ) : (
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {myBookings.map(b => (
                    <div key={b.id} className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center justify-between text-left">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-yellow-400 truncate w-36" title={b.sessionType}>
                          {b.sessionType.replace(' Arena', '').replace(' Zone', '').replace(' Hub', '')}
                        </p>
                        <p className="text-[10px] text-gray-400 font-mono">
                          {b.date}
                        </p>
                        <p className="text-[9px] text-gray-500 font-mono">
                          {b.timeSlot}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-1.5 hover:bg-neutral-900 rounded-lg text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Cancel Session"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden md:block pt-4 text-[10px] text-gray-500 font-mono border-t border-neutral-800/80">
              DESK NO: 03462459535
            </div>
          </div>

          {/* Right panel - Booking form */}
          <div className="md:col-span-8 p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-1.5 bg-neutral-950 hover:bg-neutral-800 text-gray-400 hover:text-white rounded-full border border-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {successMsg ? (
              <div id="booking-success-container" className="h-full flex flex-col justify-center items-center text-center space-y-4 py-8">
                <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30 animate-bounce">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-display font-black text-white uppercase tracking-tight">
                    Session Confirmed!
                  </h4>
                  <p className="text-gray-400 text-sm max-w-sm">
                    Thank you, your slot has been registered. Our reception team will call you shortly at <strong>{phone}</strong> to confirm your arrival.
                  </p>
                </div>
                <button
                  onClick={() => setSuccessMsg(false)}
                  className="px-6 py-2.5 text-xs font-bold text-black bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors uppercase font-mono"
                >
                  Book Another Class
                </button>
              </div>
            ) : (
              <form id="gym-booking-form" onSubmit={handleSubmit} className="space-y-5 text-left">
                <h4 className="text-lg font-display font-black text-white uppercase tracking-tight border-b border-neutral-800 pb-2">
                  Session Reservation Desk
                </h4>

                {errorMsg && (
                  <div id="booking-error-badge" className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs font-bold">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                      Your Full Name
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

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                      Contact Phone Number
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
                </div>

                {/* Session Select dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                    Select Gym Facility Zone
                  </label>
                  <select
                    value={session}
                    onChange={e => setSession(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors cursor-pointer"
                  >
                    {SESSION_TYPES.map(st => (
                      <option key={st.id} value={st.name}>
                        {st.name} — {st.desc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                      Pick Date (Closed Sun)
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors"
                      required
                    />
                  </div>

                  {/* Hour slots select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-yellow-400" />
                      Select Training Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={e => setTimeSlot(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors cursor-pointer"
                    >
                      {TIME_SLOTS.map((slot, index) => (
                        <option key={index} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold tracking-wider rounded-xl hover:scale-[1.01] transition-all uppercase duration-300 shadow-lg shadow-yellow-400/15 flex items-center justify-center gap-2 text-sm"
                >
                  <Award className="w-4.5 h-4.5" />
                  Reserve Session Ticket
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
