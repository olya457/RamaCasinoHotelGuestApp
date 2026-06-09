import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {ScreenFrame} from '../components/ScreenFrame';
import {restaurantAmenities, wellnessAmenities} from '../data/amenities';
import {colors, layout} from '../theme/theme';
import type {Amenity} from '../types/app';

export function EntertainmentScreen(): React.JSX.Element {
  return (
    <View style={styles.root}>
      <AppHeader title="Entertainment" />
      <ScreenFrame>
        <Text style={styles.sectionTitle}>Wellness & Relaxation</Text>
        <View style={styles.list}>
          {wellnessAmenities.map(amenity => (
            <AmenityCard key={amenity.id} amenity={amenity} />
          ))}
        </View>
        <Text style={[styles.sectionTitle, styles.secondTitle]}>Restaurants & Bars</Text>
        <View style={styles.list}>
          {restaurantAmenities.map(amenity => (
            <AmenityCard key={amenity.id} amenity={amenity} />
          ))}
        </View>
      </ScreenFrame>
    </View>
  );
}

function AmenityCard({amenity}: {amenity: Amenity}): React.JSX.Element {
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
});
