import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GradientButton} from '../components/GradientButton';
import {ScreenFrame} from '../components/ScreenFrame';
import {colors, layout} from '../theme/theme';

type Props = {
  onBack: () => void;
};

export function OrderConfirmedScreen({onBack}: Props): React.JSX.Element {
  return (
    <ScreenFrame scroll={false}>
      <View style={styles.center}>
        <View style={styles.check}>
          <Text style={styles.checkText}>✓</Text>
        </View>
        <Text style={styles.title}>Order Confirmed!</Text>
        <View style={styles.card}>
          <Row label="Guest Name" value="Demo Guest" />
          <Row label="Room Number" value="2024" gold />
          <Row label="Estimated Delivery" value="⏱ 35-40 minutes" />
          <View style={styles.divider} />
          <Row label="Total Amount" value="Room charge" gold large />
        </View>
        <Text style={styles.body}>Your order will be delivered to your room shortly. Thank you for using our service!</Text>
        <GradientButton title="Back" onPress={onBack} style={styles.button} />
      </View>
    </ScreenFrame>
  );
}

function Row({label, value, gold, large}: {label: string; value: string; gold?: boolean; large?: boolean}): React.JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, gold && styles.gold, large && styles.large]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 22,
  },
  check: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: colors.white,
    fontSize: 50,
    lineHeight: 54,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '900',
    textAlign: 'center',
  },
  card: {
    alignSelf: 'stretch',
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  rowLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
  },
  rowValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'right',
    flexShrink: 1,
  },
  gold: {
    color: colors.gold,
  },
  large: {
    fontSize: 21,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  body: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '700',
    textAlign: 'center',
    maxWidth: 290,
  },
  button: {
    alignSelf: 'stretch',
  },
});
