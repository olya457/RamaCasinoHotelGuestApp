import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  onboardingComplete: 'ramaCasinoHotel.onboardingComplete',
  cart: 'ramaCasinoHotel.cart',
  requests: 'ramaCasinoHotel.requests',
  orders: 'ramaCasinoHotel.orders',
  climate: 'ramaCasinoHotel.climate',
  guestProfile: 'ramaCasinoHotel.guestProfile',
};

export async function loadJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function saveJSON<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}
