import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GradientButton} from '../components/GradientButton';
import {ScreenFrame} from '../components/ScreenFrame';
import {
  formatRoomLabel,
  formatStayDateLabel,
  formatStayTimeLabel,
} from '../context/GuestProfileContext';
import {colors, layout} from '../theme/theme';
import type {RoomServiceOrder} from '../types/app';

type Props = {
  order?: RoomServiceOrder;
  onBack: () => void;
  onTrack: () => void;
};

export function OrderConfirmedScreen({
  order,
  onBack,
  onTrack,
}: Props): React.JSX.Element {
  if (!order) {
    return (
      <ScreenFrame scroll={false}>
        <View style={styles.center}>
          <Text style={styles.title}>Order unavailable</Text>
          <Text style={styles.body}>
            The order confirmation could not be opened. Your recent orders
            remain available from tracking.
          </Text>
          <GradientButton
            title="Track Orders"
            onPress={onTrack}
            style={styles.button}
          />
        </View>
      </ScreenFrame>
    );
  }

  return (
    <ScreenFrame scroll={false}>
      <View style={styles.center}>
        <View style={styles.check}>
          <Text style={styles.checkText}>✓</Text>
        </View>
        <Text style={styles.title}>Order Sent</Text>
        <Text style={styles.reference}>{order.confirmationCode}</Text>
        <View style={styles.card}>
          <Row label="Guest" value={order.guestName} />
          <Row label="Room" value={formatRoomLabel(order.room)} gold />
          <Row label="Arrival" value={formatStayDateLabel(order.stayDate)} />
          <Row label="Time" value={formatStayTimeLabel(order.stayTime)} />
          <Row
            label="Items"
            value={`${order.items.reduce(
              (sum, item) => sum + item.quantity,
              0,
            )} selected`}
          />
          <Row
            label="Estimated Delivery"
            value={`${order.estimatedMinutes}-${
              order.estimatedMinutes + 10
            } minutes`}
          />
          <View style={styles.divider} />
          <Row label="Total" value={`$${order.total.toFixed(2)}`} gold large />
        </View>
        <Text style={styles.body}>
          Your order has been saved with the room service queue and can be
          monitored from tracking.
        </Text>
        <View style={styles.actions}>
          <Pressable
            onPress={onBack}
            style={({pressed}) => [
              styles.secondaryButton,
              pressed && styles.pressed,
            ]}>
            <Text style={styles.secondaryText}>Back to Menu</Text>
          </Pressable>
          <GradientButton
            title="Track Order"
            onPress={onTrack}
            style={styles.trackButton}
          />
        </View>
      </View>
    </ScreenFrame>
  );
}

function Row({
  label,
  value,
  gold,
  large,
}: {
  label: string;
  value: string;
  gold?: boolean;
  large?: boolean;
}): React.JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text
        style={[styles.rowValue, gold && styles.gold, large && styles.large]}
        numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
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
  reference: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
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
    maxWidth: 310,
  },
  actions: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 56,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  trackButton: {
    flex: 1,
  },
  button: {
    alignSelf: 'stretch',
  },
  pressed: {
    opacity: 0.78,
  },
});
