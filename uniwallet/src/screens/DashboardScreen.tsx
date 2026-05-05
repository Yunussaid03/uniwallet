import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import QuickActionButton from '../components/QuickActionButton';
import TransactionItem from '../components/TransactionItem';
import VirtualCard from '../components/VirtualCard';
import { quickActions, transactionsByDate, virtualCards } from '../constants/mockData';
import { borderRadius, colors, spacing, typography } from '../constants/theme';

export default function DashboardScreen() {
  return (
    <View style={styles.page}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning, Ammar</Text>
            <Text style={styles.subtitle}>Master Wallet dashboard</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>3</Text>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>RM 450.00</Text>
          <Text style={styles.balanceSubtext}>Live balance synced with your master wallet</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.actionsRow}
        >
          {quickActions.map((action, index) => (
            <QuickActionButton key={action} label={action} primary={index === 0} />
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Virtual Cards</Text>
          <Text style={styles.sectionMeta}>4 categories</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        >
          {virtualCards.map((card) => (
            <VirtualCard
              key={card.id}
              label={card.label}
              subtitle={card.subtitle}
              balance={card.balance}
              cardNumber={card.cardNumber}
              accentColor={card.accentColor}
            />
          ))}
        </ScrollView>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <Text style={styles.sectionMeta}>Last 10</Text>
          </View>

          {transactionsByDate.map((group) => (
            <View key={group.date} style={styles.transactionGroup}>
              <Text style={styles.groupLabel}>{group.date}</Text>
              {group.items.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  title={transaction.merchant}
                  subtitle={transaction.category}
                  amount={transaction.amount}
                  date={transaction.time}
                  accentColor={transaction.accent}
                  positive={'positive' in transaction ? Boolean(transaction.positive) : false}
                  isFee={'isFee' in transaction ? Boolean(transaction.isFee) : false}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bgBase,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greeting: {
    color: colors.textPrimary,
    fontSize: typography.title,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginTop: spacing.xs,
  },
  headerBadge: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.glassStrong,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: '800',
  },
  balanceCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    padding: spacing.lg,
    shadowColor: colors.primary,
    shadowOpacity: 0.28,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 18 },
    elevation: 14,
  },
  balanceLabel: {
    color: colors.textSecondary,
    fontSize: typography.body,
    fontWeight: '600',
  },
  balanceAmount: {
    color: colors.textPrimary,
    fontSize: typography.hero,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  balanceSubtext: {
    color: colors.textMuted,
    fontSize: typography.body,
    marginTop: spacing.xs,
  },
  actionsRow: {
    paddingVertical: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.section,
    fontWeight: '800',
  },
  sectionMeta: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  carousel: {
    paddingBottom: spacing.lg,
  },
  sectionCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    padding: spacing.lg,
  },
  transactionGroup: {
    marginTop: spacing.sm,
  },
  groupLabel: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
});
