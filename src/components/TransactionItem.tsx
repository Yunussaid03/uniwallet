import { StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../constants/theme';

type TransactionItemProps = {
  title: string;
  subtitle: string;
  amount: string;
  date: string;
  accentColor: string;
  positive?: boolean;
  isFee?: boolean;
};

export default function TransactionItem({
  title,
  subtitle,
  amount,
  date,
  accentColor,
  positive = false,
  isFee = false,
}: TransactionItemProps) {
  return (
    <View style={[styles.row, isFee && styles.feeRow]}>
      <View style={styles.left}>
        <View style={[styles.icon, { backgroundColor: accentColor }]} />
        <View>
          <Text style={[styles.title, isFee && styles.feeTitle]}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={[styles.amount, positive && styles.positive, isFee && styles.feeAmount]}>
          {amount}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
  },
  feeRow: {
    marginLeft: spacing.lg,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
  },
  icon: {
    width: 12,
    height: 12,
    borderRadius: borderRadius.pill,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  feeTitle: {
    color: colors.textSecondary,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.caption,
    marginTop: spacing.xs / 2,
  },
  right: {
    alignItems: 'flex-end',
    marginLeft: spacing.sm,
  },
  amount: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: '800',
  },
  feeAmount: {
    color: colors.textSecondary,
  },
  positive: {
    color: colors.success,
  },
  date: {
    color: colors.textMuted,
    fontSize: typography.caption,
    marginTop: spacing.xs / 2,
  },
});
