import React, {createContext, useContext} from 'react';
import type {GuestProfile} from '../types/app';

export const defaultGuestProfile: GuestProfile = {
  name: '',
  room: '',
  stayDate: '',
  stayTime: '',
  notes: '',
};

export function hasRequiredGuestProfile(profile: GuestProfile): boolean {
  return Boolean(profile.name.trim()) && Boolean(profile.room.trim());
}

export function formatRoomLabel(room: string): string {
  const value = room.trim();

  if (!value || value === '2024') {
    return 'Select room';
  }

  return value.toLowerCase().includes('suite') ||
    value.toLowerCase().includes('vip')
    ? value
    : `Room ${value}`;
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

export function formatStayTimeLabel(stayTime?: string): string {
  const value = stayTime?.trim();

  if (!value) {
    return 'Select time';
  }

  const match = value.match(/^(\d{1,2}):(\d{2})$/);

  if (!match) {
    return value;
  }

  const [, hourValue, minuteValue] = match;
  const date = new Date();
  date.setHours(Number(hourValue), Number(minuteValue), 0, 0);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatGuestNotesLabel(notes?: string): string {
  const value = notes?.trim();

  return value || 'No notes';
}

type GuestProfileContextValue = {
  profile: GuestProfile;
  setProfile: React.Dispatch<React.SetStateAction<GuestProfile>>;
};

const GuestProfileContext = createContext<GuestProfileContextValue | undefined>(
  undefined,
);

type ProviderProps = GuestProfileContextValue & {
  children: React.ReactNode;
};

export function GuestProfileProvider({
  profile,
  setProfile,
  children,
}: ProviderProps): React.JSX.Element {
  return (
    <GuestProfileContext.Provider value={{profile, setProfile}}>
      {children}
    </GuestProfileContext.Provider>
  );
}

export function useGuestProfile(): GuestProfileContextValue {
  const context = useContext(GuestProfileContext);

  if (!context) {
    throw new Error('useGuestProfile must be used within GuestProfileProvider');
  }

  return context;
}
