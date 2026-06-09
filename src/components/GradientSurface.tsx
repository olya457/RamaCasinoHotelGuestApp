import React, {PropsWithChildren} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {colors, layout} from '../theme/theme';

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  muted?: boolean;
}>;

export function GradientSurface({children, style, muted}: Props): React.JSX.Element {
  return (
    <View style={[styles.root, style]}>
      <View style={StyleSheet.absoluteFill}>
        {muted ? (
          <View style={[styles.segment, {backgroundColor: colors.surfaceSoft}]} />
        ) : (
          <View style={styles.row}>
            <View style={[styles.segment, {backgroundColor: colors.red}]} />
            <View style={[styles.segment, {backgroundColor: colors.orange}]} />
            <View style={[styles.segment, {backgroundColor: colors.yellow}]} />
          </View>
        )}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: layout.cardRadius,
    overflow: 'hidden',
    backgroundColor: colors.orange,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  segment: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
