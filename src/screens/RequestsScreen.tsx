import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {ScreenFrame} from '../components/ScreenFrame';
import {requestCategories} from '../data/requests';
import {colors, layout} from '../theme/theme';
import type {RequestCategoryId} from '../types/app';

type Props = {
  onOpenCategory: (categoryId: RequestCategoryId) => void;
  onTrack: () => void;
};

export function RequestsScreen({onOpenCategory, onTrack}: Props): React.JSX.Element {
  return (
    <View style={styles.root}>
      <AppHeader title="Guest Requests" />
      <ScreenFrame>
        <Pressable onPress={onTrack} style={({pressed}) => [styles.trackButton, pressed && styles.pressed]}>
          <Text style={styles.trackIcon}>☑️</Text>
          <Text style={styles.trackText}>Track My Requests</Text>
        </Pressable>
        <View style={styles.grid}>
          {requestCategories.map(category => (
            <Pressable
              key={category.id}
              onPress={() => onOpenCategory(category.id)}
              style={({pressed}) => [styles.categoryCard, pressed && styles.pressed]}>
              <View style={[styles.iconCircle, {backgroundColor: category.color}]}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </Pressable>
          ))}
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
  trackButton: {
    minHeight: 58,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  trackIcon: {
    fontSize: 15,
  },
  trackText: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: '900',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryCard: {
    width: '47.6%',
    minHeight: 158,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    gap: 16,
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: 26,
  },
  categoryTitle: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '800',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.78,
  },
});
