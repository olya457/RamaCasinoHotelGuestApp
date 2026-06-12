import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GuestProfileForm,
  type GuestProfileDraft,
} from '../components/GuestProfileForm';
import {GradientButton} from '../components/GradientButton';
import {GradientSurface} from '../components/GradientSurface';
import {
  formatRoomLabel,
  formatStayDateLabel,
  formatStayTimeLabel,
} from '../context/GuestProfileContext';
import {imageAssets} from '../data/assets';
import {colors, layout} from '../theme/theme';
import type {GuestProfile} from '../types/app';

type Props = {
  initialProfile: GuestProfile;
  onSave: (profile: GuestProfile) => void;
};

export function StaySetupScreen({
  initialProfile,
  onSave,
}: Props): React.JSX.Element {
  const [draft, setDraft] = useState<GuestProfileDraft>({
    name: initialProfile.name,
    room: initialProfile.room,
    stayDate: initialProfile.stayDate ?? '',
    stayTime: initialProfile.stayTime ?? '',
    notes: initialProfile.notes ?? '',
  });

  const normalizedName = draft.name.trim();
  const normalizedRoom = draft.room.trim().replace(/^room\s+/i, '');
  const canContinue = normalizedName.length >= 2 && normalizedRoom.length >= 2;

  const patchDraft = (patch: Partial<GuestProfileDraft>) => {
    setDraft(current => ({...current, ...patch}));
  };

  const save = () => {
    if (!canContinue) {
      return;
    }

    onSave({
      name: normalizedName,
      room: normalizedRoom,
      stayDate: draft.stayDate.trim(),
      stayTime: draft.stayTime.trim(),
      notes: draft.notes.trim(),
    });
  };

  return (
    <ImageBackground
      source={imageAssets.onboardingLobby}
      resizeMode="cover"
      style={styles.root}>
      <View style={styles.shade} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.brandBlock}>
          <Text style={styles.eyebrow}>Guest access</Text>
          <Text style={styles.title}>Set up your stay</Text>
          <Text style={styles.body}>
            Enter your guest details once to use room service, hotel requests,
            climate controls, amenities, and local travel tools.
          </Text>
        </View>

        <GradientSurface style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Current destination</Text>
          <Text style={styles.summaryTitle}>
            {normalizedRoom
              ? formatRoomLabel(normalizedRoom)
              : 'Room not selected'}
          </Text>
          <Text style={styles.summaryText}>
            {normalizedName || 'Guest name required'}
          </Text>
          <Text style={styles.summaryText}>
            {formatStayDateLabel(draft.stayDate)} ·{' '}
            {formatStayTimeLabel(draft.stayTime)}
          </Text>
        </GradientSurface>

        <View style={styles.form}>
          <GuestProfileForm {...draft} onChange={patchDraft} />
        </View>

        <GradientButton
          title="Continue to Guest Services"
          disabled={!canContinue}
          onPress={save}
        />
        <Text style={styles.helperText}>
          Name and room are required so orders and service requests can be
          routed correctly.
        </Text>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  shade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.62)',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: layout.screenPadding,
    paddingTop: layout.topInset + 34,
    paddingBottom: layout.bottomInset + 28,
    gap: 18,
  },
  brandBlock: {
    gap: 10,
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
  },
  body: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  summaryCard: {
    borderRadius: layout.cardRadius,
    padding: 16,
    gap: 6,
  },
  summaryLabel: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  summaryTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  summaryText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  form: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(18, 18, 18, 0.94)',
    padding: 16,
  },
  helperText: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 14,
  },
});
