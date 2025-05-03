import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { PlatformPressable } from '@react-navigation/elements';

import { Fonts } from '../../../constants/fonts';
import useThemeColors from '../../../hooks/useThemeColors';
import { TabBarButtonProps } from '../types/buttons.type';

const icon = {
  index: (props: any) => (
    <AntDesign
      name='home'
      size={24}
      color={props.color}
    />
  ),
  products: (props: any) => (
    <MaterialCommunityIcons
      name='table'
      size={24}
      color={props.color}
    />
  ),
  orders: (props: any) => (
    <Ionicons
      name='list'
      size={24}
      color={props.color}
    />
  )
};

const TabBarButton = ({
  routeName,
  params,
  isFocused,
  accessibilityLabel,
  tabBarButtonTestID,
  href,
  onPress,
  onLongPress,
  label
}: TabBarButtonProps) => {
  const scale = useSharedValue(0);
  const { colors } = useThemeColors();

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {
      duration: 350
    });
  }, [isFocused, scale]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return {
      transform: [{ scale: scaleValue }],
      top
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
      fontSize: 13
    };
  });

  return (
    <PlatformPressable
      android_ripple={{ color: colors.primary100 }}
      href={href}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={tabBarButtonTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.buttonCont}>
      <Animated.View style={[styles.tabBarItem, animatedIconStyle]}>
        {icon[routeName as keyof typeof icon]({ color: isFocused ? colors.textWhite : colors.text })}
        <Animated.Text
          style={[{ color: isFocused ? colors.textWhite : colors.text }, styles.tabBarItemText, animatedTextStyle]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </PlatformPressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  buttonCont: {
    flex: 1
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flex: 1
  },
  tabBarItemText: {
    fontFamily: Fonts.quicksandMedium
  }
});
