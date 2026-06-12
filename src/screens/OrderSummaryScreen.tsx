import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {ScreenFrame} from '../components/ScreenFrame';
import {
  formatGuestNotesLabel,
  formatRoomLabel,
  formatStayDateLabel,
  formatStayTimeLabel,
  useGuestProfile,
} from '../context/GuestProfileContext';
import {getMenuItem} from '../data/menu';
import {colors, layout} from '../theme/theme';
import type {CartState, RoomServiceOrder} from '../types/app';

type Props = {
  cart: CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
  setOrders: React.Dispatch<React.SetStateAction<RoomServiceOrder[]>>;
  onBack: () => void;
  onConfirmed: (orderId: string) => void;
};

export function OrderSummaryScreen({
  cart,
  setCart,
  setOrders,
  onBack,
  onConfirmed,
}: Props): React.JSX.Element {
  const {profile} = useGuestProfile();
  const [instructions, setInstructions] = useState('');
  const entries = useMemo(
    () =>
      Object.entries(cart)
        .map(([itemId, quantity]) => {
          const item = getMenuItem(itemId);
          return item ? {item, quantity} : null;
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [cart],
  );
  const subtotal = entries.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0,
  );
  const tax = subtotal * 0.13;
  const delivery = entries.length > 0 ? 5 : 0;
  const total = subtotal + tax + delivery;
  const estimatedMinutes =
    entries.length > 0
      ? Math.max(...entries.map(entry => entry.item.prepMinutes)) + 15
      : 0;

  const placeOrder = () => {
    if (!entries.length) {
      onBack();
      return;
    }

    const createdAt = Date.now();
    const order: RoomServiceOrder = {
      id: `room-service-${createdAt}`,
      confirmationCode: createConfirmationCode(createdAt),
      guestName: profile.name.trim(),
      room: profile.room.trim(),
      stayDate: profile.stayDate,
      stayTime: profile.stayTime,
      notes: profile.notes,
      instructions: instructions.trim(),
      items: entries.map(entry => ({
        itemId: entry.item.id,
        name: entry.item.name,
        quantity: entry.quantity,
        unitPrice: entry.item.price,
      })),
      subtotal,
      tax,
      delivery,
      total,
      createdAt,
      estimatedMinutes,
    };

    setOrders(current => [order, ...current]);
    setCart({});
    setInstructions('');
    onConfirmed(order.id);
  };

  return (
    <View style={styles.root}>
      <AppHeader title="Order Summary" onBack={onBack} showGuest={false} />
      <ScreenFrame>
        <View style={styles.routeCard}>
          <Text style={styles.routeTitle}>Delivery details</Text>
          <Row label="Guest" value={profile.name} />
          <Row label="Room" value={formatRoomLabel(profile.room)} gold />
          <Row label="Arrival" value={formatStayDateLabel(profile.stayDate)} />
          <Row label="Time" value={formatStayTimeLabel(profile.stayTime)} />
          <Row label="Notes" value={formatGuestNotesLabel(profile.notes)} />
        </View>

        <View style={styles.section}>
          {entries.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Your cart is empty</Text>
              <Text style={styles.emptyBody}>
                Add room service items to place an order.
              </Text>
            </View>
          ) : (
            entries.map(entry => (
              <View key={entry.item.id} style={styles.summaryCard}>
                <View style={styles.summaryCopy}>
                  <Text style={styles.itemTitle}>{entry.item.name}</Text>
                  <Text style={styles.quantity}>
                    Quantity: {entry.quantity}
                  </Text>
                </View>
                <Text style={styles.itemPrice}>
                  ${(entry.item.price * entry.quantity).toFixed(2)}
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.label}>Special instructions</Text>
          <TextInput
            value={instructions}
            onChangeText={setInstructions}
            placeholder="Allergies, delivery notes, or preferences"
            placeholderTextColor={colors.dim}
            multiline
            maxLength={160}
            autoCorrect
            style={styles.input}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.totalCard}>
          <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <Row label="Tax (13%)" value={`$${tax.toFixed(2)}`} />
          <Row label="Delivery fee" value={`$${delivery.toFixed(2)}`} />
          <View style={styles.divider} />
          <Row label="Total" value={`$${total.toFixed(2)}`} total />
        </View>

        <View style={styles.timeCard}>
          <Text style={styles.timeTitle}>Estimated delivery</Text>
          <Text style={styles.timeBody}>
            {entries.length
              ? `${estimatedMinutes}-${
                  estimatedMinutes + 10
                } minutes after confirmation`
              : 'Add items to see delivery time'}
          </Text>
          <Text style={styles.timeBody}>
            Charged to the registered room after staff review.
          </Text>
        </View>

        <GradientButton
          title={
            entries.length
              ? `Place Order - $${total.toFixed(2)}`
              : 'Back to Menu'
          }
          onPress={placeOrder}
        />
      </ScreenFrame>
    </View>
  );
}

function createConfirmationCode(createdAt: number): string {
  const suffix = String(createdAt % 1000000).padStart(6, '0');
  return `RS-${suffix}`;
}

function Row({
  label,
  value,
  total,
  gold,
}: {
  label: string;
  value: string;
  total?: boolean;
  gold?: boolean;
}): React.JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, total && styles.totalLabel]}>{label}</Text>
      <Text
        style={[
          styles.rowValue,
          total && styles.totalValue,
          gold && styles.gold,
        ]}
        numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  routeCard: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 12,
    marginBottom: 14,
  },
  routeTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  section: {
    gap: 12,
  },
  summaryCard: {
    minHeight: 78,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  summaryCopy: {
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
  itemTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  quantity: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  itemPrice: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: '900',
  },
  emptyCard: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 20,
    gap: 8,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyBody: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  inputCard: {
    marginTop: 14,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 14,
    gap: 10,
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  input: {
    minHeight: 104,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#101010',
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    padding: 12,
  },
  totalCard: {
    marginTop: 14,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 13,
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
    flex: 1,
  },
  gold: {
    color: colors.gold,
  },
  totalLabel: {
    color: colors.text,
    fontSize: 17,
  },
  totalValue: {
    color: colors.gold,
    fontSize: 21,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  timeCard: {
    marginVertical: 14,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: 'rgba(255, 195, 26, 0.36)',
    backgroundColor: colors.surface,
    padding: 16,
    gap: 7,
  },
  timeTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  timeBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
});
