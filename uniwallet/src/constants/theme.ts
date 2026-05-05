export const colors = {
  bgBase: '#0A0A0F',
  bgSurface: '#13131A',
  bgElevated: '#1C1C28',
  glass: 'rgba(255, 255, 255, 0.06)',
  glassStrong: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  overlay: 'rgba(255, 255, 255, 0.04)',
  primary: '#6366F1',
  accent: '#F97316',
  success: '#22C55E',
  danger: '#EF4444',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#475569',
  cardSaas: '#3B82F6',
  cardEntertainment: '#8B5CF6',
  cardUtilities: '#10B981',
  cardOthers: '#F59E0B',
} as const;

export const spacing = {
  xs: 6,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const borderRadius = {
  sm: 14,
  md: 20,
  lg: 28,
  pill: 999,
} as const;

export const typography = {
  caption: 12,
  body: 14,
  section: 18,
  title: 28,
  hero: 40,
} as const;

export const shadows = {
  blue: 'rgba(59, 130, 246, 0.25)',
  purple: 'rgba(139, 92, 246, 0.24)',
  green: 'rgba(16, 185, 129, 0.24)',
  orange: 'rgba(245, 158, 11, 0.24)',
} as const;
