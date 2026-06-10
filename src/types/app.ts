import type {ImageSourcePropType} from 'react-native';

export type MainTab = 'room' | 'requests' | 'entertainment' | 'climate' | 'travel' | 'map';

export type AppRoute =
  | {name: 'tab'; tab: MainTab}
  | {name: 'roomCategory'; categoryId: MenuCategoryId}
  | {name: 'orderSummary'}
  | {name: 'orderConfirmed'}
  | {name: 'requestForm'; categoryId: RequestCategoryId}
  | {name: 'trackRequests'}
  | {name: 'amenityDetail'; amenityId: string}
  | {name: 'travelLocationDetail'; locationId: string};

export type MenuCategoryId = 'breakfast' | 'allday' | 'latenight';

export type MenuItem = {
  id: string;
  categoryId: MenuCategoryId;
  name: string;
  description: string;
  price: number;
  prepMinutes: number;
  image: ImageSourcePropType;
};

export type MenuCategory = {
  id: MenuCategoryId;
  title: string;
  subtitle: string;
  icon: string;
  image: ImageSourcePropType;
};

export type CartState = Record<string, number>;

export type GuestProfile = {
  name: string;
  room: string;
  stayDate?: string;
  notes?: string;
};

export type RequestCategoryId =
  | 'bedding'
  | 'bathroom'
  | 'housekeeping'
  | 'dining'
  | 'maintenance'
  | 'laundry'
  | 'special';

export type RequestStatus = 'submitted' | 'accepted' | 'progress' | 'completed';

export type GuestRequest = {
  id: string;
  categoryId: RequestCategoryId;
  title: string;
  description: string;
  status: RequestStatus;
  createdAtLabel: string;
  progress?: number;
  isUserCreated?: boolean;
};

export type RequestCategory = {
  id: RequestCategoryId;
  title: string;
  icon: string;
  color: string;
  examples: string[];
};

export type ClimateMode = 'cooling' | 'heating';

export type ClimateSettings = {
  systemOn: boolean;
  temperature: number;
  mode: ClimateMode;
  fanSpeed: number;
  sleepMode: boolean;
};

export type TravelCategory = 'all' | 'lakeside' | 'nature' | 'beach' | 'waterfront';

export type TravelLocation = {
  id: string;
  name: string;
  category: Exclude<TravelCategory, 'all'>;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  shortDescription: string;
  detailDescription: string;
  setting: string;
  highlights: string[];
  bestFor: string[];
  visitTips: string[];
  image: ImageSourcePropType;
};

export type Amenity = {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: ImageSourcePropType;
  category: 'Wellness' | 'Dining';
  hours: string;
  location: string;
  priceInfo: string;
  booking: string;
  details: string;
  highlights: string[];
  goodToKnow: string[];
  accessibility: string;
  contact: string;
};
