import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {GradientSurface} from '../components/GradientSurface';
import {ScreenFrame} from '../components/ScreenFrame';
import {
  formatGuestNotesLabel,
  formatRoomLabel,
  formatStayDateLabel,
  useGuestProfile,
} from '../context/GuestProfileContext';
import {requestCategories} from '../data/requests';
import {colors, layout} from '../theme/theme';
import type {GuestRequest, RequestCategoryId} from '../types/app';

type Props = {
  categoryId: RequestCategoryId;
  setRequests: React.Dispatch<React.SetStateAction<GuestRequest[]>>;
  onBack: () => void;
  onSubmitted: () => void;
};

const descriptionKeys = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

export function RequestFormScreen({categoryId, setRequests, onBack, onSubmitted}: Props): React.JSX.Element {
  const {profile} = useGuestProfile();
  const [description, setDescription] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const category = useMemo(
    () => requestCategories.find(item => item.id === categoryId) ?? requestCategories[0],
    [categoryId],
  );
  const canSubmit = description.trim().length > 0;

  const submit = () => {
    if (!canSubmit) {
      return;
    }
    const nextRequest: GuestRequest = {
      id: `guest-request-${Date.now()}`,
      categoryId: category.id,
      title: category.title,
      description: description.trim(),
      status: 'submitted',
      createdAtLabel: 'Just now',
      isUserCreated: true,
    };
    setRequests(current => [nextRequest, ...current]);
    setDescription('');
    setKeyboardOpen(false);
    onSubmitted();
  };

  const addDescriptionCharacter = (character: string) => {
    setDescription(current => `${current}${character}`.slice(0, 120));
  };

  const removeDescriptionCharacter = () => {
    setDescription(current => current.slice(0, -1));
  };

  const selectExample = (value: string) => {
    setDescription(current => {
      const trimmed = current.trim();

      if (!trimmed || trimmed === value) {
        return value;
      }

      return `${trimmed}, ${value}`.slice(0, 120);
    });
  };

  return (
    <View style={styles.root}>
      <AppHeader title={category.title} onBack={onBack} showGuest={false} />
      <ScreenFrame>
        <GradientSurface style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>What do you need?</Text>
            <Text style={styles.heroBody}>
              Please describe your request in detail. Our staff will respond as quickly as possible.
            </Text>
          </View>
        </GradientSurface>
        <Text style={styles.label}>Request Description *</Text>
        <Pressable onPress={() => setKeyboardOpen(current => !current)} style={[styles.input, keyboardOpen && styles.inputActive]}>
          <Text style={[styles.inputText, !description.trim() && styles.placeholder]} numberOfLines={5}>
            {description.trim() || 'Please describe your request in detail...'}
          </Text>
          <Text style={styles.inputIcon}>⌨️</Text>
        </Pressable>
        {keyboardOpen ? (
          <View style={styles.customKeyboard}>
            <View style={styles.quickGrid}>
              {category.examples.map(example => (
                <Pressable
                  key={example}
                  onPress={() => selectExample(example)}
                  style={({pressed}) => [
                    styles.quickButton,
                    description.includes(example) && styles.quickButtonActive,
                    pressed && styles.pressed,
                  ]}>
                  <Text style={styles.quickEmoji}>{category.icon}</Text>
                  <Text style={[styles.quickText, description.includes(example) && styles.quickTextActive]} numberOfLines={1}>
                    {example}
                  </Text>
                </Pressable>
              ))}
            </View>
            {descriptionKeys.map(rowKey => (
              <View key={rowKey} style={styles.keyRow}>
                {rowKey.split('').map(key => (
                  <Pressable
                    key={key}
                    onPress={() => addDescriptionCharacter(key)}
                    style={({pressed}) => [styles.key, pressed && styles.pressed]}>
                    <Text style={styles.keyText}>{key}</Text>
                  </Pressable>
                ))}
              </View>
            ))}
            <View style={styles.keyRow}>
              <Pressable onPress={() => addDescriptionCharacter(' ')} style={({pressed}) => [styles.spaceKey, pressed && styles.pressed]}>
                <Text style={styles.keyText}>space</Text>
              </Pressable>
              <Pressable onPress={removeDescriptionCharacter} style={({pressed}) => [styles.actionKey, pressed && styles.pressed]}>
                <Text style={styles.keyText}>⌫</Text>
              </Pressable>
              <Pressable onPress={() => setDescription('')} style={({pressed}) => [styles.actionKey, pressed && styles.pressed]}>
                <Text style={styles.keyText}>clear</Text>
              </Pressable>
              <Pressable onPress={() => setKeyboardOpen(false)} style={({pressed}) => [styles.actionKey, pressed && styles.pressed]}>
                <Text style={styles.keyText}>✓</Text>
              </Pressable>
            </View>
          </View>
        ) : null}
        <View style={styles.exampleCard}>
          <Text style={styles.exampleTitle}>Example requests:</Text>
          {category.examples.map(example => (
            <Text key={example} style={styles.exampleText}>
              • {example}
            </Text>
          ))}
        </View>
        <View style={styles.guestCard}>
          <Row label="Your Room" value={formatRoomLabel(profile.room)} gold />
          <Row label="Arrival Date" value={formatStayDateLabel(profile.stayDate)} />
          <Row label="Guest Notes" value={formatGuestNotesLabel(profile.notes)} />
          <Row label="Guest Name" value={profile.name} />
        </View>
        <GradientButton title="Submit Request" icon="✈️" disabled={!canSubmit} onPress={submit} />
      </ScreenFrame>
    </View>
  );
}

function Row({label, value, gold}: {label: string; value: string; gold?: boolean}): React.JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, gold && styles.gold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  hero: {
    minHeight: 124,
    borderRadius: layout.cardRadius,
    marginBottom: 18,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 23,
    fontWeight: '900',
  },
  heroBody: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
  },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 10,
  },
  input: {
    minHeight: 198,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#101010',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
  },
  inputText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    flex: 1,
  },
  inputActive: {
    borderColor: 'rgba(239, 48, 40, 0.5)',
  },
  placeholder: {
    color: colors.dim,
  },
  inputIcon: {
    fontSize: 16,
  },
  customKeyboard: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#101010',
    padding: 8,
    gap: 7,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 2,
  },
  quickButton: {
    width: '100%',
    minHeight: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 10,
  },
  quickButtonActive: {
    borderColor: colors.orange,
    backgroundColor: 'rgba(255, 139, 31, 0.16)',
  },
  quickEmoji: {
    fontSize: 14,
  },
  quickText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '900',
    flexShrink: 1,
  },
  quickTextActive: {
    color: colors.gold,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  key: {
    width: 24,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceKey: {
    flex: 1,
    height: 32,
    borderRadius: 9,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionKey: {
    width: 52,
    height: 32,
    borderRadius: 9,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.78,
  },
  exampleCard: {
    marginTop: 16,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 12,
  },
  exampleTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  exampleText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  guestCard: {
    marginVertical: 16,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 14,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  rowLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
  },
  rowValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'right',
    flexShrink: 1,
  },
  gold: {
    color: colors.gold,
  },
});
