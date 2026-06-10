import React, {useState} from 'react';
import {Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {
  formatGuestNotesLabel,
  formatRoomLabel,
  formatStayDateLabel,
  useGuestProfile,
} from '../context/GuestProfileContext';
import {colors, layout} from '../theme/theme';

const nameKeys = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
const noteKeys = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
const roomFloors = ['1', '2', '3', '4', '5', '6', '7', '8'];
const roomNumbers = Array.from({length: 24}, (_, index) => padNumber(index + 1));
const specialRooms = [
  {emoji: '✨', value: 'Suite'},
  {emoji: '⭐', value: 'VIP'},
];
const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const noteOptions = [
  {emoji: '🤫', value: 'Quiet room'},
  {emoji: '🛏️', value: 'Extra pillows'},
  {emoji: '🌿', value: 'No feather pillows'},
  {emoji: '⬆️', value: 'High floor'},
  {emoji: '🕒', value: 'Late checkout'},
  {emoji: '🎉', value: 'Celebration setup'},
];

type ActiveInput = 'name' | 'room' | 'date' | 'notes' | null;

function padNumber(value: number): string {
  return value.toString().padStart(2, '0');
}

function formatDateValue(date: Date): string {
  return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
}

function parseDateValue(value?: string): Date {
  const date = value ? new Date(`${value}T12:00:00`) : new Date();

  if (Number.isNaN(date.getTime())) {
    return new Date();
  }

  return date;
}

function addMonths(date: Date, amount: number): Date {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + amount);
  nextDate.setDate(1);
  return nextDate;
}

function createCalendarDays(monthDate: Date): Array<{key: string; day?: number; value?: string}> {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const blanks = Array.from({length: firstDay}, (_, index) => ({key: `blank-${index}`}));
  const days = Array.from({length: daysInMonth}, (_, index) => {
    const day = index + 1;
    return {
      key: `${year}-${month}-${day}`,
      day,
      value: formatDateValue(new Date(year, month, day, 12)),
    };
  });

  return [...blanks, ...days];
}

function resolveFloor(room: string): string {
  const match = room.trim().match(/^([1-8])\d{2}$/);

  return match?.[1] ?? '1';
}

export function GuestBadge(): React.JSX.Element {
  const {height, width} = useWindowDimensions();
  const compact = width <= 375 || height <= 720;
  const {profile, setProfile} = useGuestProfile();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(profile.name);
  const [room, setRoom] = useState(profile.room === '2024' ? '' : profile.room);
  const [selectedFloor, setSelectedFloor] = useState(resolveFloor(profile.room));
  const [stayDate, setStayDate] = useState(profile.stayDate ?? '');
  const [calendarMonth, setCalendarMonth] = useState(parseDateValue(profile.stayDate));
  const [notes, setNotes] = useState(profile.notes ?? '');
  const [activeInput, setActiveInput] = useState<ActiveInput>(null);
  const calendarDays = createCalendarDays(calendarMonth);
  const monthTitle = calendarMonth.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});

  const openEditor = () => {
    setName(profile.name);
    setRoom(profile.room === '2024' ? '' : profile.room);
    setSelectedFloor(resolveFloor(profile.room));
    setStayDate(profile.stayDate ?? '');
    setCalendarMonth(parseDateValue(profile.stayDate));
    setNotes(profile.notes ?? '');
    setActiveInput(null);
    setVisible(true);
  };

  const saveProfile = () => {
    const nextName = name.trim() || 'Hotel Guest';
    const nextRoom = room.trim().replace(/^room\s+/i, '');
    setProfile({name: nextName, room: nextRoom, stayDate, notes: notes.trim()});
    setVisible(false);
  };

  const addNameCharacter = (character: string) => {
    setName(current => `${current}${character}`.slice(0, 18));
  };

  const removeNameCharacter = () => {
    setName(current => current.slice(0, -1));
  };

  const addNoteCharacter = (character: string) => {
    setNotes(current => `${current}${character}`.slice(0, 48));
  };

  const removeNoteCharacter = () => {
    setNotes(current => current.slice(0, -1));
  };

  const selectNote = (value: string) => {
    setNotes(current => {
      const trimmed = current.trim();

      if (!trimmed) {
        return value;
      }

      if (trimmed.includes(value)) {
        return trimmed;
      }

      return `${trimmed}, ${value}`.slice(0, 48);
    });
  };

  const toggleInput = (input: Exclude<ActiveInput, null>) => {
    setActiveInput(current => (current === input ? null : input));
  };

  return (
    <>
      <Pressable onPress={openEditor} style={({pressed}) => [styles.badge, compact && styles.badgeCompact, pressed && styles.pressed]}>
        <View style={styles.copy}>
          <Text style={[styles.name, compact && styles.nameCompact]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.68}>
            {profile.name}
          </Text>
          <Text style={[styles.room, compact && styles.roomCompact]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.68}>
            {formatRoomLabel(profile.room)}
          </Text>
        </View>
        <Text style={[styles.edit, compact && styles.editCompact]}>✏️</Text>
      </Pressable>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <View style={styles.modalRoot}>
          <Pressable style={styles.scrim} onPress={() => setVisible(false)} />
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.modalTitle}>Guest Register</Text>
              <Pressable onPress={() => setVisible(false)} style={({pressed}) => [styles.closeButton, pressed && styles.pressed]}>
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View style={styles.field}>
                <Text style={styles.label}>Name</Text>
                <Pressable onPress={() => toggleInput('name')} style={[styles.inputField, activeInput === 'name' && styles.inputFieldActive]}>
                  <Text style={[styles.nameValue, !name.trim() && styles.placeholder]} numberOfLines={1}>
                    {name.trim() || 'Guest name'}
                  </Text>
                  <Text style={styles.keyboardIcon}>⌨️</Text>
                </Pressable>
                {activeInput === 'name' ? (
                  <View style={styles.keyboard}>
                    {nameKeys.map(row => (
                      <View key={row} style={styles.keyRow}>
                        {row.split('').map(key => (
                          <Pressable
                            key={key}
                            onPress={() => addNameCharacter(key)}
                            style={({pressed}) => [styles.key, pressed && styles.pressed]}>
                            <Text style={styles.keyText}>{key}</Text>
                          </Pressable>
                        ))}
                      </View>
                    ))}
                    <View style={styles.keyRow}>
                      <Pressable onPress={() => addNameCharacter(' ')} style={({pressed}) => [styles.spaceKey, pressed && styles.pressed]}>
                        <Text style={styles.keyText}>space</Text>
                      </Pressable>
                      <Pressable onPress={removeNameCharacter} style={({pressed}) => [styles.actionKey, pressed && styles.pressed]}>
                        <Text style={styles.keyText}>⌫</Text>
                      </Pressable>
                      <Pressable onPress={() => setActiveInput(null)} style={({pressed}) => [styles.actionKey, pressed && styles.pressed]}>
                        <Text style={styles.keyText}>✓</Text>
                      </Pressable>
                    </View>
                  </View>
                ) : null}
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Room</Text>
                <Pressable onPress={() => toggleInput('room')} style={[styles.inputField, activeInput === 'room' && styles.inputFieldActive]}>
                  <Text style={[styles.nameValue, !room.trim() && styles.placeholder]} numberOfLines={1}>
                    {formatRoomLabel(room)}
                  </Text>
                  <Text style={styles.keyboardIcon}>🔑</Text>
                </Pressable>
                {activeInput === 'room' ? (
                  <View style={styles.pickerPanel}>
                    <View style={styles.floorRail}>
                      {roomFloors.map(floor => (
                        <Pressable
                          key={floor}
                          onPress={() => setSelectedFloor(floor)}
                          style={({pressed}) => [styles.floorButton, selectedFloor === floor && styles.optionActive, pressed && styles.pressed]}>
                          <Text style={[styles.floorText, selectedFloor === floor && styles.optionTextActive]}>{floor}</Text>
                        </Pressable>
                      ))}
                    </View>
                    <View style={styles.roomGrid}>
                      {roomNumbers.map(roomNumber => {
                        const value = `${selectedFloor}${roomNumber}`;
                        const active = room === value;

                        return (
                          <Pressable
                            key={value}
                            onPress={() => setRoom(value)}
                            style={({pressed}) => [styles.roomButton, active && styles.optionActive, pressed && styles.pressed]}>
                            <Text style={styles.optionEmoji}>🔑</Text>
                            <Text style={[styles.optionText, active && styles.optionTextActive]} numberOfLines={1}>
                              {value}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                    <View style={styles.specialRoomRow}>
                      {specialRooms.map(option => {
                        const active = room === option.value;

                        return (
                          <Pressable
                            key={option.value}
                            onPress={() => setRoom(option.value)}
                            style={({pressed}) => [styles.specialRoomButton, active && styles.optionActive, pressed && styles.pressed]}>
                            <Text style={styles.optionEmoji}>{option.emoji}</Text>
                            <Text style={[styles.optionText, active && styles.optionTextActive]} numberOfLines={1}>
                              {option.value}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                ) : null}
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Arrival Date</Text>
                <Pressable onPress={() => toggleInput('date')} style={[styles.inputField, activeInput === 'date' && styles.inputFieldActive]}>
                  <Text style={[styles.nameValue, !stayDate.trim() && styles.placeholder]} numberOfLines={1}>
                    {formatStayDateLabel(stayDate)}
                  </Text>
                  <Text style={styles.keyboardIcon}>📅</Text>
                </Pressable>
                {activeInput === 'date' ? (
                  <View style={styles.calendar}>
                    <View style={styles.calendarHeader}>
                      <Pressable onPress={() => setCalendarMonth(current => addMonths(current, -1))} style={({pressed}) => [styles.monthButton, pressed && styles.pressed]}>
                        <Text style={styles.monthButtonText}>‹</Text>
                      </Pressable>
                      <Text style={styles.monthTitle}>{monthTitle}</Text>
                      <Pressable onPress={() => setCalendarMonth(current => addMonths(current, 1))} style={({pressed}) => [styles.monthButton, pressed && styles.pressed]}>
                        <Text style={styles.monthButtonText}>›</Text>
                      </Pressable>
                    </View>
                    <View style={styles.weekRow}>
                      {weekDays.map((day, index) => (
                        <Text key={`${day}-${index}`} style={styles.weekDay}>
                          {day}
                        </Text>
                      ))}
                    </View>
                    <View style={styles.calendarGrid}>
                      {calendarDays.map(day =>
                        day.value ? (
                          <Pressable
                            key={day.key}
                            onPress={() => setStayDate(day.value ?? '')}
                            style={({pressed}) => [
                              styles.calendarDay,
                              stayDate === day.value && styles.optionActive,
                              pressed && styles.pressed,
                            ]}>
                            <Text style={[styles.calendarDayText, stayDate === day.value && styles.optionTextActive]}>
                              {day.day}
                            </Text>
                          </Pressable>
                        ) : (
                          <View key={day.key} style={styles.calendarBlank} />
                        ),
                      )}
                    </View>
                    <Text style={styles.calendarSelection} numberOfLines={1}>
                      📅 {formatStayDateLabel(stayDate)}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Guest Notes</Text>
                <Pressable onPress={() => toggleInput('notes')} style={[styles.notesField, activeInput === 'notes' && styles.inputFieldActive]}>
                  <Text style={[styles.notesValue, !notes.trim() && styles.placeholder]} numberOfLines={2}>
                    {notes.trim() || 'Add client wishes'}
                  </Text>
                  <Text style={styles.keyboardIcon}>⌨️</Text>
                </Pressable>
                {activeInput === 'notes' ? (
                  <>
                    <View style={styles.noteGrid}>
                      {noteOptions.map(option => (
                        <Pressable
                          key={option.value}
                          onPress={() => selectNote(option.value)}
                          style={({pressed}) => [styles.noteButton, notes.includes(option.value) && styles.optionActive, pressed && styles.pressed]}>
                          <Text style={styles.noteEmoji}>{option.emoji}</Text>
                          <Text style={[styles.noteText, notes.includes(option.value) && styles.optionTextActive]} numberOfLines={1}>
                            {option.value}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                    <View style={styles.keyboard}>
                      {noteKeys.map(row => (
                        <View key={row} style={styles.keyRow}>
                          {row.split('').map(key => (
                            <Pressable
                              key={key}
                              onPress={() => addNoteCharacter(key)}
                              style={({pressed}) => [styles.key, pressed && styles.pressed]}>
                              <Text style={styles.keyText}>{key}</Text>
                            </Pressable>
                          ))}
                        </View>
                      ))}
                      <View style={styles.keyRow}>
                        <Pressable onPress={() => addNoteCharacter(' ')} style={({pressed}) => [styles.spaceKey, pressed && styles.pressed]}>
                          <Text style={styles.keyText}>space</Text>
                        </Pressable>
                        <Pressable onPress={removeNoteCharacter} style={({pressed}) => [styles.actionKey, pressed && styles.pressed]}>
                          <Text style={styles.keyText}>⌫</Text>
                        </Pressable>
                        <Pressable onPress={() => setNotes('')} style={({pressed}) => [styles.actionKey, pressed && styles.pressed]}>
                          <Text style={styles.keyText}>clear</Text>
                        </Pressable>
                        <Pressable onPress={() => setActiveInput(null)} style={({pressed}) => [styles.actionKey, pressed && styles.pressed]}>
                          <Text style={styles.keyText}>✓</Text>
                        </Pressable>
                      </View>
                    </View>
                  </>
                ) : null}
              </View>
            </ScrollView>
            <View style={styles.summary}>
              <Text style={styles.summaryText} numberOfLines={1}>
                {formatRoomLabel(room)} · {formatStayDateLabel(stayDate)} · {formatGuestNotesLabel(notes)}
              </Text>
            </View>
            <View style={styles.actions}>
              <Pressable onPress={() => setVisible(false)} style={({pressed}) => [styles.secondaryButton, pressed && styles.pressed]}>
                <Text style={styles.secondaryText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={saveProfile} style={({pressed}) => [styles.primaryButton, pressed && styles.pressed]}>
                <Text style={styles.primaryText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 136,
    minHeight: 58,
    paddingLeft: 12,
    paddingRight: 34,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  badgeCompact: {
    width: 118,
    minHeight: 50,
    paddingLeft: 10,
    paddingRight: 28,
    borderRadius: 14,
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
    textAlign: 'center',
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
    textAlign: 'center',
  },
  roomCompact: {
    fontSize: 11,
    lineHeight: 14,
  },
  edit: {
    position: 'absolute',
    right: 9,
    color: colors.muted,
    fontSize: 18,
    lineHeight: 22,
  },
  editCompact: {
    right: 7,
    fontSize: 16,
    lineHeight: 20,
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
    maxWidth: 360,
    maxHeight: '82%',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceHigh,
    padding: 14,
    gap: 10,
  },
  sheetHeader: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
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
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '700',
  },
  scroll: {
    flexGrow: 0,
  },
  scrollContent: {
    gap: 12,
    paddingBottom: 2,
  },
  field: {
    gap: 8,
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '900',
  },
  inputField: {
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#101010',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  inputFieldActive: {
    borderColor: colors.orange,
    backgroundColor: 'rgba(255, 139, 31, 0.1)',
  },
  notesField: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#101010',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  nameValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    flex: 1,
  },
  notesValue: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
    flex: 1,
  },
  placeholder: {
    color: colors.dim,
  },
  keyboardIcon: {
    fontSize: 16,
  },
  keyboard: {
    borderRadius: 16,
    backgroundColor: '#111111',
    padding: 8,
    gap: 6,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  key: {
    width: 24,
    height: 29,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceKey: {
    flex: 1,
    height: 31,
    borderRadius: 9,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionKey: {
    width: 54,
    height: 31,
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
  pickerPanel: {
    borderRadius: 16,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    gap: 10,
  },
  floorRail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  floorButton: {
    flex: 1,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floorText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '900',
  },
  roomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roomButton: {
    width: '22.6%',
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  specialRoomRow: {
    flexDirection: 'row',
    gap: 8,
  },
  specialRoomButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 14,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  calendar: {
    borderRadius: 16,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    gap: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  monthButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthButtonText: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 28,
    fontWeight: '900',
  },
  monthTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    flex: 1,
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekDay: {
    width: '13%',
    color: colors.dim,
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 6,
  },
  calendarDay: {
    width: '13%',
    height: 34,
    borderRadius: 12,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarBlank: {
    width: '13%',
    height: 34,
  },
  calendarDayText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  calendarSelection: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
  },
  noteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  noteButton: {
    width: '48.6%',
    minHeight: 42,
    borderRadius: 14,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 8,
  },
  noteEmoji: {
    fontSize: 15,
  },
  noteText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '900',
    flexShrink: 1,
  },
  optionActive: {
    borderColor: colors.orange,
    backgroundColor: 'rgba(255, 139, 31, 0.18)',
  },
  optionEmoji: {
    fontSize: 16,
  },
  optionText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '900',
  },
  optionTextActive: {
    color: colors.gold,
  },
  summary: {
    minHeight: 34,
    borderRadius: 12,
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  summaryText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
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
  primaryButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  primaryText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.78,
  },
});
