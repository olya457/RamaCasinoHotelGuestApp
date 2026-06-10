import React, {createContext, useContext} from 'react';
import type {GuestProfile} from '../types/app';

export const defaultGuestProfile: GuestProfile = {
  name: 'Hotel Guest',
  room: '',
  stayDate: '',
  notes: '',
};

export function formatRoomLabel(room: string): string {
  const value = room.trim();

  if (!value || value === '2024') {
    return 'Select room';
  }

  return value.toLowerCase().includes('suite') || value.toLowerCase().includes('vip') ? value : `Room ${value}`;
}

export function formatStayDateLabel(stayDate?: string): string {
  const value = stayDate?.trim();

  if (!value) {
    return 'Select date';
  }

  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
}

export function formatGuestNotesLabel(notes?: string): string {
  const value = notes?.trim();

  return value || 'No notes';
}

type GuestProfileContextValue = {
  profile: GuestProfile;
  setProfile: React.Dispatch<React.SetStateAction<GuestProfile>>;
};

const GuestProfileContext = createContext<GuestProfileContextValue | undefined>(undefined);

type ProviderProps = GuestProfileContextValue & {
  children: React.ReactNode;
};

export function GuestProfileProvider({profile, setProfile, children}: ProviderProps): React.JSX.Element {
  return <GuestProfileContext.Provider value={{profile, setProfile}}>{children}</GuestProfileContext.Provider>;
}

export function useGuestProfile(): GuestProfileContextValue {
  const context = useContext(GuestProfileContext);

  if (!context) {
    throw new Error('useGuestProfile must be used within GuestProfileProvider');
  }

  return context;
}
