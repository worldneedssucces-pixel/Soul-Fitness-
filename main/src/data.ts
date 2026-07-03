import { Facility, GymHours, Review } from './types';

export const FACILITIES: Facility[] = [
  {
    id: 'strength',
    title: 'Strength Training Arena',
    tagline: 'Heavy Weights & Grass Turf',
    description: 'Equipped with premium barbell stations, heavy squat racks, multi-purpose benches (red & black themed), and pristine artificial green grass turf flooring for optimal joint cushioning and heavy lifts.',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200&auto=format&fit=crop',
    features: ['Professional Squat Racks', 'Premium Dumbbells & Plates', 'Red/Black Adjustable Benches', 'High-density Turf Base']
  },
  {
    id: 'murals',
    title: 'Elite Motivation Wall & Murals',
    tagline: 'Designed for Warriors',
    description: 'Train alongside hand-painted giant bodybuilding and powerlifting murals that fuel your gym drive. Large mirror panels paired with refined wooden board outlines create the perfect lighting for progress checkups.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    features: ['Inspiring Wall Murals', 'Precision Progress Mirrors', 'Polished Wood Accent Panels', 'Perfect Dynamic Lighting']
  },
  {
    id: 'treadmills',
    title: 'Cardio Zone (Treadmill Suite)',
    tagline: 'High Speed, Great Views',
    description: 'A fully-equipped row of advanced speed-adjustable treadmills with bright, wide windows overlooking Gulberg Town. Features fresh green turf runner pathways underneath and active cooling.',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
    features: ['Multi-Speed Cardio Hub', 'Panoramic Wide Windows', 'Artificial Grass Pathways', 'Personal Safety Controls']
  },
  {
    id: 'ellipticals',
    title: 'Endurance Cardio Suite',
    tagline: 'Low Impact, Maximum Fit',
    description: 'Premium Precor elliptical cross-trainers and exercise bikes placed over smooth green grass turf. Perfect for low-impact cardio, recovery, and metabolic conditioning in a temperature-controlled environment.',
    imageUrl: 'https://images.unsplash.com/photo-1578762560072-15a08824309e?q=80&w=1200&auto=format&fit=crop',
    features: ['Precor Premium Ellipticals', 'Stationary Cycling Stations', 'Green Turf Foundation', 'Real-time Vital Tracking']
  },
  {
    id: 'agility',
    title: 'Agility & Functional Hub',
    tagline: 'Interactive Agility Training',
    description: 'Dynamic agility playground featuring professional mini-trampolines (LiveUp Sports) and stretching tracks. Styled with an imposing high-contrast monochrome gym giant mural on the background wall.',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop',
    features: ['LiveUp Sports Trampolines', 'Stretching & Agility Space', 'High-contrast Wall Murals', 'Jump & Core Training']
  },
  {
    id: 'terrace',
    title: 'The Terrace Lounge',
    tagline: 'Outdoor Recovery Space',
    description: 'Step outside to our beautifully designed outdoor terrace cafe with artificial turf, geometric stone paths, cozy ambient string lights, and striking yellow & grey designer chairs with black round tables. Perfect for relaxing and sipping protein shakes post-workout.',
    imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1200&auto=format&fit=crop',
    features: ['Scenic Stone & Turf Flooring', 'Ergonomic Yellow & Grey Chairs', 'Black Coffee Tables', 'Aesthetic Ambient Lighting']
  }
];

export const GYM_HOURS: GymHours[] = [
  { day: 'Monday', hours: '7:00 AM – 1:00 AM', isOpen: true },
  { day: 'Tuesday', hours: '7:00 AM – 1:00 AM', isOpen: true },
  { day: 'Wednesday', hours: '7:00 AM – 1:00 AM', isOpen: true },
  { day: 'Thursday', hours: '7:00 AM – 1:00 AM', isOpen: true },
  { day: 'Friday', hours: '7:00 AM – 1:00 AM', isOpen: true },
  { day: 'Saturday', hours: '7:00 AM – 1:00 AM', isOpen: true },
  { day: 'Sunday', hours: 'Closed', isOpen: false }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-mariya',
    name: 'Mariya Siddiqui',
    rating: 5,
    text: "BEST GYM AND STAFF IN TOWN\n\nSince I have tried so many gyms but Soul Fitness is remarkable regarding hygiene, ambiance, and management.\nStaff are highly qualified and friendly.",
    date: '2026-07-03',
    helpfulCount: 42
  },
  {
    id: 'rev-saad',
    name: 'Saad Khan',
    rating: 5,
    text: 'Excellent fitness gym with extra amenities like jacuzzi and sauna. The exercise machines are new, with more items being added. The staff and trainers are very friendly and helpful. They are happy to answer questions and can also provide details on special membership offers. Definitely a great addition to the area for anyone looking to improve their fitness regimen.',
    date: '2026-07-02',
    role: 'Local Guide',
    helpfulCount: 28
  },
  {
    id: 'rev-2',
    name: 'Syed Raheel Ali',
    rating: 5,
    text: 'Awesome place have a very good atmosphere staff is brilliant and friendly. Trainers are very good and helpful. Eager to help you out whether you are willing to loose weight or trying to improve your muscular physique. Especially Moosa over there a gem of a person what good trainer he is. He trained his every client with his heart and soul listen to you and always deliver tge result a real diamond. There team is also very good and listen to your needs and make a package for you. Their trainers have a very good diet plan and this place is worth to join and achieve your dream. I loose almost 10 kg in 3 months and cut down my body size from 40 to 34 and they help em to shape my body and make me ready for my dream days. Must visit them as thier place is very good and they are maintaining it very well. They brought new machines as well and include some trainers as well.',
    date: '2026-06-25',
    helpfulCount: 35
  },
  {
    id: 'rev-3',
    name: 'Raheel Syed',
    rating: 4,
    text: 'Security wise, cleaning wise, Especially for the feminine safety 10/10 also with friendly ambiance 👌.\n\nNeeds to be upgraded muscle training equipment.\nBack machines are few. Small area and traffic too much. Between 4:30 pm - 5:30 pm is the quality time to do a workout otherwise it will become fish market.',
    date: '2026-06-28',
    role: '4 reviews',
    helpfulCount: 16
  },
  {
    id: 'rev-4',
    name: 'Fauz Pervez',
    rating: 5,
    text: 'Excellent Hygenic gym with all the amenities for your cardio and strength training, price is a bit expensive but the staff is amazing and friendly. Jacuzzi and sauna are added advantages.',
    date: '2026-07-01',
    helpfulCount: 18
  }
];
