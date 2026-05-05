import { StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../constants/theme';

type VirtualCardProps = {
  label: string;
  subtitle: string;
  balance: string;
  cardNumber: string;
  accentColor: string;
};

export default function VirtualCard({
  label,
  subtitle,
  balance,
  cardNumber,
  accentColor,
}: VirtualCardProps) {
  return (
    <View style={[styles.card, { borderColor: accentColor, shadowColor: accentColor }]}>
      <View style={styles.topRow}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.badge, { backgroundColor: accentColor }]}>
          <Text style={styles.badgeText}>ACTIVE</Text>
        </View>
      </View>

      <Text style={styles.number}>{cardNumber}</Text>
      <Text style={styles.balance}>{balance}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.owner}>Ammar Rahman</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 270,
    marginRight: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.glass,
    borderWidth: 1,
    shadowOpacity: 0.32,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  label: {
    color: colors.textPrimary,
    fontSize: typography.section,
    fontWeight: '800',
  },
  badge: {
    borderRadius: borderRadius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: typography.caption,
    fontWeight: '800',
  },
  number: {
    color: colors.textSecondary,
    fontSize: typography.body,
    letterSpacing: 2,
    marginBottom: spacing.md,
  },
  balance: {
    color: colors.textPrimary,
    fontSize: typography.title,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginTop: spacing.xs,
  },
  owner: {
    color: colors.textMuted,
    fontSize: typography.caption,
    marginTop: spacing.lg,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
