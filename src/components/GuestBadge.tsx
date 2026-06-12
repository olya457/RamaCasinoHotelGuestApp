import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  formatGuestNotesLabel,
  formatRoomLabel,
  formatStayDateLabel,
  formatStayTimeLabel,
  useGuestProfile,
} from '../context/GuestProfileContext';
import {colors, layout} from '../theme/theme';
import {GuestProfileForm, type GuestProfileDraft} from './GuestProfileForm';

function createDraft(profile: {
  name: string;
  room: string;
  stayDate?: string;
  stayTime?: string;
  notes?: string;
}): GuestProfileDraft {
  return {
    name: profile.name,
    room: profile.room,
    stayDate: profile.stayDate ?? '',
    stayTime: profile.stayTime ?? '',
    notes: profile.notes ?? '',
  };
}

export function GuestBadge(): React.JSX.Element {
  const {height, width} = useWindowDimensions();
  const compact = width <= 375 || height <= 720;
  const {profile, setProfile} = useGuestProfile();
  const [visible, setVisible] = useState(false);
  const [draft, setDraft] = useState<GuestProfileDraft>(createDraft(profile));

  const normalizedName = draft.name.trim();
  const normalizedRoom = draft.room.trim().replace(/^room\s+/i, '');
  const canSave = normalizedName.length >= 2 && normalizedRoom.length >= 2;

  const openEditor = () => {
    setDraft(createDraft(profile));
    setVisible(true);
  };

  const patchDraft = (patch: Partial<GuestProfileDraft>) => {
    setDraft(current => ({...current, ...patch}));
  };

  const saveProfile = () => {
    if (!canSave) {
      return;
    }

    setProfile({
      name: normalizedName,
      room: normalizedRoom,
      stayDate: draft.stayDate.trim(),
      stayTime: draft.stayTime.trim(),
      notes: draft.notes.trim(),
    });
    setVisible(false);
  };

  return (
    <>
      <Pressable
        onPress={openEditor}
        style={({pressed}) => [
          styles.badge,
          compact && styles.badgeCompact,
          pressed && styles.pressed,
        ]}>
        <View style={styles.copy}>
          <Text
            style={[styles.name, compact && styles.nameCompact]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.68}>
            {profile.name || 'Set up stay'}
          </Text>
          <Text
            style={[styles.room, compact && styles.roomCompact]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.68}>
            {formatRoomLabel(profile.room)}
          </Text>
        </View>
        <Text style={[styles.edit, compact && styles.editCompact]}>Edit</Text>
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}>
        <View style={styles.modalRoot}>
          <Pressable style={styles.scrim} onPress={() => setVisible(false)} />
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <View style={styles.titleBlock}>
                <Text style={styles.modalTitle}>Guest Profile</Text>
                <Text style={styles.modalSubtitle}>
                  Used for orders, requests, and room controls.
                </Text>
              </View>
              <Pressable
                onPress={() => setVisible(false)}
                style={({pressed}) => [
                  styles.closeButton,
                  pressed && styles.pressed,
                ]}>
                <Text style={styles.closeText}>x</Text>
              </Pressable>
            </View>

            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <GuestProfileForm
                {...draft}
                onChange={patchDraft}
                showSummary
              />

              <View style={styles.previewCard}>
                <Row
                  label="Room"
                  value={formatRoomLabel(normalizedRoom)}
                  gold
                />
                <Row
                  label="Arrival"
                  value={formatStayDateLabel(draft.stayDate)}
                />
                <Row
                  label="Time"
                  value={formatStayTimeLabel(draft.stayTime)}
                />
                <Row
                  label="Notes"
                  value={formatGuestNotesLabel(draft.notes)}
                />
              </View>
            </ScrollView>

            <View style={styles.actions}>
              <Pressable
                onPress={() => setVisible(false)}
                style={({pressed}) => [
                  styles.secondaryButton,
                  pressed && styles.pressed,
                ]}>
                <Text style={styles.secondaryText}>Cancel</Text>
              </Pressable>
              <Pressable
                disabled={!canSave}
                onPress={saveProfile}
                style={({pressed}) => [
                  styles.saveButton,
                  !canSave && styles.saveButtonDisabled,
                  pressed && styles.pressed,
                ]}>
                <Text
                  style={[
                    styles.saveText,
                    !canSave && styles.saveTextDisabled,
                  ]}>
                  Save Profile
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  badge: {
    minWidth: 132,
    maxWidth: 178,
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeCompact: {
    minWidth: 116,
    maxWidth: 142,
    minHeight: 48,
    paddingHorizontal: 10,
    gap: 6,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '900',
  },
  nameCompact: {
    fontSize: 12,
    lineHeight: 15,
  },
  room: {
    color: colors.gold,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '900',
  },
  roomCompact: {
    fontSize: 11,
    lineHeight: 14,
  },
  edit: {
    color: colors.orange,
    fontSize: 12,
    fontWeight: '900',
  },
  editCompact: {
    fontSize: 11,
  },
  modalRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: layout.topInset + 20,
    paddingHorizontal: 20,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.66)',
  },
  sheet: {
    width: '100%',
    maxWidth: 380,
    maxHeight: '84%',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceHigh,
    padding: 14,
    gap: 12,
  },
  sheetHeader: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleBlock: {
    flex: 1,
    gap: 4,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  modalSubtitle: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '900',
  },
  scroll: {
    flexGrow: 0,
  },
  scrollContent: {
    gap: 12,
    paddingBottom: 2,
  },
  previewCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#101010',
    padding: 12,
    gap: 8,
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
    fontWeight: '900',
    flex: 1,
    textAlign: 'right',
  },
  gold: {
    color: colors.gold,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: colors.surfaceSoft,
  },
  secondaryText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  saveText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  saveTextDisabled: {
    color: colors.dim,
  },
  pressed: {
    opacity: 0.78,
  },
});
