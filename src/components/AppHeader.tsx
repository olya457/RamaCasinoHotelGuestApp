import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, layout} from '../theme/theme';
import {GuestBadge} from './GuestBadge';

type Props = {
  title: string;
  onBack?: () => void;
  showGuest?: boolean;
  action?: React.ReactNode;
};

export function AppHeader({title, onBack, showGuest = true, action}: Props): React.JSX.Element {
  return (
    <View style={styles.header}>
      <View style={styles.titleWrap}>
        {onBack ? (
          <Pressable onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        ) : null}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {action ?? (showGuest ? <GuestBadge /> : <View style={styles.spacer} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 88,
    paddingHorizontal: layout.screenPadding,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: colors.borderSoft,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: 0,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    flexShrink: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 30,
    marginTop: -2,
  },
  spacer: {
    width: 1,
  },
});
