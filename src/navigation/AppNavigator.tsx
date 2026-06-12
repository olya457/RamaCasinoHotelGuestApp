import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SplashScreen} from '../screens/SplashScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {StaySetupScreen} from '../screens/StaySetupScreen';
import {MainNavigator} from './MainNavigator';
import {colors} from '../theme/theme';
import {loadJSON, saveJSON, storageKeys} from '../storage/storage';
import {usePersistentState} from '../storage/usePersistentState';
import {
  GuestProfileProvider,
  defaultGuestProfile,
  hasRequiredGuestProfile,
} from '../context/GuestProfileContext';
import type {
  CartState,
  ClimateSettings,
  GuestProfile,
  GuestRequest,
  RoomServiceOrder,
} from '../types/app';

type Stage = 'splash' | 'onboarding' | 'setup' | 'main';

const emptyCart: CartState = {};
const emptyRequests: GuestRequest[] = [];
const emptyOrders: RoomServiceOrder[] = [];
const legacyGuestName = ['Hotel', 'Guest'].join(' ');
const legacyGuestRoom = '2024';
const defaultClimate: ClimateSettings = {
  systemOn: true,
  temperature: 22,
  mode: 'cooling',
  fanSpeed: 50,
  sleepMode: false,
};

export function AppNavigator(): React.JSX.Element {
  const [stage, setStage] = useState<Stage>('splash');
  const [cart, setCart] = usePersistentState<CartState>(
    storageKeys.cart,
    emptyCart,
  );
  const [requests, setRequests] = usePersistentState<GuestRequest[]>(
    storageKeys.requests,
    emptyRequests,
  );
  const [orders, setOrders] = usePersistentState<RoomServiceOrder[]>(
    storageKeys.orders,
    emptyOrders,
  );
  const [climate, setClimate] = usePersistentState<ClimateSettings>(
    storageKeys.climate,
    defaultClimate,
  );
  const [guestProfile, setGuestProfile, guestProfileHydrated] =
    usePersistentState<GuestProfile>(
      storageKeys.guestProfile,
      defaultGuestProfile,
    );

  useEffect(() => {
    if (!guestProfileHydrated) {
      return;
    }

    let mounted = true;
    const timer = setTimeout(async () => {
      const onboardingComplete = await loadJSON<boolean>(
        storageKeys.onboardingComplete,
        false,
      );
      if (mounted) {
        if (!onboardingComplete) {
          setStage('onboarding');
          return;
        }

        setStage(hasRequiredGuestProfile(guestProfile) ? 'main' : 'setup');
      }
    }, 1800);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [guestProfile, guestProfileHydrated]);

  useEffect(() => {
    if (
      guestProfile.room === legacyGuestRoom ||
      guestProfile.name === legacyGuestName
    ) {
      setGuestProfile(current => ({
        ...current,
        name: current.name === legacyGuestName ? '' : current.name,
        room: current.room === legacyGuestRoom ? '' : current.room,
      }));
    }
  }, [guestProfile.name, guestProfile.room, setGuestProfile]);

  const completeOnboarding = async () => {
    await saveJSON(storageKeys.onboardingComplete, true);
    setStage(hasRequiredGuestProfile(guestProfile) ? 'main' : 'setup');
  };

  const completeStaySetup = (profile: GuestProfile) => {
    setGuestProfile(profile);
    setStage('main');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      {stage === 'splash' ? <SplashScreen /> : null}
      {stage === 'onboarding' ? (
        <OnboardingScreen onDone={completeOnboarding} />
      ) : null}
      {stage === 'setup' ? (
        <StaySetupScreen
          initialProfile={guestProfile}
          onSave={completeStaySetup}
        />
      ) : null}
      {stage === 'main' ? (
        <GuestProfileProvider
          profile={guestProfile}
          setProfile={setGuestProfile}>
          <MainNavigator
            cart={cart}
            setCart={setCart}
            requests={requests}
            setRequests={setRequests}
            orders={orders}
            setOrders={setOrders}
            climate={climate}
            setClimate={setClimate}
          />
        </GuestProfileProvider>
      ) : null}
    </>
  );
}
