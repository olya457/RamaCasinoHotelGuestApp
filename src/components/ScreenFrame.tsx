import React, {PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {colors, layout} from '../theme/theme';

type Props = PropsWithChildren<{
  withTabs?: boolean;
  scroll?: boolean;
  padded?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}>;

export function ScreenFrame({
  children,
  withTabs = true,
  scroll = true,
  padded = true,
  contentStyle,
}: Props): React.JSX.Element {
  const {height, width} = useWindowDimensions();
  const compact = width <= 375 || height <= 720;
  const paddingBottom = withTabs
    ? (compact ? layout.compactTabHeight : layout.tabHeight) + layout.navGap + (compact ? 14 : 20)
    : layout.bottomInset;
  const horizontalPadding = padded ? (compact ? layout.compactScreenPadding : layout.screenPadding) : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <View style={[styles.shell, {paddingTop: layout.androidTopInset}]}>
          {scroll ? (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.scrollContent,
                compact && styles.scrollContentCompact,
                {paddingBottom, paddingHorizontal: horizontalPadding},
                contentStyle,
              ]}>
              {children}
            </ScrollView>
          ) : (
            <View style={[styles.body, {paddingBottom, paddingHorizontal: horizontalPadding}, contentStyle]}>
              {children}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.black,
  },
  flex: {
    flex: 1,
  },
  shell: {
    flex: 1,
    backgroundColor: colors.black,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
  },
  scrollContentCompact: {
    paddingTop: 14,
  },
  body: {
    flex: 1,
  },
});
