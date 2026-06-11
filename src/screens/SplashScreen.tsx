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
    <ImageBackground source={imageAssets.splashHotel} resizeMode="cover" blurRadius={5} style={styles.root}>
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Animated.View style={[styles.logoFrame, {opacity: logoOpacity, transform: [{scale: logoScale}]}]}>
          <Animated.Image source={imageAssets.logo2} resizeMode="cover" style={styles.logo} />
        </Animated.View>
        <Animated.View style={[styles.textWrap, {opacity: logoOpacity}]}>
          <Text style={styles.brandTitle} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.72}>
            <Text style={styles.brandTitleRed}>RAMA </Text>
            <Text style={styles.brandTitleGold}>CASINO</Text>
          </Text>
          <Text style={styles.brandSubtitle} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.78}>
            RESORT & HOTEL
          </Text>
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
  content: {
    alignItems: 'center',
    gap: 34,
    marginTop: -28,
  },
  logoFrame: {
    width: 228,
    height: 228,
    borderRadius: 114,
    borderWidth: 1,
    borderColor: colors.gold,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    shadowColor: colors.gold,
    shadowOpacity: 0.34,
    shadowRadius: 28,
    shadowOffset: {width: 0, height: 0},
    elevation: 12,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 114,
  },
  textWrap: {
    width: '100%',
    paddingHorizontal: 28,
    alignItems: 'center',
    gap: 10,
  },
  brandTitle: {
    fontSize: 38,
    lineHeight: 45,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.76)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 8,
  },
  brandTitleRed: {
    color: '#f03729',
  },
  brandTitleGold: {
    color: '#f59e1b',
  },
  brandSubtitle: {
    color: 'rgba(255, 255, 255, 0.76)',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.72)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 8,
  },
  dots: {
    marginTop: 34,
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: 'rgba(245, 189, 0, 0.48)',
  },
  dotActive: {
    backgroundColor: colors.gold,
  },
});
