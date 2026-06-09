import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SplashScreen} from '../screens/SplashScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {MainNavigator} from './MainNavigator';
import {colors} from '../theme/theme';
import {loadJSON, saveJSON, storageKeys} from '../storage/storage';
import {usePersistentState} from '../storage/usePersistentState';
import type {CartState, ClimateSettings, GuestRequest} from '../types/app';

type Stage = 'splash' | 'onboarding' | 'main';

const emptyCart: CartState = {};
const emptyRequests: GuestRequest[] = [];
const defaultClimate: ClimateSettings = {
  systemOn: true,
  temperature: 22,
  mode: 'cooling',
  fanSpeed: 50,
  sleepMode: false,
};

export function AppNavigator(): React.JSX.Element {
  const [stage, setStage] = useState<Stage>('splash');
  const [cart, setCart] = usePersistentState<CartState>(storageKeys.cart, emptyCart);
  const [requests, setRequests] = usePersistentState<GuestRequest[]>(storageKeys.requests, emptyRequests);
  const [climate, setClimate] = usePersistentState<ClimateSettings>(storageKeys.climate, defaultClimate);

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(async () => {
      const onboardingComplete = await loadJSON<boolean>(storageKeys.onboardingComplete, false);
      if (mounted) {
        setStage(onboardingComplete ? 'main' : 'onboarding');
      }
    }, 5000);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  const completeOnboarding = async () => {
    await saveJSON(storageKeys.onboardingComplete, true);
    setStage('main');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      {stage === 'splash' ? <SplashScreen /> : null}
      {stage === 'onboarding' ? <OnboardingScreen onDone={completeOnboarding} /> : null}
      {stage === 'main' ? (
        <MainNavigator
          cart={cart}
          setCart={setCart}
          requests={requests}
          setRequests={setRequests}
          climate={climate}
          setClimate={setClimate}
        />
      ) : null}
    </>
  );
}
