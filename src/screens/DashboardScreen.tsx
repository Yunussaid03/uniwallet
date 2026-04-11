import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, spacing } from '../constants/theme';
import TransactionItem from '../components/TransactionItem';

const transactions = [
  {
    id: '1',
    merchant: 'Dubai Mall',
    category: 'Shopping',
    amount: '-$420.00',
    date: 'Apr 10',
    positive: false,
  },
  {
    id: '2',
    merchant: 'Payoneer',
    category: 'Salary',
    amount: '+$2,750.00',
    date: 'Apr 09',
    positive: true,
  },
  {
    id: '3',
    merchant: 'Coffee & Co.',
    category: 'Dining',
    amount: '-$14.20',
    date: 'Apr 08',
    positive: false,
  },
  {
    id: '4',
    merchant: 'Rent',
    category: 'Housing',
    amount: '-$1,200.00',
    date: 'Apr 05',
    positive: false,
  },
];

const virtualCards = [
  {
    id: 'a',
    label: 'SaaS',
    amount: '$1,850',
    subtitle: 'Productivity',
  },
  {
    id: 'b',
    label: 'Entertainment',
    amount: '$680',
    subtitle: 'Streaming',
  },
  {
    id: 'c',
    label: 'Utilities',
    amount: '$540',
    subtitle: 'Monthly bills',
  },
];

export default function DashboardScreen() {
  return (
    <View style={styles.page}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.subtitle}>UniWallet Lite</Text>
        <Text style={styles.title}>Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>Available Balance</Text>
            <Text style={styles.cardBadge}>Premium</Text>
          </View>
          <Text style={styles.balanceAmount}>$12,480.50</Text>
          <Text style={styles.balanceSubtext}>+5.8% this month</Text>
        </View>

        <View style={styles.quickActions}> 
          <TouchableOpacity style={[styles.actionButton, styles.actionPrimary]}>
            <Text style={styles.actionLabel}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.actionSecondary]}>
            <Text style={styles.actionLabel}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.actionSecondary]}>
            <Text style={styles.actionLabel}>Top up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Virtual Card Allocation</Text>
            <Text style={styles.sectionMeta}>Budget categories</Text>
          </View>
          <View style={styles.allocationGrid}>
            {virtualCards.map((card) => (
              <View key={card.id} style={styles.allocationCard}>
                <Text style={styles.allocationLabel}>{card.label}</Text>
                <Text style={styles.allocationAmount}>{card.amount}</Text>
                <Text style={styles.allocationMeta}>{card.subtitle}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}> 
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <Text style={styles.sectionMeta}>View all</Text>
          </View>

          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              title={transaction.merchant}
              subtitle={transaction.category}
              amount={transaction.amount}
              date={transaction.date}
              positive={transaction.positive}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  subtitle: {
    color: colors.accent,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.strong,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  cardBadge: {
    color: colors.text,
    backgroundColor: '#212b49',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    fontSize: 12,
    overflow: 'hidden',
  },
  balanceAmount: {
    color: colors.text,
    fontSize: 42,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  balanceSubtext: {
    color: colors.muted,
    marginTop: spacing.xs,
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  actionButton: {
    flex: 1,
    borderRadius: borderRadius.mild,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
  },
  actionPrimary: {
    backgroundColor: colors.primary,
  },
  actionSecondary: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: '#1d2a54',
  },
  actionLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  sectionMeta: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  allocationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  allocationCard: {
    width: '48%',
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.mild,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  allocationLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  allocationAmount: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: spacing.xs / 2,
  },
  allocationMeta: {
    color: colors.muted,
    fontSize: 12,
  },
});
