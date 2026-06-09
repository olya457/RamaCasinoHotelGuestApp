import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomTabBar} from '../components/BottomTabBar';
import {RoomServiceScreen} from '../screens/RoomServiceScreen';
import {RoomCategoryScreen} from '../screens/RoomCategoryScreen';
import {OrderSummaryScreen} from '../screens/OrderSummaryScreen';
import {OrderConfirmedScreen} from '../screens/OrderConfirmedScreen';
import {RequestsScreen} from '../screens/RequestsScreen';
import {RequestFormScreen} from '../screens/RequestFormScreen';
import {TrackRequestsScreen} from '../screens/TrackRequestsScreen';
import {ClimateScreen} from '../screens/ClimateScreen';
import {EntertainmentScreen} from '../screens/EntertainmentScreen';
import {TravelScreen} from '../screens/TravelScreen';
import {MapScreen} from '../screens/MapScreen';
import {colors} from '../theme/theme';
import type {AppRoute, CartState, ClimateSettings, GuestRequest, MainTab} from '../types/app';

type Props = {
  cart: CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
  requests: GuestRequest[];
  setRequests: React.Dispatch<React.SetStateAction<GuestRequest[]>>;
  climate: ClimateSettings;
  setClimate: React.Dispatch<React.SetStateAction<ClimateSettings>>;
};

export function MainNavigator({
  cart,
  setCart,
  requests,
  setRequests,
  climate,
  setClimate,
}: Props): React.JSX.Element {
  const [stack, setStack] = useState<AppRoute[]>([{name: 'tab', tab: 'room'}]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | undefined>();
  const route = stack[stack.length - 1];

  const activeTab = useMemo<MainTab>(() => {
    if (route.name === 'tab') {
      return route.tab;
    }
    if (route.name === 'roomCategory' || route.name === 'orderSummary' || route.name === 'orderConfirmed') {
      return 'room';
    }
    if (route.name === 'requestForm' || route.name === 'trackRequests') {
      return 'requests';
    }
    return 'room';
  }, [route]);

  const push = (nextRoute: AppRoute) => setStack(current => [...current, nextRoute]);
  const goBack = () => setStack(current => (current.length > 1 ? current.slice(0, -1) : current));
  const selectTab = (tab: MainTab) => setStack([{name: 'tab', tab}]);

  const showMapLocation = (locationId: string) => {
    setSelectedLocationId(locationId);
    selectTab('map');
  };

  const screen = (() => {
    switch (route.name) {
      case 'roomCategory':
        return (
          <RoomCategoryScreen
            categoryId={route.categoryId}
            cart={cart}
            setCart={setCart}
            onBack={goBack}
            onViewCart={() => push({name: 'orderSummary'})}
          />
        );
      case 'orderSummary':
        return (
          <OrderSummaryScreen
            cart={cart}
            setCart={setCart}
            onBack={goBack}
            onConfirmed={() => push({name: 'orderConfirmed'})}
          />
        );
      case 'orderConfirmed':
        return <OrderConfirmedScreen onBack={() => selectTab('room')} />;
      case 'requestForm':
        return (
          <RequestFormScreen
            categoryId={route.categoryId}
            setRequests={setRequests}
            onBack={goBack}
            onSubmitted={() => push({name: 'trackRequests'})}
          />
        );
      case 'trackRequests':
        return <TrackRequestsScreen requests={requests} onBack={goBack} />;
      case 'tab':
        if (route.tab === 'room') {
          return <RoomServiceScreen onOpenCategory={categoryId => push({name: 'roomCategory', categoryId})} />;
        }
        if (route.tab === 'requests') {
          return (
            <RequestsScreen
              onOpenCategory={categoryId => push({name: 'requestForm', categoryId})}
              onTrack={() => push({name: 'trackRequests'})}
            />
          );
        }
        if (route.tab === 'entertainment') {
          return <EntertainmentScreen />;
        }
        if (route.tab === 'climate') {
          return <ClimateScreen climate={climate} setClimate={setClimate} />;
        }
        if (route.tab === 'travel') {
          return <TravelScreen onViewOnMap={showMapLocation} />;
        }
        return <MapScreen selectedLocationId={selectedLocationId} onSelectLocation={setSelectedLocationId} />;
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
