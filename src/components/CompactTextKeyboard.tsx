import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/theme';

export const compactKeyboardRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

type Props = {
  rows?: string[];
  onPressKey: (key: string) => void;
  onBackspace: () => void;
  onClear?: () => void;
  onDone: () => void;
};

export function CompactTextKeyboard({
  rows = compactKeyboardRows,
  onPressKey,
  onBackspace,
  onClear,
  onDone,
}: Props): React.JSX.Element {
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
  pressed: {
    opacity: 0.78,
  },
});
