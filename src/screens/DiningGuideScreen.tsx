import React, {useMemo, useState} from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {ScreenFrame} from '../components/ScreenFrame';
import {diningPlaces} from '../data/guide';
import {colors, layout} from '../theme/theme';
import type {GuidePlace} from '../types/app';

type DiningFilter = 'all' | 'dinner' | 'casual' | 'bar' | 'quick';

type Props = {
  isSaved: (placeId: string) => boolean;
  onOpenPlace: (placeId: string) => void;
  onToggleSaved: (placeId: string) => void;
  onViewOnMap: (placeId: string) => void;
};

const filters: {id: DiningFilter; label: string}[] = [
  {id: 'all', label: 'All'},
  {id: 'dinner', label: 'Dinner'},
  {id: 'casual', label: 'Casual'},
  {id: 'bar', label: 'Bars'},
  {id: 'quick', label: 'Quick'},
];

const placeFilters: Record<string, DiningFilter[]> = {
  'atlas-steak-fish': ['dinner'],
  'match-eatery': ['casual', 'bar'],
  'chow-lucky-noodle-bar': ['quick', 'casual'],
  'couchiching-court-buffet': ['casual'],
  'firestarter-lounge': ['bar'],
  'centre-bar': ['bar'],
  'the-weirs': ['casual', 'quick'],
};

export function DiningGuideScreen({
  isSaved,
  onOpenPlace,
  onToggleSaved,
  onViewOnMap,
}: Props): React.JSX.Element {
  const [filter, setFilter] = useState<DiningFilter>('all');
  const places = useMemo(
    () =>
      diningPlaces.filter(
        place => filter === 'all' || placeFilters[place.id]?.includes(filter),
      ),
    [filter],
  );

  return (
    <View style={styles.root}>
      <AppHeader title="Dining Guide" />
      <ScreenFrame>
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Onsite Dining</Text>
          <Text style={styles.introBody}>
            Browse Casino Rama dining venues, save ideas to your itinerary, and
            open official resort details before you go.
          </Text>
          <Text style={styles.introFoot}>
            No checkout, payments, or staff-service workflows are available in
            this guide.
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}>
          {filters.map(item => {
            const active = item.id === filter;
            return (
              <Pressable
                key={item.id}
                onPress={() => setFilter(item.id)}
                style={[styles.filterChip, active && styles.filterChipActive]}>
                <Text
                  style={[
                    styles.filterText,
                    active && styles.filterTextActive,
                  ]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.list}>
          {places.map(place => (
            <DiningCard
              key={place.id}
              place={place}
              saved={isSaved(place.id)}
              onOpen={() => onOpenPlace(place.id)}
              onToggleSaved={() => onToggleSaved(place.id)}
              onViewOnMap={() => onViewOnMap(place.id)}
            />
          ))}
        </View>

        <GradientButton
          title="Open Official Dining Page"
          icon="↗"
          onPress={() =>
            Linking.openURL('https://www.casinorama.com/eat-drink/').catch(
              () => undefined,
            )
          }
          style={styles.officialButton}
        />
      </ScreenFrame>
    </View>
  );
}

function DiningCard({
  place,
  saved,
  onOpen,
  onToggleSaved,
  onViewOnMap,
}: {
  place: GuidePlace;
  saved: boolean;
  onOpen: () => void;
  onToggleSaved: () => void;
  onViewOnMap: () => void;
}): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Pressable onPress={onOpen}>
        <Image source={place.image} style={styles.image} />
      </Pressable>
      <View style={styles.cardBody}>
        <View style={styles.titleRow}>
          <View style={styles.letterBadge}>
            <Text style={styles.letterText}>{place.icon}</Text>
          </View>
          <View style={styles.titleCopy}>
            <Text style={styles.title}>{place.name}</Text>
            <Text style={styles.meta} numberOfLines={1}>
              {place.locationLabel}
            </Text>
          </View>
        </View>
        <Text style={styles.description}>{place.shortDescription}</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Hours</Text>
          <Text style={styles.infoText}>{place.hours}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable
            onPress={onOpen}
            style={({pressed}) => [
              styles.secondaryButton,
              pressed && styles.pressed,
            ]}>
            <Text style={styles.secondaryText}>Details</Text>
          </Pressable>
          <Pressable
            onPress={onToggleSaved}
            style={({pressed}) => [
              styles.secondaryButton,
              saved && styles.savedButton,
              pressed && styles.pressed,
            ]}>
            <Text style={[styles.secondaryText, saved && styles.savedText]}>
              {saved ? 'Saved' : 'Save'}
            </Text>
          </Pressable>
          <Pressable
            onPress={onViewOnMap}
            style={({pressed}) => [
              styles.mapButton,
              pressed && styles.pressed,
            ]}>
            <Text style={styles.mapText}>Map</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  introCard: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 10,
  },
  introTitle: {
    color: colors.text,
    fontSize: 23,
    fontWeight: '900',
  },
  introBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
  },
  introFoot: {
    color: colors.gold,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '900',
  },
  filters: {
    gap: 8,
    paddingVertical: 16,
  },
  filterChip: {
    minHeight: 38,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  filterText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '900',
  },
  filterTextActive: {
    color: colors.white,
  },
  list: {
    gap: 16,
  },
  card: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 178,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 16,
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  letterBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 139, 31, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 139, 31, 0.34)',
  },
  letterText: {
    color: colors.orange,
    fontSize: 17,
    fontWeight: '900',
  },
  titleCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  title: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
  },
  meta: {
    color: colors.dim,
    fontSize: 12,
    fontWeight: '800',
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  infoBox: {
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    padding: 12,
    gap: 4,
  },
  infoLabel: {
    color: colors.dim,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  infoText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedButton: {
    backgroundColor: 'rgba(245, 189, 0, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(245, 189, 0, 0.34)',
  },
  secondaryText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  savedText: {
    color: colors.gold,
  },
  mapButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 8,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  officialButton: {
    marginTop: 18,
  },
  pressed: {
    opacity: 0.78,
  },
});
