import { Dimensions, ScrollView, ScrollViewProps, View, ViewProps } from 'react-native';
import React, { FC } from 'react';
import { pageDefaultStyles } from './styles/PageWrapper.styles';
import useThemeColors from '../../hooks/useThemeColors';
import { SectionPageProps } from './types/PageWrapper.type';
import { Text } from 'react-native-paper';
import { scale } from 'react-native-size-matters';

const PageWrapper = () => null;

const Scroll: FC<ScrollViewProps> = ({ children, style, ...props }) => {
  const { colors } = useThemeColors();

  const dynamicStyles = {
    bg: {
      backgroundColor: colors.screenBg
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: scale(100) }}
      style={[pageDefaultStyles.pageWrapper, dynamicStyles.bg, style]}
      {...props}>
      {children}
    </ScrollView>
  );
};
const ViewWrapper: FC<ViewProps> = ({ children, style, ...props }) => {
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

const SectionPage: FC<SectionPageProps> = ({ children, style, title, titleContStyle, titleProps, icon, ...props }) => {
  return (
    <View
      style={style}
      {...props}>
      <View style={[pageDefaultStyles.heading, titleContStyle]}>
        {icon && icon}

        {title && (
          <Text
            variant='titleLarge'
            {...titleProps}>
            {title}
          </Text>
        )}
      </View>

      {children}
    </View>
  );
};

Scroll.displayName = 'Scroll';
ViewWrapper.displayName = 'ViewWrapper';
SectionPage.displayName = 'SectionPage';

PageWrapper.Scroll = Scroll;
PageWrapper.View = ViewWrapper;
PageWrapper.Section = SectionPage;

export default PageWrapper;
