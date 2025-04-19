import React, { FC, memo } from 'react';
import { ScrollView, ScrollViewProps, View, ViewProps } from 'react-native';
import { scale } from 'react-native-size-matters';

import useThemeColors from '../../hooks/useThemeColors';

import CustomText from './CustomText';
import { pageDefaultStyles } from './styles/PageWrapper.styles';
import { SectionPageProps } from './types/PageWrapper.type';



const PageWrapper = () => null;

const _Scroll: FC<ScrollViewProps> = ({ children, style, ...props }) => {
  const { colors } = useThemeColors();

  const dynamicStyles = {
    bg: {
      backgroundColor: colors.screenBg
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[{ flexGrow: 1, paddingBottom: scale(100) }]}
      style={[pageDefaultStyles.pageWrapper, dynamicStyles.bg, style]}
      {...props}>
      {children}
    </ScrollView>
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

const _SectionPage: FC<SectionPageProps> = ({ children, style, title, titleContStyle, titleProps, icon, ...props }) => {
  return (
    <View
      style={style}
      {...props}>
      {(icon || title) && (
        <View style={[pageDefaultStyles.heading, titleContStyle]}>
          {icon && icon}

          {title && (
            <CustomText
              variant='titleLarge'
              {...titleProps}>
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
