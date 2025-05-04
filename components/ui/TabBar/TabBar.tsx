import { useState, useEffect } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useLinkBuilder } from '@react-navigation/native';

import useThemeColors from '../../../hooks/useThemeColors';

import TabBarButton from './TabBarButton';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const { colors } = useThemeColors();
  const { buildHref } = useLinkBuilder();

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width
    });
  };

  const tabBarPositionX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tabBarPositionX.value
        }
      ]
    };
  });

  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    };
  });

  const dynamicStyles = {
    navCont: {
      backgroundColor: colors.background
    }
  };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     opacity.value = withSpring(0.4, { duration: 3000 });
  //   }, 500);

  //   return () => clearTimeout(timeout);
  // }, [opacity]);

  useEffect(() => {
    // Animation on route change
    opacity.value = 1;
    const timeoutOne = setTimeout(() => {
      opacity.value = withSpring(0.5, { duration: 2000 });
    }, 2000);

    const timeoutTwo = setTimeout(() => {
      opacity.value = withSpring(0.4, { duration: 3000 });
    }, 500);

    tabBarPositionX.value = withSpring(buttonWidth * state.index, { duration: 1700 });

    return () => {
      clearTimeout(timeoutOne);
      clearTimeout(timeoutTwo);
    };
  }, [state.index, opacity, buttonWidth, tabBarPositionX]);

  // Add this useEffect to handle programmatic navigation
  // useEffect(() => {
  //   // Update the indicator position whenever the active route index changes
  //   tabBarPositionX.value = withSpring(buttonWidth * state.index, { duration: 1700 });
  // }, [state.index]);

  return (
    <Animated.View
      onLayout={onTabBarLayout}
      style={[styles.navCont, dynamicStyles.navCont, animatedOpacity]}>
      <Animated.View
        style={[
          animatedStyles,
          {
            position: 'absolute',
            backgroundColor: colors.primary,
            borderRadius: 45,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 25
          }
        ]}></Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined ? options.tabBarLabel.toString() : (options.title ?? route.name);

        const isFocused = state.index === index;

        const onPress = () => {
          tabBarPositionX.value = withSpring(buttonWidth * index, { duration: 1700 });

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          });
        };

        return (
          <TabBarButton
            key={route.key}
            routeName={route.name}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            params={route.params}
            tabBarButtonTestID={options.tabBarButtonTestID}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            href={buildHref(route.name, route.params)}
            label={label}
          />
        );
      })}
    </Animated.View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  navCont: {
    position: 'absolute',
    bottom: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginInline: 30,

    borderRadius: 50,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden'
  }
});
