import { StyleSheet, View } from 'react-native';
import { useAppSelector } from '../store/store';
import { PageTitleProps } from './types/pageTitle.type';
import { Text } from 'react-native-paper';
import { Fragment } from 'react';
import useThemeColors from '../hooks/useThemeColors';

/**
 * PageTitle component
 *
 * @param {PageTitleProps} props - The component props
 * @param {string} [props.title] - The title of the page
 * @param {string} [props.subtitle] - The subtitle of the page
 * @param {React.ReactNode} [props.icon] - The icon to display next to the title
 * @param {ViewStyle} [props.containerStyles] - The container styles
 * @param {TextStyle} [props.titleStyles] - The title styles
 * @param {TextStyle} [props.subtitleStyles] - The subtitle styles
 * @param {boolean} [props.showGreeting] - Whether to show the greeting
 *
 * @example
 * <PageTitle title="My Page" subtitle="This is my page" icon={<Icon />} />
 */
const PageTitle = ({
  title,
  subtitle,
  icon,
  containerStyles,
  titleStyles,
  subtitleStyles,
  showGreeting
}: PageTitleProps) => {
  const { colors } = useThemeColors();
  const { user } = useAppSelector((state) => state.auth);
  const userTitle = user?.gender === 'M' ? 'Mr.' : 'Ms.';

  const dynamicStyles = {
    title: {
      color: colors.textPrimary
    },
    subtitle: {
      color: colors.textSecondary
    }
  };

  return (
    <View style={[styles.container, containerStyles]}>
      {showGreeting && (
        <Fragment>
          <Text
            style={[dynamicStyles.title, titleStyles]}
            variant='titleLarge'>
            Hello, {userTitle} {user?.firstName} {user?.lastName}
          </Text>
        </Fragment>
      )}

      {!showGreeting && (
        <Fragment>
          {icon}
          <Text
            style={[dynamicStyles.title, titleStyles]}
            variant='titleLarge'>
            {title}
          </Text>
          <Text
            style={[dynamicStyles.subtitle, subtitleStyles]}
            variant='titleMedium'>
            {subtitle}
          </Text>
        </Fragment>
      )}
    </View>
  );
};

export default PageTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10
  }
});
