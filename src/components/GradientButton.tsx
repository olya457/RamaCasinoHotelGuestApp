import React from 'react';
import {Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {colors, layout} from '../theme/theme';
import {GradientSurface} from './GradientSurface';

type Props = {
  title: string;
  onPress: () => void;
  icon?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function GradientButton({title, onPress, icon, disabled, style}: Props): React.JSX.Element {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={({pressed}) => [style, pressed && styles.pressed]}>
      <GradientSurface muted={disabled} style={styles.surface}>
        <View style={styles.content}>
          {icon ? <Text style={styles.icon}>{icon}</Text> : null}
          <Text style={[styles.text, disabled && styles.disabledText]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.arrow, disabled && styles.disabledText]}>›</Text>
        </View>
      </GradientSurface>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  surface: {
    minHeight: 56,
    borderRadius: layout.cardRadius,
  },
  content: {
    flex: 1,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
    flexShrink: 1,
  },
  icon: {
    color: colors.white,
    fontSize: 16,
  },
  arrow: {
    color: colors.white,
    fontSize: 22,
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.86,
  },
  disabledText: {
    color: colors.muted,
  },
});
