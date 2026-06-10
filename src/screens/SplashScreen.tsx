import React, {useEffect, useRef} from 'react';
import {Animated, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {imageAssets} from '../data/assets';
import {colors} from '../theme/theme';

export function SplashScreen(): React.JSX.Element {
  const logoScale = useRef(new Animated.Value(0.92)).current;
  const logoOpacity = useRef(new Animated.Value(0.72)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(logoScale, {
            toValue: 1.06,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(logoScale, {
            toValue: 0.92,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(logoOpacity, {
            toValue: 0.72,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [logoOpacity, logoScale]);

  return (
    <ImageBackground source={imageAssets.splashHotel} resizeMode="cover" style={styles.root}>
      <View style={styles.content}>
        <Animated.Image
          source={imageAssets.logo}
          resizeMode="contain"
          style={[styles.logo, {opacity: logoOpacity, transform: [{scale: logoScale}]}]}
        />
        <Animated.View style={[styles.textWrap, {opacity: logoOpacity}]}>
          <Text style={styles.taglineMain}>Luxury Resort Stay</Text>
          <Text style={styles.taglineAccent}>Guest Companion</Text>
        </Animated.View>
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
  content: {
    alignItems: 'center',
    gap: 18,
  },
  logo: {
    width: 218,
    height: 218,
    borderRadius: 50,
  },
  textWrap: {
    minWidth: 286,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.46)',
    paddingHorizontal: 22,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 3,
  },
  taglineMain: {
    color: colors.text,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.72)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 8,
  },
  taglineAccent: {
    color: colors.gold,
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.72)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 8,
  },
});
