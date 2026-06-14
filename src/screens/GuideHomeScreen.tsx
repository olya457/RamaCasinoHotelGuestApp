import React from 'react';
import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {GradientSurface} from '../components/GradientSurface';
import {ScreenFrame} from '../components/ScreenFrame';
import {
  getGuidePlace,
  guideCategoryLabels,
  guidePlaces,
  resortHighlights,
} from '../data/guide';
import {colors, layout} from '../theme/theme';
import type {GuidePlace} from '../types/app';

type Props = {
  isSaved: (placeId: string) => boolean;
  onOpenPlace: (placeId: string) => void;
  onToggleSaved: (placeId: string) => void;
  onViewOnMap: (placeId: string) => void;
};

const quickStats = [
  {label: 'Address', value: '5899 Rama Rd'},
  {label: 'Entry', value: '19+ areas'},
  {label: 'Use', value: 'Guide only'},
];

export function GuideHomeScreen({
  isSaved,
  onOpenPlace,
  onToggleSaved,
  onViewOnMap,
}: Props): React.JSX.Element {
  const resort = getGuidePlace('casino-rama-resort') ?? guidePlaces[0];
  const essentials = getGuidePlace('visitor-essentials');

  return (
    <View style={styles.root}>
      <AppHeader title="Rama Resort Guide" />
      <ScreenFrame>
        <View style={styles.heroCard}>
          <Image source={resort.image} style={styles.heroImage} />
          <View style={styles.heroShade} />
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>Visitor travel guide</Text>
            <Text style={styles.heroTitle}>Casino Rama Resort</Text>
            <Text style={styles.heroBody}>
              Plan dining, shows, hotel amenities, nearby Orillia stops, and a
              local itinerary for a public visit.
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {quickStats.map(stat => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>Public visitor app</Text>
          <Text style={styles.noticeBody}>
            Information can change. Confirm final hours, ID rules, event access,
            and venue details on official Casino Rama pages before travelling.
          </Text>
          {essentials ? (
            <Pressable
              onPress={() => onOpenPlace(essentials.id)}
              style={({pressed}) => [
                styles.noticeLink,
                pressed && styles.pressed,
              ]}>
              <Text style={styles.noticeLinkText}>Open visitor essentials</Text>
            </Pressable>
          ) : null}
        </View>

        <SectionTitle title="Plan Your Visit" />
        <View style={styles.featureGrid}>
          {resortHighlights.map(place => (
            <FeatureTile
              key={place.id}
              place={place}
              saved={isSaved(place.id)}
              onOpen={() => onOpenPlace(place.id)}
              onToggleSaved={() => onToggleSaved(place.id)}
            />
          ))}
        </View>

        <GradientSurface style={styles.actionBand}>
          <View style={styles.actionCopy}>
            <Text style={styles.actionTitle}>Build a simple itinerary</Text>
            <Text style={styles.actionBody}>
              Save venues, add trip notes, check ID reminders, and open map
              directions from the saved list.
            </Text>
          </View>
        </GradientSurface>

        <SectionTitle title="Useful Starting Points" />
        <View style={styles.list}>
          {guidePlaces.slice(0, 6).map(place => (
            <GuideRow
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
          title="Open Official Resort Website"
          icon="↗"
          onPress={() =>
            Linking.openURL('https://www.casinorama.com/').catch(
              () => undefined,
            )
          }
          style={styles.officialButton}
        />
      </ScreenFrame>
    </View>
  );
}

function SectionTitle({title}: {title: string}): React.JSX.Element {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function FeatureTile({
  place,
  saved,
  onOpen,
  onToggleSaved,
}: {
  place: GuidePlace;
  saved: boolean;
  onOpen: () => void;
  onToggleSaved: () => void;
}): React.JSX.Element {
  return (
    <Pressable
      onPress={onOpen}
      style={({pressed}) => [styles.tile, pressed && styles.pressed]}>
      <Image source={place.image} style={styles.tileImage} />
      <View style={styles.tileShade} />
      <Pressable
        onPress={onToggleSaved}
        style={({pressed}) => [
          styles.saveButton,
          saved && styles.saveButtonActive,
          pressed && styles.pressed,
        ]}>
        <Text style={[styles.saveText, saved && styles.saveTextActive]}>
          {saved ? '✓' : '+'}
        </Text>
      </Pressable>
      <View style={styles.tileCopy}>
        <Text style={styles.tileCategory}>
          {guideCategoryLabels[place.category]}
        </Text>
        <Text style={styles.tileTitle}>{place.name}</Text>
      </View>
    </Pressable>
  );
}

function GuideRow({
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
    <View style={styles.rowCard}>
      <Pressable onPress={onOpen} style={styles.rowMain}>
        <Text style={styles.rowIcon}>{place.icon}</Text>
        <View style={styles.rowCopy}>
          <Text style={styles.rowCategory}>
            {guideCategoryLabels[place.category]}
          </Text>
          <Text style={styles.rowTitle}>{place.name}</Text>
          <Text style={styles.rowBody} numberOfLines={2}>
            {place.shortDescription}
          </Text>
        </View>
      </Pressable>
      <View style={styles.rowActions}>
        <Pressable
          onPress={onToggleSaved}
          style={[styles.smallAction, saved && styles.smallActionActive]}>
          <Text
            style={[
              styles.smallActionText,
              saved && styles.smallActionTextActive,
            ]}>
            {saved ? 'Saved' : 'Save'}
          </Text>
        </Pressable>
        {place.coordinates ? (
          <Pressable onPress={onViewOnMap} style={styles.smallAction}>
            <Text style={styles.smallActionText}>Map</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  heroCard: {
    height: 270,
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
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
  },
  heroCopy: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    gap: 8,
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.white,
    fontSize: 31,
    lineHeight: 36,
    fontWeight: '900',
  },
  heroBody: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
    maxWidth: 330,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 12,
    gap: 5,
    minHeight: 72,
  },
  statLabel: {
    color: colors.dim,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  statValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  noticeCard: {
    marginTop: 12,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: 'rgba(245, 189, 0, 0.38)',
    backgroundColor: 'rgba(245, 189, 0, 0.1)',
    padding: 16,
    gap: 9,
  },
  noticeTitle: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: '900',
  },
  noticeBody: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  noticeLink: {
    alignSelf: 'flex-start',
    minHeight: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  noticeLinkText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 24,
    marginBottom: 12,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    width: '48%',
    height: 154,
    borderRadius: layout.cardRadius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  tileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tileShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
  },
  tileCopy: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    gap: 4,
  },
  tileCategory: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  tileTitle: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '900',
  },
  saveButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.64)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  saveButtonActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  saveText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  saveTextActive: {
    color: colors.black,
  },
  actionBand: {
    marginTop: 18,
    borderRadius: layout.cardRadius,
    minHeight: 112,
  },
  actionCopy: {
    flex: 1,
    justifyContent: 'center',
    padding: 18,
    gap: 8,
  },
  actionTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
  },
  actionBody: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  list: {
    gap: 12,
  },
  rowCard: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 14,
    gap: 12,
  },
  rowMain: {
    flexDirection: 'row',
    gap: 12,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceSoft,
    color: colors.gold,
    fontSize: 16,
    lineHeight: 36,
    textAlign: 'center',
    fontWeight: '900',
  },
  rowCopy: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  rowCategory: {
    color: colors.dim,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  rowTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  rowBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  rowActions: {
    flexDirection: 'row',
    gap: 8,
  },
  smallAction: {
    flex: 1,
    minHeight: 40,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallActionActive: {
    backgroundColor: 'rgba(245, 189, 0, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(245, 189, 0, 0.34)',
  },
  smallActionText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  smallActionTextActive: {
    color: colors.gold,
  },
  officialButton: {
    marginTop: 18,
  },
  pressed: {
    opacity: 0.8,
  },
});
