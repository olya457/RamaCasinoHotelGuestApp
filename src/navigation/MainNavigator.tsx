import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomTabBar} from '../components/BottomTabBar';
import {DiningGuideScreen} from '../screens/DiningGuideScreen';
import {GuideHomeScreen} from '../screens/GuideHomeScreen';
import {ItineraryScreen} from '../screens/ItineraryScreen';
import {MapScreen} from '../screens/MapScreen';
import {NearbyScreen} from '../screens/NearbyScreen';
import {PlaceDetailScreen} from '../screens/PlaceDetailScreen';
import {colors} from '../theme/theme';
import type {AppRoute, ItineraryState, MainTab} from '../types/app';

type Props = {
  itinerary: ItineraryState;
  setItinerary: React.Dispatch<React.SetStateAction<ItineraryState>>;
};

export function MainNavigator({
  itinerary,
  setItinerary,
}: Props): React.JSX.Element {
  const [stack, setStack] = useState<AppRoute[]>([{name: 'tab', tab: 'guide'}]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | undefined>();
  const route = stack[stack.length - 1];

  const activeTab = useMemo<MainTab>(() => {
    if (route.name === 'tab') {
      return route.tab;
    }
    return 'guide';
  }, [route]);

  const push = (nextRoute: AppRoute) =>
    setStack(current => [...current, nextRoute]);
  const goBack = () =>
    setStack(current => (current.length > 1 ? current.slice(0, -1) : current));
  const selectTab = (tab: MainTab) => setStack([{name: 'tab', tab}]);

  const isSaved = (placeId: string) =>
    itinerary.savedPlaceIds.includes(placeId);

  const toggleSaved = (placeId: string) => {
    setItinerary(current => {
      const saved = current.savedPlaceIds.includes(placeId);
      return {
        ...current,
        savedPlaceIds: saved
          ? current.savedPlaceIds.filter(id => id !== placeId)
          : [placeId, ...current.savedPlaceIds],
      };
    });
  };

  const showMapPlace = (placeId: string) => {
    setSelectedPlaceId(placeId);
    selectTab('map');
  };

  const openPlace = (placeId: string) => {
    push({name: 'placeDetail', placeId});
  };

  const screen = (() => {
    switch (route.name) {
      case 'placeDetail':
        return (
          <PlaceDetailScreen
            placeId={route.placeId}
            isSaved={isSaved(route.placeId)}
            onBack={goBack}
            onToggleSaved={() => toggleSaved(route.placeId)}
            onViewOnMap={showMapPlace}
          />
        );
      case 'tab':
        if (route.tab === 'guide') {
          return (
            <GuideHomeScreen
              isSaved={isSaved}
              onOpenPlace={openPlace}
              onToggleSaved={toggleSaved}
              onViewOnMap={showMapPlace}
            />
          );
        }
        if (route.tab === 'dining') {
          return (
            <DiningGuideScreen
              isSaved={isSaved}
              onOpenPlace={openPlace}
              onToggleSaved={toggleSaved}
              onViewOnMap={showMapPlace}
            />
          );
        }
        if (route.tab === 'itinerary') {
          return (
            <ItineraryScreen
              itinerary={itinerary}
              setItinerary={setItinerary}
              onOpenPlace={openPlace}
              onViewOnMap={showMapPlace}
            />
          );
        }
        if (route.tab === 'nearby') {
          return (
            <NearbyScreen
              isSaved={isSaved}
              onOpenPlace={openPlace}
              onToggleSaved={toggleSaved}
              onViewOnMap={showMapPlace}
            />
          );
        }
        return (
          <MapScreen
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={setSelectedPlaceId}
            onOpenPlaceDetails={openPlace}
          />
        );
    }
  })();

  return (
    <View style={styles.root}>
      {screen}
      <BottomTabBar activeTab={activeTab} onSelect={selectTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
});
