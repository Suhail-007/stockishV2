import { useEffect } from 'react';
import { useSharedValue, withRepeat, withTiming, useAnimatedStyle, interpolate, Easing } from 'react-native-reanimated';

export const useSkeletonAnimation = (speed: number = 1200) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withRepeat(
      withTiming(1, {
        duration: speed,
        easing: Easing.inOut(Easing.ease)
      }),
      -1,
      true
    );

    return () => {
      progress.value = 0;
    };
  }, [speed, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.7, 1], [0.8, 0.5, 0.3]);

    return {
      opacity
    };
  });

  return animatedStyle;
};
