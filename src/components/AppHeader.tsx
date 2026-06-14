import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {colors, layout} from '../theme/theme';

type Props = {
  title: string;
  onBack?: () => void;
  showGuest?: boolean;
  action?: React.ReactNode;
};

export function AppHeader({
  title,
  onBack,
  showGuest = true,
  action,
}: Props): React.JSX.Element {
  const {height, width} = useWindowDimensions();
  const compact = width <= 375 || height <= 720;

  return (
    <View style={[styles.header, compact && styles.headerCompact]}>
      <View style={styles.titleWrap}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            style={[styles.backButton, compact && styles.backButtonCompact]}>
            <Text style={[styles.backIcon, compact && styles.backIconCompact]}>
              ‹
            </Text>
          </Pressable>
        ) : null}
        <Text
          style={[styles.title, compact && styles.titleCompact]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.76}>
          {title}
        </Text>
      </View>
      {action ?? (
        <View style={showGuest ? styles.guideBadge : styles.spacer}>
          {showGuest ? <Text style={styles.guideBadgeText}>19+</Text> : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 88,
    paddingHorizontal: layout.screenPadding,
    paddingTop: layout.topInset + 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: colors.borderSoft,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerCompact: {
    minHeight: 76,
    paddingHorizontal: layout.compactScreenPadding,
    paddingTop: layout.topInset + 12,
    paddingBottom: 10,
    gap: 8,
  },
  titleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: 0,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    flexShrink: 1,
  },
  titleCompact: {
    fontSize: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonCompact: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  backIcon: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 30,
    marginTop: -2,
  },
  backIconCompact: {
    fontSize: 28,
    lineHeight: 28,
  },
  spacer: {
    width: 1,
  },
  guideBadge: {
    minWidth: 46,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(245, 189, 0, 0.42)',
    backgroundColor: 'rgba(245, 189, 0, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  guideBadgeText: {
    color: colors.gold,
    fontSize: 13,
    fontWeight: '900',
  },
});
