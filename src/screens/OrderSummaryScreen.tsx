import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {ScreenFrame} from '../components/ScreenFrame';
import {
  formatGuestNotesLabel,
  formatRoomLabel,
  formatStayDateLabel,
  useGuestProfile,
} from '../context/GuestProfileContext';
import {getMenuItem} from '../data/menu';
import {colors, layout} from '../theme/theme';
import type {CartState} from '../types/app';

type Props = {
  cart: CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
  onBack: () => void;
  onConfirmed: () => void;
};

const instructionKeys = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
const instructionOptions = [
  {emoji: '🌿', value: 'No allergens'},
  {emoji: '🚪', value: 'Leave at door'},
  {emoji: '🍽️', value: 'Extra cutlery'},
  {emoji: '🤫', value: 'Call quietly'},
];

export function OrderSummaryScreen({cart, setCart, onBack, onConfirmed}: Props): React.JSX.Element {
  const {profile} = useGuestProfile();
  const [instructions, setInstructions] = useState('');
  const [instructionsKeyboardOpen, setInstructionsKeyboardOpen] = useState(false);
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
  const subtotal = entries.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  const tax = subtotal * 0.13;
  const delivery = entries.length > 0 ? 5 : 0;
  const total = subtotal + tax + delivery;

  const placeOrder = () => {
    setCart({});
    setInstructions('');
    onConfirmed();
  };

  const addInstructionCharacter = (character: string) => {
    setInstructions(current => `${current}${character}`.slice(0, 80));
  };

  const removeInstructionCharacter = () => {
    setInstructions(current => current.slice(0, -1));
  };

  const selectInstruction = (value: string) => {
    setInstructions(current => {
      const trimmed = current.trim();

      if (!trimmed) {
        return value;
      }

      if (trimmed.includes(value)) {
        return trimmed;
      }

      return `${trimmed}, ${value}`.slice(0, 80);
    });
  };

  return (
    <View style={styles.root}>
      <AppHeader title="Order Summary" onBack={onBack} showGuest={false} />
      <ScreenFrame>
        <View style={styles.section}>
          {entries.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Your cart is empty</Text>
              <Text style={styles.emptyBody}>Add room service items to place an order.</Text>
            </View>
          ) : (
            entries.map(entry => (
              <View key={entry.item.id} style={styles.summaryCard}>
                <View style={styles.summaryCopy}>
                  <Text style={styles.itemTitle}>{entry.item.name}</Text>
                  <Text style={styles.quantity}>Quantity: {entry.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>${(entry.item.price * entry.quantity).toFixed(2)}</Text>
              </View>
            ))
          )}
        </View>
        <View style={styles.inputCard}>
          <Text style={styles.label}>Special Instructions (Optional)</Text>
          <Pressable
            onPress={() => setInstructionsKeyboardOpen(current => !current)}
            style={[styles.input, instructionsKeyboardOpen && styles.inputActive]}>
            <Text style={[styles.inputText, !instructions.trim() && styles.placeholder]} numberOfLines={3}>
              {instructions.trim() || 'Any special requests? Allergies? Preferences?'}
            </Text>
            <Text style={styles.inputIcon}>⌨️</Text>
          </Pressable>
          {instructionsKeyboardOpen ? (
            <View style={styles.customKeyboard}>
              <View style={styles.quickGrid}>
                {instructionOptions.map(option => (
                  <Pressable
                    key={option.value}
                    onPress={() => selectInstruction(option.value)}
                    style={({pressed}) => [
                      styles.quickButton,
                      instructions.includes(option.value) && styles.quickButtonActive,
                      pressed && styles.pressed,
                    ]}>
                    <Text style={styles.quickEmoji}>{option.emoji}</Text>
                    <Text
                      style={[styles.quickText, instructions.includes(option.value) && styles.quickTextActive]}
                      numberOfLines={1}>
                      {option.value}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {instructionKeys.map(row => (
                <View key={row} style={styles.keyRow}>
                  {row.split('').map(key => (
                    <Pressable
                      key={key}
                      onPress={() => addInstructionCharacter(key)}
                      style={({pressed}) => [styles.key, pressed && styles.pressed]}>
                      <Text style={styles.keyText}>{key}</Text>
                    </Pressable>
                  ))}
                </View>
              ))}
              <View style={styles.keyRow}>
                <Pressable onPress={() => addInstructionCharacter(' ')} style={({pressed}) => [styles.spaceKey, pressed && styles.pressed]}>
                  <Text style={styles.keyText}>space</Text>
                </Pressable>
                <Pressable onPress={removeInstructionCharacter} style={({pressed}) => [styles.actionKey, pressed && styles.pressed]}>
                  <Text style={styles.keyText}>⌫</Text>
                </Pressable>
                <Pressable onPress={() => setInstructions('')} style={({pressed}) => [styles.actionKey, pressed && styles.pressed]}>
                  <Text style={styles.keyText}>clear</Text>
                </Pressable>
                <Pressable onPress={() => setInstructionsKeyboardOpen(false)} style={({pressed}) => [styles.actionKey, pressed && styles.pressed]}>
                  <Text style={styles.keyText}>✓</Text>
                </Pressable>
              </View>
            </View>
          ) : null}
        </View>
        <View style={styles.totalCard}>
          <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <Row label="Tax (13%)" value={`$${tax.toFixed(2)}`} />
          <Row label="Delivery Fee" value={`$${delivery.toFixed(2)}`} />
          <View style={styles.divider} />
          <Row label="Total" value={`$${total.toFixed(2)}`} total />
        </View>
        <View style={styles.timeCard}>
          <Text style={styles.timeIcon}>⏱</Text>
          <View>
            <Text style={styles.timeTitle}>Estimated Delivery Time</Text>
            <Text style={styles.timeBody}>{`${profile.room ? formatRoomLabel(profile.room) : 'Your room'} · ${formatStayDateLabel(profile.stayDate)}`}</Text>
            <Text style={styles.timeBody}>{formatGuestNotesLabel(profile.notes)}</Text>
          </View>
        </View>
        <GradientButton
          title={entries.length ? `Place Order - $${total.toFixed(2)}` : 'Back to Menu'}
          onPress={entries.length ? placeOrder : onBack}
        />
      </ScreenFrame>
    </View>
  );
}

function Row({label, value, total}: {label: string; value: string; total?: boolean}): React.JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, total && styles.totalLabel]}>{label}</Text>
      <Text style={[styles.rowValue, total && styles.totalValue]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
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
    minHeight: 92,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#1e1e1e',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
  },
  inputActive: {
    borderColor: colors.orange,
    backgroundColor: 'rgba(255, 139, 31, 0.1)',
  },
  inputText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    flex: 1,
  },
  placeholder: {
    color: colors.dim,
  },
  inputIcon: {
    fontSize: 16,
  },
  customKeyboard: {
    borderRadius: 14,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
    gap: 7,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 2,
  },
  quickButton: {
    width: '48.5%',
    minHeight: 36,
    borderRadius: 12,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 8,
  },
  quickButtonActive: {
    borderColor: colors.orange,
    backgroundColor: 'rgba(255, 139, 31, 0.16)',
  },
  quickEmoji: {
    fontSize: 14,
  },
  quickText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '900',
    flexShrink: 1,
  },
  quickTextActive: {
    color: colors.gold,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  key: {
    width: 24,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceKey: {
    flex: 1,
    height: 32,
    borderRadius: 9,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionKey: {
    width: 52,
    height: 32,
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
  totalCard: {
    marginTop: 14,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 14,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  rowLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  rowValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  totalLabel: {
    color: colors.text,
    fontSize: 16,
  },
  totalValue: {
    color: colors.gold,
    fontSize: 22,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  timeCard: {
    marginVertical: 14,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: 'rgba(255, 195, 26, 0.4)',
    backgroundColor: 'rgba(255, 139, 31, 0.18)',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeIcon: {
    fontSize: 22,
  },
  timeTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  timeBody: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '700',
  },
  emptyCard: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 8,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  emptyBody: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
});
