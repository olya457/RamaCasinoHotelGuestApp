import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {ScreenFrame} from '../components/ScreenFrame';
import {defaultRequests} from '../data/requests';
import {colors, layout} from '../theme/theme';
import type {GuestRequest, RequestStatus} from '../types/app';

type Props = {
  requests: GuestRequest[];
  onBack: () => void;
};

const statusMeta: Record<RequestStatus, {label: string; color: string; icon: string}> = {
  submitted: {label: 'Submitted', color: colors.grey, icon: '✈️'},
  accepted: {label: 'Accepted', color: colors.blue, icon: '☑️'},
  progress: {label: 'In Progress', color: colors.gold, icon: '◔'},
  completed: {label: 'Completed', color: colors.green, icon: '☑️'},
};

export function TrackRequestsScreen({requests, onBack}: Props): React.JSX.Element {
  const allRequests = [...requests, ...defaultRequests];

  return (
    <View style={styles.root}>
      <AppHeader title="Track Requests" onBack={onBack} showGuest={false} />
      <ScreenFrame>
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Request Status</Text>
          <View style={styles.legendGrid}>
            {Object.entries(statusMeta).map(([key, meta]) => (
              <View key={key} style={styles.legendItem}>
                <View style={[styles.legendIcon, {backgroundColor: `${meta.color}30`}]}>
                  <Text style={[styles.legendIconText, {color: meta.color}]}>{meta.icon}</Text>
                </View>
                <Text style={styles.legendText}>{meta.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.list}>
          {allRequests.map(request => {
            const meta = statusMeta[request.status];
            return (
              <View key={request.id} style={styles.card}>
                <View style={[styles.statusIcon, {backgroundColor: `${meta.color}30`}]}>
                  <Text style={[styles.statusIconText, {color: meta.color}]}>{meta.icon}</Text>
                </View>
                <View style={styles.cardBody}>
                  <View style={styles.cardTop}>
                    <Text style={styles.cardTitle}>{request.title}</Text>
                    <View style={[styles.statusPill, {backgroundColor: `${meta.color}30`}]}>
                      <Text style={[styles.statusPillText, {color: meta.color}]}>{meta.label}</Text>
                    </View>
                  </View>
                  <Text style={styles.description}>{request.description}</Text>
                  <Text style={styles.time}>◷ {request.createdAtLabel}</Text>
                  {request.progress ? (
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, {width: `${request.progress * 100}%`}]} />
                    </View>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>
      </ScreenFrame>
    </View>
  );
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
    gap: 16,
  },
  legendTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 16,
  },
  legendItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendIconText: {
    fontSize: 15,
    fontWeight: '900',
  },
  legendText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  list: {
    gap: 14,
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
    alignItems: 'center',
    gap: 10,
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
    marginTop: 8,
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.yellow,
  },
});
