import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, layout} from '../theme/theme';

export function GuestBadge(): React.JSX.Element {
  return (
    <View style={styles.badge}>
      <View>
        <Text style={styles.name}>Demo Guest</Text>
        <Text style={styles.room}>Room 2024</Text>
      </View>
      <Text style={styles.edit}>✎</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 116,
    minHeight: 54,
    paddingHorizontal: 12,
    borderRadius: layout.cardRadius,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  name: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  room: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  edit: {
    color: colors.muted,
    fontSize: 22,
  },
});
