import { FC, Fragment } from 'react';
import Animated, { SlideInRight } from 'react-native-reanimated';

const AnimatedPageWrapper = () => null;

const _SlideInRight: FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  slideValue?: number;
  isLoading?: boolean;
  shouldAnimate?: boolean;
}> = ({ delay = 0, children, duration = 600, slideValue = 20, isLoading, shouldAnimate }) => {
  if (isLoading || !shouldAnimate) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Animated.View
      entering={SlideInRight.duration(duration)
        .withInitialValues({ transform: [{ translateX: slideValue }] })
        .delay(delay)
        .springify()}>
      {children}
    </Animated.View>
  );
};

_SlideInRight.displayName = 'SlideInRight';

/**
 * A component that wraps its children with an animated view that slides in from the right.
 *
 * If `isLoading` is true or `shouldAnimate` is false, the children will be rendered without animation.
 *
 * @param {React.ReactNode} children The children to be rendered.
 * @param {number} [delay=0] The delay before animation starts.
 * @param {number} [duration=600] The duration of the animation in milliseconds.
 * @param {number} [slideValue=20] The value to translate the x position by.
 * @param {boolean} [isLoading=false] Whether or not the component is in a loading state.
 * @param {boolean} [shouldAnimate=true] Whether or not the component should animate.
 *
 * @example
 * <SlideInRight
 *   delay={300}
 *   duration={1000}
 *   slideValue={10}
 *   isLoading={isLoading}
 *   shouldAnimate={shouldAnimate}
 * >
 *   <Text>Hello</Text>
 * </SlideInRight>
 */
AnimatedPageWrapper.SlideInRight = _SlideInRight;

export default AnimatedPageWrapper;
