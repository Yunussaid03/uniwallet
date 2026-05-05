import { Pressable, StyleSheet, Text, View } from 'react-native';
import { tabs } from '../constants/mockData';
import { borderRadius, colors, spacing, typography } from '../constants/theme';

type TabKey = (typeof tabs)[number]['key'];

type TabBarProps = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
};

export default function TabBar({ activeTab, onChange }: TabBarProps) {
  return (
    <View style={styles.wrapper}>
      {tabs.map((tab) => {
        const active = tab.key === activeTab;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={[styles.tab, active && styles.activeTab]}
          >
            <Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  activeTab: {
    backgroundColor: colors.glassStrong,
  },
  label: {
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: typography.caption,
    fontWeight: '700',
  },
  activeLabel: {
    color: colors.textPrimary,
  },
});
