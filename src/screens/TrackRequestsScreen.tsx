import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {ScreenFrame} from '../components/ScreenFrame';
import {formatRoomLabel} from '../context/GuestProfileContext';
import {colors, layout} from '../theme/theme';
import type {GuestRequest, RequestStatus, RoomServiceOrder} from '../types/app';

type Props = {
  requests: GuestRequest[];
  setRequests: React.Dispatch<React.SetStateAction<GuestRequest[]>>;
  orders: RoomServiceOrder[];
  setOrders: React.Dispatch<React.SetStateAction<RoomServiceOrder[]>>;
  onBack: () => void;
};

const statusMeta: Record<
  RequestStatus,
  {label: string; color: string; icon: string}
> = {
  submitted: {label: 'Submitted', color: colors.grey, icon: '→'},
  accepted: {label: 'Accepted', color: colors.blue, icon: '✓'},
  progress: {label: 'In Progress', color: colors.gold, icon: '◔'},
  completed: {label: 'Completed', color: colors.green, icon: '✓'},
};

export function TrackRequestsScreen({
  requests,
  setRequests,
  orders,
  setOrders,
  onBack,
}: Props): React.JSX.Element {
  const deleteRequest = (requestId: string) => {
    setRequests(current => current.filter(request => request.id !== requestId));
  };

  const cancelOrder = (orderId: string) => {
    setOrders(current => current.filter(order => order.id !== orderId));
  };

  const hasActivity = orders.length > 0 || requests.length > 0;

  return (
    <View style={styles.root}>
      <AppHeader title="Track Services" onBack={onBack} showGuest={false} />
      <ScreenFrame>
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Live service activity</Text>
          <Text style={styles.legendBody}>
            Room service orders and guest requests submitted from this device
            appear here with current status and references.
          </Text>
        </View>

        {!hasActivity ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No active services yet</Text>
            <Text style={styles.emptyBody}>
              Place a room service order or submit a guest request to track it
              here.
            </Text>
          </View>
        ) : null}

        {orders.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Room Service Orders</Text>
            {orders.map(order => {
              const meta = resolveOrderMeta(order);
              const canCancel = meta.progress < 0.85;

              return (
                <View key={order.id} style={styles.card}>
                  <View
                    style={[
                      styles.statusIcon,
                      {backgroundColor: `${meta.color}30`},
                    ]}>
                    <Text style={[styles.statusIconText, {color: meta.color}]}>
                      {meta.icon}
                    </Text>
                  </View>
                  <View style={styles.cardBody}>
                    <View style={styles.cardTop}>
                      <View style={styles.cardTitleWrap}>
                        <Text style={styles.cardTitle}>
                          {order.confirmationCode}
                        </Text>
                        <Text style={styles.time}>
                          {formatCreatedAt(order.createdAt)}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.statusPill,
                          {backgroundColor: `${meta.color}30`},
                        ]}>
                        <Text
                          style={[styles.statusPillText, {color: meta.color}]}>
                          {meta.label}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.description}>
                      {order.items
                        .map(item => `${item.quantity}x ${item.name}`)
                        .join(', ')}
                    </Text>
                    <Text style={styles.description}>
                      {formatRoomLabel(order.room)} · ${order.total.toFixed(2)}
                    </Text>
                    <View style={styles.progressTrack}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${meta.progress * 100}%`,
                            backgroundColor: meta.color,
                          },
                        ]}
                      />
                    </View>
                    {canCancel ? (
                      <Pressable
                        onPress={() => cancelOrder(order.id)}
                        style={({pressed}) => [
                          styles.deleteButton,
                          pressed && styles.pressed,
                        ]}>
                        <Text style={styles.deleteText}>Cancel Order</Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}

        {requests.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Guest Requests</Text>
            {requests.map(request => {
              const meta = statusMeta[request.status];

              return (
                <View key={request.id} style={styles.card}>
                  <View
                    style={[
                      styles.statusIcon,
                      {backgroundColor: `${meta.color}30`},
                    ]}>
                    <Text style={[styles.statusIconText, {color: meta.color}]}>
                      {meta.icon}
                    </Text>
                  </View>
                  <View style={styles.cardBody}>
                    <View style={styles.cardTop}>
                      <Text style={styles.cardTitle}>{request.title}</Text>
                      <View
                        style={[
                          styles.statusPill,
                          {backgroundColor: `${meta.color}30`},
                        ]}>
                        <Text
                          style={[styles.statusPillText, {color: meta.color}]}>
                          {meta.label}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.description}>
                      {request.description}
                    </Text>
                    <Text style={styles.time}>{request.createdAtLabel}</Text>
                    <View style={styles.progressTrack}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${(request.progress ?? 0.18) * 100}%`,
                            backgroundColor: meta.color,
                          },
                        ]}
                      />
                    </View>
                    <Pressable
                      onPress={() => deleteRequest(request.id)}
                      style={({pressed}) => [
                        styles.deleteButton,
                        pressed && styles.pressed,
                      ]}>
                      <Text style={styles.deleteText}>Remove Request</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
      </ScreenFrame>
    </View>
  );
}

function resolveOrderMeta(order: RoomServiceOrder): {
  label: string;
  color: string;
  icon: string;
  progress: number;
} {
  const elapsedMinutes = Math.max(0, (Date.now() - order.createdAt) / 60000);

  if (elapsedMinutes >= order.estimatedMinutes) {
    return {label: 'Delivered', color: colors.green, icon: '✓', progress: 1};
  }

  if (elapsedMinutes >= Math.max(order.estimatedMinutes - 8, 8)) {
    return {label: 'On the way', color: colors.blue, icon: '→', progress: 0.84};
  }

  if (elapsedMinutes >= 5) {
    return {label: 'Preparing', color: colors.gold, icon: '◔', progress: 0.55};
  }

  return {label: 'Received', color: colors.grey, icon: '→', progress: 0.22};
}

function formatCreatedAt(value: number): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Just now';
  }

  return date.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'});
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  legend: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    marginBottom: 16,
    gap: 8,
  },
  legendTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  legendBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  emptyCard: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 22,
    gap: 9,
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
    lineHeight: 19,
    fontWeight: '700',
    textAlign: 'center',
  },
  section: {
    gap: 14,
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  card: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    flexDirection: 'row',
    gap: 14,
  },
  statusIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIconText: {
    fontSize: 16,
    fontWeight: '900',
  },
  cardBody: {
    flex: 1,
    minWidth: 0,
    gap: 9,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  cardTitleWrap: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    flex: 1,
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '900',
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  time: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceSoft,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressFill: {
    height: 4,
  },
  deleteButton: {
    alignSelf: 'flex-start',
    minHeight: 34,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(239, 48, 40, 0.45)',
    backgroundColor: 'rgba(239, 48, 40, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginTop: 2,
  },
  deleteText: {
    color: colors.red,
    fontSize: 12,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.76,
  },
});
