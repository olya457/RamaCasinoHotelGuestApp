import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
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
  const patch = (next: Partial<ClimateSettings>) => setClimate(current => ({...current, ...next}));

  return (
    <View style={styles.root}>
      <AppHeader title="Climate Control" />
      <ScreenFrame>
        <Pressable onPress={() => patch({systemOn: !climate.systemOn})}>
          <GradientSurface muted={!climate.systemOn} style={styles.systemCard}>
            <View style={styles.systemContent}>
              <View>
                <Text style={styles.systemTitle}>Climate System</Text>
                <Text style={styles.systemBody}>{climate.systemOn ? 'System Active' : 'System Off'}</Text>
              </View>
              <View style={[styles.powerCircle, !climate.systemOn && styles.powerOff]}>
                <Text style={styles.powerIcon}>⏻</Text>
              </View>
            </View>
          </GradientSurface>
        </Pressable>
        {climate.systemOn ? (
          <>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconCircle}>
                  <Text style={styles.iconText}>🌡️</Text>
                </View>
                <View>
                  <Text style={styles.cardTitle}>Temperature</Text>
                  <Text style={styles.cardSubtitle}>Adjust room temperature</Text>
                </View>
              </View>
              <Text style={styles.temperature}>{climate.temperature}°</Text>
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
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Climate Mode</Text>
              <View style={styles.modeRow}>
                <ModeButton mode="cooling" active={climate.mode === 'cooling'} onPress={() => patch({mode: 'cooling'})} />
                <ModeButton mode="heating" active={climate.mode === 'heating'} onPress={() => patch({mode: 'heating'})} />
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.fanHeader}>
                <View style={styles.cardHeader}>
                  <View style={styles.iconCircle}>
                    <Text style={styles.iconText}>💨</Text>
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>Fan Speed</Text>
                    <Text style={styles.cardSubtitle}>{climate.fanSpeed < 35 ? 'Low' : climate.fanSpeed < 75 ? 'Medium' : 'High'}</Text>
                  </View>
                </View>
                <Text style={styles.fanValue}>{climate.fanSpeed}%</Text>
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
            <Pressable onPress={() => patch({sleepMode: !climate.sleepMode})} style={styles.sleepCard}>
              <View style={styles.cardHeader}>
                <View style={[styles.sleepIcon, climate.sleepMode && styles.sleepIconActive]}>
                  <Text style={styles.iconText}>🌙</Text>
                </View>
                <View style={styles.sleepCopy}>
                  <Text style={styles.cardTitle}>Sleep Mode</Text>
                  <Text style={styles.cardSubtitle}>
                    {climate.sleepMode ? 'Optimal sleeping temperature' : 'Standard mode'}
                  </Text>
                </View>
              </View>
              <View style={[styles.switchTrack, climate.sleepMode && styles.switchTrackActive]}>
                <View style={[styles.switchThumb, climate.sleepMode && styles.switchThumbActive]} />
              </View>
            </Pressable>
            <View style={styles.notice}>
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
  onPress,
}: {
  mode: ClimateMode;
  active: boolean;
  onPress: () => void;
}): React.JSX.Element {
  const isCooling = mode === 'cooling';
  return (
    <Pressable onPress={onPress} style={[styles.modeButton, active && (isCooling ? styles.coolingActive : styles.heatingActive)]}>
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
  systemCard: {
    minHeight: 92,
    borderRadius: layout.cardRadius,
    marginBottom: 18,
  },
  systemContent: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  systemTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
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
  powerOff: {
    backgroundColor: '#1c1c1c',
  },
  powerIcon: {
    color: colors.white,
    fontSize: 29,
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
  iconText: {
    fontSize: 18,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
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
  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceSoft,
    padding: 3,
    justifyContent: 'center',
  },
  switchTrackActive: {
    backgroundColor: colors.orange,
  },
  switchThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.white,
  },
  switchThumbActive: {
    transform: [{translateX: 20}],
    backgroundColor: colors.black,
  },
  notice: {
    borderRadius: layout.cardRadius,
    backgroundColor: colors.surface,
    padding: 15,
  },
  noticeText: {
    color: colors.dim,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    fontWeight: '800',
  },
});
