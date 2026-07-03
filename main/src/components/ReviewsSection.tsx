import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, CheckCircle, ThumbsUp, Camera, PenTool, Award, StarHalf, Filter, Smile, Plus, Trash, X } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  
  // Custom Form fields
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState('');
  const [categoryTag, setCategoryTag] = useState('Strength Training');
  const [mockPreviewUrl, setMockPreviewUrl] = useState<string | null>(null);
  const [votedReviews, setVotedReviews] = useState<Record<string, boolean>>({});
  const [successBadge, setSuccessBadge] = useState(false);
  const [showWritePanel, setShowWritePanel] = useState(false);

  useEffect(() => {
    // Load existing reviews from localStorage or fall back to INITIAL_REVIEWS
    const saved = localStorage.getItem('soul_fitness_reviews');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Review[];
        // Filter out Jahanzaib Ahmed, Zainab Fatima, or Mustafa Malik
        let updated = parsed.filter(r => r.name !== 'Jahanzaib Ahmed' && r.id !== 'rev-1' && r.name !== 'Zainab Fatima' && r.name !== 'Mustafa Malik');
        
        // Ensure Syed Raheel Ali (rev-2) is present and correct
        const rev2Index = updated.findIndex(r => r.id === 'rev-2');
        if (rev2Index !== -1 && updated[rev2Index].name !== 'Syed Raheel Ali') {
          updated[rev2Index] = INITIAL_REVIEWS[2];
        } else if (!updated.some(r => r.name === 'Syed Raheel Ali')) {
          updated.push(INITIAL_REVIEWS[2]);
        }
        
        // Ensure Saad Khan (rev-saad) is present
        if (!updated.some(r => r.id === 'rev-saad' || r.name === 'Saad Khan')) {
          updated.push(INITIAL_REVIEWS[1]);
        }
        
        // Ensure Mariya Siddiqui (rev-mariya) is present
        if (!updated.some(r => r.id === 'rev-mariya' || r.name === 'Mariya Siddiqui')) {
          updated.unshift(INITIAL_REVIEWS[0]);
        }

        // Ensure Raheel Syed (rev-3) is present and correct
        const rev3Index = updated.findIndex(r => r.id === 'rev-3');
        if (rev3Index !== -1 && updated[rev3Index].name !== 'Raheel Syed') {
          updated[rev3Index] = INITIAL_REVIEWS[3];
        } else if (!updated.some(r => r.name === 'Raheel Syed')) {
          updated.push(INITIAL_REVIEWS[3]);
        }

        // Ensure Fauz Pervez (rev-4) is present and correct
        const rev4Index = updated.findIndex(r => r.id === 'rev-4');
        if (rev4Index !== -1 && updated[rev4Index].name !== 'Fauz Pervez') {
          updated[rev4Index] = INITIAL_REVIEWS[4];
        } else if (!updated.some(r => r.name === 'Fauz Pervez')) {
          updated.push(INITIAL_REVIEWS[4]);
        }
        
        setReviews(updated);
        localStorage.setItem('soul_fitness_reviews', JSON.stringify(updated));
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
        localStorage.setItem('soul_fitness_reviews', JSON.stringify(INITIAL_REVIEWS));
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('soul_fitness_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  const handleHelpful = (id: string) => {
    if (votedReviews[id]) return; // prevent multi-voting

    const updated = reviews.map(r => {
      if (r.id === id) {
        return { ...r, helpfulCount: r.helpfulCount + 1 };
      }
      return r;
    });

    setReviews(updated);
    localStorage.setItem('soul_fitness_reviews', JSON.stringify(updated));
    setVotedReviews(prev => ({ ...prev, [id]: true }));
  };

  const handleMockImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMockPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;
    if (!reviewText.trim()) return;

    const newReview: Review = {
      id: 'rev-' + Math.random().toString(36).substr(2, 9),
      name,
      rating,
      text: reviewText,
      date: new Date().toISOString().split('T')[0],
      avatarUrl: `https://images.unsplash.com/photo-${['1534528741775-53994a69daeb', '1539571696357-5a69c17a67c6', '1492562080023-ab3db95bfbce', '1489980508314-941910ded1f4'][Math.floor(Math.random() * 4)]}?q=80&w=100&auto=format&fit=crop`,
      imageUrl: mockPreviewUrl || undefined,
      category: categoryTag,
      helpfulCount: 0
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('soul_fitness_reviews', JSON.stringify(updatedReviews));

    // Reset Form
    setName('');
    setReviewText('');
    setRating(5);
    setMockPreviewUrl(null);
    setSuccessBadge(true);
    setShowWritePanel(false);

    setTimeout(() => {
      setSuccessBadge(false);
    }, 5000);
  };

  // Calculations for aggregate scores
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? parseFloat((reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1))
    : 4.6;

  // Rating breakdowns
  const getRatingCount = (stars: number) => reviews.filter(r => r.rating === stars).length;
  const getRatingPercentage = (stars: number) => {
    if (totalReviews === 0) return 0;
    return Math.round((getRatingCount(stars) / totalReviews) * 100);
  };

  // Filter list
  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter(r => r.rating === filterRating);

  return (
    <section id="reviews-section" className="py-24 bg-neutral-900 border-t border-b border-neutral-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-full text-yellow-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Smile className="w-3.5 h-3.5" />
            Social Proof
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Member <span className="text-yellow-400">Reviews</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base">
            See what the Soul Fitness community has to say. Read honest feedback or share your own personal workout experience directly!
          </p>
        </div>

        {/* Aggregate Ratings Panel Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Average Rating Stats (Left Col) */}
          <div className="lg:col-span-4 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-3">
            <span className="text-sm font-mono font-bold text-gray-500 uppercase tracking-widest">
              OVERALL RATING
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-display font-black text-white">{averageRating}</span>
              <span className="text-xl text-gray-500">/ 5.0</span>
            </div>
            
            {/* Visual Stars */}
            <div className="flex text-yellow-400 gap-1 pb-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < Math.floor(averageRating);
                return <Star key={i} className={`w-5 h-5 ${filled ? 'fill-current' : 'text-gray-600'}`} />;
              })}
            </div>

            <p className="text-xs text-gray-400 font-light max-w-[200px]">
              Based on <strong className="text-white">{totalReviews} verify reviews</strong> from our Karachi community.
            </p>

            <button
              onClick={() => setShowWritePanel(!showWritePanel)}
              className="mt-2 w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold tracking-wider rounded-xl transition-colors uppercase text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PenTool className="w-4 h-4" />
              Write A Review
            </button>
          </div>

          {/* Rating Distribution Bars (Middle Col) */}
          <div className="lg:col-span-8 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-center space-y-4 text-left">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">
              Rating Distribution Breakdown
            </h4>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map(stars => {
                const percent = getRatingPercentage(stars);
                const count = getRatingCount(stars);
                return (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-gray-400 w-3">{stars}★</span>
                    <div className="flex-1 bg-neutral-900 h-2.5 rounded-full overflow-hidden border border-neutral-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.8 }}
                        className="bg-yellow-400 h-full rounded-full"
                      ></motion.div>
                    </div>
                    <span className="text-xs font-mono text-gray-500 w-8 text-right">{percent}%</span>
                    <span className="text-[10px] font-mono text-gray-600 w-12">({count} rev)</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Interactive Form Panel (Expands when button clicked) */}
        <AnimatePresence>
          {showWritePanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden bg-neutral-950 border border-yellow-400/25 rounded-2xl p-6 sm:p-8 mb-12 max-w-3xl mx-auto text-left relative"
            >
              <button
                onClick={() => setShowWritePanel(false)}
                className="absolute top-6 right-6 p-1 bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <form onSubmit={handleSubmitReview} className="space-y-5">
                <h3 className="text-lg font-display font-black text-white uppercase tracking-tight border-b border-neutral-800 pb-2">
                  Share Your Gym Experience
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                      Your Screen Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jahanzaib Ahmed"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors"
                      required
                    />
                  </div>

                  {/* Category Tag dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                      Favorite Workout Zone
                    </label>
                    <select
                      value={categoryTag}
                      onChange={e => setCategoryTag(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors cursor-pointer"
                    >
                      <option>Strength Training</option>
                      <option>Cardio Zone</option>
                      <option>Elliptical conditioning</option>
                      <option>Agility Trampoline</option>
                      <option>Terrace Lounge</option>
                    </select>
                  </div>
                </div>

                {/* Rating Stars picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider block">
                    Choose Star Score ({rating} Stars)
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(stars => (
                      <button
                        type="button"
                        key={stars}
                        onClick={() => setRating(stars)}
                        className={`p-1 hover:scale-110 transition-transform text-2xl cursor-pointer ${
                          stars <= rating ? 'text-yellow-400' : 'text-neutral-700'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                    Your Review Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write details about equipment, cleanliness, trainers, artificial turf, or outdoor lounge spaces..."
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    required
                  ></textarea>
                </div>

                {/* Photo Drag & Drop Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider block">
                    Attach Workout Photo (Optional)
                  </label>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <label className="cursor-pointer border border-dashed border-neutral-700 hover:border-yellow-400/50 bg-neutral-900/60 p-4 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-neutral-900 transition-colors w-36 h-28 shrink-0 text-center select-none">
                      <Camera className="w-5 h-5 text-gray-400" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMockImageUpload}
                        className="hidden"
                      />
                    </label>

                    {mockPreviewUrl && (
                      <div className="relative w-36 h-28 rounded-xl overflow-hidden border border-neutral-700">
                        <img
                          src={mockPreviewUrl}
                          alt="Review attachment preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setMockPreviewUrl(null)}
                          className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-500 rounded-full text-white cursor-pointer"
                        >
                          <Trash className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold tracking-wider rounded-xl transition-colors uppercase text-xs"
                  >
                    Submit Review To Feed
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Success alert */}
        {successBadge && (
          <div id="reviews-success-badge" className="max-w-3xl mx-auto mb-8 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-3 text-sm text-left">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <div>
              <strong className="block uppercase text-xs">Review Submitted Successfully!</strong>
              <span>Your feedback has been added directly to the bottom feeds. Thank you for your review.</span>
            </div>
          </div>
        )}

        {/* Toolbar: Filters and Search */}
        <div id="reviews-toolbar" className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-mono font-bold text-gray-500 uppercase">Filter Reviews:</span>
          </div>

          <div className="flex gap-1.5 overflow-x-auto">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                filterRating === 'all'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-neutral-950 text-gray-400 border border-neutral-800 hover:text-white'
              }`}
            >
              All Stars ({reviews.length})
            </button>
            {[5, 4, 3, 2, 1].map(stars => (
              <button
                key={stars}
                onClick={() => setFilterRating(stars)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                  filterRating === stars
                    ? 'bg-yellow-400 text-black'
                    : 'bg-neutral-950 text-gray-400 border border-neutral-800 hover:text-white'
                }`}
              >
                {stars} ★ ({getRatingCount(stars)})
              </button>
            ))}
          </div>
        </div>

        {/* Active Reviews Feed List */}
        <div id="reviews-feed-container" className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <AnimatePresence mode="popLayout">
            {filteredReviews.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-500 italic">
                No reviews found matching this filter.
              </div>
            ) : (
              filteredReviews.map(rev => (
                <motion.div
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-neutral-950 border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-lg"
                >
                  <div className="space-y-4">
                    {/* Header: User Profile */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {rev.avatarUrl ? (
                          <img
                            src={rev.avatarUrl}
                            alt={rev.name}
                            className="w-10 h-10 rounded-full object-cover border border-neutral-800"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-[10px] font-mono font-black text-yellow-400 shrink-0">
                            {rev.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                            <h4 className="text-sm font-bold text-white leading-none">{rev.name}</h4>
                            {rev.role && (
                              <span className="text-[9px] font-mono font-bold text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded tracking-wide border border-yellow-400/15 uppercase w-fit">
                                {rev.role}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-gray-500">{rev.date}</span>
                        </div>
                      </div>

                      {/* Stars badge */}
                      <div className="flex text-yellow-400 gap-0.5 bg-yellow-400/5 px-2.5 py-1 rounded-lg border border-yellow-400/10">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-gray-700'}`} />
                        ))}
                      </div>
                    </div>

                    {/* Tag label */}
                    {rev.category && (
                      <span className="inline-block text-[9px] font-mono font-bold text-yellow-400 bg-yellow-400/10 px-2.5 py-0.5 rounded-full uppercase border border-yellow-400/10">
                        Training Zone: {rev.category}
                      </span>
                    )}

                    {/* Review text */}
                    <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                      "{rev.text}"
                    </p>

                    {/* Optional Image */}
                    {rev.imageUrl && (
                      <div className="relative rounded-xl overflow-hidden aspect-video border border-neutral-800 bg-neutral-950">
                        <img
                          src={rev.imageUrl}
                          alt="User gym review uploaded"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Helpful and Interaction footer */}
                  <div className="mt-5 pt-4 border-t border-neutral-900/80 flex items-center justify-between text-xs text-gray-500 font-mono">
                    <button
                      onClick={() => handleHelpful(rev.id)}
                      disabled={votedReviews[rev.id]}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        votedReviews[rev.id]
                          ? 'bg-yellow-400/15 border-yellow-400/30 text-yellow-400'
                          : 'bg-neutral-900 border-neutral-850 text-gray-400 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Helpful ({rev.helpfulCount})</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-emerald-500/80 text-[10px] font-bold uppercase">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Verified member</span>
                    </div>
                  </div>
                </motion.div>
              )))
            }
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
