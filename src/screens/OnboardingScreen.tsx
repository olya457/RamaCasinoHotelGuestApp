import React, {useMemo, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {GradientButton} from '../components/GradientButton';
import {GradientSurface} from '../components/GradientSurface';
import {imageAssets} from '../data/assets';
import {colors, layout} from '../theme/theme';

type Props = {
  onDone: () => void;
};

const slides = [
  {
    title: 'Welcome to Rama Casino Hotel',
    body: 'Use one guest companion for room service, hotel requests, room comfort, dining, wellness, and nearby travel.',
    image: imageAssets.onboardingExterior,
  },
  {
    title: 'Order to Your Room',
    body: 'Build a room service order, add delivery notes, and track it from confirmation to delivery.',
    image: imageAssets.onboardingLobby,
  },
  {
    title: 'Smart Climate Control',
    body: "Adjust your room's temperature, fan speed, sleep mode, and heating or cooling preferences.",
    image: imageAssets.onboardingSuite,
  },
  {
    title: 'Entertainment & Wellness',
    body: 'Find pool, spa, fitness, dining, and bar details with hours, access notes, and guest service contacts.',
    image: imageAssets.onboardingNight,
  },
  {
    title: 'Your Stay, Simplified',
    body: 'Set up your stay once so orders and requests are routed with your guest name and room.',
    image: imageAssets.onboardingPool,
  },
];

export function OnboardingScreen({onDone}: Props): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const {height, width} = useWindowDimensions();
  const isSmall = height < 720 || width < 360;
  const slide = slides[index];
  const imageHeight = useMemo(
    () => Math.max(280, Math.min(height * 0.48, 430)),
    [height],
  );

  const next = () => {
    if (index === slides.length - 1) {
      onDone();
      return;
    }
    setIndex(current => current + 1);
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={slide.image}
        resizeMode="cover"
        style={[styles.image, {height: imageHeight}]}>
        <View style={styles.imageShade} />
      </ImageBackground>
      <Pressable
        onPress={onDone}
        style={[styles.skip, {top: layout.androidTopInset + 38}]}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>
      <View style={[styles.content, isSmall && styles.contentSmall]}>
        <Text style={[styles.title, isSmall && styles.titleSmall]}>
          {slide.title}
        </Text>
        <Text style={[styles.body, isSmall && styles.bodySmall]}>
          {slide.body}
        </Text>
        <View style={styles.dots}>
          {slides.map((_, dotIndex) =>
            dotIndex === index ? (
              <GradientSurface key={dotIndex} style={styles.activeDot} />
            ) : (
              <View key={dotIndex} style={styles.dot} />
            ),
          )}
        </View>
        <GradientButton
          title={index === slides.length - 1 ? 'Set Up Stay' : 'Continue'}
          onPress={next}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  image: {
    width: '100%',
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
  },
  skip: {
    position: 'absolute',
    right: 28,
    minHeight: 36,
    minWidth: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
  },
  content: {
    flex: 1,
    paddingHorizontal: 26,
    paddingBottom: layout.bottomInset + 28,
    justifyContent: 'flex-end',
    gap: 26,
  },
  contentSmall: {
    gap: 18,
    paddingHorizontal: 22,
  },
  title: {
    color: colors.text,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  titleSmall: {
    fontSize: 23,
    lineHeight: 29,
  },
  body: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  bodySmall: {
    fontSize: 13,
    lineHeight: 20,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.surfaceSoft,
  },
  activeDot: {
    width: 28,
    height: 7,
    borderRadius: 4,
  },
});
