import React, {useMemo, useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {ScreenFrame} from '../components/ScreenFrame';
import {travelCategories, travelLocations} from '../data/travel';
import {colors, layout} from '../theme/theme';
import type {TravelCategory} from '../types/app';

type Props = {
  onViewOnMap: (locationId: string) => void;
  onOpenDetails: (locationId: string) => void;
};

export function TravelScreen({onViewOnMap, onOpenDetails}: Props): React.JSX.Element {
  const [category, setCategory] = useState<TravelCategory>('all');
  const locations = useMemo(
    () => travelLocations.filter(location => category === 'all' || location.category === category),
    [category],
  );

  return (
    <View style={styles.root}>
      <AppHeader title="Ontario Travel Guide" />
      <ScreenFrame>
        <View style={styles.tabsBox}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
            {travelCategories.map(item => {
              const active = item.id === category;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => setCategory(item.id)}
                  style={[styles.tab, active && styles.activeTab]}>
                  <Text style={[styles.tabText, active && styles.activeTabText]}>{item.label}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.list}>
          {locations.map(location => (
            <View key={location.id} style={styles.card}>
              <View style={styles.imageWrap}>
                <Image source={location.image} style={styles.image} />
                <Pressable onPress={() => onOpenDetails(location.id)} style={styles.detailFloating}>
                  <Text style={styles.detailFloatingIcon}>ℹ️</Text>
                </Pressable>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.title}>{location.name}</Text>
                <Text style={styles.coords}>
                  📍 {location.coordinates.latitude.toFixed(4)}° N, {Math.abs(location.coordinates.longitude).toFixed(4)}° W
                </Text>
                <Text style={styles.description}>{location.shortDescription}</Text>
                <View style={styles.actions}>
                  <Pressable onPress={() => onOpenDetails(location.id)} style={styles.detailsButton}>
                    <Text style={styles.detailsText} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.72}>
                      ℹ️ Open Details
                    </Text>
                  </Pressable>
                  <GradientButton title="View on Map" icon="✈️" onPress={() => onViewOnMap(location.id)} style={styles.mapButton} />
                </View>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{categoryLabel(location.category)}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScreenFrame>
    </View>
  );
}

function categoryLabel(category: Exclude<TravelCategory, 'all'>): string {
  const match = travelCategories.find(item => item.id === category);
  return match?.label.replace(' Escapes', '').replace(' & Scenic', '') ?? category;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  tabsBox: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 8,
    marginBottom: 18,
  },
  tabs: {
    gap: 8,
  },
  tab: {
    height: 38,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: colors.orange,
  },
  tabText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '900',
  },
  activeTabText: {
    color: colors.white,
  },
  list: {
    gap: 18,
  },
  card: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  imageWrap: {
    height: 220,
    backgroundColor: colors.surfaceSoft,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailFloating: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0, 0, 0, 0.62)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailFloatingIcon: {
    fontSize: 19,
  },
  cardBody: {
    padding: 18,
    gap: 12,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  coords: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: '800',
  },
  description: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  detailsButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  mapButton: {
    flex: 1.18,
  },
  pill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: colors.surfaceSoft,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  pillText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
  },
});
