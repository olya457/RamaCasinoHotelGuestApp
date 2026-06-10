import React, {useState} from 'react';
import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/theme';

type Props = {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  leftLabel?: string;
  rightLabel?: string;
};

export function SliderControl({value, min, max, onChange, leftLabel, rightLabel}: Props): React.JSX.Element {
  const [width, setWidth] = useState(1);
  const thumbSize = 20;
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const availableWidth = Math.max(width - thumbSize, 0);
  const thumbLeft = ratio * availableWidth;
  const fillWidth = Math.min(width, thumbLeft + thumbSize / 2);

  const updateFromEvent = (event: GestureResponderEvent) => {
    const nextPercent = Math.max(0, Math.min(1, event.nativeEvent.locationX / width));
    onChange(Math.round(min + nextPercent * (max - min)));
  };

  return (
    <View style={styles.root}>
      <View
        style={styles.track}
        onLayout={event => setWidth(event.nativeEvent.layout.width || 1)}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={updateFromEvent}
        onResponderMove={updateFromEvent}>
        <View style={[styles.fill, {width: fillWidth}]} />
        <View style={[styles.thumb, {left: thumbLeft}]} />
      </View>
      <View style={styles.labels}>
        <Text style={styles.label}>{leftLabel ?? String(min)}</Text>
        <Text style={styles.label}>{rightLabel ?? String(max)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 10,
  },
  track: {
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.surfaceSoft,
    justifyContent: 'center',
  },
  fill: {
    position: 'absolute',
    left: 0,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.orange,
    borderWidth: 2,
    borderColor: colors.yellow,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.dim,
    fontSize: 11,
    fontWeight: '700',
  },
});
