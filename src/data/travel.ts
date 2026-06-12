import {imageAssets} from './assets';
import type {TravelCategory, TravelLocation} from '../types/app';

type TravelLocationDetails = Pick<TravelLocation, 'detailDescription' | 'setting' | 'highlights' | 'bestFor' | 'visitTips'>;
type BaseTravelLocation = Omit<TravelLocation, keyof TravelLocationDetails>;

export const travelCategories: {id: TravelCategory; label: string}[] = [
  {id: 'all', label: 'All Locations'},
  {id: 'lakeside', label: 'Lakeside Escapes'},
  {id: 'nature', label: 'Nature & Scenic'},
  {id: 'beach', label: 'Beaches'},
  {id: 'waterfront', label: 'Waterfront'},
];

const baseTravelLocations: BaseTravelLocation[] = [
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

const travelDetails: Record<string, TravelLocationDetails> = {
  'lake-couchiching-centennial-park': {
    setting: 'Waterfront park in Orillia on Lake Couchiching',
    detailDescription:
      'Lake Couchiching Centennial Park sits along the Orillia shoreline and combines open lake views with easy walking paths, landscaped garden areas, picnic space, and a sandy beach. It is one of the most convenient waterfront stops for guests staying near Casino Rama because it offers a relaxed lake experience without requiring a full-day drive.',
    highlights: [
      'Scenic shoreline paths for a calm walk by the water.',
      'Picnic lawns, gardens, beach areas, and seasonal public events.',
      'Open sunset views across Lake Couchiching.',
      'Easy access to Orillia waterfront dining and downtown stops.',
    ],
    bestFor: ['Sunset walks', 'Relaxed beach time', 'Picnics', 'Short local trips'],
    visitTips: [
      'Good choice when you want a nearby outdoor break rather than a long excursion.',
      'Bring layers near the water because wind can feel cooler than inland areas.',
      'Check local signage for beach conditions, event closures, and parking rules.',
    ],
  },
  'muskoka-wharf': {
    setting: 'Lake Muskoka waterfront district in Gravenhurst',
    detailDescription:
      'Muskoka Wharf is a lively lakeside destination on Lake Muskoka with waterfront promenades, restaurants, shops, marinas, and seasonal boat cruises. It gives visitors a polished introduction to Ontario cottage country, with classic Muskoka lake scenery and an easy layout for walking, dining, and sightseeing.',
    highlights: [
      'Waterfront boardwalks with broad views of Lake Muskoka.',
      'Restaurants, small shops, and public marina areas.',
      'Seasonal sightseeing cruises and cottage-country atmosphere.',
      'Good mix of scenery, food, and casual exploration in one stop.',
    ],
    bestFor: ['Lake cruises', 'Waterfront dining', 'Photos', 'Afternoon exploring'],
    visitTips: [
      'Cruise schedules and restaurant hours vary by season, so check ahead before driving.',
      'Plan extra time in summer because parking and waterfront areas can be busy.',
      'Comfortable walking shoes help if you want to explore the full promenade.',
    ],
  },
  'port-carling-waterfront': {
    setting: 'Muskoka village waterfront between Lake Muskoka and Lake Rosseau',
    detailDescription:
      'Port Carling is often called the Hub of the Lakes because it sits between Lake Muskoka and Lake Rosseau. The waterfront area includes marinas, scenic docks, boutique shops, lakeside seating, and the historic locks where visitors can watch boats move between the lakes.',
    highlights: [
      'Historic lock area with passing boats and village views.',
      'Boutiques, marinas, docks, and relaxed waterfront seating.',
      'Classic Muskoka village atmosphere with easy photo spots.',
      'Access point for exploring the surrounding lake communities.',
    ],
    bestFor: ['Boat watching', 'Boutique browsing', 'Muskoka scenery', 'Slow afternoon walks'],
    visitTips: [
      'The lock area is a useful landmark if you want a compact first stop.',
      'Summer weekends are popular, so arrive earlier for easier parking.',
      'Keep the visit flexible because weather changes quickly around the lakes.',
    ],
  },
  'coboconk-beach-park': {
    setting: 'Quiet public beach area on Balsam Lake',
    detailDescription:
      'Coboconk Beach Park is a peaceful waterfront stop on Balsam Lake with a sandy beach, swimming areas, picnic tables, and open views across calm water. It is best suited to guests looking for a simple, low-key lake outing rather than a crowded resort-style beach.',
    highlights: [
      'Sandy beach area with a relaxed local feel.',
      'Picnic tables and open lake views.',
      'Calm setting for families, couples, and quiet breaks.',
      'Good stop for a slower day near the water.',
    ],
    bestFor: ['Quiet beach time', 'Picnics', 'Simple swimming stops', 'Family-friendly downtime'],
    visitTips: [
      'Pack water, towels, and snacks because amenities may be limited.',
      'Follow posted swimming and park rules on arrival.',
      'Best enjoyed on warm, clear days when the lake views are strongest.',
    ],
  },
  'wasaga-beach-waterfront': {
    setting: 'Long Georgian Bay beach destination',
    detailDescription:
      "Wasaga Beach runs along the shore of Georgian Bay and is widely known for its long freshwater beach, soft sand, swimming areas, trails, and recreational energy. It is one of Ontario's most recognizable summer waterfront destinations and works well for guests who want a bigger beach-day experience.",
    highlights: [
      'Expansive sandy shoreline on Georgian Bay.',
      'Swimming, waterfront trails, and sunset views.',
      'Lively summer atmosphere with recreation nearby.',
      'A strong choice for a full beach-focused day trip.',
    ],
    bestFor: ['Beach days', 'Swimming', 'Sunsets', 'Active waterfront visits'],
    visitTips: [
      'Expect heavier traffic and busier parking in peak summer weather.',
      'Bring sun protection because open beach areas have limited shade.',
      'Check local beach area rules before setting up for the day.',
    ],
  },
  'kenora-harbourfront': {
    setting: 'Northern Ontario harbourfront on Lake of the Woods',
    detailDescription:
      "Kenora Harbourfront sits on the northern shores of Lake of the Woods and features one of Ontario's most impressive freshwater lake systems. Visitors can walk near marinas and public gathering spaces, watch boats move through the harbour, and enjoy wide northern lake scenery.",
    highlights: [
      'Boardwalk-style harbourfront spaces and marina views.',
      'Large-scale Lake of the Woods scenery.',
      'Waterfront dining and public gathering areas nearby.',
      'Distinct northern Ontario atmosphere.',
    ],
    bestFor: ['Harbour walks', 'Lake photography', 'Boat watching', 'Northern scenery'],
    visitTips: [
      'This is a far northern destination, so plan it as part of a larger Ontario route.',
      'Weather can shift quickly near big water, especially outside summer.',
      'Use the harbourfront as a starting point for local dining and lake activities.',
    ],
  },
  'algonquin-provincial-park': {
    setting: 'Large protected wilderness area in central Ontario',
    detailDescription:
      "Algonquin Provincial Park is one of Canada's best-known provincial parks, with vast forest, clear lakes, wildlife habitat, canoe routes, hiking trails, and scenic lookouts. The park covers more than 7,500 square kilometers and is especially popular in autumn when the forest colours turn red, orange, and gold.",
    highlights: [
      'Extensive canoe routes, lakes, and forest trails.',
      'Wildlife viewing opportunities in a protected natural setting.',
      'Lookouts and interpretive stops along the Highway 60 corridor.',
      'Exceptional fall colour season.',
    ],
    bestFor: ['Hiking', 'Canoeing', 'Wildlife viewing', 'Photography'],
    visitTips: [
      'Reserve permits or day-use access when required, especially in busy seasons.',
      'Choose trails by difficulty and daylight; the park is large and travel times add up.',
      'Bring insect protection in warmer months and layers in spring or fall.',
    ],
  },
  'arrowhead-provincial-park': {
    setting: 'Forest and lake park near Huntsville',
    detailDescription:
      'Arrowhead Provincial Park is known for peaceful forest scenery, Arrowhead Lake, hiking trails, swimming areas, and picnic spaces. It is a comfortable nature stop near Huntsville and works well for guests who want woodland paths and lake access without the scale of a larger wilderness park.',
    highlights: [
      'Woodland hiking trails through quiet forest areas.',
      'Arrowhead Lake for swimming and scenic views.',
      'Picnic areas surrounded by natural landscape.',
      'Seasonal outdoor recreation in a manageable park layout.',
    ],
    bestFor: ['Forest walks', 'Swimming', 'Picnics', 'Relaxed nature time'],
    visitTips: [
      'Check park operating details and day-use availability before arrival.',
      'Pick shorter trails if visiting as part of a multi-stop day.',
      'Bring swim gear in summer and warm layers outside peak season.',
    ],
  },
  'awenda-provincial-park': {
    setting: 'Forest and Georgian Bay shoreline near Penetanguishene',
    detailDescription:
      'Awenda Provincial Park sits on the shores of Georgian Bay and features dense forest, sandy beaches, coastal scenery, hiking routes, and cycling-friendly areas. Its mix of woodland and bay shoreline makes it a strong option for visitors who want both trails and water views.',
    highlights: [
      'Georgian Bay beaches and coastal landscape.',
      'Forest trails through varied natural ecosystems.',
      'Good mix of hiking, cycling, and beach time.',
      'Quieter natural setting compared with busier waterfront towns.',
    ],
    bestFor: ['Hiking', 'Cycling', 'Beach stops', 'Nature photography'],
    visitTips: [
      'Pack for both trail and beach conditions if you plan a longer visit.',
      'Check park advisories and seasonal access before leaving.',
      'Some areas require walking from parking, so keep bags practical.',
    ],
  },
  'hardwood-hills-nature-reserve': {
    setting: 'Rolling forest recreation area near Oro-Medonte',
    detailDescription:
      'Hardwood Hills is known for rolling wooded terrain, mature forest, trails, mountain biking, hiking, and elevated countryside views. It suits active guests who want a more movement-focused outdoor stop with varied terrain rather than a flat lakeside walk.',
    highlights: [
      'Rolling forested hills and mature woodland scenery.',
      'Trail network suited to hiking and mountain biking.',
      'Elevated viewpoints across the surrounding countryside.',
      'Good active alternative to beach or waterfront outings.',
    ],
    bestFor: ['Trail walks', 'Mountain biking', 'Fitness-focused outings', 'Countryside views'],
    visitTips: [
      'Trail conditions can change with rain, snow, or seasonal maintenance.',
      'Use appropriate footwear because terrain can be uneven.',
      'Check local access rules if bringing bikes or planning a longer ride.',
    ],
  },
  'mono-cliffs-provincial-park': {
    setting: 'Escarpment landscape with cliffs and forested valleys',
    detailDescription:
      "Mono Cliffs Provincial Park is one of southern Ontario's scenic natural destinations, known for dramatic cliffs, forested valleys, boardwalk sections, ancient cedar trees, and lookout points. The landscape feels more rugged than many nearby parks while still offering accessible trail options.",
    highlights: [
      'Cliffside scenery and escarpment terrain.',
      'Boardwalk sections through unique natural areas.',
      'Ancient cedar forest and quiet valley trails.',
      'Panoramic lookout opportunities.',
    ],
    bestFor: ['Hiking', 'Lookouts', 'Forest photography', 'Escarpment scenery'],
    visitTips: [
      'Stay on marked trails to protect sensitive cliff and forest areas.',
      'Wear sturdy shoes, especially after rain or during shoulder seasons.',
      'Arrive early on busy weekends because parking can fill quickly.',
    ],
  },
  'killbear-provincial-park': {
    setting: 'Georgian Bay park with granite shoreline and pine forest',
    detailDescription:
      'Killbear Provincial Park is famous for rugged Georgian Bay shoreline, exposed granite, windswept pine trees, forest landscapes, and waterfront views. It is a favourite for visitors who want a dramatic Canadian Shield setting with hiking, beach areas, and classic bay scenery.',
    highlights: [
      'Granite shoreline and windswept pine scenery.',
      'Georgian Bay views from trails and waterfront areas.',
      'Forest paths and beach access within the park.',
      'Strong photo opportunities in clear weather and at sunset.',
    ],
    bestFor: ['Hiking', 'Waterfront views', 'Photography', 'Classic Georgian Bay scenery'],
    visitTips: [
      'Park access and day-use capacity can be limited during busy periods.',
      'Rocky shoreline can be slippery, so move carefully near the water.',
      'Bring layers because wind off Georgian Bay can be strong.',
    ],
  },
  'sandbanks-provincial-park-beach': {
    setting: 'Lake Ontario beach park with major freshwater dune formations',
    detailDescription:
      "Sandbanks Provincial Park is known for broad sandy beaches, clear Lake Ontario water, and some of the largest freshwater sand dune formations in the region. It is one of Ontario's most popular warm-weather beach destinations and combines swimming, dunes, shoreline views, and sunset scenery.",
    highlights: [
      'Wide sandy beaches and clear Lake Ontario water.',
      'Large freshwater dune landscape.',
      'Swimming, beach walks, and sunset views.',
      'Popular summer destination in Prince Edward County.',
    ],
    bestFor: ['Beach days', 'Dune scenery', 'Swimming', 'Summer day trips'],
    visitTips: [
      'Reserve or confirm day-use access when required during peak season.',
      'Expect crowds on hot weekends and holidays.',
      'Respect dune protection areas and stay on permitted paths.',
    ],
  },
  'sauble-beach': {
    setting: 'Long Lake Huron beach community',
    detailDescription:
      'Sauble Beach stretches for more than eleven kilometers along Lake Huron and is known for soft sand, shallow water, and a lively but relaxed waterfront atmosphere. It is a strong choice for guests looking for a classic Ontario beach-town experience.',
    highlights: [
      'Long sandy shoreline along Lake Huron.',
      'Shallow water that appeals to families and casual swimmers.',
      'Beach-town energy with nearby food and seasonal activity.',
      'Open western views that can produce strong sunsets.',
    ],
    bestFor: ['Swimming', 'Family beach days', 'Sunset viewing', 'Beach-town walks'],
    visitTips: [
      'Plan for a full-day outing because the drive and beach time add up.',
      'Bring sun protection and water for hot summer days.',
      'Check local beach rules and parking requirements before settling in.',
    ],
  },
  'grand-bend-beach': {
    setting: 'Popular Lake Huron beach and waterfront strip',
    detailDescription:
      'Grand Bend Beach sits on the eastern shore of Lake Huron and is known for golden sand, clear water, sunset views, restaurants, shops, and recreational activity. It combines an energetic beach scene with enough dining and walking options for a full waterfront visit.',
    highlights: [
      'Golden sand and clear Lake Huron water.',
      'Strong sunset views from the shoreline.',
      'Restaurants, shops, and walking areas near the beach.',
      'Lively summer atmosphere with recreation nearby.',
    ],
    bestFor: ['Beach days', 'Dining nearby', 'Sunsets', 'Lively waterfront visits'],
    visitTips: [
      'Summer weekends can be very busy, so arrive early for smoother parking.',
      'Use posted swimming guidance because lake conditions can change.',
      'Stay for sunset if the weather is clear.',
    ],
  },
  'cobourg-beach': {
    setting: 'Lake Ontario beach beside a charming waterfront town',
    detailDescription:
      'Cobourg Beach is known for its clean Lake Ontario shoreline, soft sand, waterfront parks, and attractive coastal surroundings. It offers a more town-connected beach experience, with opportunities for swimming, beach walks, park time, and exploring the nearby community.',
    highlights: [
      'Soft sand and clean Lake Ontario shoreline.',
      'Waterfront parks and scenic lake views.',
      'Walkable town setting near the beach.',
      'Good balance of beach relaxation and local exploring.',
    ],
    bestFor: ['Beach walks', 'Town-and-beach visits', 'Swimming', 'Relaxed lake days'],
    visitTips: [
      'Check local beach conditions and event schedules in summer.',
      "Pair the beach with a walk through Cobourg's waterfront area.",
      'Parking rules can vary by season and event day.',
    ],
  },
  'port-stanley-main-beach': {
    setting: 'Lake Erie beach with harbour village atmosphere',
    detailDescription:
      'Port Stanley Main Beach sits on Lake Erie and offers a wide sandy shoreline, relatively warm summer water, harbour views, restaurants, and boutique shops nearby. It works well for visitors who want a relaxed vacation feel with beach time and small-town amenities close together.',
    highlights: [
      'Wide sandy Lake Erie shoreline.',
      'Harbour, restaurants, and shops nearby.',
      'Relaxed beach-village atmosphere.',
      'Warm-weather swimming and casual waterfront walks.',
    ],
    bestFor: ['Beach relaxation', 'Harbour dining', 'Small-town exploring', 'Summer swimming'],
    visitTips: [
      'Lake Erie weather and water conditions can change, so watch posted guidance.',
      'Use the harbour area for dining before or after beach time.',
      'Arrive earlier on sunny weekends for easier parking.',
    ],
  },
  'canatara-beach': {
    setting: 'Lake Huron beach inside Canatara Park in Sarnia',
    detailDescription:
      'Canatara Beach is part of Canatara Park in Sarnia and offers a long sandy beach, walking trails, picnic areas, and views across Lake Huron. Its park setting gives it a calmer feel, making it a good fit for visitors who want a peaceful waterfront retreat rather than a busy beach strip.',
    highlights: [
      'Long sandy beach with Lake Huron views.',
      'Walking trails and picnic areas within the park.',
      'Peaceful natural setting for a slower visit.',
      'Good option for beach time paired with park walking.',
    ],
    bestFor: ['Quiet beach time', 'Walking trails', 'Picnics', 'Lake Huron views'],
    visitTips: [
      'Bring picnic supplies if planning to stay in the park for several hours.',
      'Check local beach and water advisories before swimming.',
      'Use trails for a quieter break if the beach area is busy.',
    ],
  },
};

export const travelLocations: TravelLocation[] = baseTravelLocations.map(location => ({
  ...location,
  ...travelDetails[location.id],
}));

export function getTravelLocation(locationId: string): TravelLocation | undefined {
  return travelLocations.find(location => location.id === locationId);
}
