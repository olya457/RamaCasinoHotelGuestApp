import {imageAssets} from './assets';
import type {GuideCategory, GuidePlace} from '../types/app';

export const guideCategoryLabels: Record<GuideCategory, string> = {
  resort: 'Resort',
  dining: 'Dining',
  entertainment: 'Shows',
  wellness: 'Wellness',
  nearby: 'Nearby',
  practical: 'Tips',
};

export const guideCategoryColors: Record<GuideCategory, string> = {
  resort: '#ef3028',
  dining: '#ff8b1f',
  entertainment: '#ffc31a',
  wellness: '#15b978',
  nearby: '#16b9d4',
  practical: '#854ee9',
};

export const guidePlaces: GuidePlace[] = [
  {
    id: 'casino-rama-resort',
    name: 'Casino Rama Resort',
    category: 'resort',
    icon: '◆',
    image: imageAssets.onboardingExterior,
    shortDescription:
      'A Rama First Nation entertainment resort with hotel, dining, spa, live shows, and casino areas.',
    detailDescription:
      'Casino Rama Resort is located at 5899 Rama Road in Rama, Ontario. The resort combines an all-suite hotel, dining, spa and wellness spaces, an Entertainment Centre, and gaming areas. This guide focuses on planning a visit, finding useful resort information, and exploring the Orillia and Lake Country area around the property.',
    locationLabel: '5899 Rama Rd, Rama, ON L3V 6H6',
    hours:
      'Resort information: 24 hours daily. Call Centre: 9:00 AM - 9:00 PM.',
    officialUrl: 'https://www.casinorama.com/',
    ageNote:
      'Gaming floor and Entertainment Centre entry requires guests to be 19+ with valid government photo ID.',
    coordinates: {latitude: 44.64641, longitude: -79.3504},
    highlights: [
      'All-suite hotel and spa connected to the resort experience.',
      'Multiple dining venues, bars, live entertainment, and visitor services.',
      'Located on Rama First Nation, about 90 minutes north of Toronto.',
      'Useful base for Orillia, Lake Couchiching, and Ontario Lake Country stops.',
    ],
    tips: [
      'Bring valid government photo ID if you plan to enter 19+ resort areas.',
      'Check official pages before visiting because hours and access rules can change.',
      'Use this guide to save places and notes locally on your device.',
    ],
  },
  {
    id: 'hotel-spa',
    name: 'Hotel & Spa',
    category: 'resort',
    icon: 'H',
    image: imageAssets.onboardingSuite,
    shortDescription:
      'All-suite hotel, renovated guest rooms, spa, pool, fitness, and wellness amenities.',
    detailDescription:
      'The resort hotel is positioned as an all-suite luxury hotel with modern comfort, renovated rooms, spa access, pool and fitness facilities, and guest amenities. This guide does not book rooms or sell services; it helps visitors understand what is available and plan what to check before arrival.',
    locationLabel: 'Hotel lobby and wellness areas',
    hours:
      'Hotel access varies by reservation; pool and fitness details can change by season.',
    officialUrl: 'https://www.casinorama.com/hotel/',
    coordinates: {latitude: 44.64641, longitude: -79.3504},
    highlights: [
      'All-suite hotel with renovated rooms and modern amenities.',
      'Indoor salt water horizon pool, hot tub, steam rooms, saunas, and fitness area.',
      'The Spa at Rama Resort is located off the hotel lobby.',
      'Valet, bell service, retail, and gift shop amenities may be available.',
    ],
    tips: [
      'Confirm current hotel, spa, pool, and fitness hours before relying on them.',
      'Ask the resort directly about accessibility needs before arrival.',
      'Save this card if wellness time is part of your trip plan.',
    ],
  },
  {
    id: 'entertainment-centre',
    name: 'Entertainment Centre',
    category: 'entertainment',
    icon: '♪',
    image: imageAssets.onboardingNight,
    shortDescription:
      'Live entertainment venue for concerts, comedy, and touring performances.',
    detailDescription:
      'Casino Rama Resort’s Entertainment Centre hosts live shows and touring performances. This guide keeps the experience informational: it points visitors to the official schedule and helps them plan timing, dining, ID, parking, and nearby stops around a show night.',
    locationLabel: 'Resort entertainment area',
    hours: 'Event times vary by show.',
    officialUrl: 'https://www.casinorama.com/entertainment/',
    ageNote:
      'As of 2026, Casino Rama notes that shows are 19+ unless otherwise indicated.',
    coordinates: {latitude: 44.64641, longitude: -79.3504},
    highlights: [
      'Official show calendar changes frequently and should be checked before travel.',
      'Dining and bar options are located onsite for pre-show planning.',
      'The venue is part of the same resort complex as the hotel and casino areas.',
    ],
    tips: [
      'Check door time, show time, and ID rules on the official event page.',
      'Plan dinner earlier on show nights because dining areas can be busier.',
      'Save this place to your itinerary if you are building a show-night plan.',
    ],
  },
  {
    id: 'atlas-steak-fish',
    name: 'ATLAS steak + fish',
    category: 'dining',
    icon: 'A',
    image: imageAssets.atlasSteakAndFish,
    shortDescription:
      'Polished steak and seafood dining for a slower resort dinner.',
    detailDescription:
      'ATLAS steak + fish is one of the resort dining venues listed by Casino Rama. It is useful for visitors planning a more elevated dinner, celebration meal, or a pre-show dining stop. This app does not take reservations or payments; it helps users decide what to check on the official venue page.',
    locationLabel: 'Casino Rama Resort dining area',
    hours: 'Check the official dining page for current hours.',
    officialUrl: 'https://www.casinorama.com/eat-drink/',
    coordinates: {latitude: 44.64641, longitude: -79.3504},
    highlights: [
      'Steak and seafood focused dining.',
      'Good fit for celebrations and slower dinners.',
      'Useful pre-show option when planned ahead.',
    ],
    tips: [
      'Confirm reservations, dress expectations, and current hours before visiting.',
      'Allow extra time on entertainment nights.',
      'Save it if you want a dinner anchor for the itinerary.',
    ],
  },
  {
    id: 'match-eatery',
    name: 'MATCH Eatery & Public House',
    category: 'dining',
    icon: 'M',
    image: imageAssets.matchEatery,
    shortDescription:
      'Casual pub-style dining with drinks, comfort dishes, and group-friendly energy.',
    detailDescription:
      'MATCH Eatery & Public House is listed among Casino Rama Resort’s dining options. It fits a casual meal, drinks with friends, or an easy pre-show and post-show stop. Use this guide to save the venue and check official details before arrival.',
    locationLabel: 'Casino Rama Resort dining area',
    hours: 'Check the official dining page for current hours.',
    officialUrl: 'https://www.casinorama.com/eat-drink/',
    coordinates: {latitude: 44.64641, longitude: -79.3504},
    highlights: [
      'Casual pub atmosphere.',
      'Comfort food, share plates, and drinks.',
      'Useful for groups and flexible timing.',
    ],
    tips: [
      'Expect busier periods before major shows.',
      'Keep valid ID available if ordering alcohol.',
      'Check the official venue page for current menu and hours.',
    ],
  },
  {
    id: 'chow-lucky-noodle-bar',
    name: 'Chow Lucky Noodle Bar',
    category: 'dining',
    icon: 'N',
    image: imageAssets.chowLuckyNoodleBar,
    shortDescription:
      'Asian-inspired noodle bar for a quick, warm, casual meal.',
    detailDescription:
      'Chow Lucky Noodle Bar is listed by Casino Rama Resort as an onsite dining option. It works well when visitors want something quicker and more casual than a long dinner. This app keeps it informational and links users to official resort dining details.',
    locationLabel: 'Casino Rama Resort dining area',
    hours: 'Check the official dining page for current hours.',
    officialUrl: 'https://www.casinorama.com/eat-drink/',
    coordinates: {latitude: 44.64641, longitude: -79.3504},
    highlights: [
      'Noodle and Asian-inspired casual dishes.',
      'Good choice for a quicker meal.',
      'Convenient onsite dining option.',
    ],
    tips: [
      'Ask onsite staff about spice levels and dietary options.',
      'Use it as a flexible stop between activities.',
      'Verify current hours before relying on a late meal.',
    ],
  },
  {
    id: 'couchiching-court-buffet',
    name: 'Couchiching Court Buffet',
    category: 'dining',
    icon: 'B',
    image: imageAssets.couchichingCourtBuffet,
    shortDescription:
      'Buffet-style dining with rotating selections and flexible meal planning.',
    detailDescription:
      'Couchiching Court Buffet is one of the dining venues listed by Casino Rama Resort. Buffet hours and offerings can vary, so the guide presents it as a planning item rather than a live booking or ordering service.',
    locationLabel: 'Casino Rama Resort dining area',
    hours: 'Meal periods and hours can vary; check official details.',
    officialUrl: 'https://www.casinorama.com/eat-drink/',
    coordinates: {latitude: 44.64641, longitude: -79.3504},
    highlights: [
      'Flexible dining when variety matters.',
      'Useful for groups with different preferences.',
      'Listed as an onsite dining option by the resort.',
    ],
    tips: [
      'Check current seating times before planning around it.',
      'Ask onsite staff about dietary labels and allergens.',
      'Weekend and event periods may be busier.',
    ],
  },
  {
    id: 'firestarter-lounge',
    name: 'Firestarter Lounge',
    category: 'dining',
    icon: 'F',
    image: imageAssets.firestarterLounge,
    shortDescription:
      'Lounge setting for cocktails, conversation, and light bites.',
    detailDescription:
      'Firestarter Lounge is listed among Casino Rama Resort’s dining and bar options. It is a useful planning stop for visitors who want a slower drink, a meetup point, or a lounge break before or after an activity.',
    locationLabel: 'Casino Rama Resort lounge area',
    hours: 'Hours can vary; check official details.',
    officialUrl: 'https://www.casinorama.com/eat-drink/',
    ageNote: 'Alcohol service requires legal drinking age and valid ID.',
    coordinates: {latitude: 44.64641, longitude: -79.3504},
    highlights: [
      'Cocktails and lounge seating.',
      'Good meetup spot before a show.',
      'Useful for a quieter resort break.',
    ],
    tips: [
      'Ask about non-alcoholic options if needed.',
      'Bring valid ID for alcohol service.',
      'Confirm hours before planning late-evening stops.',
    ],
  },
  {
    id: 'centre-bar',
    name: 'Centre Bar',
    category: 'dining',
    icon: 'C',
    image: imageAssets.centreBar,
    shortDescription:
      'Central bar and meetup point in the resort entertainment area.',
    detailDescription:
      'Centre Bar is listed as one of Casino Rama Resort’s dining and bar options. Visitors can use it as a simple landmark and meetup stop inside the resort. The app does not sell drinks or promote offers; it only helps with planning.',
    locationLabel: 'Central resort floor',
    hours: 'Hours can vary; check official details.',
    officialUrl: 'https://www.casinorama.com/eat-drink/',
    ageNote: 'Alcohol service requires legal drinking age and valid ID.',
    coordinates: {latitude: 44.64641, longitude: -79.3504},
    highlights: [
      'Central location in the resort.',
      'Easy place to meet friends.',
      'Useful between dining, entertainment, and other resort areas.',
    ],
    tips: [
      'Can be lively during peak periods.',
      'Keep valid ID available for alcohol service.',
      'Use it as a simple meeting point in your itinerary notes.',
    ],
  },
  {
    id: 'the-weirs',
    name: 'The Weirs',
    category: 'dining',
    icon: 'W',
    image: imageAssets.theWeirs,
    shortDescription: 'Casual dining option located in the hotel lobby area.',
    detailDescription:
      'The Weirs is described by Casino Rama as daily breakfast dining in the hotel lobby and is listed among onsite dining choices. This guide helps visitors remember it as a convenient hotel-side meal option and check official hours before visiting.',
    locationLabel: 'Hotel lobby area',
    hours: 'Check official dining details for current meal periods.',
    officialUrl: 'https://www.casinorama.com/eat-drink/',
    coordinates: {latitude: 44.64641, longitude: -79.3504},
    highlights: [
      'Hotel-lobby dining option.',
      'Useful for breakfast planning.',
      'Convenient if staying onsite.',
    ],
    tips: [
      'Confirm current breakfast hours before arrival.',
      'Good option to save for a morning plan.',
      'Ask onsite staff about current menu and seating.',
    ],
  },
  {
    id: 'pool-fitness',
    name: 'Pool, Steam & Fitness',
    category: 'wellness',
    icon: 'W',
    image: imageAssets.indoorHeatedPool,
    shortDescription:
      'Indoor salt water horizon pool, hot tub, steam rooms, saunas, and fitness centre.',
    detailDescription:
      'Casino Rama’s hotel information lists an indoor salt water horizon pool, hot tub, steam rooms, saunas, and a renovated fitness centre. This guide treats the amenities as visit-planning information and reminds users to confirm access and hours directly.',
    locationLabel: 'Hotel wellness area',
    hours:
      'Pool and fitness details can change; check official hotel information.',
    officialUrl: 'https://www.casinorama.com/hotel/',
    coordinates: {latitude: 44.64641, longitude: -79.3504},
    highlights: [
      'Indoor salt water horizon pool.',
      'Hot tub, steam rooms, and saunas.',
      'Fitness centre listed among hotel amenities.',
    ],
    tips: [
      'Confirm whether access requires a hotel stay.',
      'Bring swimwear and check towel policies onsite.',
      'Ask staff about accessibility routes if needed.',
    ],
  },
  {
    id: 'visitor-essentials',
    name: 'Visitor Essentials',
    category: 'practical',
    icon: 'i',
    image: imageAssets.visitorEssentials,
    shortDescription:
      'Address, ID rules, contact information, parking reminders, and official links.',
    detailDescription:
      'This practical card collects the essentials that help a public visitor plan responsibly: address, official phone contact, 19+ entry rules for certain areas, and a reminder that offers, hours, and access rules may change without notice.',
    locationLabel: '5899 Rama Rd, Rama, ON L3V 6H6',
    hours: 'Resort hours: 24 hours daily. Call Centre: 9:00 AM - 9:00 PM.',
    officialUrl: 'https://www.casinorama.com/faq/',
    ageNote:
      'Gaming floor and Entertainment Centre entry requires guests to be 19+ with valid government photo ID.',
    coordinates: {latitude: 44.64641, longitude: -79.3504},
    highlights: [
      'Address: 5899 Rama Rd, Rama, ON L3V 6H6.',
      'Call Centre listed by Casino Rama: 1-800-832-7529.',
      '19+ ID requirement applies to gaming floor and Entertainment Centre entry.',
      'Official resort details can change, so verify before travelling.',
    ],
    tips: [
      'Keep ID accessible if your plan includes age-restricted areas.',
      'Use official pages for final hours, event, and entry details.',
      'This app stores itinerary notes locally and does not require login.',
    ],
  },
  {
    id: 'lake-couchiching-waterfront',
    name: 'Lake Couchiching Waterfront',
    category: 'nearby',
    icon: 'L',
    image: imageAssets.lakeCouchiching,
    shortDescription:
      'Nearby Orillia waterfront for lake views, walking paths, picnics, and fresh air.',
    detailDescription:
      'The Lake Couchiching waterfront in Orillia is one of the easiest local outdoor breaks near Casino Rama. It gives visitors water views, walking space, picnic areas, and a calmer stop before or after resort activities.',
    locationLabel: 'Orillia waterfront',
    hours: 'Public-area access and facilities vary by season.',
    coordinates: {latitude: 44.6088, longitude: -79.4184},
    highlights: [
      'Lakeside walking and open water views.',
      'Good short outdoor stop near the resort area.',
      'Easy pairing with downtown Orillia.',
    ],
    tips: [
      'Check local signs for parking, beach, and event notices.',
      'Bring layers because wind near the lake can feel cooler.',
      'Save it for a low-effort outdoor break.',
    ],
  },
  {
    id: 'downtown-orillia',
    name: 'Downtown Orillia',
    category: 'nearby',
    icon: 'D',
    image: imageAssets.downtownOrillia,
    shortDescription:
      'Historic downtown with small shops, bakeries, cafes, arts stops, and walkable streets.',
    detailDescription:
      'Casino Rama’s Things to Do page points visitors toward Historic Downtown Orillia for small shops, bakeries, cafes, and local browsing. It is a useful nearby stop when visitors want a break outside the resort.',
    locationLabel: 'Downtown Orillia',
    hours: 'Individual business hours vary.',
    officialUrl: 'https://www.downtownorillia.org/',
    coordinates: {latitude: 44.6086777, longitude: -79.4187613},
    highlights: [
      'Walkable downtown streets.',
      'Local shops, cafes, bakeries, and arts stops.',
      'Pairs well with the Orillia waterfront.',
    ],
    tips: [
      'Check individual business hours before going late in the day.',
      'Use downtown as a flexible coffee, lunch, or browsing stop.',
      'Look for public parking and local event notices.',
    ],
  },
  {
    id: 'orillia-opera-house',
    name: 'Orillia Opera House',
    category: 'nearby',
    icon: 'O',
    image: imageAssets.orilliaOperaHouse,
    shortDescription:
      'Historic local venue for theatre, music, community shows, and visitor-friendly events.',
    detailDescription:
      'The Orillia Opera House is listed by Casino Rama’s Things to Do page as a nearby cultural stop. It is useful for visitors who want local performing arts in addition to resort entertainment.',
    locationLabel: '20 Mississaga St W, Orillia, ON',
    hours: 'Box office and event hours vary.',
    officialUrl: 'https://www.orilliaoperahouse.ca/',
    coordinates: {latitude: 44.6083, longitude: -79.4206},
    highlights: [
      'Local theatre and touring entertainment.',
      'Central downtown Orillia location.',
      'Pairs well with dinner or waterfront walking.',
    ],
    tips: [
      'Check the official calendar before planning a visit.',
      'Look up parking before arriving for an event.',
      'Save it if you want local culture beyond the resort.',
    ],
  },
  {
    id: 'orillia-museum-art-history',
    name: 'Orillia Museum of Art & History',
    category: 'nearby',
    icon: 'M',
    image: imageAssets.orilliaMuseumArtHistory,
    shortDescription:
      'Local culture and history stop in Orillia and Lake Country.',
    detailDescription:
      'The Orillia Museum of Art & History is included among local attractions on Casino Rama’s Things to Do page. It can add a quieter cultural stop to a resort-area trip.',
    locationLabel: 'Downtown Orillia',
    hours: 'Museum hours vary; check official information before visiting.',
    officialUrl: 'https://www.orilliamuseum.org/',
    coordinates: {latitude: 44.6092, longitude: -79.4182},
    highlights: [
      'Local art, culture, and history exhibits.',
      'Downtown location near cafes and shops.',
      'Good indoor option in poor weather.',
    ],
    tips: [
      'Confirm open days and exhibit hours before arrival.',
      'Pair it with a downtown walk.',
      'Save it as a rainy-day option.',
    ],
  },
  {
    id: 'stephen-leacock-museum',
    name: 'Stephen Leacock Museum',
    category: 'nearby',
    icon: 'S',
    image: imageAssets.stephenLeacockMuseum,
    shortDescription:
      'Historic home and museum experience near Lake Couchiching.',
    detailDescription:
      'Casino Rama’s Things to Do page lists the Stephen Leacock Museum as a nearby attraction. It offers a heritage-focused visit connected to Canadian literature, local history, and the lakeside setting.',
    locationLabel: 'Orillia, near Lake Couchiching',
    hours: 'Tour and museum hours vary by season.',
    officialUrl: 'https://www.leacockmuseum.com/',
    coordinates: {latitude: 44.601, longitude: -79.3947},
    highlights: [
      'Historic home and museum grounds.',
      'Literary and local heritage focus.',
      'Good pairing with Lake Couchiching views.',
    ],
    tips: [
      'Check tour availability before arriving.',
      'Allow time for the grounds if weather is pleasant.',
      'Save it for a quieter daytime plan.',
    ],
  },
  {
    id: 'mnjikaning-fish-weirs',
    name: 'Mnjikaning Fish Weirs',
    category: 'nearby',
    icon: 'F',
    image: imageAssets.mnjikaningFishWeirs,
    shortDescription:
      'National Historic Site at the Narrows between Lake Simcoe and Lake Couchiching.',
    detailDescription:
      'The Mnjikaning Fish Weirs National Historic Site is located near Rama First Nation at the Atherley Narrows between Lake Simcoe and Lake Couchiching. It is an important cultural and historical place connected to Indigenous fishing practices and the local waterways.',
    locationLabel: 'Atherley Narrows, near Rama First Nation',
    hours: 'Outdoor historic-site access and interpretation can vary.',
    officialUrl: 'https://parks.canada.ca/lhn-nhs/on/mnjikaning',
    coordinates: {latitude: 44.6022067, longitude: -79.3676162},
    highlights: [
      'National Historic Site of Canada.',
      'Located between Lake Simcoe and Lake Couchiching.',
      'Important Indigenous cultural and historical place.',
    ],
    tips: [
      'Treat the area with respect and follow posted guidance.',
      'Read official interpretation before visiting to understand the site.',
      'Pair it with a lakeside stop rather than rushing through.',
    ],
  },
];

export const resortHighlights = guidePlaces.filter(place =>
  [
    'casino-rama-resort',
    'hotel-spa',
    'entertainment-centre',
    'visitor-essentials',
  ].includes(place.id),
);

export const diningPlaces = guidePlaces.filter(
  place => place.category === 'dining',
);

export const nearbyPlaces = guidePlaces.filter(
  place => place.category === 'nearby',
);

export const mapPlaces = guidePlaces.filter(place =>
  Boolean(place.coordinates),
);

export function getGuidePlace(placeId: string): GuidePlace | undefined {
  return guidePlaces.find(place => place.id === placeId);
}
