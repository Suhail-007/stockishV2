import { Fragment, useState } from 'react';
import { LayoutChangeEvent, StyleProp } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { globalStyles } from '../../../constants/globalStyles';
import { cardStyles } from './card.styles';
import { View } from 'tamagui';
import CustomText from '../CustomText';
import ConditionalRender from '../../ConditionalRender';
import HomeSkeleton from '../../pages/home/Home.Skeleton';
import { Pressable } from 'react-native';
import { Icon } from 'react-native-paper';
import { ViewStyle } from 'react-native';

const Card = ({
  title,
  textColor,
  icon,
  amount,
  linearGradientColors,
  isLoading,
  masked,
  subText,
  contStyle,
  iconContStyle,
  value
}: {
  title: string;
  textColor: string;
  icon: React.ReactNode;
  amount?: number;
  linearGradientColors: (string | number)[];
  isLoading: boolean;
  masked?: boolean;
  subText?: string;
  contStyle?: StyleProp<ViewStyle>;
  iconContStyle?: StyleProp<ViewStyle>;
  value?: string | number;
}) => {
  const [iconPos, setIconPos] = useState(0);
  const [maskedAmount, setMaskedAmount] = useState(true);

  const onLayoutChange = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setIconPos(height / 2);
  };

  const onPressEye = () => {
    setMaskedAmount((prev) => !prev);
  };

  return (
    <LinearGradient
      onLayout={onLayoutChange}
      useAngle
      angle={90}
      style={[globalStyles.card, cardStyles.monthlyCard, contStyle]}
      colors={linearGradientColors}>
      <View style={cardStyles.typographyCont}>
        <CustomText
          adjustsFontSizeToFit
          variant='labelLarge'
          fontVariant='quicksandSemiBold'
          weight={'600'}
          style={[cardStyles.heading, { color: textColor }]}>
          {title}
        </CustomText>

        {subText && (
          <CustomText
            style={{ color: textColor }}
            adjustsFontSizeToFit
            variant='labelMedium'
            fontVariant='quicksandSemiBold'
            weight={'600'}>
            {subText}
          </CustomText>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {value && (
            <CustomText
              fontVariant='quicksandBold'
              weight={'700'}
              variant='headlineMedium'
              style={{ color: textColor }}>
              <ConditionalRender
                condition={isLoading}
                isTrueComponent={
                  <Fragment>
                    <HomeSkeleton.MonthlyStatsAmount color={textColor} />
                  </Fragment>
                }
                isFalseComponent={<Fragment>{value}</Fragment>}
              />
            </CustomText>
          )}

          {amount && (
            <CustomText
              fontVariant='quicksandBold'
              weight={'700'}
              variant='headlineMedium'
              style={{ color: textColor }}>
              <ConditionalRender
                condition={isLoading}
                isTrueComponent={
                  <Fragment>
                    <HomeSkeleton.MonthlyStatsAmount color={textColor} />
                  </Fragment>
                }
                isFalseComponent={<Fragment>₹ {maskedAmount && masked ? '**' : amount}</Fragment>}
              />
            </CustomText>
          )}

          {masked && !maskedAmount && (
            <Pressable onPress={onPressEye}>
              <Icon
                size={16}
                source={'eye-off'}
              />
            </Pressable>
          )}

          {masked && maskedAmount && (
            <Pressable onPress={onPressEye}>
              <Icon
                size={16}
                source={'eye'}
              />
            </Pressable>
          )}
        </View>
      </View>

      <View
        style={[
          cardStyles.cardIconCont,
          iconContStyle,
          {
            top: iconPos - 20,
            right: 10,
            zIndex: 0
          }
        ]}>
        {icon}
      </View>
    </LinearGradient>
  );
};

export default Card;
