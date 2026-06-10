import React from 'react';
import {Pressable, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {AppHeader} from '../components/AppHeader';
import {GradientSurface} from '../components/GradientSurface';
import {ScreenFrame} from '../components/ScreenFrame';
import {SliderControl} from '../components/SliderControl';
import {colors, layout} from '../theme/theme';
import type {ClimateMode, ClimateSettings} from '../types/app';

type Props = {
  climate: ClimateSettings;
  setClimate: React.Dispatch<React.SetStateAction<ClimateSettings>>;
};

export function ClimateScreen({climate, setClimate}: Props): React.JSX.Element {
  const {height, width} = useWindowDimensions();
  const compact = width <= 375 || height <= 720;
  const patch = (next: Partial<ClimateSettings>) => setClimate(current => ({...current, ...next}));

  return (
    <View style={styles.root}>
      <AppHeader title="Climate Control" />
      <ScreenFrame contentStyle={compact && styles.compactContent}>
        <Pressable onPress={() => patch({systemOn: !climate.systemOn})}>
          <GradientSurface muted={!climate.systemOn} style={[styles.systemCard, compact && styles.systemCardCompact]}>
            <View style={[styles.systemContent, compact && styles.systemContentCompact]}>
              <View>
                <Text style={[styles.systemTitle, compact && styles.systemTitleCompact]}>Climate System</Text>
                <Text style={styles.systemBody}>{climate.systemOn ? 'System Active' : 'System Off'}</Text>
              </View>
              <View style={[styles.powerCircle, compact && styles.powerCircleCompact, !climate.systemOn && styles.powerOff]}>
                <Text style={[styles.powerIcon, compact && styles.powerIconCompact]}>⏻</Text>
              </View>
            </View>
          </GradientSurface>
        </Pressable>
        {climate.systemOn ? (
          <>
            <View style={[styles.card, compact && styles.cardCompact]}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconCircle, compact && styles.iconCircleCompact]}>
                  <Text style={styles.iconText}>🌡️</Text>
                </View>
                <View>
                  <Text style={[styles.cardTitle, compact && styles.cardTitleCompact]}>Temperature</Text>
                  <Text style={styles.cardSubtitle}>Adjust room temperature</Text>
                </View>
              </View>
              <Text style={[styles.temperature, compact && styles.temperatureCompact]}>{climate.temperature}°</Text>
              <Text style={styles.unit}>Celsius</Text>
              <SliderControl
                value={climate.temperature}
                min={16}
                max={30}
                onChange={temperature => patch({temperature})}
                leftLabel="16°C"
                rightLabel="30°C"
              />
            </View>
            <View style={[styles.card, compact && styles.cardCompact]}>
              <Text style={[styles.cardTitle, compact && styles.cardTitleCompact]}>Climate Mode</Text>
              <View style={styles.modeRow}>
                <ModeButton mode="cooling" compact={compact} active={climate.mode === 'cooling'} onPress={() => patch({mode: 'cooling'})} />
                <ModeButton mode="heating" compact={compact} active={climate.mode === 'heating'} onPress={() => patch({mode: 'heating'})} />
              </View>
            </View>
            <View style={[styles.card, compact && styles.cardCompact]}>
              <View style={styles.fanHeader}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconCircle, compact && styles.iconCircleCompact]}>
                    <Text style={styles.iconText}>💨</Text>
                  </View>
                  <View>
                    <Text style={[styles.cardTitle, compact && styles.cardTitleCompact]}>Fan Speed</Text>
                    <Text style={styles.cardSubtitle}>{climate.fanSpeed < 35 ? 'Low' : climate.fanSpeed < 75 ? 'Medium' : 'High'}</Text>
                  </View>
                </View>
                <Text style={[styles.fanValue, compact && styles.fanValueCompact]}>{climate.fanSpeed}%</Text>
              </View>
              <SliderControl
                value={climate.fanSpeed}
                min={0}
                max={100}
                onChange={fanSpeed => patch({fanSpeed})}
                leftLabel="Off"
                rightLabel="Max"
              />
            </View>
            <Pressable onPress={() => patch({sleepMode: !climate.sleepMode})} style={[styles.sleepCard, compact && styles.sleepCardCompact]}>
              <View style={[styles.cardHeader, styles.sleepHeader]}>
                <View style={[styles.sleepIcon, compact && styles.iconCircleCompact, climate.sleepMode && styles.sleepIconActive]}>
                  <Text style={styles.iconText}>🌙</Text>
                </View>
                <View style={styles.sleepCopy}>
                  <Text style={[styles.cardTitle, compact && styles.cardTitleCompact]}>Sleep Mode</Text>
                  <Text style={styles.cardSubtitle}>
                    {climate.sleepMode ? 'Optimal sleeping temperature' : 'Standard mode'}
                  </Text>
                </View>
              </View>
              <View style={[styles.switchTrack, climate.sleepMode && styles.switchTrackActive]}>
                <View style={[styles.switchThumb, climate.sleepMode && styles.switchThumbActive]} />
              </View>
            </Pressable>
            <View style={[styles.notice, compact && styles.noticeCompact]}>
              <Text style={styles.noticeText}>
                Changes take effect within 2-3 minutes. For immediate assistance, contact guest services.
              </Text>
            </View>
          </>
        ) : null}
      </ScreenFrame>
    </View>
  );
}

function ModeButton({
  mode,
  active,
  compact,
  onPress,
}: {
  mode: ClimateMode;
  active: boolean;
  compact: boolean;
  onPress: () => void;
}): React.JSX.Element {
  const isCooling = mode === 'cooling';
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.modeButton,
        compact && styles.modeButtonCompact,
        active && (isCooling ? styles.coolingActive : styles.heatingActive),
      ]}>
      <Text style={styles.modeIcon}>{isCooling ? '💨' : '🌡️'}</Text>
      <Text style={[styles.modeText, active && styles.modeTextActive]}>{isCooling ? 'Cooling' : 'Heating'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  compactContent: {
    paddingTop: 14,
  },
  systemCard: {
    minHeight: 92,
    borderRadius: layout.cardRadius,
    marginBottom: 18,
  },
  systemCardCompact: {
    minHeight: 78,
    marginBottom: 14,
  },
  systemContent: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  systemContentCompact: {
    padding: 16,
  },
  systemTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  systemTitleCompact: {
    fontSize: 20,
  },
  systemBody: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
  },
  powerCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  powerCircleCompact: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  powerOff: {
    backgroundColor: '#1c1c1c',
  },
  powerIcon: {
    color: colors.white,
    fontSize: 29,
  },
  powerIconCompact: {
    fontSize: 25,
  },
  card: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    marginBottom: 18,
    gap: 18,
  },
  cardCompact: {
    padding: 14,
    marginBottom: 14,
    gap: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleCompact: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  iconText: {
    fontSize: 18,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  cardTitleCompact: {
    fontSize: 16,
  },
  cardSubtitle: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  temperature: {
    color: colors.yellow,
    fontSize: 54,
    lineHeight: 58,
    fontWeight: '300',
    textAlign: 'center',
  },
  temperatureCompact: {
    fontSize: 44,
    lineHeight: 48,
  },
  unit: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: -12,
  },
  modeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modeButton: {
    flex: 1,
    minHeight: 78,
    borderRadius: layout.cardRadius,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  modeButtonCompact: {
    minHeight: 66,
    gap: 6,
  },
  coolingActive: {
    backgroundColor: colors.blue,
  },
  heatingActive: {
    backgroundColor: '#cf2328',
  },
  modeIcon: {
    fontSize: 18,
  },
  modeText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '900',
  },
  modeTextActive: {
    color: colors.white,
  },
  fanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  fanValue: {
    color: colors.gold,
    fontSize: 23,
    fontWeight: '900',
  },
  fanValueCompact: {
    fontSize: 21,
  },
  sleepCard: {
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    overflow: 'hidden',
  },
  sleepCardCompact: {
    padding: 14,
    marginBottom: 14,
  },
  sleepIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sleepIconActive: {
    backgroundColor: colors.orange,
  },
  sleepCopy: {
    flex: 1,
    minWidth: 0,
  },
  sleepHeader: {
    flex: 1,
    minWidth: 0,
  },
  switchTrack: {
    width: 52,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surfaceSoft,
    padding: 4,
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  switchTrackActive: {
    backgroundColor: colors.orange,
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.white,
  },
  switchThumbActive: {
    transform: [{translateX: 22}],
    backgroundColor: colors.black,
  },
  notice: {
    borderRadius: layout.cardRadius,
    backgroundColor: colors.surface,
    padding: 15,
  },
  noticeCompact: {
    padding: 12,
  },
  noticeText: {
    color: colors.dim,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    fontWeight: '800',
  },
});
