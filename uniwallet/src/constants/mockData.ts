import { colors } from './theme';

export const quickActions = ['Reload', 'Transfer', 'Analytics', 'AI Insights'] as const;

export const tabs = [
  { key: 'home', label: 'Home' },
  { key: 'cards', label: 'Cards' },
  { key: 'reload', label: 'Reload' },
  { key: 'rewards', label: 'Rewards' },
  { key: 'profile', label: 'Profile' },
] as const;

export const virtualCards = [
  {
    id: 'saas',
    label: 'SaaS',
    balance: 'RM 180.00',
    subtitle: 'Subscriptions',
    cardNumber: '.... .... .... 4521',
    accentColor: colors.cardSaas,
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    balance: 'RM 120.00',
    subtitle: 'Streaming and leisure',
    cardNumber: '.... .... .... 1984',
    accentColor: colors.cardEntertainment,
  },
  {
    id: 'utilities',
    label: 'Utilities',
    balance: 'RM 95.00',
    subtitle: 'Bills and essentials',
    cardNumber: '.... .... .... 7740',
    accentColor: colors.cardUtilities,
  },
  {
    id: 'others',
    label: 'Others / Gym',
    balance: 'RM 55.00',
    subtitle: 'Health and extras',
    cardNumber: '.... .... .... 6205',
    accentColor: colors.cardOthers,
  },
] as const;

export const transactionsByDate = [
  {
    date: 'Today',
    items: [
      {
        id: 't1',
        merchant: 'Netflix Standard',
        category: 'Entertainment',
        amount: '-RM 55.00',
        time: '8:45 PM',
        accent: colors.cardEntertainment,
      },
      {
        id: 't1-fee',
        merchant: 'UniWallet Fee',
        category: 'Service fee',
        amount: '-RM 2.00',
        time: '8:45 PM',
        accent: colors.accent,
        isFee: true,
      },
      {
        id: 't2',
        merchant: 'ChatGPT Plus',
        category: 'SaaS',
        amount: '-RM 95.00',
        time: '9:30 AM',
        accent: colors.cardSaas,
      },
      {
        id: 't2-fee',
        merchant: 'UniWallet Fee',
        category: 'Service fee',
        amount: '-RM 2.00',
        time: '9:30 AM',
        accent: colors.accent,
        isFee: true,
      },
    ],
  },
  {
    date: 'Yesterday',
    items: [
      {
        id: 't3',
        merchant: 'Maxis Fiber',
        category: 'Utilities',
        amount: '-RM 89.00',
        time: '4:10 PM',
        accent: colors.cardUtilities,
      },
      {
        id: 't3-fee',
        merchant: 'UniWallet Fee',
        category: 'Service fee',
        amount: '-RM 2.00',
        time: '4:10 PM',
        accent: colors.accent,
        isFee: true,
      },
      {
        id: 't4',
        merchant: 'Wallet Reload',
        category: 'FPX top up',
        amount: '+RM 150.00',
        time: '10:12 AM',
        accent: colors.success,
        positive: true,
      },
    ],
  },
] as const;
