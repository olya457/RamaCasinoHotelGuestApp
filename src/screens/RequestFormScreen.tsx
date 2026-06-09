import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {GradientSurface} from '../components/GradientSurface';
import {ScreenFrame} from '../components/ScreenFrame';
import {requestCategories} from '../data/requests';
import {colors, layout} from '../theme/theme';
import type {GuestRequest, RequestCategoryId} from '../types/app';

type Props = {
  categoryId: RequestCategoryId;
  setRequests: React.Dispatch<React.SetStateAction<GuestRequest[]>>;
  onBack: () => void;
  onSubmitted: () => void;
};

export function RequestFormScreen({categoryId, setRequests, onBack, onSubmitted}: Props): React.JSX.Element {
  const [description, setDescription] = useState('');
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
    };
    setRequests(current => [nextRequest, ...current]);
    setDescription('');
    onSubmitted();
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
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Please describe your request in detail..."
          placeholderTextColor={colors.dim}
          multiline
          style={[styles.input, canSubmit && styles.inputActive]}
        />
        <View style={styles.exampleCard}>
          <Text style={styles.exampleTitle}>Example requests:</Text>
          {category.examples.map(example => (
            <Text key={example} style={styles.exampleText}>
              • {example}
            </Text>
          ))}
        </View>
        <View style={styles.guestCard}>
          <Row label="Your Room" value="2024" gold />
          <Row label="Guest Name" value="Demo Guest" />
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
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
    padding: 14,
    textAlignVertical: 'top',
  },
  inputActive: {
    borderColor: 'rgba(239, 48, 40, 0.5)',
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
