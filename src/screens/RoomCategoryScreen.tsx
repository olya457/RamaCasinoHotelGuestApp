import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {GradientButton} from '../components/GradientButton';
import {QuantityControl} from '../components/QuantityControl';
import {ScreenFrame} from '../components/ScreenFrame';
import {menuCategories, menuItems} from '../data/menu';
import {colors, layout} from '../theme/theme';
import type {CartState, MenuCategoryId} from '../types/app';

type Props = {
  categoryId: MenuCategoryId;
  cart: CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;
  onBack: () => void;
  onViewCart: () => void;
};

export function RoomCategoryScreen({categoryId, cart, setCart, onBack, onViewCart}: Props): React.JSX.Element {
  const category = menuCategories.find(item => item.id === categoryId) ?? menuCategories[0];
  const items = useMemo(() => menuItems.filter(item => item.categoryId === category.id), [category.id]);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  const increase = (itemId: string) => {
    setCart(current => ({...current, [itemId]: (current[itemId] ?? 0) + 1}));
  };

  const decrease = (itemId: string) => {
    setCart(current => {
      const nextQuantity = Math.max((current[itemId] ?? 0) - 1, 0);
      const next = {...current};
      if (nextQuantity === 0) {
        delete next[itemId];
      } else {
        next[itemId] = nextQuantity;
      }
      return next;
    });
  };

  return (
    <View style={styles.root}>
      <AppHeader title={category.title} onBack={onBack} showGuest={false} />
      <ScreenFrame contentStyle={cartCount > 0 && styles.withCartButton}>
        <View style={styles.list}>
          {items.map(item => {
            const quantity = cart[item.id] ?? 0;
            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.imageWrap}>
                  <Image source={item.image} style={styles.image} />
                  <View style={styles.timeBadge}>
                    <Text style={styles.timeText}>⏱ {item.prepMinutes}-{item.prepMinutes + 10} min</Text>
                  </View>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.itemFooter}>
                    <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                    {quantity > 0 ? (
                      <QuantityControl value={quantity} onDecrease={() => decrease(item.id)} onIncrease={() => increase(item.id)} />
                    ) : (
                      <Pressable onPress={() => increase(item.id)} style={styles.addButton}>
                        <Text style={styles.addIcon}>+</Text>
                        <Text style={styles.addText}>Add to Cart</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScreenFrame>
      {cartCount > 0 ? (
        <GradientButton title={`View Cart (${cartCount} items)`} icon="🛒" onPress={onViewCart} style={styles.cartButton} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  list: {
    gap: 14,
  },
  card: {
    borderRadius: layout.cardRadius,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageWrap: {
    height: 164,
    backgroundColor: colors.surfaceSoft,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  timeBadge: {
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 8,
    backgroundColor: colors.yellow,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  timeText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '900',
  },
  cardBody: {
    padding: 14,
    gap: 10,
  },
  itemTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  itemDescription: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
  price: {
    color: colors.gold,
    fontSize: 23,
    fontWeight: '900',
  },
  addButton: {
    minHeight: 40,
    borderRadius: 8,
    backgroundColor: colors.orange,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  addIcon: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
  },
  addText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
  cartButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: layout.tabHeight + layout.navGap + 10,
  },
  withCartButton: {
    paddingBottom: layout.tabHeight + layout.navGap + 86,
  },
});
