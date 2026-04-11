import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, borderRadius } from '../constants/theme';

type TransactionItemProps = {
  title: string;
  subtitle: string;
  amount: string;
  date: string;
  positive?: boolean;
};

export default function TransactionItem({
  title,
  subtitle,
  amount,
  date,
  positive = false,
}: TransactionItemProps) {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.amount, positive && styles.positive]}>{amount}</Text>
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
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#1d2a54',
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: spacing.xs / 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  positive: {
    color: colors.accent,
  },
  date: {
    color: colors.muted,
    fontSize: 12,
    marginTop: spacing.xs / 2,
  },
});