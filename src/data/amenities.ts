import {imageAssets} from './assets';
import type {Amenity} from '../types/app';

export const wellnessAmenities: Amenity[] = [
  {
    id: 'indoor-heated-pool',
    name: 'Indoor Heated Pool',
    description: 'Enjoy a relaxing swim in a temperature-controlled indoor pool designed for year-round comfort.',
    icon: '🏊',
    image: imageAssets.indoorHeatedPool,
  },
  {
    id: 'hot-tub',
    name: 'Hot Tub',
    description: 'Unwind in warm bubbling water that helps relax muscles and reduce daily stress.',
    icon: '♨️',
    image: imageAssets.hotTub,
  },
  {
    id: 'sauna',
    name: 'Sauna',
    description: 'Experience dry heat therapy in a modern sauna designed to promote relaxation and wellness.',
    icon: '🔥',
    image: imageAssets.sauna,
  },
  {
    id: 'eucalyptus-steam-room',
    name: 'Eucalyptus Steam Room',
    description: 'Refresh your body in a soothing steam environment infused with eucalyptus aromas.',
    icon: '🌿',
    image: imageAssets.eucalyptusSteamRoom,
  },
  {
    id: 'fitness-centre',
    name: 'Fitness Centre',
    description: 'Stay active with modern cardio and strength-training equipment in a premium fitness space.',
    icon: '🏋️',
    image: imageAssets.fitnessCentre,
  },
  {
    id: 'spa-treatments',
    name: 'Spa Treatments',
    description: 'Choose professional wellness treatments designed to help you relax and recharge.',
    icon: '💆',
    image: imageAssets.spaTreatments,
  },
];

export const restaurantAmenities: Amenity[] = [
  {
    id: 'atlas-steak-fish',
    name: 'ATLAS Steak + Fish',
    description: 'Enjoy premium steaks and fresh seafood in an elegant fine dining atmosphere.',
    icon: '🥩',
    image: imageAssets.atlasSteakAndFish,
  },
  {
    id: 'match-eatery',
    name: 'MATCH Eatery & Public House',
    description: 'Experience casual dining with a diverse menu, refreshing drinks, and a lively social setting.',
    icon: '🍽️',
    image: imageAssets.matchEatery,
  },
  {
    id: 'chow-lucky-noodle-bar',
    name: 'Chow Lucky Noodle Bar',
    description: 'Discover Asian-inspired noodle dishes prepared with fresh ingredients and bold flavors.',
    icon: '🍜',
    image: imageAssets.chowLuckyNoodleBar,
  },
  {
    id: 'couchiching-court-buffet',
    name: 'Couchiching Court Buffet',
    description: 'Explore international dishes, desserts, and freshly prepared specialties.',
    icon: '🍰',
    image: imageAssets.couchichingCourtBuffet,
  },
  {
    id: 'firestarter-lounge',
    name: 'Firestarter Lounge',
    description: 'Relax with handcrafted cocktails, light bites, and comfortable lounge seating.',
    icon: '🍸',
    image: imageAssets.firestarterLounge,
  },
  {
    id: 'centre-bar',
    name: 'Centre Bar',
    description: "Meet friends and enjoy beverages in the heart of the resort's entertainment area.",
    icon: '🍹',
    image: imageAssets.centreBar,
  },
  {
    id: 'the-weirs',
    name: 'The Weirs',
    description: 'Enjoy comfort foods, beverages, and a welcoming casual atmosphere.',
    icon: '🍻',
    image: imageAssets.theWeirs,
  },
];
