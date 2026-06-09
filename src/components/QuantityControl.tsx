import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/theme';

type Props = {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function QuantityControl({value, onDecrease, onIncrease}: Props): React.JSX.Element {
  return (
    <View style={styles.root}>
      <Pressable onPress={onDecrease} style={styles.button}>
        <Text style={styles.symbol}>−</Text>
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable onPress={onIncrease} style={styles.button}>
        <Text style={styles.symbol}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  value: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    minWidth: 28,
    textAlign: 'center',
  },
});
