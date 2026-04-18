import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import TabBar from './src/components/TabBar';
import { tabs } from './src/constants/mockData';
import { colors, spacing } from './src/constants/theme';
import DashboardScreen from './src/screens/DashboardScreen';
import PlaceholderScreen from './src/screens/PlaceholderScreen';

type TabKey = (typeof tabs)[number]['key'];

const screenContent: Record<
  TabKey,
  { eyebrow: string; title: string; description: string }
> = {
  home: {
    eyebrow: 'Home',
    title: 'Master Wallet',
    description: 'Your main dashboard is live with mock balances, quick actions, and category cards.',
  },
  cards: {
    eyebrow: 'Week 1',
    title: 'Cards screen is next',
    description: 'This placeholder keeps the tab shell real while we build the full card controls flow in the next session.',
  },
  reload: {
    eyebrow: 'Week 1',
    title: 'Reload flow scaffolded',
    description: 'The tab is ready for the Billplz-powered FPX funding flow once we start the payment work.',
  },
  rewards: {
    eyebrow: 'Week 3',
    title: 'Rewards comes later',
    description: 'We have reserved the slot now so the information architecture matches the UniWallet spec from Day 1.',
  },
  profile: {
    eyebrow: 'Week 1',
    title: 'Profile tab reserved',
    description: 'This is where auth state, KYC status, and account settings will land once the auth flow is added.',
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.app}>
        <View style={styles.content}>
          {activeTab === 'home' ? (
            <DashboardScreen />
          ) : (
            <PlaceholderScreen
              eyebrow={screenContent[activeTab].eyebrow}
              title={screenContent[activeTab].title}
              description={screenContent[activeTab].description}
            />
          )}
        </View>

        <TabBar activeTab={activeTab} onChange={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgBase,
  },
  app: {
    flex: 1,
    backgroundColor: colors.bgBase,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  content: {
    flex: 1,
  },
});
