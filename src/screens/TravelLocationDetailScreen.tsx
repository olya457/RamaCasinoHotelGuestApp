import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {GradientSurface} from '../components/GradientSurface';
import {ScreenFrame} from '../components/ScreenFrame';
import {getTravelLocation, travelCategories} from '../data/travel';
import {colors, layout} from '../theme/theme';
import type {TravelCategory, TravelLocation} from '../types/app';

type Props = {
  locationId: string;
  onBack: () => void;
  onViewOnMap: (locationId: string) => void;
};

export function TravelLocationDetailScreen({locationId, onBack, onViewOnMap}: Props): React.JSX.Element {
  const location = getTravelLocation(locationId);

  if (!location) {
    return (
      <View style={styles.root}>
        <AppHeader title="Location Details" onBack={onBack} showGuest={false} />
        <ScreenFrame>
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>ℹ️</Text>
            <Text style={styles.emptyTitle}>Location unavailable</Text>
            <Text style={styles.emptyBody}>This travel location could not be opened right now.</Text>
            <GradientButton title="Back" onPress={onBack} />
          </View>
        </ScreenFrame>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <AppHeader title={location.name} onBack={onBack} showGuest={false} />
      <ScreenFrame>
        <Image source={location.image} style={styles.heroImage} />
        <View style={styles.titleBlock}>
          <View style={styles.iconBadge}>
            <Text style={styles.iconText}>{categoryIcon(location.category)}</Text>
          </View>
          <View style={styles.titleCopy}>
            <Text style={styles.category}>{categoryLabel(location.category)}</Text>
            <Text style={styles.title}>{location.name}</Text>
            <Text style={styles.setting}>{location.setting}</Text>
          </View>
        </View>
        <GradientSurface style={styles.infoBand}>
          <InfoCell icon="📍" label="Coordinates" value={formatCoordinates(location)} />
          <InfoCell icon="🧭" label="Type" value={categoryLabel(location.category)} />
          <InfoCell icon="🗺️" label="Map View" value="Open the interactive map to see this location with nearby Ontario stops." />
        </GradientSurface>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Location</Text>
          <Text style={styles.bodyText}>{location.detailDescription}</Text>
        </View>
        <DetailSection title="What You Can Expect" icon="✦" items={location.highlights} />
        <TagSection title="Best For" items={location.bestFor} />
        <DetailSection title="Visitor Notes" icon="•" items={location.visitTips} muted />
        <GradientButton title="View on Map" icon="✈️" onPress={() => onViewOnMap(location.id)} style={styles.mapButton} />
      </ScreenFrame>
    </View>
  );
}

function InfoCell({icon, label, value}: {icon: string; label: string; value: string}): React.JSX.Element {
  return (
    <View style={styles.infoCell}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View style={styles.infoCopy}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function DetailSection({
  title,
  icon,
  items,
  muted,
}: {
  title: string;
  icon: string;
  items: TravelLocation['highlights'];
  muted?: boolean;
}): React.JSX.Element {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.pointList}>
        {items.map(item => (
          <View key={item} style={styles.pointRow}>
            <Text style={[styles.pointIcon, muted && styles.pointIconMuted]}>{icon}</Text>
            <Text style={[styles.pointText, muted && styles.pointTextMuted]}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function TagSection({title, items}: {title: string; items: string[]}): React.JSX.Element {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.tagGrid}>
        {items.map(item => (
          <View key={item} style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function formatCoordinates(location: TravelLocation): string {
  return `${location.coordinates.latitude.toFixed(4)}° N, ${Math.abs(location.coordinates.longitude).toFixed(4)}° W`;
}

function categoryLabel(category: Exclude<TravelCategory, 'all'>): string {
  const match = travelCategories.find(item => item.id === category);
  return match?.label ?? category;
}

function categoryIcon(category: Exclude<TravelCategory, 'all'>): string {
  const icons: Record<Exclude<TravelCategory, 'all'>, string> = {
    lakeside: '🌊',
    nature: '🌲',
    beach: '🏖️',
    waterfront: '⚓',
  };

  return icons[category];
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: layout.cardRadius,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: colors.border,
  },
  titleBlock: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  iconBadge: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 25,
  },
  titleCopy: {
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
  category: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '900',
  },
  setting: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
  },
  infoBand: {
    marginTop: 18,
    borderRadius: layout.cardRadius,
    padding: 14,
    gap: 12,
  },
  infoCell: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  infoIcon: {
    width: 26,
    fontSize: 17,
    textAlign: 'center',
  },
  infoCopy: {
    flex: 1,
    gap: 3,
  },
  infoLabel: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  infoValue: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  section: {
    marginTop: 16,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  bodyText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
  },
  pointList: {
    gap: 10,
  },
  pointRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  pointIcon: {
    color: colors.gold,
    fontSize: 13,
    fontWeight: '900',
    width: 18,
  },
  pointIconMuted: {
    color: colors.muted,
  },
  pointText: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
  },
  pointTextMuted: {
    color: colors.muted,
  },
  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderRadius: 999,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  mapButton: {
    marginTop: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  emptyIcon: {
    fontSize: 34,
    textAlign: 'center',
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
