import React from 'react';
import {ActivityIndicator, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {imageAssets} from '../data/assets';
import {colors, layout} from '../theme/theme';

export function SplashScreen(): React.JSX.Element {
  return (
    <ImageBackground source={imageAssets.splashHotel} resizeMode="cover" style={styles.root}>
      <View style={styles.overlay} />
      <View style={styles.portal}>
        <Text style={styles.mark}>🎰</Text>
        <Text style={styles.title}>Rama Casino Hotel</Text>
        <Text style={styles.subtitle}>Guest Experience</Text>
        <ActivityIndicator color={colors.yellow} style={styles.loader} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.44)',
  },
  portal: {
    width: 220,
    minHeight: 190,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    backgroundColor: 'rgba(10, 10, 10, 0.74)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mark: {
    fontSize: 42,
    marginBottom: 14,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 6,
  },
  loader: {
    marginTop: 18,
  },
});
