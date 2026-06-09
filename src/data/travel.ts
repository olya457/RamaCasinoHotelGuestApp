import {imageAssets} from './assets';
import type {TravelCategory, TravelLocation} from '../types/app';

export const travelCategories: {id: TravelCategory; label: string}[] = [
  {id: 'all', label: 'All Locations'},
  {id: 'lakeside', label: 'Lakeside Escapes'},
  {id: 'nature', label: 'Nature & Scenic'},
  {id: 'beach', label: 'Beaches'},
  {id: 'waterfront', label: 'Waterfront'},
];

export const travelLocations: TravelLocation[] = [
  {
    id: 'lake-couchiching-centennial-park',
    name: 'Lake Couchiching',
    category: 'lakeside',
    coordinates: {latitude: 44.6088, longitude: -79.4184},
    shortDescription: 'Beautiful lakeside views and waterfront activities. Perfect for boating, fishing, and sunset walks.',
    description:
      'Located on the shoreline of Lake Couchiching in Orillia, this waterfront park offers scenic walking paths, landscaped gardens, picnic areas, and a sandy beach close to Casino Rama.',
    image: imageAssets.lakeCouchiching,
  },
  {
    id: 'muskoka-wharf',
    name: 'Muskoka Wharf',
    category: 'lakeside',
    coordinates: {latitude: 44.9157, longitude: -79.3777},
    shortDescription: 'Waterfront promenades, dining, shops, boat cruises, and classic Muskoka views.',
    description:
      'Muskoka Wharf in Gravenhurst is a vibrant lakeside destination with restaurants, shops, cruises, and the relaxed atmosphere of Ontario cottage country.',
    image: imageAssets.muskokaWharf,
  },
  {
    id: 'port-carling-waterfront',
    name: 'Port Carling Waterfront',
    category: 'waterfront',
    coordinates: {latitude: 45.1186, longitude: -79.5753},
    shortDescription: 'A charming village waterfront with marinas, boutique stores, docks, and historic locks.',
    description:
      'Known as the Hub of the Lakes, Port Carling sits between Lake Muskoka and Lake Rosseau with scenic docks, marinas, boutiques, and lakeside seating.',
    image: imageAssets.portCarlingWaterfront,
  },
  {
    id: 'coboconk-beach-park',
    name: 'Coboconk Beach Park',
    category: 'beach',
    coordinates: {latitude: 44.6492, longitude: -78.8045},
    shortDescription: 'A calm Balsam Lake beach with picnic tables, swimming areas, and peaceful views.',
    description:
      'Coboconk Beach Park offers a sandy beach, picnic areas, and quiet views across Balsam Lake for a relaxed day near the water.',
    image: imageAssets.coboconkBeachPark,
  },
  {
    id: 'wasaga-beach-waterfront',
    name: 'Wasaga Beach Waterfront',
    category: 'beach',
    coordinates: {latitude: 44.5204, longitude: -80.0166},
    shortDescription: 'Soft sand, Georgian Bay water, trails, recreation, and famous freshwater beach scenery.',
    description:
      'Wasaga Beach stretches along Georgian Bay and combines a long freshwater beach with swimming, waterfront trails, recreation, and sunset views.',
    image: imageAssets.wasagaBeachWaterfront,
  },
  {
    id: 'kenora-harbourfront',
    name: 'Kenora Harbourfront',
    category: 'waterfront',
    coordinates: {latitude: 49.7668, longitude: -94.4898},
    shortDescription: 'Boardwalks, marinas, lake dining, and sweeping views over Lake of the Woods.',
    description:
      'Kenora Harbourfront sits on Lake of the Woods with public gathering spaces, marinas, dining, and impressive freshwater landscapes.',
    image: imageAssets.kenoraHarbourfront,
  },
  {
    id: 'algonquin-provincial-park',
    name: 'Algonquin Provincial Park',
    category: 'nature',
    coordinates: {latitude: 45.8372, longitude: -78.3792},
    shortDescription: 'Vast forests, clear lakes, wildlife, hiking, canoeing, and iconic Ontario wilderness.',
    description:
      'Algonquin offers vast protected wilderness with forests, lakes, scenic lookouts, wildlife, hiking, canoeing, and remarkable autumn color.',
    image: imageAssets.algonquinProvincialPark,
  },
  {
    id: 'arrowhead-provincial-park',
    name: 'Arrowhead Provincial Park',
    category: 'nature',
    coordinates: {latitude: 45.3765, longitude: -79.2168},
    shortDescription: 'Peaceful forest trails, Arrowhead Lake, swimming, and picturesque picnic areas.',
    description:
      'Near Huntsville, Arrowhead Provincial Park is known for forest paths, scenic lakes, swimming, hiking, and relaxed picnic areas.',
    image: imageAssets.arrowheadProvincialPark,
  },
  {
    id: 'awenda-provincial-park',
    name: 'Awenda Provincial Park',
    category: 'nature',
    coordinates: {latitude: 44.8324, longitude: -79.9398},
    shortDescription: 'Dense forests, Georgian Bay beaches, coastal trails, cycling, and scenic landscapes.',
    description:
      'Awenda sits on Georgian Bay with forests, sandy beaches, coastal landscapes, hiking trails, and diverse natural ecosystems.',
    image: imageAssets.awendaProvincialPark,
  },
  {
    id: 'hardwood-hills-nature-reserve',
    name: 'Hardwood Hills Nature Reserve',
    category: 'nature',
    coordinates: {latitude: 44.7116, longitude: -79.4702},
    shortDescription: 'Rolling forested hills, scenic trails, mountain biking, wildlife, and countryside views.',
    description:
      'Hardwood Hills offers rolling terrain, mature woodlands, hiking, mountain biking, wildlife viewing, and elevated countryside viewpoints.',
    image: imageAssets.hardwoodHillsNatureReserve,
  },
  {
    id: 'mono-cliffs-provincial-park',
    name: 'Mono Cliffs Provincial Park',
    category: 'nature',
    coordinates: {latitude: 44.031, longitude: -80.0607},
    shortDescription: 'Dramatic cliffs, boardwalk trails, old cedar forests, valleys, and lookout points.',
    description:
      'Mono Cliffs is known for dramatic cliffs, forested valleys, boardwalk trails, ancient cedars, and peaceful lookout points.',
    image: imageAssets.monoCliffsProvincialPark,
  },
  {
    id: 'killbear-provincial-park',
    name: 'Killbear Provincial Park',
    category: 'nature',
    coordinates: {latitude: 45.3749, longitude: -80.2157},
    shortDescription: 'Granite Georgian Bay shoreline, windswept pines, hiking trails, and rugged water views.',
    description:
      'Killbear combines rugged granite shoreline, windswept pine trees, forest landscapes, waterfront views, and hiking trails.',
    image: imageAssets.killbearProvincialPark,
  },
  {
    id: 'sandbanks-provincial-park-beach',
    name: 'Sandbanks Provincial Park Beach',
    category: 'beach',
    coordinates: {latitude: 43.9061, longitude: -77.2617},
    shortDescription: 'Wide sandy beaches, freshwater dunes, clear water, swimming, and Lake Ontario sunsets.',
    description:
      'Sandbanks is famous for large freshwater sand dunes, wide beaches, clear Lake Ontario water, and scenic shoreline sunsets.',
    image: imageAssets.sandbanksProvincialParkBeach,
  },
  {
    id: 'sauble-beach',
    name: 'Sauble Beach',
    category: 'beach',
    coordinates: {latitude: 44.6415, longitude: -81.2724},
    shortDescription: 'More than eleven kilometers of Lake Huron sand, shallow water, and relaxed beach energy.',
    description:
      'Sauble Beach stretches along Lake Huron with soft sand, shallow waters, and a vibrant waterfront atmosphere.',
    image: imageAssets.saubleBeach,
  },
  {
    id: 'grand-bend-beach',
    name: 'Grand Bend Beach',
    category: 'beach',
    coordinates: {latitude: 43.3147, longitude: -81.7572},
    shortDescription: 'Golden sand, clear Lake Huron water, sunsets, dining, shops, and recreation.',
    description:
      'Grand Bend Beach is known for golden sand, clear water, sunset views, restaurants, shops, and lively waterfront activities.',
    image: imageAssets.grandBendBeach,
  },
  {
    id: 'cobourg-beach',
    name: 'Cobourg Beach',
    category: 'waterfront',
    coordinates: {latitude: 43.9546, longitude: -78.1654},
    shortDescription: 'Clean Lake Ontario shoreline, soft sand, waterfront parks, and charming coastal surroundings.',
    description:
      "Cobourg Beach offers a clean shoreline, soft sand, lake views, beach walks, and one of Ontario's attractive coastal communities.",
    image: imageAssets.cobourgBeach,
  },
  {
    id: 'port-stanley-main-beach',
    name: 'Port Stanley Main Beach',
    category: 'waterfront',
    coordinates: {latitude: 42.6635, longitude: -81.2149},
    shortDescription: 'Warm Lake Erie water, wide sand, harbor dining, boutique shops, and a vacation feel.',
    description:
      'Port Stanley Main Beach offers a wide sandy shore, warm water, nearby harbor, restaurants, boutiques, and a relaxed vacation atmosphere.',
    image: imageAssets.portStanleyMainBeach,
  },
  {
    id: 'canatara-beach',
    name: 'Canatara Beach',
    category: 'waterfront',
    coordinates: {latitude: 43.0057, longitude: -82.4089},
    shortDescription: 'A peaceful Sarnia waterfront retreat with sandy beach, trails, picnic areas, and lake views.',
    description:
      'Canatara Beach sits within Canatara Park in Sarnia with a sandy Lake Huron beach, walking trails, picnic areas, and a peaceful setting.',
    image: imageAssets.canataraBeach,
  },
];
