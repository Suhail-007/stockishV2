import React, { FC, memo } from 'react';
import { ScrollView, ScrollViewProps, View, ViewProps } from 'react-native';
import { scale } from 'react-native-size-matters';

import { LinearGradient } from 'expo-linear-gradient';

import useThemeColors from '../../hooks/useThemeColors';

import CustomText from './CustomText';
import { pageDefaultStyles } from './styles/PageWrapper.styles';
import { SectionPageProps } from './types/PageWrapper.type';

const PageWrapper = () => null;

const _Scroll: FC<ScrollViewProps & { linearGradient?: boolean; colors?: any }> = ({
  children,
  linearGradient,
  style,
  colors = [],
  ...props
}) => {
  const { colors: colorsTheme } = useThemeColors();

  const dynamicStyles = {
    bg: {
      backgroundColor: linearGradient ? 'transparent' : colorsTheme.background
    }
  };

  if (!linearGradient) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ flexGrow: 1, paddingBottom: scale(130) }]}
        style={[pageDefaultStyles.pageWrapper, dynamicStyles.bg, style]}
        {...props}>
        {children}
      </ScrollView>
    );
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[colorsTheme.background, colorsTheme.primary50, colorsTheme.background]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ flexGrow: 1, paddingBottom: scale(130) }]}
        style={[pageDefaultStyles.pageWrapper, dynamicStyles.bg, style]}
        {...props}>
        {children}
      </ScrollView>
    </LinearGradient>
  );
};
const _ViewWrapper: FC<ViewProps> = ({ children, style, ...props }) => {
  const { colors } = useThemeColors();

  const dynamicStyles = {
    bg: {
      backgroundColor: colors.screenBg
    }
  };

  return (
    <View
      style={[pageDefaultStyles.pageWrapper, style, dynamicStyles.bg]}
      {...props}>
      {children}
    </View>
  );
};

const _SectionPage: FC<SectionPageProps> = ({
  children,
  style: contStyle,
  title,
  titleContStyle,
  titleProps,
  icon,
  ...props
}) => {
  const { colors } = useThemeColors();
  return (
    <View
      style={contStyle}
      {...props}>
      {(icon || title) && (
        <View style={[pageDefaultStyles.heading, titleContStyle]}>
          {icon && icon}

          {title && (
            <CustomText
              variant='titleLarge'
              {...titleProps}
              style={[{ color: colors.textPrimary }, titleProps?.style]}>
              {title}
            </CustomText>
          )}
        </View>
      )}

      {children}
    </View>
  );
};

_Scroll.displayName = 'Scroll';
_ViewWrapper.displayName = 'ViewWrapper';
_SectionPage.displayName = 'SectionPage';

const Scroll = memo(_Scroll);
const ViewWrapper = memo(_ViewWrapper);
const SectionPage = memo(_SectionPage);

PageWrapper.Scroll = Scroll;
PageWrapper.View = ViewWrapper;
PageWrapper.Section = SectionPage;

export default PageWrapper;
