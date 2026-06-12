import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  formatGuestNotesLabel,
  formatRoomLabel,
  formatStayDateLabel,
  formatStayTimeLabel,
} from '../context/GuestProfileContext';
import {colors} from '../theme/theme';

const nameKeys = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
const noteKeys = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
const roomFloors = ['1', '2', '3', '4', '5', '6', '7', '8'];
const roomNumbers = Array.from({length: 24}, (_, index) =>
  padNumber(index + 1),
);
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
const timeOptions = createTimeOptions();

type ActiveInput = 'name' | 'room' | 'date' | 'time' | 'notes' | null;

export type GuestProfileDraft = {
  name: string;
  room: string;
  stayDate: string;
  stayTime: string;
  notes: string;
};

type Props = GuestProfileDraft & {
  onChange: (patch: Partial<GuestProfileDraft>) => void;
  showSummary?: boolean;
};

function padNumber(value: number): string {
  return value.toString().padStart(2, '0');
}

function formatDateValue(date: Date): string {
  return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(
    date.getDate(),
  )}`;
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
  nextDate.setDate(1);
  nextDate.setMonth(nextDate.getMonth() + amount);
  return nextDate;
}

function createCalendarDays(
  monthDate: Date,
): Array<{key: string; day?: number; value?: string}> {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const blanks = Array.from({length: firstDay}, (_, index) => ({
    key: `blank-${index}`,
  }));
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

function createTimeOptions(): string[] {
  const options: string[] = [];

  for (let hour = 8; hour <= 23; hour += 1) {
    options.push(`${padNumber(hour)}:00`);
  }

  return options;
}

function resolveFloor(room: string): string {
  const match = room.trim().match(/^([1-8])\d{2}$/);

  return match?.[1] ?? '1';
}

export function GuestProfileForm({
  name,
  room,
  stayDate,
  stayTime,
  notes,
  onChange,
  showSummary = false,
}: Props): React.JSX.Element {
  const [activeInput, setActiveInput] = useState<ActiveInput>(null);
  const [selectedFloor, setSelectedFloor] = useState(resolveFloor(room));
  const [calendarMonth, setCalendarMonth] = useState(parseDateValue(stayDate));
  const calendarDays = createCalendarDays(calendarMonth);
  const monthTitle = calendarMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    setSelectedFloor(resolveFloor(room));
  }, [room]);

  useEffect(() => {
    if (stayDate) {
      setCalendarMonth(parseDateValue(stayDate));
    }
  }, [stayDate]);

  const toggleInput = (input: Exclude<ActiveInput, null>) => {
    setActiveInput(current => (current === input ? null : input));
  };

  const addNameCharacter = (character: string) => {
    onChange({name: `${name}${character}`.slice(0, 28)});
  };

  const removeNameCharacter = () => {
    onChange({name: name.slice(0, -1)});
  };

  const addNoteCharacter = (character: string) => {
    onChange({notes: `${notes}${character}`.slice(0, 96)});
  };

  const removeNoteCharacter = () => {
    onChange({notes: notes.slice(0, -1)});
  };

  const selectNote = (value: string) => {
    const trimmed = notes.trim();

    if (!trimmed) {
      onChange({notes: value});
      return;
    }

    if (trimmed.includes(value)) {
      onChange({notes: trimmed});
      return;
    }

    onChange({notes: `${trimmed}, ${value}`.slice(0, 96)});
  };

  return (
    <View style={styles.stack}>
      <View style={styles.field}>
        <Text style={styles.label}>Full name</Text>
        <Pressable
          onPress={() => toggleInput('name')}
          style={({pressed}) => [
            styles.inputField,
            activeInput === 'name' && styles.inputFieldActive,
            pressed && styles.pressed,
          ]}>
          <Text
            style={[styles.value, !name.trim() && styles.placeholder]}
            numberOfLines={1}>
            {name.trim() || 'Guest name'}
          </Text>
          <Text style={styles.inputIcon}>⌨️</Text>
        </Pressable>
        {activeInput === 'name' ? (
          <CompactKeyboard
            rows={nameKeys}
            onPressKey={addNameCharacter}
            onBackspace={removeNameCharacter}
            onDone={() => setActiveInput(null)}
          />
        ) : null}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Room or suite</Text>
        <Pressable
          onPress={() => toggleInput('room')}
          style={({pressed}) => [
            styles.inputField,
            activeInput === 'room' && styles.inputFieldActive,
            pressed && styles.pressed,
          ]}>
          <Text
            style={[styles.value, !room.trim() && styles.placeholder]}
            numberOfLines={1}>
            {formatRoomLabel(room)}
          </Text>
          <Text style={styles.inputIcon}>🔑</Text>
        </Pressable>
        {activeInput === 'room' ? (
          <View style={styles.pickerPanel}>
            <View style={styles.floorRail}>
              {roomFloors.map(floor => (
                <Pressable
                  key={floor}
                  onPress={() => setSelectedFloor(floor)}
                  style={({pressed}) => [
                    styles.floorButton,
                    selectedFloor === floor && styles.optionActive,
                    pressed && styles.pressed,
                  ]}>
                  <Text
                    style={[
                      styles.floorText,
                      selectedFloor === floor && styles.optionTextActive,
                    ]}>
                    {floor}
                  </Text>
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
                    onPress={() => onChange({room: value})}
                    style={({pressed}) => [
                      styles.roomButton,
                      active && styles.optionActive,
                      pressed && styles.pressed,
                    ]}>
                    <Text style={styles.optionEmoji}>🔑</Text>
                    <Text
                      style={[
                        styles.optionText,
                        active && styles.optionTextActive,
                      ]}
                      numberOfLines={1}>
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
                    onPress={() => onChange({room: option.value})}
                    style={({pressed}) => [
                      styles.specialRoomButton,
                      active && styles.optionActive,
                      pressed && styles.pressed,
                    ]}>
                    <Text style={styles.optionEmoji}>{option.emoji}</Text>
                    <Text
                      style={[
                        styles.optionText,
                        active && styles.optionTextActive,
                      ]}
                      numberOfLines={1}>
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
        <Text style={styles.label}>Arrival date</Text>
        <Pressable
          onPress={() => toggleInput('date')}
          style={({pressed}) => [
            styles.inputField,
            activeInput === 'date' && styles.inputFieldActive,
            pressed && styles.pressed,
          ]}>
          <Text
            style={[styles.value, !stayDate.trim() && styles.placeholder]}
            numberOfLines={1}>
            {formatStayDateLabel(stayDate)}
          </Text>
          <Text style={styles.inputIcon}>📅</Text>
        </Pressable>
        {activeInput === 'date' ? (
          <View style={styles.calendar}>
            <View style={styles.calendarHeader}>
              <Pressable
                onPress={() => setCalendarMonth(current => addMonths(current, -1))}
                style={({pressed}) => [styles.monthButton, pressed && styles.pressed]}>
                <Text style={styles.monthButtonText}>‹</Text>
              </Pressable>
              <Text style={styles.monthTitle}>{monthTitle}</Text>
              <Pressable
                onPress={() => setCalendarMonth(current => addMonths(current, 1))}
                style={({pressed}) => [styles.monthButton, pressed && styles.pressed]}>
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
                    onPress={() => onChange({stayDate: day.value ?? ''})}
                    style={({pressed}) => [
                      styles.calendarDay,
                      stayDate === day.value && styles.optionActive,
                      pressed && styles.pressed,
                    ]}>
                    <Text
                      style={[
                        styles.calendarDayText,
                        stayDate === day.value && styles.optionTextActive,
                      ]}>
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
        <Text style={styles.label}>Arrival time</Text>
        <Pressable
          onPress={() => toggleInput('time')}
          style={({pressed}) => [
            styles.inputField,
            activeInput === 'time' && styles.inputFieldActive,
            pressed && styles.pressed,
          ]}>
          <Text
            style={[styles.value, !stayTime.trim() && styles.placeholder]}
            numberOfLines={1}>
            {formatStayTimeLabel(stayTime)}
          </Text>
          <Text style={styles.inputIcon}>🕒</Text>
        </Pressable>
        {activeInput === 'time' ? (
          <View style={styles.timeGrid}>
            {timeOptions.map(option => {
              const active = stayTime === option;

              return (
                <Pressable
                  key={option}
                  onPress={() => onChange({stayTime: option})}
                  style={({pressed}) => [
                    styles.timeButton,
                    active && styles.optionActive,
                    pressed && styles.pressed,
                  ]}>
                  <Text
                    style={[
                      styles.timeText,
                      active && styles.optionTextActive,
                    ]}
                    numberOfLines={1}>
                    {formatStayTimeLabel(option)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Stay notes</Text>
        <Pressable
          onPress={() => toggleInput('notes')}
          style={({pressed}) => [
            styles.notesField,
            activeInput === 'notes' && styles.inputFieldActive,
            pressed && styles.pressed,
          ]}>
          <Text
            style={[styles.notesValue, !notes.trim() && styles.placeholder]}
            numberOfLines={2}>
            {notes.trim() || 'Accessibility, pillow, or checkout notes'}
          </Text>
          <Text style={styles.inputIcon}>⌨️</Text>
        </Pressable>
        {activeInput === 'notes' ? (
          <>
            <View style={styles.noteGrid}>
              {noteOptions.map(option => {
                const active = notes.includes(option.value);

                return (
                  <Pressable
                    key={option.value}
                    onPress={() => selectNote(option.value)}
                    style={({pressed}) => [
                      styles.noteButton,
                      active && styles.optionActive,
                      pressed && styles.pressed,
                    ]}>
                    <Text style={styles.noteEmoji}>{option.emoji}</Text>
                    <Text
                      style={[
                        styles.noteText,
                        active && styles.optionTextActive,
                      ]}
                      numberOfLines={1}>
                      {option.value}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <CompactKeyboard
              rows={noteKeys}
              onPressKey={addNoteCharacter}
              onBackspace={removeNoteCharacter}
              onClear={() => onChange({notes: ''})}
              onDone={() => setActiveInput(null)}
            />
          </>
        ) : null}
      </View>

      {showSummary ? (
        <View style={styles.summary}>
          <Text style={styles.summaryText} numberOfLines={2}>
            {formatRoomLabel(room)} · {formatStayDateLabel(stayDate)} ·{' '}
            {formatStayTimeLabel(stayTime)} · {formatGuestNotesLabel(notes)}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

function CompactKeyboard({
  rows,
  onPressKey,
  onBackspace,
  onClear,
  onDone,
}: {
  rows: string[];
  onPressKey: (key: string) => void;
  onBackspace: () => void;
  onClear?: () => void;
  onDone: () => void;
}): React.JSX.Element {
  return (
    <View style={styles.keyboard}>
      {rows.map(row => (
        <View key={row} style={styles.keyRow}>
          {row.split('').map(key => (
            <Pressable
              key={key}
              onPress={() => onPressKey(key)}
              style={({pressed}) => [styles.key, pressed && styles.pressed]}>
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          ))}
        </View>
      ))}
      <View style={styles.keyRow}>
        <Pressable
          onPress={() => onPressKey(' ')}
          style={({pressed}) => [styles.spaceKey, pressed && styles.pressed]}>
          <Text style={styles.keyText}>space</Text>
        </Pressable>
        <Pressable
          onPress={onBackspace}
          style={({pressed}) => [styles.actionKey, pressed && styles.pressed]}>
          <Text style={styles.keyText}>⌫</Text>
        </Pressable>
        {onClear ? (
          <Pressable
            onPress={onClear}
            style={({pressed}) => [
              styles.actionKey,
              pressed && styles.pressed,
            ]}>
            <Text style={styles.keyText}>clear</Text>
          </Pressable>
        ) : null}
        <Pressable
          onPress={onDone}
          style={({pressed}) => [styles.actionKey, pressed && styles.pressed]}>
          <Text style={styles.keyText}>✓</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 12,
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
  value: {
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
  inputIcon: {
    fontSize: 16,
    marginLeft: 10,
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
  timeGrid: {
    maxHeight: 220,
    borderRadius: 16,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeButton: {
    width: '22.6%',
    minHeight: 34,
    borderRadius: 12,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  timeText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '900',
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
    minHeight: 38,
    borderRadius: 12,
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  summaryText: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '800',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.78,
  },
});
