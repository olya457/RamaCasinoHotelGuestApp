import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, type Region} from 'react-native-maps';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {ScreenFrame} from '../components/ScreenFrame';
import {
  guideCategoryColors,
  guideCategoryLabels,
  mapPlaces,
} from '../data/guide';
import {colors, layout, shadow} from '../theme/theme';
import type {GuideCategory, GuidePlace} from '../types/app';

type Props = {
  selectedPlaceId?: string;
  onSelectPlace: (placeId: string) => void;
  onOpenPlaceDetails: (placeId: string) => void;
};

type MapFilter = 'all' | GuideCategory;

const filters: {id: MapFilter; label: string}[] = [
  {id: 'all', label: 'All'},
  {id: 'resort', label: 'Resort'},
  {id: 'dining', label: 'Dining'},
  {id: 'entertainment', label: 'Shows'},
  {id: 'nearby', label: 'Nearby'},
  {id: 'wellness', label: 'Wellness'},
  {id: 'practical', label: 'Tips'},
];

const darkMapStyle = [
  {elementType: 'geometry', stylers: [{color: '#0b0b0b'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#0b0b0b'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#747474'}]},
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#050505'}],
  },
  {featureType: 'road', elementType: 'geometry', stylers: [{color: '#171717'}]},
  {featureType: 'poi', elementType: 'geometry', stylers: [{color: '#101010'}]},
];

export function MapScreen({
  selectedPlaceId,
  onSelectPlace,
  onOpenPlaceDetails,
}: Props): React.JSX.Element {
  const mapRef = useRef<MapView>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<MapFilter>('all');
  const {width, height} = useWindowDimensions();
  const compact = width <= 375 || height <= 720;
  const filteredPlaces = useMemo(
    () =>
      mapPlaces.filter(place => filter === 'all' || place.category === filter),
    [filter],
  );
  const fallbackPlace = filteredPlaces[0] ?? mapPlaces[0];
  const selectedPlace = selectedPlaceId
    ? mapPlaces.find(place => place.id === selectedPlaceId)
    : undefined;
  const bottomPanelOffset =
    (compact ? layout.compactTabHeight : layout.tabHeight) + layout.navGap + 16;
  const [region, setRegion] = useState<Region>(() =>
    createRegion(selectedPlace ?? fallbackPlace, 0.18),
  );

  const animateToRegion = useCallback((nextRegion: Region, duration = 420) => {
    setRegion(nextRegion);
    mapRef.current?.animateToRegion(nextRegion, duration);
  }, []);

  const focusPlace = useCallback(
    (place: GuidePlace, delta: number) => {
      animateToRegion(createRegion(place, delta));
    },
    [animateToRegion],
  );

  const fitVisiblePlaces = useCallback(() => {
    if (filteredPlaces.length === 0) {
      return;
    }

    if (filteredPlaces.length === 1) {
      focusPlace(filteredPlaces[0], 0.08);
      return;
    }

    mapRef.current?.fitToCoordinates(
      filteredPlaces
        .map(place => place.coordinates)
        .filter(
          (
            coordinates,
          ): coordinates is NonNullable<GuidePlace['coordinates']> =>
            Boolean(coordinates),
        ),
      {
        animated: true,
        edgePadding: {
          top: layout.androidTopInset + 150,
          right: 58,
          bottom: bottomPanelOffset + 132,
          left: 46,
        },
      },
    );
  }, [bottomPanelOffset, filteredPlaces, focusPlace]);

  const selectPlace = (place: GuidePlace) => {
    onSelectPlace(place.id);
    focusPlace(place, Math.min(Math.max(region.latitudeDelta, 0.05), 0.2));
  };

  const zoomMap = (scale: number) => {
    const nextRegion = {
      ...region,
      latitudeDelta: clamp(region.latitudeDelta * scale, 0.01, 1.1),
      longitudeDelta: clamp(region.longitudeDelta * scale, 0.01, 1.1),
    };

    animateToRegion(nextRegion, 260);
  };

  const centerMap = () => {
    if (selectedPlace) {
      focusPlace(
        selectedPlace,
        Math.min(Math.max(region.latitudeDelta, 0.05), 0.2),
      );
      return;
    }

    fitVisiblePlaces();
  };

  useEffect(() => {
    if (selectedPlace) {
      focusPlace(selectedPlace, 0.12);
    }
  }, [focusPlace, selectedPlace]);

  useEffect(() => {
    if (
      selectedPlace &&
      !filteredPlaces.some(place => place.id === selectedPlace.id)
    ) {
      onSelectPlace('');
    }

    const timeout = setTimeout(fitVisiblePlaces, 250);
    return () => clearTimeout(timeout);
  }, [filteredPlaces, fitVisiblePlaces, onSelectPlace, selectedPlace]);

  return (
    <View style={styles.root}>
      <ScreenFrame scroll={false} padded={false} contentStyle={styles.frame}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          customMapStyle={darkMapStyle}
          initialRegion={region}
          onMapReady={fitVisiblePlaces}
          onRegionChangeComplete={setRegion}>
          {filteredPlaces.map(place =>
            place.coordinates ? (
              <Marker
                key={place.id}
                coordinate={place.coordinates}
                anchor={{x: 0.5, y: 0.5}}
                zIndex={selectedPlaceId === place.id ? 2 : 1}
                onPress={() => selectPlace(place)}>
                <View
                  style={[
                    styles.markerOuter,
                    selectedPlaceId === place.id && styles.markerOuterActive,
                  ]}>
                  <View
                    style={[
                      styles.markerInner,
                      selectedPlaceId === place.id && styles.markerInnerActive,
                      {backgroundColor: guideCategoryColors[place.category]},
                    ]}
                  />
                </View>
              </Marker>
            ) : null,
          )}
        </MapView>
        <View style={styles.mapShade} pointerEvents="none" />
        <View style={styles.headerWrap}>
          <AppHeader title="Guide Map" action={<View />} />
        </View>
        {!filterOpen ? (
          <Pressable
            onPress={() => setFilterOpen(true)}
            style={[styles.filterButton, shadow]}>
            <Text style={styles.filterIcon}>☰</Text>
          </Pressable>
        ) : null}
        {!filterOpen ? (
          <View style={[styles.mapControls, shadow]}>
            <MapControl label="+" onPress={() => zoomMap(0.55)} />
            <View style={styles.controlDivider} />
            <MapControl label="-" onPress={() => zoomMap(1.75)} />
            <View style={styles.controlDivider} />
            <MapControl label="⌖" onPress={centerMap} />
            <View style={styles.controlDivider} />
            <MapControl label="All" onPress={fitVisiblePlaces} wide />
          </View>
        ) : null}
        {filterOpen ? (
          <View style={[styles.filterPanel, shadow]}>
            <View style={styles.filterTop}>
              <Text style={styles.filterTitle}>Map Filters</Text>
              <Pressable
                onPress={() => setFilterOpen(false)}
                style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>
            <View style={styles.filterChips}>
              {filters.map(item => {
                const active = item.id === filter;
                const dotColor =
                  item.id === 'all'
                    ? colors.yellow
                    : guideCategoryColors[item.id];
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setFilter(item.id)}
                    style={[
                      styles.filterChip,
                      active && styles.filterChipActive,
                    ]}>
                    <View style={[styles.dot, {backgroundColor: dotColor}]} />
                    <Text
                      style={[
                        styles.filterChipText,
                        active && styles.filterChipTextActive,
                      ]}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : null}
        {selectedPlace ? (
          <View
            style={[styles.detailCard, {bottom: bottomPanelOffset}, shadow]}>
            <Pressable
              onPress={() => onSelectPlace('')}
              style={styles.detailClose}>
              <Text style={styles.detailCloseText}>×</Text>
            </Pressable>
            <Image source={selectedPlace.image} style={styles.detailImage} />
            <View style={styles.detailBody}>
              <Text style={styles.detailCategory}>
                {guideCategoryLabels[selectedPlace.category]}
              </Text>
              <Text style={styles.detailTitle}>{selectedPlace.name}</Text>
              <Text style={styles.detailText}>
                {selectedPlace.shortDescription}
              </Text>
              <View style={styles.detailActions}>
                <Pressable
                  onPress={() => onOpenPlaceDetails(selectedPlace.id)}
                  style={styles.detailInfoButton}>
                  <Text style={styles.detailInfoText}>Details</Text>
                </Pressable>
                <GradientButton
                  title="Directions"
                  icon="⌖"
                  onPress={() => openDirections(selectedPlace)}
                  style={styles.detailMapButton}
                />
              </View>
            </View>
          </View>
        ) : (
          <Legend bottomOffset={bottomPanelOffset} />
        )}
      </ScreenFrame>
    </View>
  );
}

function createRegion(place: GuidePlace, delta: number): Region {
  return {
    latitude: place.coordinates?.latitude ?? 44.64641,
    longitude: place.coordinates?.longitude ?? -79.3504,
    latitudeDelta: delta,
    longitudeDelta: delta,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function openDirections(place: GuidePlace) {
  if (!place.coordinates) {
    return;
  }

  const {latitude, longitude} = place.coordinates;
  const label = encodeURIComponent(place.name);
  const url =
    Platform.OS === 'ios'
      ? `http://maps.apple.com/?ll=${latitude},${longitude}&q=${label}`
      : `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`;

  Linking.openURL(url).catch(() => undefined);
}

function MapControl({
  label,
  wide,
  onPress,
}: {
  label: string;
  wide?: boolean;
  onPress: () => void;
}): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.controlButton,
        wide && styles.controlButtonWide,
        pressed && styles.pressed,
      ]}>
      <Text style={styles.controlText} numberOfLines={1} adjustsFontSizeToFit>
        {label}
      </Text>
    </Pressable>
  );
}

function Legend({bottomOffset}: {bottomOffset: number}): React.JSX.Element {
  return (
    <View style={[styles.legend, {bottom: bottomOffset}]}>
      <Text style={styles.legendTitle}>
        Tap any pin to open details or directions
      </Text>
      <View style={styles.legendRow}>
        {(
          ['resort', 'dining', 'entertainment', 'nearby'] as GuideCategory[]
        ).map(item => (
          <View key={item} style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                {backgroundColor: guideCategoryColors[item]},
              ]}
            />
            <Text style={styles.legendText}>{guideCategoryLabels[item]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  frame: {
    paddingBottom: 0,
  },
  mapShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  headerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  filterButton: {
    position: 'absolute',
    top: layout.androidTopInset + 104,
    right: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange,
  },
  filterIcon: {
    color: colors.white,
    fontSize: 25,
    lineHeight: 27,
    fontWeight: '900',
  },
  mapControls: {
    position: 'absolute',
    top: layout.androidTopInset + 166,
    right: 24,
    width: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceHigh,
    overflow: 'hidden',
  },
  controlButton: {
    width: 52,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonWide: {
    height: 42,
  },
  controlText: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '900',
  },
  controlDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  filterPanel: {
    position: 'absolute',
    top: layout.androidTopInset + 126,
    left: 24,
    right: 24,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 14,
  },
  filterTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.text,
    fontSize: 25,
    lineHeight: 27,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    minHeight: 38,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterChipActive: {
    backgroundColor: colors.orange,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },
  filterChipText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '900',
  },
  filterChipTextActive: {
    color: colors.white,
  },
  markerOuter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerOuterActive: {
    transform: [{scale: 1.12}],
  },
  markerInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  markerInnerActive: {
    borderColor: colors.gold,
  },
  legend: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  legendTitle: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  detailCard: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  detailClose: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailCloseText: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 28,
  },
  detailImage: {
    width: '100%',
    height: 134,
    resizeMode: 'cover',
  },
  detailBody: {
    padding: 16,
    gap: 9,
  },
  detailCategory: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  detailTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
  },
  detailText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  detailActions: {
    flexDirection: 'row',
    gap: 10,
  },
  detailInfoButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: layout.cardRadius,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailInfoText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  detailMapButton: {
    flex: 1.08,
  },
  pressed: {
    opacity: 0.78,
  },
});
