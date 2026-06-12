import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {CompactTextKeyboard} from '../components/CompactTextKeyboard';
import {GradientButton} from '../components/GradientButton';
import {GradientSurface} from '../components/GradientSurface';
import {ScreenFrame} from '../components/ScreenFrame';
import {
  formatGuestNotesLabel,
  formatRoomLabel,
  formatStayDateLabel,
  formatStayTimeLabel,
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

type ActivePanel = 'examples' | 'priority' | 'timing' | 'details' | null;

const priorityOptions = ['Standard', 'High', 'Urgent'];
const timingOptions = [
  'As soon as possible',
  'Within 30 minutes',
  'Before evening',
  'After 6 PM',
];

export function RequestFormScreen({
  categoryId,
  setRequests,
  onBack,
  onSubmitted,
}: Props): React.JSX.Element {
  const {profile} = useGuestProfile();
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(priorityOptions[0]);
  const [timing, setTiming] = useState(timingOptions[0]);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const category = useMemo(
    () =>
      requestCategories.find(item => item.id === categoryId) ??
      requestCategories[0],
    [categoryId],
  );
  const canSubmit = description.trim().length >= 4;

  const togglePanel = (panel: Exclude<ActivePanel, null>) => {
    setActivePanel(current => (current === panel ? null : panel));
  };

  const submit = () => {
    if (!canSubmit) {
      return;
    }

    const nextRequest: GuestRequest = {
      id: `guest-request-${Date.now()}`,
      categoryId: category.id,
      title: category.title,
      description: buildSubmittedDescription(description, priority, timing),
      status: 'submitted',
      createdAtLabel: 'Just now',
      progress: 0.18,
      isUserCreated: true,
    };

    setRequests(current => [nextRequest, ...current]);
    setDescription('');
    setPriority(priorityOptions[0]);
    setTiming(timingOptions[0]);
    setActivePanel(null);
    onSubmitted();
  };

  const applySuggestion = (value: string) => {
    setDescription(current => {
      const trimmed = current.trim();

      if (!trimmed) {
        return value;
      }

      if (trimmed.includes(value)) {
        return trimmed;
      }

      return `${trimmed}, ${value}`.slice(0, 160);
    });
  };

  const selectSuggestion = (value: string) => {
    applySuggestion(value);
    setActivePanel(null);
  };

  const addDescriptionCharacter = (character: string) => {
    setDescription(current => `${current}${character}`.slice(0, 160));
  };

  const removeDescriptionCharacter = () => {
    setDescription(current => current.slice(0, -1));
  };

  return (
    <View style={styles.root}>
      <AppHeader title={category.title} onBack={onBack} showGuest={false} />
      <ScreenFrame>
        <GradientSurface style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>How can we help?</Text>
            <Text style={styles.heroBody}>
              Submit the request with enough detail for hotel staff to route it
              to the right team.
            </Text>
          </View>
        </GradientSurface>

        <View style={styles.dropdownStack}>
          <DropdownTrigger
            label="Common request"
            value="Choose a quick detail"
            active={activePanel === 'examples'}
            onPress={() => togglePanel('examples')}
          />
          {activePanel === 'examples' ? (
            <View style={styles.optionPanel}>
              {category.examples.map(example => (
                <DropdownOption
                  key={example}
                  label={example}
                  active={description.includes(example)}
                  onPress={() => selectSuggestion(example)}
                />
              ))}
            </View>
          ) : null}

          <View style={styles.dropdownRow}>
            <DropdownTrigger
              label="Priority"
              value={priority}
              active={activePanel === 'priority'}
              onPress={() => togglePanel('priority')}
              compact
            />
            <DropdownTrigger
              label="Needed"
              value={timing}
              active={activePanel === 'timing'}
              onPress={() => togglePanel('timing')}
              compact
            />
          </View>

          {activePanel === 'priority' ? (
            <View style={styles.optionPanelInline}>
              {priorityOptions.map(option => (
                <DropdownOption
                  key={option}
                  label={option}
                  active={priority === option}
                  onPress={() => {
                    setPriority(option);
                    setActivePanel(null);
                  }}
                />
              ))}
            </View>
          ) : null}

          {activePanel === 'timing' ? (
            <View style={styles.optionPanelInline}>
              {timingOptions.map(option => (
                <DropdownOption
                  key={option}
                  label={option}
                  active={timing === option}
                  onPress={() => {
                    setTiming(option);
                    setActivePanel(null);
                  }}
                />
              ))}
            </View>
          ) : null}
        </View>

        <Text style={styles.label}>Request details</Text>
        <Pressable
          onPress={() => togglePanel('details')}
          style={({pressed}) => [
            styles.input,
            activePanel === 'details' && styles.inputActive,
            pressed && styles.pressed,
          ]}>
          <Text
            style={[styles.inputText, !description.trim() && styles.placeholder]}
            numberOfLines={4}>
            {description.trim() || 'Describe what you need'}
          </Text>
          <Text style={styles.keyboardIcon}>⌨️</Text>
        </Pressable>
        {activePanel === 'details' ? (
          <CompactTextKeyboard
            onPressKey={addDescriptionCharacter}
            onBackspace={removeDescriptionCharacter}
            onClear={() => setDescription('')}
            onDone={() => setActivePanel(null)}
          />
        ) : null}

        <View style={styles.guestCard}>
          <Text style={styles.guestCardTitle}>Register details</Text>
          <Row label="Room" value={formatRoomLabel(profile.room)} gold />
          <Row label="Arrival" value={formatStayDateLabel(profile.stayDate)} />
          <Row label="Time" value={formatStayTimeLabel(profile.stayTime)} />
          <Row
            label="Guest Notes"
            value={formatGuestNotesLabel(profile.notes)}
          />
          <Row label="Guest" value={profile.name} />
        </View>
        <GradientButton
          title="Submit Request"
          disabled={!canSubmit}
          onPress={submit}
        />
      </ScreenFrame>
    </View>
  );
}

function buildSubmittedDescription(
  description: string,
  priority: string,
  timing: string,
): string {
  return `${description.trim()} · ${priority} priority · ${timing}`;
}

function DropdownTrigger({
  label,
  value,
  active,
  compact,
  onPress,
}: {
  label: string;
  value: string;
  active: boolean;
  compact?: boolean;
  onPress: () => void;
}): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.dropdownTrigger,
        compact && styles.dropdownTriggerCompact,
        active && styles.dropdownTriggerActive,
        pressed && styles.pressed,
      ]}>
      <View style={styles.dropdownCopy}>
        <Text style={styles.dropdownLabel}>{label}</Text>
        <Text style={styles.dropdownValue} numberOfLines={1}>
          {value}
        </Text>
      </View>
      <Text style={styles.dropdownChevron}>{active ? '⌃' : '⌄'}</Text>
    </Pressable>
  );
}

function DropdownOption({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.optionButton,
        active && styles.optionButtonActive,
        pressed && styles.pressed,
      ]}>
      <Text
        style={[styles.optionText, active && styles.optionTextActive]}
        numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

function Row({
  label,
  value,
  gold,
}: {
  label: string;
  value: string;
  gold?: boolean;
}): React.JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, gold && styles.gold]} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  hero: {
    minHeight: 112,
    borderRadius: layout.cardRadius,
    marginBottom: 14,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 18,
    gap: 10,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  heroBody: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
  },
  dropdownStack: {
    gap: 8,
    marginBottom: 14,
  },
  dropdownRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dropdownTrigger: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  dropdownTriggerCompact: {
    flex: 1,
  },
  dropdownTriggerActive: {
    borderColor: colors.orange,
    backgroundColor: 'rgba(255, 139, 31, 0.16)',
  },
  dropdownCopy: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  dropdownLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  dropdownValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  dropdownChevron: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '900',
  },
  optionPanel: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#101010',
    padding: 8,
    gap: 8,
  },
  optionPanelInline: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#101010',
    padding: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    minHeight: 38,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  optionButtonActive: {
    borderColor: colors.orange,
    backgroundColor: 'rgba(255, 139, 31, 0.18)',
  },
  optionText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '900',
  },
  optionTextActive: {
    color: colors.gold,
  },
  label: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 10,
  },
  input: {
    minHeight: 122,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#101010',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
  },
  inputActive: {
    borderColor: colors.orange,
    backgroundColor: 'rgba(255, 139, 31, 0.08)',
  },
  inputText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '800',
    flex: 1,
  },
  placeholder: {
    color: colors.dim,
  },
  keyboardIcon: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 22,
  },
  guestCard: {
    marginVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 12,
    gap: 8,
  },
  guestCardTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  rowLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  rowValue: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '900',
    textAlign: 'right',
    flex: 1,
  },
  gold: {
    color: colors.gold,
  },
  pressed: {
    opacity: 0.78,
  },
});
