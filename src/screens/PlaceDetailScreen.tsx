import React from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {GradientSurface} from '../components/GradientSurface';
import {ScreenFrame} from '../components/ScreenFrame';
import {getGuidePlace, guideCategoryLabels} from '../data/guide';
import {colors, layout} from '../theme/theme';
import type {GuidePlace} from '../types/app';

type Props = {
  placeId: string;
  isSaved: boolean;
  onBack: () => void;
  onToggleSaved: () => void;
  onViewOnMap: (placeId: string) => void;
};

export function PlaceDetailScreen({
  placeId,
  isSaved,
  onBack,
  onToggleSaved,
  onViewOnMap,
}: Props): React.JSX.Element {
  const place = getGuidePlace(placeId);

  if (!place) {
    return (
      <View style={styles.root}>
        <AppHeader title="Details" onBack={onBack} showGuest={false} />
        <ScreenFrame>
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Place unavailable</Text>
            <Text style={styles.emptyBody}>
              This guide place could not be opened right now.
            </Text>
            <GradientButton title="Back" onPress={onBack} />
          </View>
        </ScreenFrame>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <AppHeader title={place.name} onBack={onBack} showGuest={false} />
      <ScreenFrame>
        <Image source={place.image} style={styles.heroImage} />
        <View style={styles.titleBlock}>
          <View style={styles.iconBadge}>
            <Text style={styles.iconText}>{place.icon}</Text>
          </View>
          <View style={styles.titleCopy}>
            <Text style={styles.category}>
              {guideCategoryLabels[place.category]}
            </Text>
            <Text style={styles.title}>{place.name}</Text>
            <Text style={styles.description}>{place.detailDescription}</Text>
          </View>
        </View>

        <GradientSurface style={styles.infoBand}>
          <InfoCell label="Location" value={place.locationLabel} />
          <InfoCell label="Hours" value={place.hours} />
          {place.ageNote ? (
            <InfoCell label="Age Note" value={place.ageNote} />
          ) : null}
        </GradientSurface>

        <View style={styles.actions}>
          <Pressable
            onPress={onToggleSaved}
            style={[styles.saveButton, isSaved && styles.saveButtonActive]}>
            <Text style={[styles.saveText, isSaved && styles.saveTextActive]}>
              {isSaved ? 'Saved to Itinerary' : 'Save to Itinerary'}
            </Text>
          </Pressable>
          {place.coordinates ? (
            <Pressable
              onPress={() => onViewOnMap(place.id)}
              style={styles.mapButton}>
              <Text style={styles.mapText}>View on Map</Text>
            </Pressable>
          ) : null}
        </View>

        <DetailSection title="Highlights" items={place.highlights} />
        <DetailSection title="Visitor Tips" items={place.tips} muted />

        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimerTitle}>Guide information</Text>
          <Text style={styles.disclaimerBody}>
            This page is for trip planning. It does not book, sell, reserve, or
            submit services. Check official pages for final details.
          </Text>
        </View>

        <View style={styles.linkActions}>
          {place.officialUrl ? (
            <GradientButton
              title="Open Official Page"
              icon="↗"
              onPress={() =>
                Linking.openURL(place.officialUrl ?? '').catch(() => undefined)
              }
              style={styles.linkButton}
            />
          ) : null}
          {place.coordinates ? (
            <GradientButton
              title="Open Directions"
              icon="⌖"
              onPress={() => openDirections(place)}
              style={styles.linkButton}
            />
          ) : null}
        </View>
      </ScreenFrame>
    </View>
  );
}

function InfoCell({
  label,
  value,
}: {
  label: string;
  value: string;
}): React.JSX.Element {
  return (
    <View style={styles.infoCell}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function DetailSection({
  title,
  items,
  muted,
}: {
  title: string;
  items: string[];
  muted?: boolean;
}): React.JSX.Element {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.pointList}>
        {items.map(item => (
          <View key={item} style={styles.pointRow}>
            <Text style={[styles.pointIcon, muted && styles.pointIconMuted]}>
              {muted ? '•' : '◆'}
            </Text>
            <Text style={[styles.pointText, muted && styles.pointTextMuted]}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  heroImage: {
    width: '100%',
    height: 230,
    borderRadius: layout.cardRadius,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: colors.border,
  },
  titleBlock: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
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
    color: colors.gold,
    fontSize: 22,
    fontWeight: '900',
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
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
  },
  infoBand: {
    marginTop: 18,
    borderRadius: layout.cardRadius,
    padding: 14,
    gap: 10,
  },
  infoCell: {
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    padding: 12,
    gap: 4,
  },
  infoLabel: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  infoValue: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  saveButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  saveButtonActive: {
    borderWidth: 1,
    borderColor: 'rgba(245, 189, 0, 0.42)',
    backgroundColor: 'rgba(245, 189, 0, 0.16)',
  },
  saveText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  saveTextActive: {
    color: colors.gold,
  },
  mapButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
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
    fontSize: 11,
    lineHeight: 20,
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
  disclaimerCard: {
    marginTop: 16,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 8,
  },
  disclaimerTitle: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: '900',
  },
  disclaimerBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  linkActions: {
    marginTop: 18,
    gap: 10,
  },
  linkButton: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
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
