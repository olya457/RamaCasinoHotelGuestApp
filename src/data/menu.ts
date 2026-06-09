import {imageAssets} from './assets';
import type {MenuCategory, MenuItem} from '../types/app';

export const menuCategories: MenuCategory[] = [
  {
    id: 'breakfast',
    title: 'Breakfast In Room',
    subtitle: 'Start your day with a delicious breakfast',
    icon: '☕',
    image: imageAssets.classicCanadianBreakfast,
  },
  {
    id: 'allday',
    title: 'All-Day Room Service',
    subtitle: 'Lunch, dinner, and everything in between',
    icon: '🍔',
    image: imageAssets.casinoSignatureBurger,
  },
  {
    id: 'latenight',
    title: 'Late Night Delights',
    subtitle: 'Satisfy your midnight cravings',
    icon: '🌙',
    image: imageAssets.chocolateLavaCake,
  },
];

export const menuItems: MenuItem[] = [
  {
    id: 'classic-canadian-breakfast',
    categoryId: 'breakfast',
    name: 'Classic Canadian Breakfast',
    description:
      'Farm-fresh eggs cooked to your preference, crispy bacon strips, golden breakfast potatoes, buttered toast, and seasonal fresh fruit.',
    price: 18,
    prepMinutes: 20,
    image: imageAssets.classicCanadianBreakfast,
  },
  {
    id: 'maple-pancake-stack',
    categoryId: 'breakfast',
    name: 'Maple Pancake Stack',
    description:
      'Fluffy buttermilk pancakes served warm with authentic Ontario maple syrup, whipped butter, and fresh berries.',
    price: 16,
    prepMinutes: 18,
    image: imageAssets.maplePancakeStack,
  },
  {
    id: 'smoked-salmon-bagel',
    categoryId: 'breakfast',
    name: 'Smoked Salmon Bagel',
    description:
      'Toasted bagel layered with cream cheese, premium smoked salmon, capers, red onion, and a touch of lemon.',
    price: 19,
    prepMinutes: 15,
    image: imageAssets.smokedSalmonBagel,
  },
  {
    id: 'veggie-omelette-deluxe',
    categoryId: 'breakfast',
    name: 'Veggie Omelette Deluxe',
    description:
      'Three-egg omelette filled with sauteed peppers, mushrooms, spinach, and melted cheddar cheese with potatoes and toast.',
    price: 17,
    prepMinutes: 18,
    image: imageAssets.veggieOmeletteDeluxe,
  },
  {
    id: 'breakfast-croissant-combo',
    categoryId: 'breakfast',
    name: 'Breakfast Croissant Combo',
    description:
      'Buttery baked croissant served with scrambled eggs, savory breakfast sausage, and fresh seasonal fruit.',
    price: 15,
    prepMinutes: 15,
    image: imageAssets.breakfastCroissantCombo,
  },
  {
    id: 'casino-signature-burger',
    categoryId: 'allday',
    name: 'Casino Signature Burger',
    description:
      'Angus beef burger with aged cheddar, crisp lettuce, ripe tomato, house sauce, brioche bun, and golden fries.',
    price: 24,
    prepMinutes: 25,
    image: imageAssets.casinoSignatureBurger,
  },
  {
    id: 'grilled-chicken-club',
    categoryId: 'allday',
    name: 'Grilled Chicken Club',
    description:
      'Grilled chicken breast layered with crispy bacon, lettuce, tomato, and mayonnaise between toasted artisan bread.',
    price: 21,
    prepMinutes: 20,
    image: imageAssets.grilledChickenClub,
  },
  {
    id: 'steakhouse-caesar-salad',
    categoryId: 'allday',
    name: 'Steakhouse Caesar Salad',
    description:
      'Romaine lettuce, creamy Caesar dressing, parmesan, bacon, garlic croutons, and sliced grilled chicken breast.',
    price: 20,
    prepMinutes: 15,
    image: imageAssets.steakhouseCaesarSalad,
  },
  {
    id: 'fish-and-chips-ontario-style',
    categoryId: 'allday',
    name: 'Fish & Chips Ontario Style',
    description:
      'Beer-battered white fish served with thick-cut fries, tartar sauce, lemon wedges, and house-made coleslaw.',
    price: 25,
    prepMinutes: 25,
    image: imageAssets.fishAndChipsOntarioStyle,
  },
  {
    id: 'margherita-flatbread-pizza',
    categoryId: 'allday',
    name: 'Margherita Flatbread Pizza',
    description:
      'Stone-baked flatbread with tomato sauce, fresh mozzarella, basil leaves, and a drizzle of olive oil.',
    price: 22,
    prepMinutes: 20,
    image: imageAssets.margheritaFlatbreadPizza,
  },
  {
    id: 'chocolate-lava-cake',
    categoryId: 'latenight',
    name: 'Chocolate Lava Cake',
    description:
      'Warm chocolate cake with a rich molten center, vanilla ice cream, and chocolate drizzle.',
    price: 12,
    prepMinutes: 12,
    image: imageAssets.chocolateLavaCake,
  },
  {
    id: 'new-york-cheesecake',
    categoryId: 'latenight',
    name: 'New York Cheesecake',
    description:
      'Creamy New York-style cheesecake on a buttery graham cracker crust with mixed berry compote.',
    price: 11,
    prepMinutes: 5,
    image: imageAssets.newYorkCheesecake,
  },
  {
    id: 'casino-nacho-platter',
    categoryId: 'latenight',
    name: 'Casino Nacho Platter',
    description:
      'Tortilla chips loaded with melted cheese, jalapenos, salsa, sour cream, and green onions.',
    price: 18,
    prepMinutes: 15,
    image: imageAssets.casinoNachoPlatter,
  },
  {
    id: 'midnight-chicken-wings',
    categoryId: 'latenight',
    name: 'Midnight Chicken Wings',
    description:
      'Crispy chicken wings tossed in barbecue, buffalo, honey garlic, or spicy sauce with creamy dip.',
    price: 19,
    prepMinutes: 20,
    image: imageAssets.midnightChickenWings,
  },
  {
    id: 'warm-cookie-skillet',
    categoryId: 'latenight',
    name: 'Warm Cookie Skillet',
    description:
      'Fresh baked chocolate chip cookie served warm with vanilla ice cream, caramel sauce, and chocolate shavings.',
    price: 13,
    prepMinutes: 12,
    image: imageAssets.warmCookieSkillet,
  },
];

export const getMenuItem = (id: string) => menuItems.find(item => item.id === id);
