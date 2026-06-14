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
import {guidePlaces, nearbyPlaces} from '../data/guide';
import {colors, layout} from '../theme/theme';
import type {GuidePlace} from '../types/app';

type NearbyFilter = 'nearby' | 'resort' | 'culture' | 'water';

type Props = {
  isSaved: (placeId: string) => boolean;
  onOpenPlace: (placeId: string) => void;
  onToggleSaved: (placeId: string) => void;
  onViewOnMap: (placeId: string) => void;
};

const filterItems: {id: NearbyFilter; label: string}[] = [
  {id: 'nearby', label: 'Nearby'},
  {id: 'resort', label: 'Resort'},
  {id: 'culture', label: 'Culture'},
  {id: 'water', label: 'Water'},
];

const cultureIds = [
  'orillia-opera-house',
  'orillia-museum-art-history',
  'stephen-leacock-museum',
  'mnjikaning-fish-weirs',
];

const waterIds = [
  'lake-couchiching-waterfront',
  'stephen-leacock-museum',
  'mnjikaning-fish-weirs',
];

export function NearbyScreen({
  isSaved,
  onOpenPlace,
  onToggleSaved,
  onViewOnMap,
}: Props): React.JSX.Element {
  const [filter, setFilter] = useState<NearbyFilter>('nearby');
  const places = useMemo(() => {
    if (filter === 'resort') {
      return guidePlaces.filter(place =>
        ['resort', 'entertainment', 'wellness', 'practical'].includes(
          place.category,
        ),
      );
    }
    if (filter === 'culture') {
      return nearbyPlaces.filter(place => cultureIds.includes(place.id));
    }
    if (filter === 'water') {
      return nearbyPlaces.filter(place => waterIds.includes(place.id));
    }
    return nearbyPlaces;
  }, [filter]);

  return (
    <View style={styles.root}>
      <AppHeader title="Nearby Guide" />
      <ScreenFrame>
        <View style={styles.hero}>
          <Image
            source={places[0]?.image ?? nearbyPlaces[0].image}
            style={styles.heroImage}
          />
          <View style={styles.heroShade} />
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>Orillia & Lake Country</Text>
            <Text style={styles.heroBody}>
              Nearby stops for fresh air, local history, arts, downtown walks,
              and resort-area planning.
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}>
          {filterItems.map(item => {
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
            <NearbyCard
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
          title="Open Casino Rama Things To Do"
          icon="↗"
          onPress={() =>
            Linking.openURL('https://www.casinorama.com/things-to-do/').catch(
              () => undefined,
            )
          }
          style={styles.officialButton}
        />
      </ScreenFrame>
    </View>
  );
}

function NearbyCard({
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
      <Pressable onPress={onOpen} style={styles.imageWrap}>
        <Image source={place.image} style={styles.image} />
      </Pressable>
      <View style={styles.body}>
        <Text style={styles.category}>{place.category.toUpperCase()}</Text>
        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.description}>{place.shortDescription}</Text>
        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Location</Text>
          <Text style={styles.metaText}>{place.locationLabel}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable onPress={onOpen} style={styles.button}>
            <Text style={styles.buttonText}>Details</Text>
          </Pressable>
          <Pressable
            onPress={onToggleSaved}
            style={[styles.button, saved && styles.buttonActive]}>
            <Text style={[styles.buttonText, saved && styles.buttonTextActive]}>
              {saved ? 'Saved' : 'Save'}
            </Text>
          </Pressable>
          {place.coordinates ? (
            <Pressable onPress={onViewOnMap} style={styles.primaryButton}>
              <Text style={styles.primaryText}>Map</Text>
            </Pressable>
          ) : null}
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
  hero: {
    height: 214,
    borderRadius: layout.cardRadius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
  },
  heroCopy: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    gap: 8,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 27,
    lineHeight: 32,
    fontWeight: '900',
  },
  heroBody: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  filters: {
    paddingVertical: 16,
    gap: 8,
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
    backgroundColor: colors.cyan,
    borderColor: colors.cyan,
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
    gap: 14,
  },
  card: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  imageWrap: {
    height: 156,
    backgroundColor: colors.surfaceSoft,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  body: {
    padding: 16,
    gap: 10,
  },
  category: {
    color: colors.cyan,
    fontSize: 11,
    fontWeight: '900',
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  metaBox: {
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    padding: 12,
    gap: 4,
  },
  metaLabel: {
    color: colors.dim,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  metaText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    minHeight: 44,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    borderWidth: 1,
    borderColor: 'rgba(245, 189, 0, 0.34)',
    backgroundColor: 'rgba(245, 189, 0, 0.16)',
  },
  buttonText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  buttonTextActive: {
    color: colors.gold,
  },
  primaryButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 8,
    backgroundColor: colors.cyan,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  officialButton: {
    marginTop: 18,
  },
});
