import { Pressable, StyleSheet, Text } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../constants/theme';

type QuickActionButtonProps = {
  label: string;
  primary?: boolean;
};

export default function QuickActionButton({
  label,
  primary = false,
}: QuickActionButtonProps) {
  return (
    <Pressable style={[styles.button, primary ? styles.primary : styles.secondary]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 104,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    marginRight: spacing.sm,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.glass,
    borderColor: colors.glassBorder,
  },
  label: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: '700',
    textAlign: 'center',
  },
});
