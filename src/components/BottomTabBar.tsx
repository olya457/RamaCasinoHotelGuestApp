import React from 'react';
import {Pressable, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
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
  const {height, width} = useWindowDimensions();
  const compact = width <= 375 || height <= 720;

  return (
    <View style={[styles.bar, compact && styles.barCompact, shadow]}>
      {tabs.map(tab => {
        const active = tab.key === activeTab;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onSelect(tab.key)}
            style={({pressed}) => [styles.item, compact && styles.itemCompact, active && styles.activeItem, pressed && styles.pressed]}>
            <Text style={[styles.icon, compact && styles.iconCompact, active && styles.activeText]}>{tab.icon}</Text>
            <Text
              style={[styles.label, compact && styles.labelCompact, active && styles.activeText]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.62}>
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
  barCompact: {
    left: 8,
    right: 8,
    height: layout.compactTabHeight,
    borderRadius: 16,
    paddingHorizontal: 3,
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
  itemCompact: {
    height: 56,
    borderRadius: 11,
    gap: 2,
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
  iconCompact: {
    fontSize: 17,
  },
  label: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '700',
    maxWidth: '100%',
  },
  labelCompact: {
    fontSize: 9,
  },
  activeText: {
    color: colors.red,
  },
  pressed: {
    opacity: 0.78,
  },
});
