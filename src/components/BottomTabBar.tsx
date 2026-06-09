import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, layout, shadow} from '../theme/theme';
import type {MainTab} from '../types/app';

type Props = {
  activeTab: MainTab;
  onSelect: (tab: MainTab) => void;
};

const tabs: {key: MainTab; label: string; icon: string}[] = [
  {key: 'room', label: 'Room Service', icon: '🍽️'},
  {key: 'requests', label: 'Requests', icon: '💬'},
  {key: 'entertainment', label: 'Entertainment', icon: '📅'},
  {key: 'climate', label: 'Climate', icon: '🌡️'},
  {key: 'travel', label: 'Travel', icon: '📍'},
  {key: 'map', label: 'Map', icon: '🗺️'},
];

export function BottomTabBar({activeTab, onSelect}: Props): React.JSX.Element {
  return (
    <View style={[styles.bar, shadow]}>
      {tabs.map(tab => {
        const active = tab.key === activeTab;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onSelect(tab.key)}
            style={({pressed}) => [styles.item, active && styles.activeItem, pressed && styles.pressed]}>
            <Text style={[styles.icon, active && styles.activeText]}>{tab.icon}</Text>
            <Text style={[styles.label, active && styles.activeText]} numberOfLines={1} adjustsFontSizeToFit>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: layout.navGap,
    height: layout.tabHeight,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#171717',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  item: {
    flex: 1,
    height: 62,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    minWidth: 0,
  },
  activeItem: {
    backgroundColor: 'rgba(239, 48, 40, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(239, 48, 40, 0.18)',
  },
  icon: {
    fontSize: 19,
    color: colors.muted,
  },
  label: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '700',
    maxWidth: '100%',
  },
  activeText: {
    color: colors.red,
  },
  pressed: {
    opacity: 0.78,
  },
});
