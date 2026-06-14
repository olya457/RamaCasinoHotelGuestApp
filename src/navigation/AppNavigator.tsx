import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SplashScreen} from '../screens/SplashScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {MainNavigator} from './MainNavigator';
import {colors} from '../theme/theme';
import {loadJSON, saveJSON, storageKeys} from '../storage/storage';
import {usePersistentState} from '../storage/usePersistentState';
import type {ItineraryState} from '../types/app';

type Stage = 'splash' | 'onboarding' | 'main';

export const defaultItinerary: ItineraryState = {
  savedPlaceIds: [],
  notes: '',
  checklist: {
    id: false,
    parking: false,
    dining: false,
    showtime: false,
  },
};

export function AppNavigator(): React.JSX.Element {
  const [stage, setStage] = useState<Stage>('splash');
  const [itinerary, setItinerary, itineraryHydrated] =
    usePersistentState<ItineraryState>(storageKeys.itinerary, defaultItinerary);

  useEffect(() => {
    if (!itineraryHydrated) {
      return;
    }

    let mounted = true;
    const timer = setTimeout(async () => {
      const onboardingComplete = await loadJSON<boolean>(
        storageKeys.onboardingComplete,
        false,
      );
      if (mounted) {
        setStage(onboardingComplete ? 'main' : 'onboarding');
      }
    }, 1400);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [itineraryHydrated]);

  const completeOnboarding = async () => {
    await saveJSON(storageKeys.onboardingComplete, true);
    setStage('main');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      {stage === 'splash' ? <SplashScreen /> : null}
      {stage === 'onboarding' ? (
        <OnboardingScreen onDone={completeOnboarding} />
      ) : null}
      {stage === 'main' ? (
        <MainNavigator itinerary={itinerary} setItinerary={setItinerary} />
      ) : null}
    </>
  );
}
