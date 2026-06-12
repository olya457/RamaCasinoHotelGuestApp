import {colors} from '../theme/theme';
import type {RequestCategory} from '../types/app';

export const requestCategories: RequestCategory[] = [
  {
    id: 'bedding',
    title: 'Bedding & Linens',
    icon: '🛏️',
    color: colors.red,
    examples: [
      'Extra pillows for my room',
      'Additional blanket please',
      'Hypoallergenic bedding needed',
    ],
  },
  {
    id: 'bathroom',
    title: 'Bathroom Essentials',
    icon: '💧',
    color: colors.blue,
    examples: [
      'Fresh towels requested',
      'Shampoo refill needed',
      'Extra bathrobe please',
    ],
  },
  {
    id: 'housekeeping',
    title: 'Housekeeping Services',
    icon: '✨',
    color: colors.yellow,
    examples: [
      'Room cleaning service',
      'Trash pickup requested',
      'Turndown service please',
    ],
  },
  {
    id: 'dining',
    title: 'Dining & Refreshments',
    icon: '☕',
    color: colors.green,
    examples: [
      'Ice bucket refill',
      'Coffee capsules needed',
      'Mini bar refresh',
    ],
  },
  {
    id: 'maintenance',
    title: 'Maintenance Assistance',
    icon: '🔧',
    color: colors.purple,
    examples: [
      'Air conditioning adjustment',
      'Light bulb replacement',
      'TV remote issue',
    ],
  },
  {
    id: 'laundry',
    title: 'Laundry & Garment Care',
    icon: '👕',
    color: colors.cyan,
    examples: ['Laundry pickup', 'Suit pressing service', 'Garment bag needed'],
  },
  {
    id: 'special',
    title: 'Special Guest Requests',
    icon: '⭐',
    color: '#e83e99',
    examples: [
      'Anniversary setup',
      'Late checkout request',
      'Accessibility assistance',
    ],
  },
];
