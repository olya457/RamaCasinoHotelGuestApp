import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {GradientSurface} from '../components/GradientSurface';
import {ScreenFrame} from '../components/ScreenFrame';
import {menuCategories} from '../data/menu';
import {colors, layout} from '../theme/theme';
import type {MenuCategoryId} from '../types/app';

type Props = {
  onOpenCategory: (categoryId: MenuCategoryId) => void;
};

export function RoomServiceScreen({onOpenCategory}: Props): React.JSX.Element {
  return (
    <View style={styles.root}>
      <AppHeader title="Room Service" />
      <ScreenFrame>
        <GradientSurface style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Hungry?</Text>
            <Text style={styles.heroBody}>
              Order from our premium menu and enjoy restaurant-quality meals in the comfort of your room.
            </Text>
          </View>
        </GradientSurface>
        <View style={styles.list}>
          {menuCategories.map(category => (
            <Pressable
              key={category.id}
              onPress={() => onOpenCategory(category.id)}
              style={({pressed}) => [styles.categoryCard, pressed && styles.pressed]}>
              <ImageBackground source={category.image} resizeMode="cover" style={styles.categoryImage}>
                <View style={styles.categoryShade} />
                <View style={styles.categoryText}>
                  <View style={styles.categoryIcon}>
                    <Text style={styles.categoryIconText}>{category.icon}</Text>
                  </View>
                  <View style={styles.categoryCopy}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categorySubtitle} numberOfLines={2}>
                      {category.subtitle}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
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
  hero: {
    minHeight: 106,
    borderRadius: layout.cardRadius,
    marginBottom: 14,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
  },
  heroBody: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
    maxWidth: 310,
  },
  list: {
    gap: 14,
  },
  categoryCard: {
    height: 166,
    borderRadius: layout.cardRadius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  categoryImage: {
    flex: 1,
  },
  categoryShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.46)',
  },
  categoryText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 18,
    gap: 14,
  },
  categoryIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconText: {
    fontSize: 20,
  },
  categoryCopy: {
    flex: 1,
    minWidth: 0,
  },
  categoryTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  categorySubtitle: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 3,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.82,
  },
});
