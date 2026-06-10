import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {ScreenFrame} from '../components/ScreenFrame';
import {restaurantAmenities, wellnessAmenities} from '../data/amenities';
import {colors, layout} from '../theme/theme';
import type {Amenity} from '../types/app';

type Props = {
  onOpenAmenity: (amenityId: string) => void;
};

export function EntertainmentScreen({onOpenAmenity}: Props): React.JSX.Element {
  return (
    <View style={styles.root}>
      <AppHeader title="Entertainment" />
      <ScreenFrame>
        <Text style={styles.sectionTitle}>Wellness & Relaxation</Text>
        <View style={styles.list}>
          {wellnessAmenities.map(amenity => (
            <AmenityCard key={amenity.id} amenity={amenity} onOpen={() => onOpenAmenity(amenity.id)} />
          ))}
        </View>
        <Text style={[styles.sectionTitle, styles.secondTitle]}>Restaurants & Bars</Text>
        <View style={styles.list}>
          {restaurantAmenities.map(amenity => (
            <AmenityCard key={amenity.id} amenity={amenity} onOpen={() => onOpenAmenity(amenity.id)} />
          ))}
        </View>
      </ScreenFrame>
    </View>
  );
}

function AmenityCard({amenity, onOpen}: {amenity: Amenity; onOpen: () => void}): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Image source={amenity.image} style={styles.image} />
      <View style={styles.copy}>
        <View style={styles.titleRow}>
          <Text style={styles.icon}>{amenity.icon}</Text>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {amenity.name}
          </Text>
        </View>
        <Text style={styles.description} numberOfLines={3}>
          {amenity.description}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Text style={styles.metaText}>{amenity.category}</Text>
          </View>
          <Text style={styles.metaDivider}>•</Text>
          <Text style={styles.locationText} numberOfLines={1}>
            {amenity.location}
          </Text>
        </View>
        <Pressable onPress={onOpen} style={({pressed}) => [styles.openButton, pressed && styles.pressed]}>
          <Text style={styles.openIcon}>↗</Text>
          <Text style={styles.openText}>Open Details</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 12,
  },
  secondTitle: {
    marginTop: 24,
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
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  copy: {
    padding: 14,
    gap: 9,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    fontSize: 21,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    flex: 1,
  },
  description: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  metaRow: {
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaChip: {
    borderRadius: 999,
    backgroundColor: 'rgba(255, 195, 26, 0.14)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  metaText: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '900',
  },
  metaDivider: {
    color: colors.dim,
    fontSize: 12,
    fontWeight: '900',
  },
  locationText: {
    color: colors.dim,
    fontSize: 12,
    fontWeight: '800',
    flex: 1,
  },
  openButton: {
    height: 46,
    borderRadius: layout.cardRadius,
    backgroundColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  openIcon: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '900',
  },
  openText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.78,
  },
});
