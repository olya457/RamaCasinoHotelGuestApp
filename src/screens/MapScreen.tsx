import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Image, Linking, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, type Region} from 'react-native-maps';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {ScreenFrame} from '../components/ScreenFrame';
import {travelCategories, travelLocations} from '../data/travel';
import {colors, layout, shadow} from '../theme/theme';
import type {TravelCategory, TravelLocation} from '../types/app';

type Props = {
  selectedLocationId?: string;
  onSelectLocation: (locationId: string) => void;
  onOpenLocationDetails: (locationId: string) => void;
};

const categoryColors: Record<Exclude<TravelCategory, 'all'>, string> = {
  lakeside: '#3b82f6',
  nature: colors.green,
  beach: '#f4a51c',
  waterfront: colors.purple,
};

const darkMapStyle = [
  {elementType: 'geometry', stylers: [{color: '#0b0b0b'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#0b0b0b'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#747474'}]},
  {featureType: 'water', elementType: 'geometry', stylers: [{color: '#050505'}]},
  {featureType: 'road', elementType: 'geometry', stylers: [{color: '#171717'}]},
  {featureType: 'poi', elementType: 'geometry', stylers: [{color: '#101010'}]},
];

export function MapScreen({selectedLocationId, onSelectLocation, onOpenLocationDetails}: Props): React.JSX.Element {
  const mapRef = useRef<MapView>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [category, setCategory] = useState<TravelCategory>('all');
  const {width, height} = useWindowDimensions();
  const compact = width <= 375 || height <= 720;
  const filteredLocations = useMemo(
    () => travelLocations.filter(location => category === 'all' || location.category === category),
    [category],
  );
  const fallbackLocation = filteredLocations[0] ?? travelLocations[0];
  const selectedLocation = selectedLocationId
    ? travelLocations.find(location => location.id === selectedLocationId)
    : undefined;
  const bottomPanelOffset = (compact ? layout.compactTabHeight : layout.tabHeight) + layout.navGap + 16;
  const [region, setRegion] = useState<Region>(() => createRegion(selectedLocation ?? fallbackLocation, 6.5));

  const animateToRegion = (nextRegion: Region, duration = 420) => {
    setRegion(nextRegion);
    mapRef.current?.animateToRegion(nextRegion, duration);
  };

  const focusLocation = (location: TravelLocation, delta = Math.min(Math.max(region.latitudeDelta, 1.8), 5.8)) => {
    animateToRegion(createRegion(location, delta));
  };

  const fitVisibleLocations = () => {
    if (filteredLocations.length === 0) {
      return;
    }

    if (filteredLocations.length === 1) {
      focusLocation(filteredLocations[0], 3.2);
      return;
    }

    mapRef.current?.fitToCoordinates(
      filteredLocations.map(location => location.coordinates),
      {
        animated: true,
        edgePadding: {
          top: layout.androidTopInset + 150,
          right: 66,
          bottom: bottomPanelOffset + 132,
          left: 46,
        },
      },
    );
  };

  const selectLocation = (location: TravelLocation) => {
    onSelectLocation(location.id);
    focusLocation(location, Math.min(Math.max(region.latitudeDelta, 1.8), 4.2));
  };

  const zoomMap = (scale: number) => {
    const nextRegion = {
      ...region,
      latitudeDelta: clamp(region.latitudeDelta * scale, 0.04, 28),
      longitudeDelta: clamp(region.longitudeDelta * scale, 0.04, 28),
    };

    animateToRegion(nextRegion, 260);
  };

  const centerMap = () => {
    if (selectedLocation) {
      focusLocation(selectedLocation, Math.min(Math.max(region.latitudeDelta, 1.8), 4.2));
      return;
    }

    fitVisibleLocations();
  };

  useEffect(() => {
    if (selectedLocation) {
      focusLocation(selectedLocation, Math.min(Math.max(region.latitudeDelta, 1.8), 4.2));
    }
  }, [selectedLocationId]);

  useEffect(() => {
    if (selectedLocation && !filteredLocations.some(location => location.id === selectedLocation.id)) {
      onSelectLocation('');
    }

    const timeout = setTimeout(fitVisibleLocations, 250);
    return () => clearTimeout(timeout);
  }, [category]);

  return (
    <View style={styles.root}>
      <ScreenFrame scroll={false} padded={false} contentStyle={styles.frame}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          customMapStyle={darkMapStyle}
          initialRegion={region}
          onMapReady={fitVisibleLocations}
          onRegionChangeComplete={setRegion}>
          {filteredLocations.map(location => (
            <Marker
              key={location.id}
              coordinate={location.coordinates}
              anchor={{x: 0.5, y: 0.5}}
              zIndex={selectedLocationId === location.id ? 2 : 1}
              onPress={() => selectLocation(location)}>
              <View style={[styles.markerOuter, selectedLocationId === location.id && styles.markerOuterActive]}>
                <View
                  style={[
                    styles.markerInner,
                    selectedLocationId === location.id && styles.markerInnerActive,
                    {backgroundColor: categoryColors[location.category]},
                  ]}
                />
              </View>
            </Marker>
          ))}
        </MapView>
        <View style={styles.mapShade} pointerEvents="none" />
        <View style={styles.headerWrap}>
          <AppHeader title="Map" action={<View />} />
        </View>
        {!filterOpen ? (
          <Pressable onPress={() => setFilterOpen(true)} style={[styles.filterButton, shadow]}>
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
            <MapControl label="All" onPress={fitVisibleLocations} wide />
          </View>
        ) : null}
        {filterOpen ? (
          <View style={[styles.filterPanel, shadow]}>
            <View style={styles.filterTop}>
              <Text style={styles.filterTitle}>Filter by Category</Text>
              <Pressable onPress={() => setFilterOpen(false)} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>
            <View style={styles.filterChips}>
              {travelCategories.map(item => {
                const active = item.id === category;
                const dotColor = item.id === 'all' ? colors.yellow : categoryColors[item.id];
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setCategory(item.id)}
                    style={[styles.filterChip, active && styles.filterChipActive]}>
                    <View style={[styles.dot, {backgroundColor: dotColor}]} />
                    <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
                      {item.label.replace(' Escapes', '').replace(' & Scenic', '')}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : null}
        {selectedLocation ? (
          <View style={[styles.detailCard, {bottom: bottomPanelOffset}, shadow]}>
            <Pressable onPress={() => onSelectLocation('')} style={styles.detailClose}>
              <Text style={styles.detailCloseText}>×</Text>
            </Pressable>
            <Image source={selectedLocation.image} style={styles.detailImage} />
            <View style={styles.detailBody}>
              <Text style={styles.detailTitle}>{selectedLocation.name}</Text>
              <Text style={styles.detailCoords}>
                📍 {selectedLocation.coordinates.latitude.toFixed(4)}° N,{' '}
                {Math.abs(selectedLocation.coordinates.longitude).toFixed(4)}° W
              </Text>
              <Text style={styles.detailText}>{selectedLocation.shortDescription}</Text>
              <View style={styles.detailActions}>
                <Pressable onPress={() => onOpenLocationDetails(selectedLocation.id)} style={styles.detailInfoButton}>
                  <Text style={styles.detailInfoText}>ℹ️ Details</Text>
                </Pressable>
                <GradientButton title="Directions" icon="✈️" onPress={() => openDirections(selectedLocation)} style={styles.detailMapButton} />
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

function createRegion(location: TravelLocation, delta: number): Region {
  return {
    latitude: location.coordinates.latitude,
    longitude: location.coordinates.longitude,
    latitudeDelta: delta,
    longitudeDelta: delta,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function openDirections(location: TravelLocation) {
  const latitude = location.coordinates.latitude;
  const longitude = location.coordinates.longitude;
  const label = encodeURIComponent(location.name);
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
    <Pressable onPress={onPress} style={({pressed}) => [styles.controlButton, wide && styles.controlButtonWide, pressed && styles.pressed]}>
      <Text style={styles.controlText} numberOfLines={1} adjustsFontSizeToFit>
        {label}
      </Text>
    </Pressable>
  );
}

function Legend({bottomOffset}: {bottomOffset: number}): React.JSX.Element {
  return (
    <View style={[styles.legend, {bottom: bottomOffset}]}>
      <Text style={styles.legendTitle}>Tap any pin to view location details</Text>
      <View style={styles.legendRow}>
        {(['lakeside', 'nature', 'beach', 'waterfront'] as Exclude<TravelCategory, 'all'>[]).map(item => (
          <View key={item} style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: categoryColors[item]}]} />
            <Text style={styles.legendText}>{item[0].toUpperCase() + item.slice(1)}</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
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
    bottom: layout.tabHeight + layout.navGap + 16,
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
    bottom: layout.tabHeight + layout.navGap + 16,
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
    height: 142,
    resizeMode: 'cover',
  },
  detailBody: {
    padding: 16,
    gap: 10,
  },
  detailTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
  },
  detailCoords: {
    color: colors.gold,
    fontSize: 13,
    fontWeight: '800',
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
