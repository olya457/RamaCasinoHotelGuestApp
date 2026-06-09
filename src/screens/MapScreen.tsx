import React, {useMemo, useState} from 'react';
import {Image, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {ScreenFrame} from '../components/ScreenFrame';
import {travelCategories, travelLocations} from '../data/travel';
import {colors, layout, shadow} from '../theme/theme';
import type {TravelCategory, TravelLocation} from '../types/app';

type Props = {
  selectedLocationId?: string;
  onSelectLocation: (locationId: string) => void;
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

export function MapScreen({selectedLocationId, onSelectLocation}: Props): React.JSX.Element {
  const [filterOpen, setFilterOpen] = useState(false);
  const [category, setCategory] = useState<TravelCategory>('all');
  const {width, height} = useWindowDimensions();
  const filteredLocations = useMemo(
    () => travelLocations.filter(location => category === 'all' || location.category === category),
    [category],
  );
  const fallbackLocation = filteredLocations[0] ?? travelLocations[0];
  const selectedLocation = selectedLocationId
    ? travelLocations.find(location => location.id === selectedLocationId)
    : undefined;

  return (
    <View style={styles.root}>
      <ScreenFrame scroll={false} padded={false} contentStyle={styles.frame}>
        <MapView
          style={StyleSheet.absoluteFill}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          customMapStyle={darkMapStyle}
          initialRegion={{
            latitude: (selectedLocation ?? fallbackLocation).coordinates.latitude,
            longitude: (selectedLocation ?? fallbackLocation).coordinates.longitude,
            latitudeDelta: 6.5,
            longitudeDelta: 6.5,
          }}
        />
        <View style={styles.mapShade} pointerEvents="none" />
        <View style={styles.pinLayer} pointerEvents="box-none">
          {filteredLocations.map(location => (
            <Pressable
              key={location.id}
              onPress={() => onSelectLocation(location.id)}
              style={[
                styles.markerOuter,
                pinPosition(location, width, height),
                {backgroundColor: `${categoryColors[location.category]}35`},
              ]}>
              <View style={[styles.markerInner, {backgroundColor: categoryColors[location.category]}]}>
                <Text style={styles.markerIcon}>📍</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <View style={styles.headerWrap}>
          <AppHeader title="Interactive Map" action={<View />} />
        </View>
        <Pressable onPress={() => setFilterOpen(true)} style={[styles.filterButton, shadow]}>
          <Text style={styles.filterIcon}>▽</Text>
        </Pressable>
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
          <View style={[styles.detailCard, shadow]}>
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
              <GradientButton title="Get Directions" icon="✈️" onPress={() => {}} />
            </View>
          </View>
        ) : (
          <Legend />
        )}
      </ScreenFrame>
    </View>
  );
}

function pinPosition(location: TravelLocation, width: number, height: number) {
  const minLat = 42.5;
  const maxLat = 50;
  const minLon = -94.6;
  const maxLon = -77;
  const xPercent = 0.1 + ((location.coordinates.longitude - minLon) / (maxLon - minLon)) * 0.78;
  const yPercent = 0.18 + (1 - (location.coordinates.latitude - minLat) / (maxLat - minLat)) * 0.58;
  const maxTop = height - layout.tabHeight - layout.navGap - 110;
  return {
    left: Math.max(18, Math.min(width - 74, width * xPercent)),
    top: Math.max(layout.androidTopInset + 136, Math.min(maxTop, height * yPercent)),
  };
}

function Legend(): React.JSX.Element {
  return (
    <View style={styles.legend}>
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
  pinLayer: {
    ...StyleSheet.absoluteFillObject,
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
    fontSize: 31,
    lineHeight: 31,
    transform: [{rotate: '180deg'}],
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
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  markerIcon: {
    fontSize: 20,
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
});
