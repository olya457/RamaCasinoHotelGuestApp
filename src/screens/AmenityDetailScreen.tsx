import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {GradientSurface} from '../components/GradientSurface';
import {ScreenFrame} from '../components/ScreenFrame';
import {getAmenity} from '../data/amenities';
import {colors, layout} from '../theme/theme';
import type {Amenity} from '../types/app';

type Props = {
  amenityId: string;
  onBack: () => void;
};

export function AmenityDetailScreen({amenityId, onBack}: Props): React.JSX.Element {
  const amenity = getAmenity(amenityId);

  if (!amenity) {
    return (
      <View style={styles.root}>
        <AppHeader title="Details" onBack={onBack} showGuest={false} />
        <ScreenFrame>
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>ⓘ</Text>
            <Text style={styles.emptyTitle}>Information unavailable</Text>
            <Text style={styles.emptyBody}>This resort option could not be opened right now.</Text>
            <GradientButton title="Back" onPress={onBack} />
          </View>
        </ScreenFrame>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <AppHeader title={amenity.name} onBack={onBack} showGuest={false} />
      <ScreenFrame>
        <Image source={amenity.image} style={styles.heroImage} />
        <View style={styles.titleBlock}>
          <View style={styles.iconBadge}>
            <Text style={styles.iconText}>{amenity.icon}</Text>
          </View>
          <View style={styles.titleCopy}>
            <Text style={styles.category}>{amenity.category}</Text>
            <Text style={styles.title}>{amenity.name}</Text>
            <Text style={styles.description}>{amenity.details}</Text>
          </View>
        </View>
        <GradientSurface style={styles.infoBand}>
          <InfoCell icon="🕒" label="Hours" value={amenity.hours} />
          <InfoCell icon="📍" label="Location" value={amenity.location} />
          <InfoCell icon="💳" label="Pricing" value={amenity.priceInfo} />
          <InfoCell icon="✅" label="Access" value={amenity.booking} />
        </GradientSurface>
        <DetailSection title="Highlights" items={amenity.highlights} icon="✦" />
        <DetailSection title="Good To Know" items={amenity.goodToKnow} icon="•" muted />
        <View style={styles.accessCard}>
          <Text style={styles.accessTitle}>Accessibility</Text>
          <Text style={styles.accessBody}>{amenity.accessibility}</Text>
        </View>
        <View style={styles.contactCard}>
          <Text style={styles.contactIcon}>☎️</Text>
          <View style={styles.contactCopy}>
            <Text style={styles.contactTitle}>Need help?</Text>
            <Text style={styles.contactBody}>{amenity.contact}</Text>
          </View>
        </View>
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
  items,
  icon,
  muted,
}: {
  title: string;
  items: Amenity['highlights'];
  icon: string;
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  heroImage: {
    width: '100%',
    height: 218,
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
  accessCard: {
    marginTop: 16,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: 'rgba(21, 185, 120, 0.45)',
    backgroundColor: 'rgba(21, 185, 120, 0.11)',
    padding: 16,
    gap: 8,
  },
  accessTitle: {
    color: colors.green,
    fontSize: 16,
    fontWeight: '900',
  },
  accessBody: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  contactCard: {
    marginTop: 16,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: 'rgba(255, 195, 26, 0.36)',
    backgroundColor: colors.surface,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  contactIcon: {
    fontSize: 24,
  },
  contactCopy: {
    flex: 1,
    gap: 4,
  },
  contactTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  contactBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  emptyIcon: {
    color: colors.gold,
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
